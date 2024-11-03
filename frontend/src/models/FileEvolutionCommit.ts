import { TypeFileCommitEvolution } from "enum/TypeFileCommitEvolution";

export interface FileEvolutionCommit {
  fileId: number;
  fileName: string;
  typeEvolution: TypeFileCommitEvolution;
  Date: Date;
}
