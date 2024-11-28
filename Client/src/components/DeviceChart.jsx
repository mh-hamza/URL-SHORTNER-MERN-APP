import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class DeviceChart extends PureComponent {
  transformData(deviceData) {
    return Object.entries(deviceData).map(([key, value]) => ({ name: key, value }));
  }

  renderLegend(data) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-40px' }}>
        {data.map((entry, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              margin: '0 10px',
            }}
          >
            <div
              style={{
                width: '15px',
                height: '15px',
                backgroundColor: COLORS[index % COLORS.length],
                marginRight: '5px',
              }}
            ></div>
            <span style={{ fontSize: '14px' }}>{entry.name}</span>
          </div>
        ))}
      </div>
    );
  }

  render() {
    const { data: deviceData } = this.props; // Receive deviceData
    const transformedData = this.transformData(deviceData); // Transform data to fit the chart format

    return (
      <div>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={transformedData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {transformedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        {this.renderLegend(transformedData)}
      </div>
    );
  }
}
