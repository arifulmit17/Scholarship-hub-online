import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import ScholarshipStats from './Scholarshipstats';

const Chart = () => {
    const {data,isLoading,refetch}=useQuery({
            queryKey:['scholarship'],
            queryFn:async ()=>{
                const {data}=await axios(`${import.meta.env.VITE_API_URL}/scholarship`)
                return data
            },
            initialData:[]
            
        })

        if (isLoading) return <div>Loading...</div>;

  
  const chartData = data.map((item) => ({
    name: item.scholarshipName || 'Unnamed',
    applicationFees: Number(item.applicationFees),
    serviceCharge: Number(item.serviceCharge),
  }));
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
const categoryData = Object.values(
  data.reduce((acc, item) => {
    const category = item.scholarshipCategory || 'Unknown';
    acc[category] = acc[category] || { name: category, value: 0 };
    acc[category].value += 1;
    return acc;
  }, {})
);
    return (
        <div className='h-[1000px]'>
          <ScholarshipStats data={data}></ScholarshipStats>
<div className="w-full h-[400px]">
  
  <h2 className="text-xl font-semibold mb-4 text-center">Fees by Scholarship</h2>
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="applicationFees" fill="#8884d8" name="Application Fees" />
      <Bar dataKey="serviceCharge" fill="#82ca9d" name="Service Charge" />
    </BarChart>
  </ResponsiveContainer>
</div>

<div className="w-full h-[400px] mt-20">
  <h2 className="text-xl font-semibold  my-4 text-center">Scholarship Category Distribution</h2>
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie
        data={categoryData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={120}
        fill="#8884d8"
        label
      >
        {categoryData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
</div>
        </div>
        
    );
};

export default Chart;