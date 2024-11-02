import { ArrowRight } from "lucide-react"
import { useRepository } from "../providers/RepositoryProvider"
import { useState } from "react";

const SourceInput = () => {

  const {changeSource, setLoading} = useRepository()

  const [source, setSource] = useState('')

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter')
      handleSourceChange()
  }

  const handleSourceChange = () => {
    if (source.length > 0){
      setLoading(true)
      changeSource(source)
    }
  }

  return (
    <div className="my-auto space-y-6 text-secondary">
      <h1 className="text-center text-3xl">Répertoire source</h1>
      <div className="flex gap-3">
        <input 
          className="text-sm sm:text-3xl border w-[250px] sm:w-[600px] p-3 rounded-2xl text-center focus:outline-primary focus:shadow-md focus:shadow-primary "
          onChange={(e) => {setSource(e.target.value)}}
          type="text" 
          placeholder="https://github.com/project"
          onKeyDown={handleKeyDown}
        />
        <div>
          <button className="bg-primary text-white h-full aspect-square rounded-full disabled:bg-gray-500" onClick={handleSourceChange} disabled={source.length == 0}>
            <ArrowRight className="m-auto size-1/2" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default SourceInput