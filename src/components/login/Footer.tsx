import React from 'react';
import { CardFooter } from '@/components/ui/card';
import Link from 'next/link';

export default function Footer() {
  return (
    <CardFooter className="flex justify-center">
      <div className="text-sm text-muted-foreground">
        계정이 없으신가요?{' '}
        <Link
          href="/signup"
          className="text-primary underline-offset-4 hover:underline"
        >
          회원가입
        </Link>
      </div>
    </CardFooter>
  );
}
