export const ONBORDING_PROJECTS = [
  {
    name: '개인',
    description: '개인적인 일정을 관리해보세요',
    color: '#4f46e5',
  },
  {
    name: '업무',
    description: '업무 관련 태스크를 관리하세요',
    color: '#0ea5e9',
  },
] as const;

export const ONBORDING_TASKS = [
  {
    title: '프로젝트 계획 세우기',
    description: '목표를 설정하고 마감일을 정해보세요.',
    status: 'todo',
    priority: 'high',
  },
  {
    title: 'UI 스케치',
    description: '화면 흐름을 그려봅시다.',
    status: 'in-progress',
    priority: 'medium',
  },
  {
    title: '코드 작성 시작',
    description: '프로젝트의 첫 줄을 작성하세요!',
    status: 'todo',
    priority: 'low',
  },
] as const;
