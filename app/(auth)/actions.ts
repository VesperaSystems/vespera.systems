'use server';

import { headers } from 'next/headers';
import { z } from 'zod';

import { createUser, getUser, setUserPassword } from '@/lib/db/queries';
import { ipMaySignUp } from '@/lib/rate-limit';

import { signIn } from './auth';

const authFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export interface LoginActionState {
  status: 'idle' | 'in_progress' | 'success' | 'failed' | 'invalid_data';
}

export const login = async (
  _: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> => {
  try {
    const validatedData = authFormSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    const result = await signIn('credentials', {
      email: validatedData.email,
      password: validatedData.password,
      redirect: false,
    });

    if (result?.error) {
      return { status: 'failed' };
    }

    return { status: 'success' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: 'invalid_data' };
    }
    return { status: 'failed' };
  }
};

export interface AccessActionState {
  status:
    | 'idle'
    | 'in_progress'
    | 'success'
    | 'failed'
    | 'invalid_data'
    | 'has_password'
    | 'rate_limited';
}

const accessFormSchema = z.object({
  email: z.string().email().max(64),
});

// Public email-capture entry point: an email gets you a passwordless free-
// tier account and a session cookie. Per-IP signup caps blunt bulk farming.
export const requestAccess = async (
  _: AccessActionState,
  formData: FormData,
): Promise<AccessActionState> => {
  try {
    const { email } = accessFormSchema.parse({
      email: formData.get('email'),
    });
    const normalized = email.trim().toLowerCase();

    const [existing] = await getUser(normalized);

    if (existing?.password) {
      return { status: 'has_password' };
    }

    if (!existing && !(await ipMaySignUp(await headers()))) {
      return { status: 'rate_limited' };
    }

    const result = await signIn('email-capture', {
      email: normalized,
      redirect: false,
    });

    if (result?.error) {
      return { status: 'failed' };
    }

    return { status: 'success' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: 'invalid_data' };
    }
    return { status: 'failed' };
  }
};

export interface RegisterActionState {
  status:
    | 'idle'
    | 'in_progress'
    | 'success'
    | 'failed'
    | 'user_exists'
    | 'invalid_data';
}

export const register = async (
  _: RegisterActionState,
  formData: FormData,
): Promise<RegisterActionState> => {
  try {
    const validatedData = authFormSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    const [user] = await getUser(validatedData.email);

    if (user?.password) {
      return { status: 'user_exists' };
    }

    if (user) {
      // Email-capture account claiming a password: upgrade in place so chat
      // history stays attached.
      await setUserPassword(validatedData.email, validatedData.password);
    } else {
      await createUser(validatedData.email, validatedData.password);
    }

    const result = await signIn('credentials', {
      email: validatedData.email,
      password: validatedData.password,
      redirect: false,
    });

    if (result?.error) {
      return { status: 'failed' };
    }

    return { status: 'success' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: 'invalid_data' };
    }
    return { status: 'failed' };
  }
};
