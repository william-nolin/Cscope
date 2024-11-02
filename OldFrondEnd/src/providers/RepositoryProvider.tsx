import React, { createContext, useContext, useEffect, useState } from "react"
import { useFilter } from "./FilterProvider"
import { Repository } from "../interface"

interface IRepositoryContext {
  repository: Repository
  setRepository: React.Dispatch<React.SetStateAction<Repository>>
}

const RepositoryContext = createContext({} as IRepositoryContext)

const RepositoryProvider = ({children} : {children: React.ReactNode}) => {
  const [repository, setRepository] = useState({source_url: '', daysFrom: 0, daysTo:0, commits: []} as Repository)

  return (
    <RepositoryContext.Provider value={{repository, setRepository}}>
      {children}
    </RepositoryContext.Provider>
  )
}

const useRepository = () => {
  const {repository, setRepository} = useContext(RepositoryContext)

  const {daysFrom, daysTo} = useFilter()
  const isLoading = repository.is_loading ?? false

  useEffect(() => {
    if (repository.source_url != '' && daysFrom > repository.daysFrom){
      setLoading(true)
      changeSource(repository.source_url)
    }
  }, [daysFrom])

  const changeSource = async (source_url: string) => {
    const request = await fetch(`${import.meta.env.VITE_API_URL}commits/?repo_path=${source_url}&days=${daysFrom}`)
    const data = await request.json()
    
    const commits = data.map((commit : any) => {
      return {
        ...commit,
        timestamp: new Date(commit.committer_date).getTime()
      }
    })

    setRepository({
      source_url,
      daysFrom,
      daysTo,
      commits,
      is_loading: false
    })
  }

  const setLoading = (is_loading: boolean) => {
    setRepository({
      ...repository,
      is_loading
    })
  }

  const getFilteredCommits = () => {
    return repository.commits.filter((commit) => {
      return (commit.timestamp >= (Date.now() - (daysFrom * 86400000))) && (commit.timestamp <= (Date.now() - (daysTo * 86400000)))
    })
  }

  const openFileInNewTab = (path: string, commit: string) => {
    const url = `${repository.source_url}/blob/${commit}/${path}`
    window.open(url, '_blank')
  }

  return {isLoading, getFilteredCommits, changeSource, setLoading, openFileInNewTab}
}

export {RepositoryProvider, useRepository}