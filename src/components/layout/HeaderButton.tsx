'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/lib/store/userStore';
import { SignOut } from '@/lib/service/authService';

export default function HeaderButton() {
  const pathname = usePathname();
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  const handleLogout = async () => {
    await SignOut();
    router.push('/');
  };

  // 로그인하지 않은 상태
  if (!user) {
    if (pathname === '/') {
      return (
        <Button asChild variant="default">
          <Link href="/login">로그인</Link>
        </Button>
      );
    }

    if (pathname === '/login' || pathname === '/signup') {
      return (
        <Button asChild variant="default">
          <Link href="/">돌아가기</Link>
        </Button>
      );
    }

    return null;
  }

  // 로그인한 상태 + 대시보드 내 페이지일 때
  if (pathname.startsWith('/dashboard')) {
    return (
      <Button variant="default" onClick={handleLogout}>
        로그아웃
      </Button>
    );
  }

  return null;
}
