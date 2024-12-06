export interface FileData {
  filepath: string;
  filetype: string;
  commits_count: number;
  main_contributor: { author: string; commits_count: number };
  line_count: number;
  creation_date: string;
  last_modification_date: string;
}
