import React from 'react';

export default function FooterSection() {
  return (
    <footer className="border-t py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-4">TaskManager</h3>
            <p className="text-muted-foreground mb-4">
              직관적인 작업 관리 플랫폼으로 워크플로우를 간소화하고 생산성을
              높이세요.
            </p>
            <div className="flex space-x-4">
              {['트위터', '링크드인', '페이스북', '인스타그램'].map(
                (social, i) => (
                  <a
                    key={i}
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {social}
                  </a>
                )
              )}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-4">제품</h4>
            <ul className="space-y-2">
              {['기능', '가격', '통합', '변경 로그', '로드맵'].map(
                (item, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">리소스</h4>
            <ul className="space-y-2">
              {['문서', '가이드', '고객 센터', 'API', '커뮤니티'].map(
                (item, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">회사</h4>
            <ul className="space-y-2">
              {['소개', '블로그', '채용', '연락처', '개인정보 처리방침'].map(
                (item, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} TaskManager. 모든 권리 보유.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              서비스 이용약관
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              개인정보 처리방침
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              쿠키 정책
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
