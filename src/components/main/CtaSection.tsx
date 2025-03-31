import React from 'react';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
export default function CtaSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="bg-primary text-primary-foreground rounded-xl p-8 md:p-12 shadow-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              시작할 준비가 되셨나요?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8">
              이미 TaskManager를 사용하여 업무를 구성하고 생산성을 높이는 수천
              명의 사용자와 함께하세요.
            </p>
            <Button asChild size="lg" variant="secondary" className="text-base">
              <Link href="/login">
                무료로 시작하기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
