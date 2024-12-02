import axios from "axios";
import { FileHistoryCommit } from "models/FileHistoryCommit";
import { TypeFileCommitEvolution } from "enum/TypeFileCommitEvolution";
import { FileData } from "models/FileData";

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
  categoryToEvolutionType.set("create", TypeFileCommitEvolution.ADD_FILE);
  categoryToEvolutionType.set("delete", TypeFileCommitEvolution.DELETE_FILE);
  categoryToEvolutionType.set("modify", TypeFileCommitEvolution.SET_FILE);

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
        TypeFileCommitEvolution.SET_FILE,
      Date: new Date(date),
    };
  });

  return data;
}

export async function getFilesRepository(
  repositoryId: number
): Promise<string[]> {
  const endpoint = `/repositories/${repositoryId}/tree/head`;
  const response = await axios.get(endpoint);
  const data = response.data.map((file: any) => file.filepath);
  return data;
}

export async function getFileData(
  repositoryId: number,
  filepath: string
): Promise<FileData> {
  const endpoint = `/repositories/${repositoryId}/files/head/${filepath}`;
  const response = await axios.get(endpoint);
  const data: FileData = response.data;

  return data;
}
