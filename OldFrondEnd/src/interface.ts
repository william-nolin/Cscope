export enum ChangeType {
  ADD='ADD',
  DELETE='DELETE',
  MODIFY='MODIFY',
  RENAME='RENAMED',
  UNKNOWN='UNNOWN'
}

export interface Repository {
  source_url: string
  daysFrom: number
  daysTo: number
  commits: Commit[]
  is_loading?: boolean
}


export interface Commit {
  hash: string
  timestamp: number
  committer_date: Date
  files : CommitFile[]
}

export interface CommitFile {
  path: string
  type: string
  added_lines: number
  deleted_lines: number
  change_type : ChangeType
}

export interface DayFilter {
  label: string
  value: number
  default?: boolean
}

export interface IDateInput {
  resetValue(): void
  getValue(): number
}