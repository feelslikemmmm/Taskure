'use client';

import Link from 'next/link';
import HeaderButton from './HeaderButton';

export default function Header() {
  return (
    <header className="border-b fixed top-0 left-0 right-0 bg-background z-10 h-16">
      <div className="flex h-16 items-center justify-between px-4 max-w-screen-2xl mx-auto">
        <Link href={'/'} className="flex items-center gap-2">
          <span className="text-xl font-bold">Taskure</span>
        </Link>
        <nav>
          <HeaderButton />
        </nav>
      </div>
    </header>
  );
}
