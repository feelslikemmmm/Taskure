import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function Header() {
  return (
    <CardHeader className="space-y-1">
      <CardTitle className="text-2xl font-bold">회원가입</CardTitle>
      <CardDescription>아래 정보를 입력하여 새 계정을 만드세요</CardDescription>
    </CardHeader>
  );
}
