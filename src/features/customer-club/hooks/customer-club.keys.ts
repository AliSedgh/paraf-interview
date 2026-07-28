export const customerClubKeys = {
  all: ['customer-club'] as const,
  summary: () => [...customerClubKeys.all, 'summary'] as const,
  vitrinSummary: (userVitrinId: string) =>
    [...customerClubKeys.all, 'summary-user-vitrin', userVitrinId] as const,
}
