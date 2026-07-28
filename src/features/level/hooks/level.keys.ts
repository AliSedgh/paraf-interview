export const levelKeys = {
  all: ['levels'] as const,
  list: () => [...levelKeys.all, 'list'] as const,
}
