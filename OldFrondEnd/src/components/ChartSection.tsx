import { useRepository } from '../providers/RepositoryProvider'
import FilterInputs from './FilterInputs';
import LoadingSpinner from './LoadingSpinner';
import CommitCharts from './recharts/CommitCharts';

const ChartSection = () => {

  const {getFilteredCommits, openFileInNewTab} = useRepository()

  const data = getFilteredCommits()

  return (
    <div className='h-[65vh] flex flex-col items-center gap-3'>
      <FilterInputs />
      <div className='relative w-[1000px] h-[80%]'>
        <LoadingSpinner />
        <CommitCharts data={data} cellClickHandler={openFileInNewTab} />
      </div>
    </div>
  )
}

export default ChartSection