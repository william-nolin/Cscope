import { TooltipProps } from 'recharts';

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

const CustomTooltip = ({ active, payload } : TooltipProps<number, number> ) => {
  if (active && payload && payload.length) {
    const file = payload[0].payload
    return (
      <div className="bg-slate-600 text-white rounded-xl p-3">
        <ul>
          <li className='max-w-[400px] break-words text-wrap'>Path: {file.path}</li>
          {payload.map((entry, index) => {
            return (
              <li key={index}>{`${entry.name}: ${entry.value}`}</li>
            )
          })}
          <li>Date: {formatDate(file.timestamp)}</li>
        </ul>
      </div>
    );
  }

  return null;
};

export default CustomTooltip