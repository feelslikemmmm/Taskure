import React from 'react';
import { Card } from '@/components/ui/card';
import Header from '@/components/login/Header';
import Content from '@/components/login/Content';
import Footer from '@/components/login/Footer';

export default function LoginCard() {
  return (
    <Card className="w-full max-w-md">
      <Header />
      <Content />
      <Footer />
    </Card>
  );
}
