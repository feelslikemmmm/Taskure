import React from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background pt-16 pb-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center pt-10">
          <div className="space-y-6">
            <Badge className="px-3 py-1 text-sm bg-primary/10 text-primary border-primary/20 mb-4">
              생산성 간소화
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Manage tasks with <span className="text-primary">ease</span> and{' '}
              <span className="text-primary">efficiency</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Taskure는 업무를 체계화하고, 팀과 협업하며, 간단하고 직관적인
              인터페이스로 목표를 달성하도록 도와줍니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="text-base">
                <Link href="/login">무료로 시작하기</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base">
                <Link href="#features">사용 방법 보기</Link>
              </Button>
            </div>
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-primary/10 border-2 border-background flex items-center justify-center text-xs font-medium"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Trusted by{' '}
                <span className="font-medium text-foreground">10,000+</span>{' '}
                users worldwide
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 rounded-lg blur-3xl opacity-30"></div>
            <div className="relative bg-card border rounded-xl shadow-xl overflow-hidden">
              <div className="p-4 border-b bg-muted/50">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="ml-2 text-sm font-medium">
                    Taskure Dashboard
                  </div>
                </div>
              </div>
              <div className="p-6">
                <Image
                  src="/images/dashboard.png"
                  alt="TaskManager Dashboard"
                  width={800}
                  height={400}
                  objectFit="cover"
                  className="w-full rounded-md border shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
    </section>
  );
}
