import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

export default function Header() {
  return (
    <CardHeader className="space-y-1">
      <CardTitle className="text-2xl font-bold">로그인</CardTitle>
      <CardDescription>Taskure 계정으로 로그인하세요</CardDescription>
    </CardHeader>
  );
}
