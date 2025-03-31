import { Badge } from '@/components/ui/badge';
import {
  CheckCircle2,
  Calendar,
  ListTodo,
  Clock,
  Layers,
  Search,
} from 'lucide-react';

export default function FeatureSection() {
  return (
    <section id="features" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="px-3 py-1 text-sm bg-primary/10 text-primary border-primary/20 mb-4">
            기능
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            효율적인 작업 관리를 위한 모든 기능
          </h2>
          <p className="text-lg text-muted-foreground">
            TaskManager는 강력한 기능과 직관적인 인터페이스를 결합하여 효율적인
            작업 관리를 도와드립니다.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <ListTodo className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">작업 관리</h3>
            <p className="text-muted-foreground">
              한 곳에서 작업을 생성, 구성 및 추적하세요. 우선순위와 마감일을
              설정하여 업무를 효율적으로 관리하세요.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0" />
                <span className="text-sm">작업 생성 및 할당</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0" />
                <span className="text-sm">우선순위 및 마감일 설정</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0" />
                <span className="text-sm">실시간 진행 상황 추적</span>
              </li>
            </ul>
          </div>

          <div className="bg-card rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Layers className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">프로젝트 구성</h3>
            <p className="text-muted-foreground">
              작업을 프로젝트로 그룹화하여 모든 것을 체계적으로 유지하세요. 여러
              프로젝트를 쉽게 관리하세요.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0" />
                <span className="text-sm">맞춤형 프로젝트 생성</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0" />
                <span className="text-sm">시각적 구성을 위한 색상 코드</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0" />
                <span className="text-sm">프로젝트별 작업 필터링</span>
              </li>
            </ul>
          </div>

          <div className="bg-card rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">캘린더 통합</h3>
            <p className="text-muted-foreground">
              작업을 선호하는 캘린더 앱과 동기화하세요. 더 이상 마감일을 놓치지
              마세요.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0" />
                <span className="text-sm">Google, Apple 또는 Outlook 연결</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0" />
                <span className="text-sm">양방향 동기화</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-primary mr-2 shrink-0" />
                <span className="text-sm">자동 알림</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="bg-card rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Search className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">강력한 검색</h3>
            <p className="text-muted-foreground">
              강력한 검색 기능으로 모든 작업을 즉시 찾을 수 있습니다. 프로젝트,
              상태 또는 우선순위별로 필터링하세요.
            </p>
          </div>

          <div className="bg-card rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">시간 추적</h3>
            <p className="text-muted-foreground">
              각 작업에 소요되는 시간을 추적하세요. 생산성을 분석하고
              워크플로우를 개선하세요.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
