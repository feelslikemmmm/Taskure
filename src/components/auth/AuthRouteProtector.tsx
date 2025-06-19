'use client';

import { useEffect } from 'react';
import { useAuthReadyStore, useUserStore } from '@/lib/store/index';
import { usePathname, useRouter } from 'next/navigation';

const publicRoutes = ['/', '/login', '/signup'];
const protectedRoutes = ['/dashboard', '/mypage'];

export default function AuthRouteProtector() {
  const user = useUserStore((state) => state.user);
  const authReady = useAuthReadyStore((state) => state.isAuthReady);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!authReady) return;

    if (!user && protectedRoutes.includes(pathname)) {
      router.replace('/');
    }

    if (user && publicRoutes.includes(pathname)) {
      router.replace('/dashboard');
    }
  }, [user, pathname, router, authReady]);

  return null;
}
