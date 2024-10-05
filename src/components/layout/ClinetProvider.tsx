'use client';

import AuthGuard from '../auth/AuthProvider';

export default function ClinetProvider() {
  return (
    <>
      <AuthGuard />
    </>
  );
}
