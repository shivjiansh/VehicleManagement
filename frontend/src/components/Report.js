import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Report() {
  const [revenueData, setRevenueData] = useState([]);
  const [timeFrame, setTimeFrame] = useState("daily");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/payments/revenue/",
          {
            params: { timeFrame },
          }
        );
        console.log(response);

        // Format the data to match the chart expectations
        const formattedData = response.data.map((item) => ({
          date: new Date(item.period).toLocaleDateString(), // Format the date
          amount: item.total_revenue,
        }));

        setRevenueData(formattedData);
      } catch (err) {
        setError("Failed to load revenue data");
      } finally {
        setLoading(false);
      }
    };

    fetchRevenueData();
  }, [timeFrame]);

  if (loading) return <div>Loading revenue data...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="dashboard">
      <h2>Revenue Analysis</h2>
      <div className="timeframe-selector">
        <button
          onClick={() => setTimeFrame("daily")}
          className={timeFrame === "daily" ? "active" : ""}
        >
          Daily
        </button>
        <button
          onClick={() => setTimeFrame("monthly")}
          className={timeFrame === "monthly" ? "active" : ""}
        >
          Monthly
        </button>
        <button
          onClick={() => setTimeFrame("yearly")}
          className={timeFrame === "yearly" ? "active" : ""}
        >
          Yearly
        </button>
      </div>

      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <LineChart
            data={revenueData}
            margin={{ top: 30, right: 50, left: 30, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="5 5" stroke="#ccc" />
            <XAxis
              dataKey="date"
              label={{ value: "Date", position: "bottom", offset: 0 }}
              tick={{ fill: "#888" }}
              axisLine={{ stroke: "#888" }}
            />
            <YAxis
              label={{
                value: "Amount (Rs)",
                angle: -90,
                position: "insideLeft",
                fill: "#888",
                fontSize: 14,
              }}
              tick={{ fill: "#888" }}
              axisLine={{ stroke: "#888" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#f5f5f5",
                borderRadius: "5px",
                border: "1px solid #ddd",
              }}
              labelStyle={{ fontWeight: "bold" }}
            />
            <Line
              type="basis"
              dataKey="amount"
              stroke="#34a853"
              strokeWidth={3}
              dot={{ r: 6, fill: "#34a853", strokeWidth: 2 }}
              activeDot={{ r: 10, fill: "#f44336" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Report;
