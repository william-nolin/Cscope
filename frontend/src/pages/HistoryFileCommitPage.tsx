import React, { useEffect, useState } from "react"
import { useDataSettingContext } from "../context/DataSettingContext"
import "assets/styles/evolutionFileCommit.scss"
import DateAndFileInput from "components/DateAndFileInput"
import MotionChartDisplay from "components/MotionChartDisplay"
import { FileHistoryCommit } from "models/FileHistoryCommit"

import { fileHistoryByDate, getFileTypes, getGroupedFileTypes } from "api"
import { Spin } from "antd"
import FileTypeChangeFilter from "components/FileTypeChangeFilter"
import { useParams } from "react-router-dom"
import { evolutionTypeToCategory, typeEvolutionOptions } from "utils/tooltipHelper"
import { CategorizedFileTypes } from 'models/CategorizedFileTypes'

const HistoryFileCommitPage: React.FC = () => {
  const [data, setData] = useState<FileHistoryCommit[]>( [] )
  const [pathFilterData, setPathFilterData] = useState<any[]>( [] )
  const [filterData, setFilterData] = useState<any[]>( [] )
  const [ready, setReady] = useState<boolean>( false )
  const {
    repository,
    repositoryId,
    setRepositoryId,
    startDate,
    endDate,
    filePath
  } = useDataSettingContext()
  const [typeFiles, setTypeFiles] = useState<string[]>( [] )
  const [groupedTypeFiles, setGroupedTypeFiles] = useState<CategorizedFileTypes>( {
    code: [],
    config: [],
    tests: [],
    uncategorized: []
  } )
  const [selectfilterTypeFiles, setSelectFilterTypeFiles] = useState<string[]>(
    []
  )
  const [checkTypeEvolution, setCheckTypeEvolution] =
    useState<string[]>( typeEvolutionOptions )
  const { id } = useParams<{ id: string }>()

  useEffect( () => {
    const fetchFilesTypes = async () => {
      if ( repository ) {
        const fileTypes = await getFileTypes( repository.id )
        setTypeFiles( fileTypes )
      }
    }

    fetchFilesTypes()
  }, [repository] )

  useEffect( () => {
    const fetchFilesTypes = async () => {
      if ( repository ) {
        const groupedTypeFiles = await getGroupedFileTypes( repository.id )
        setGroupedTypeFiles( groupedTypeFiles )
      }
    }

    fetchFilesTypes()
  }, [repository] )

  useEffect( () => {
    if ( !repositoryId ) {
      setRepositoryId( Number( id ) )
    }
  }, [id] )

  useEffect( () => {
    async function fetchData () {
      if ( repository ) {
        const result = await fileHistoryByDate(
          Number( repository.id ),
          startDate,
          endDate
        )
        setData( result )
        setReady( true )
      }
    }

    setReady( false )
    fetchData()
  }, [repository, startDate, endDate] )

  useEffect( () => {
    const newPathFilterData = data.filter( ( item: FileHistoryCommit ) => {
      return filePath === "" || item.fileName === filePath
    } )

    const setExtTypeFilterData = newPathFilterData.map(
      ( item: FileHistoryCommit ) => {
        return { ...item }
      }
    )

    setPathFilterData( setExtTypeFilterData )
  }, [data, filePath] )

  useEffect( () => {
    const newFilterPathData = pathFilterData.filter( ( item: any ) => {
      return selectfilterTypeFiles.length > 0
        ? selectfilterTypeFiles.includes( item.filetype )
        : true
    } )

    const newFilterData = newFilterPathData.filter( ( item: any ) => {
      const type = evolutionTypeToCategory.get( item.typeEvolution )
      return type && checkTypeEvolution.includes( type )
    } )
    setFilterData( newFilterData )
  }, [pathFilterData, selectfilterTypeFiles, checkTypeEvolution] )

  return (
    <div className="two-side-structure">
      <div className="page">
        {ready ? (
          <MotionChartDisplay fileHistoryCommitData={filterData} />
        ) : (
          <Spin size="large" />
        )}
      </div>
      <div>
        <DateAndFileInput />
        <FileTypeChangeFilter
          fileTypes={typeFiles}
          groupedFileTypes={groupedTypeFiles}
          filterTypeFiles={selectfilterTypeFiles}
          setFilterTypeFiles={setSelectFilterTypeFiles}
          checkedList={checkTypeEvolution}
          setCheckedList={setCheckTypeEvolution}
        />
      </div>
    </div>
  )
}

export default HistoryFileCommitPage
