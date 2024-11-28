import React, { useState, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer, // Import ResponsiveContainer
} from "recharts";

const LocationChart = ({ accessLogs }) => {
  // Group accessLogs by location and count occurrences
  const locationData = accessLogs.reduce((acc, log) => {
    const location = log.location || "Unknown";
    acc[location] = (acc[location] || 0) + 1;
    return acc;
  }, {});

  // Transform grouped data into chart format
  const data = Object.entries(locationData).map(([location, count]) => ({
    name: location,
    count,
  }));

  const [opacity, setOpacity] = useState({
    count: 1,
  });

  const handleMouseEnter = useCallback(
    (o) => {
      const { dataKey } = o;
      setOpacity({ ...opacity, [dataKey]: 0.5 });
    },
    [opacity]
  );

  const handleMouseLeave = useCallback(
    (o) => {
      const { dataKey } = o;
      setOpacity({ ...opacity, [dataKey]: 1 });
    },
    [opacity]
  );

  return (
    <div className="mt-16" style={{ width: "100%", height: 400 }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            label={{ value: "Location", position: "insideBottom", offset: -5 }}
          />
          <YAxis
            label={{ value: "Access Count", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Legend
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#8884d8"
            strokeOpacity={opacity.count}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <p className="notes">Tips: Hover over the legend!</p>
    </div>
  );
};

export default LocationChart;
