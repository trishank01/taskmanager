import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
const CustomBarChart = ({data}) => {

    // function to alternate colors

    const getBarColor = (entry) => {
        switch (entry?.priority){
            case 'Low':
                return '#00BC70'
            case 'Medium':
                return '#FE9900'
            case 'High':
                return '#FF1F57'
            default : 
                 return '#00BC7D'
        }
    }

    const CustomTooltip = ({active, payload}) => {
        if(active && payload && payload.length){
            return (
                <div className="bg-white shadow-md  rounded-lg p-2 border border-gray-300">
                    <p className="text-xs font-semibold text-purple-800 mb-1">
                        {payload[0].payload.priority}
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                        Count: {" "}
                        <span className="">
                            {payload[0].payload.count}
                        </span>
                    </p>
                </div>
            )
        }
        return null
    }

    
  return <div className="">
    <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
            <CartesianGrid stroke="none"/>
            <XAxis 
            dataKey="priority"
             tick={{fontSize:12,fill:"#555"}}
            />
            <YAxis tick={{fontSize:12,fill:"#555"}} stroke="none"/>

            <Tooltip content={CustomTooltip} cursor={{fill:"transparent"}}/>

            <Bar
            
            />
        </BarChart>
    </ResponsiveContainer>
  </div>;
};

export default CustomBarChart;
