export function handleError(error: unknown, contextMessage: string) {
  console.error(`${contextMessage} 중 오류 발생:`, error);

  // TODO: 프로덕션에선 Sentry 등 연결
  // Sentry.captureException(error);

  throw error; // 후속 로직에 위임
}
