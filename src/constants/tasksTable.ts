export const PRIORITY_LABELS = {
  low: '낮음',
  medium: '중간',
  high: '높음',
} as const;

export const STATUS_LABELS = {
  todo: '할 일',
  'in-progress': '진행 중',
  done: '완료',
} as const;

export const PRIORITY_COLORS = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
} as const;

export const STATUS_COLORS = {
  todo: 'bg-blue-100 text-blue-800',
  'in-progress': 'bg-purple-100 text-purple-800',
  done: 'bg-gray-100 text-gray-800',
} as const;
