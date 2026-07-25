'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { requestAccess, type AccessActionState } from '@/app/(auth)/actions';

const MESSAGES: Partial<Record<AccessActionState['status'], string>> = {
  invalid_data: 'That doesn’t look like an email address — try again.',
  has_password: 'This email already has an account — sign in below.',
  rate_limited: 'Too many new accounts from your network today. Try again tomorrow.',
  failed: 'Something went wrong — please try again.',
};

export function EmailAccessGate() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState<
    AccessActionState,
    FormData
  >(requestAccess, { status: 'idle' });

  useEffect(() => {
    if (state.status === 'success') {
      router.refresh();
    }
  }, [state.status, router]);

  const notice = MESSAGES[state.status];

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.045] p-8 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
        <Image
          src="/logos/vespera-mark-dark.svg"
          alt="Vespera Systems"
          width={48}
          height={48}
          priority
          className="mx-auto size-12"
        />
        <h1 className="mt-6 text-2xl font-semibold tracking-tight text-white">
          Start with your email
        </h1>
        <p className="mt-3 text-sm leading-6 text-neutral-400">
          Enter an email to try the Vespera research chat — 10 free messages a
          day, no password needed. You stay signed in on this device.
        </p>
        <form action={formAction} className="mt-6 flex flex-col gap-3">
          <input
            type="email"
            name="email"
            required
            maxLength={64}
            placeholder="you@example.com"
            autoComplete="email"
            className="w-full rounded-full border border-white/15 bg-black/40 px-5 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-white/40 focus:outline-none"
          />
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-neutral-950 transition hover:bg-neutral-200 disabled:opacity-60"
          >
            {pending ? 'Setting you up…' : 'Start chatting'}
          </button>
        </form>
        {notice && (
          <p className="mt-4 text-xs text-amber-300/90" role="status">
            {notice}
          </p>
        )}
        <p className="mt-4 text-xs text-neutral-500">
          Already have an account?{' '}
          <Link href="/login" className="text-neutral-300 underline underline-offset-2 hover:text-white">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
