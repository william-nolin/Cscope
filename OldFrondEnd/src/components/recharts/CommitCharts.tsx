import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ZAxis, Cell } from 'recharts';
import { Commit } from '../../interface';
import CustomTooltip from './CustomTooltip';
import { Color, default_color, fill_colors } from '../../config/colors';

interface CommitChartsProps {
  data: Commit[]
  cellClickHandler: Function
}

interface CommitChartData {
  color: Color
  files: {
    file_id: number
    commit_id: number
    commit_hash: string
    path: string
    timestamp: number
    modified_lines: number
  }[]
}

const CommitCharts = ({data, cellClickHandler} : CommitChartsProps) => {
  const chartData : CommitChartData[] = [
    {
      color: default_color,
      files: []
    },
    ...fill_colors.map((category) => {
      return {
        color: category,
        files: []
      }
    })
  ]
  
  const fileIds : string[] = []

  data.forEach((commit, index) => {
    commit.files.forEach((file) => {
      let file_id
      if (!fileIds.includes(file.path)){
        fileIds.push(file.path)
        file_id = fileIds.length
      }
      else {
        file_id = fileIds.indexOf(file.path) + 1
      }

      const color = fill_colors.find((fill_color) => fill_color.type == file.type && fill_color.change_type == file.change_type) ?? default_color
      const existingChartDataIndex = chartData.findIndex((chartItem) => chartItem.color == color)
      const fileData = {
        file_id,
        commit_id: index,
        commit_hash: commit.hash,
        path: file.path,
        timestamp: commit.timestamp,
        modified_lines: file.added_lines + file.deleted_lines
      }
      if (existingChartDataIndex == -1){
        chartData.push({
          color,
          files: [fileData],
        })
      }
      else {
        chartData[existingChartDataIndex].files.push(fileData)
      }
    })
  })

  return (
    <ResponsiveContainer id="commit-chart" width='100%' height='100%'>
      <ScatterChart>
        <CartesianGrid />
        <ZAxis
          type="number" 
          dataKey="modified_lines" 
          name="Lignes"
          range={[30, 300]}
        />
        <XAxis 
          type="number" 
          dataKey="commit_id"
          name='Commit'
        />
        <YAxis 
          type="number" 
          dataKey="file_id"
          name="Fichier"  
        />
        <Tooltip content={<CustomTooltip />} />
        {chartData.filter((category) => category.files.length > 0).map((school, index) => (
          <Scatter 
            key={index}
            isAnimationActive={false}
            name={school.color.label} 
            data={school.files} 
            fill={school.color.color} 
            shape={school.color.shape} 
            legendType={school.color.shape as any}
          >
            {school.files.map((file, index) => (
              <Cell 
                className='cursor-pointer' 
                key={index} 
                onClick={() => {cellClickHandler(file.path, file.commit_hash)}}
              />
            ))}
          </Scatter>
        ))}
        <Legend />
      </ScatterChart>
    </ResponsiveContainer>
  );
}

export default CommitCharts