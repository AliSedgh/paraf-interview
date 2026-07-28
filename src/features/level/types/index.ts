export type ApiFile = {
  link: string
  id?: string
  name?: string
}

export type Level = {
  name: string
  scores: number
  file: ApiFile | null

  id?: string
}

export type LevelSummary = Partial<Level> & { name: string }
