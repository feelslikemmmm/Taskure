import Header from '@/components/layout/Header';
import SignupCard from '@/components/signup/SignupCard';
import React from 'react';

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 items-center justify-center py-12">
        <SignupCard />
      </div>
    </div>
  );
}
