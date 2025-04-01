import Header from '@/components/layout/Header';
import LoginCard from '@/components/login/LoginCard';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 items-center justify-center py-12">
        <LoginCard />
      </div>
    </div>
  );
}
