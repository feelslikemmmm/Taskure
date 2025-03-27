import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-col justify-center">
        <section className="w-full pt-24 pb-8 md:pt-28 md:pb-12 lg:pt-32 lg:pb-16">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-4xl mx-auto">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
                  효율적인 일정 관리를 위한 최고의 선택
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Taskure와 함께 일정과 태스크를 쉽게 관리하고 캘린더에
                  연동하세요.
                </p>
              </div>
              <div className="space-x-4 pt-6">
                <Button asChild size="lg">
                  <Link href="/login">시작하기</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="#features">더 알아보기</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900"
        >
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  주요 기능
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Taskure의 다양한 기능으로 일정 관리를 더 효율적으로 해보세요.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <h3 className="text-xl font-bold">태스크 관리</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  간편하게 태스크를 생성하고 관리할 수 있습니다.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <h3 className="text-xl font-bold">캘린더 연동</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  태스크를 캘린더에 연동하여 일정을 한눈에 확인하세요.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <h3 className="text-xl font-bold">알림 기능</h3>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  중요한 일정을 놓치지 않도록 알림을 설정할 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
