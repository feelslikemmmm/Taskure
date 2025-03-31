import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

export default function UserReviewSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="px-3 py-1 text-sm bg-primary/10 text-primary border-primary/20 mb-4">
            사용자 후기
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            사용자들의 이야기
          </h2>
          <p className="text-lg text-muted-foreground">
            우리 말만 믿지 마세요. TaskManager에 대한 사용자들의 의견을
            들어보세요.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              quote:
                'TaskManager는 제 업무 구성 방식을 완전히 바꿔놓았어요. 이전 시스템으로 돌아갈 수 없을 것 같아요.',
              author: '김지영',
              role: '제품 관리자',
            },
            {
              quote:
                '캘린더 통합 기능이 정말 혁신적이에요. 모든 작업이 Google 캘린더와 완벽하게 동기화됩니다.',
              author: '이민준',
              role: '소프트웨어 개발자',
            },
            {
              quote:
                '프로젝트를 만들고 작업을 구성하는 것이 너무 쉬워요. 드래그 앤 드롭 기능이 정말 직관적입니다.',
              author: '박서연',
              role: '마케팅 디렉터',
            },
          ].map((testimonial, i) => (
            <div key={i} className="bg-card rounded-lg p-6 shadow-sm border">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-5 w-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 italic">
                {testimonial.quote}
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <span className="text-primary font-medium">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
