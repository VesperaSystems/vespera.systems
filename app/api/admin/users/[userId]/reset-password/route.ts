import { auth } from '@/app/(auth)/auth';
import { db } from '@/lib/db';
import { user } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

// Admin action: clear a user's password hash. Their old password stops
// working immediately; they get back in through the email gate and choose a
// new password at /register (the passwordless claim flow).
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ userId: string }> },
) {
  try {
    const session = await auth();

    if (!session?.user?.isAdmin) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { userId } = await params;
    if (!userId) {
      return new NextResponse('User ID is required', { status: 400 });
    }

    if (userId === session.user.id) {
      return new NextResponse(
        'Refusing to reset your own password while signed in — you would lock yourself out of admin.',
        { status: 400 },
      );
    }

    const [updated] = await db
      .update(user)
      .set({ password: null })
      .where(eq(user.id, userId))
      .returning({ id: user.id, email: user.email });

    if (!updated) {
      return new NextResponse('User not found', { status: 404 });
    }

    return NextResponse.json({ ok: true, email: updated.email });
  } catch (error) {
    console.error('Error resetting user password:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
