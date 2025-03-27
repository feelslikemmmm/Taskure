'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const isDashboard = pathname?.startsWith('/dashboard');

  return (
    <header className="border-b fixed top-0 left-0 right-0 bg-background z-10 h-16">
      <div className="flex h-16 items-center justify-between px-4 max-w-screen-2xl mx-auto">
        <Link
          href={isDashboard ? '/dashboard' : '/'}
          className="flex items-center gap-2"
        >
          <span className="text-xl font-bold">Taskure</span>
        </Link>
        <nav>
          {isDashboard ? (
            <Button variant="ghost" asChild>
              <Link href="/">로그아웃</Link>
            </Button>
          ) : (
            <Button asChild variant="default">
              <Link href="/login">로그인</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
