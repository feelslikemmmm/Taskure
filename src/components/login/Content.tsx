import { CardContent } from '@/components/ui/card';
import React from 'react';
import EmailLoginForm from '@/components/login/EmailLoginForm';
import GoogleLoginForm from '@/components/login/GoogleLoginForm';

export default function Content() {
  return (
    <CardContent className="space-y-4">
      <EmailLoginForm />
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">또는</span>
        </div>
      </div>
      <GoogleLoginForm />
    </CardContent>
  );
}
