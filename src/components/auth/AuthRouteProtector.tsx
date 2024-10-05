'use client';

import { useEffect } from 'react';
import { useAuthReadyStore, useUserStore } from '@/lib/store';
import { usePathname, useRouter } from 'next/navigation';

const publicRoutes = ['/', '/login', '/signup'];
const protectedRoutes = ['/dashboard', '/mypage'];

export default function AuthRouteProtector() {
  const user = useUserStore((state) => state.user);
  const authReady = useAuthReadyStore((state) => state.authReady);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!authReady) return; // ⛔ 아직 Firebase 상태 파악 전이면 리다이렉트 X

    // 로그인 안 했는데 보호된 페이지 접근 시 → 홈으로
    if (!user && protectedRoutes.includes(pathname)) {
      router.replace('/');
    }

    // 로그인했는데 공개 페이지 접근 시 → 대시보드로
    if (user && publicRoutes.includes(pathname)) {
      router.replace('/dashboard');
    }
  }, [user, pathname, router, authReady]);

  return null;
}
