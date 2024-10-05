import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

// interface RecentActivityCardProps {
//   recentActivities:
// }

export default function RecentActivityCard() {
  const recentActivities = [
    {
      id: '1',
      action: '완료됨',
      taskTitle: '경쟁사 조사',
      timestamp: '2023-12-10T14:30:00',
      projectName: '업무',
    },
    {
      id: '2',
      action: '생성됨',
      taskTitle: '데이터베이스 스키마 생성',
      timestamp: '2023-12-09T10:15:00',
      projectName: '개인',
    },
    {
      id: '3',
      action: '업데이트됨',
      taskTitle: '사용자 인터페이스 디자인',
      timestamp: '2023-12-08T16:45:00',
      projectName: '개인',
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>최근 활동</CardTitle>
        <Link href="/dashboard/activities">
          <Button variant="ghost" size="sm" className="cursor-pointer">
            모두 보기
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.taskTitle}
                </p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span className="text-xs px-1.5 py-0.5 rounded bg-muted mr-1">
                    {activity.action}
                  </span>
                  {activity.projectName}
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {new Date(activity.timestamp).toISOString().slice(0, 10)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
