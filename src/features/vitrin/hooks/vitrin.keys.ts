export const vitrinKeys = {
  all: ['vitrins'] as const,
  lists: () => [...vitrinKeys.all, 'list'] as const,
  listForUser: () => [...vitrinKeys.lists(), 'all-user'] as const,
  details: () => [...vitrinKeys.all, 'detail'] as const,
  detail: (userVitrinId: string) => [...vitrinKeys.details(), userVitrinId] as const,
}
