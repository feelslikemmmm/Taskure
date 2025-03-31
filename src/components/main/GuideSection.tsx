import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ChevronRight } from 'lucide-react';

export default function GuideSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="px-3 py-1 text-sm bg-primary/10 text-primary border-primary/20 mb-4">
            사용 방법
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            몇 분 안에 시작하세요
          </h2>
          <p className="text-lg text-muted-foreground">
            TaskManager는 간단하고 직관적으로 설계되었습니다. 다음 단계에 따라
            시작하세요.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: '1',
              title: '계정 만들기',
              description: '무료로 가입하고 몇 초 만에 계정을 만드세요.',
            },
            {
              step: '2',
              title: '프로젝트 설정',
              description:
                '카테고리나 팀별로 작업을 구성할 프로젝트를 만드세요.',
            },
            {
              step: '3',
              title: '작업 추가',
              description:
                '작업을 추가하고, 우선순위를 설정하고, 진행 상황을 추적하세요.',
            },
          ].map((item, i) => (
            <div key={i} className="relative">
              <div className="bg-card rounded-lg p-6 shadow-sm border relative z-10">
                <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4 font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
              {i < 2 && (
                <div className="hidden md:block absolute top-1/2 left-full w-8 h-0.5 bg-border z-0 -translate-y-1/2">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2">
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
