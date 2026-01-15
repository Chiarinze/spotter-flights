import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';
import type { PricePoint } from '../types';

export const PriceGraph = ({ data }: { data: PricePoint[] }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#4FD1C5" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#4FD1C5" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <Tooltip 
          contentStyle={{ backgroundColor: '#161E2E', border: '1px solid #1f2937', borderRadius: '8px' }}
          itemStyle={{ color: '#4FD1C5' }}
        />
        <Area 
          type="monotone" 
          dataKey="price" 
          stroke="#4FD1C5" 
          fillOpacity={1} 
          fill="url(#colorPrice)" 
          strokeWidth={3}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};