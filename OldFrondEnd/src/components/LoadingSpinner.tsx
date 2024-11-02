import { LoaderPinwheel } from 'lucide-react'
import { useRepository } from '../providers/RepositoryProvider'

const LoadingSpinner = () => {

  const {isLoading} = useRepository()

  return (
    <>
      {isLoading && <div className='absolute inset-0 flex items-center justify-center bg-black/30 z-50'>
        <LoaderPinwheel width={100} height={100} className='animate-spin text-primary' />
      </div>}
    </>
  )
}

export default LoadingSpinner