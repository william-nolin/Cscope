import axios from "axios";
import Repository from "models/repository";
import RemoteRepository from "models/remoteRepository";

interface RepositorySearchResult {
  repository: Repository | null;
  remoteRepository: RemoteRepository | null;
}

export async function searchRepositoryByUrl(url: string): Promise<RepositorySearchResult> {
  const response = await axios.get('/repositories/search', { params: {url: url} });
  const result: RepositorySearchResult = {
    repository: null,
    remoteRepository: null,
  }

  if (response.data.repository) {
    result.repository = {
      id: response.data.repository.id,
      name: response.data.repository.name,
      domain: response.data.repository.domain,
      path: response.data.repository.path,
      url: response.data.repository.url,
      createdAt: response.data.repository.created_at,
      updatedAt: response.data.repository.updated_at,
    }
  }

  if (response.data.remote_repository) {
    result.remoteRepository = {
      name: response.data.remote_repository.name,
      description: response.data.remote_repository.description,
      domain: response.data.remote_repository.domain,
      path: response.data.remote_repository.path,
      url: response.data.remote_repository.url,
    }
  }

  return result
}
