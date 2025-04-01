import { usePathname } from 'next/navigation';
import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { SignOut } from '@/lib/service/authService';
export default function HeaderButton() {
  const pathname = usePathname();

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
  if (pathname.startsWith('/dashboard')) {
    return (
      <Button variant="default" asChild onClick={SignOut}>
        <Link href="/">로그아웃</Link>
      </Button>
    );
  }

  return null;
}
