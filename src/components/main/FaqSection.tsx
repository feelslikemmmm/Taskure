import React from 'react';
import { Badge } from '@/components/ui/badge';

export default function FaqSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="px-3 py-1 text-sm bg-primary/10 text-primary border-primary/20 mb-4">
            자주 묻는 질문
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            자주 묻는 질문
          </h2>
          <p className="text-lg text-muted-foreground">
            TaskManager에 대한 일반적인 질문에 대한 답변을 찾아보세요.
          </p>
        </div>

        <div className="max-w-3xl mx-auto divide-y">
          {[
            {
              question: 'TaskManager는 무료로 사용할 수 있나요?',
              answer:
                '네, TaskManager는 기본 기능이 포함된 무료 플랜을 제공합니다. 또한 개인 및 팀을 위한 고급 기능이 포함된 프리미엄 플랜도 제공합니다.',
            },
            {
              question: '팀과 협업할 수 있나요?',
              answer:
                'TaskManager는 개인 및 팀 사용을 위해 설계되었습니다. 공유 프로젝트를 만들고, 팀원에게 작업을 할당하고, 함께 진행 상황을 추적할 수 있습니다.',
            },
            {
              question: '어떤 캘린더 앱을 지원하나요?',
              answer:
                'TaskManager는 Google 캘린더, Apple 캘린더 및 Microsoft Outlook과 통합됩니다. 더 많은 캘린더 서비스에 대한 지원을 계속 추가하고 있습니다.',
            },
            {
              question: '내 데이터는 안전한가요?',
              answer:
                '네, 우리는 보안을 매우 중요하게 생각합니다. 모든 데이터는 전송 중 및 저장 시 암호화됩니다. 귀하의 동의 없이 제3자와 정보를 공유하지 않습니다.',
            },
            {
              question: '모바일에서 TaskManager에 접근할 수 있나요?',
              answer:
                '네, TaskManager는 완전히 반응형이며 모든 기기에서 작동합니다. 또한 더 나은 경험을 위해 iOS 및 Android용 네이티브 모바일 앱도 제공합니다.',
            },
          ].map((faq, i) => (
            <div key={i} className="py-6">
              <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
