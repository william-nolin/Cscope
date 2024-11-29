import axios from "axios";
import { FileHistoryCommit } from "models/FileHistoryCommit";
import { TypeFileCommitEvolution } from "enum/TypeFileCommitEvolution";

export async function fileHistoryByDate(
  repositoryId: number,
  startDate: string,
  endDate: string
): Promise<FileHistoryCommit[]> {
  const endpoint = `/repositories/${repositoryId}/files/stats/change-history`;
  const response = await axios.get(endpoint);

  const fileIdMap = new Map<string, number>();
  let fileIdGenerator = 1;

  const categoryToEvolutionType = new Map<string, TypeFileCommitEvolution>();
  categoryToEvolutionType.set(
    "create",
    TypeFileCommitEvolution.ADD_SOURCE_FILE
  );
  categoryToEvolutionType.set(
    "delete",
    TypeFileCommitEvolution.DELETE_SOURCE_FILE
  );
  categoryToEvolutionType.set(
    "modify",
    TypeFileCommitEvolution.SET_SOURCE_FILE
  );

  const data = (response.data || []).map((point: any) => {
    const [date, filepath, category] = point;

    if (!fileIdMap.has(filepath)) {
      fileIdMap.set(filepath, fileIdGenerator);
      fileIdGenerator++;
    }

    return {
      fileId: fileIdMap.get(filepath),
      fileName: filepath,
      typeEvolution:
        categoryToEvolutionType.get(category) ||
        TypeFileCommitEvolution.SET_SOURCE_FILE,
      Date: new Date(date),
    };
  });

  return data;
}
