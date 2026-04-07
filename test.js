import React from 'react';
import { Card } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

// 1. 图表数据（完全还原原图）
const chartData = [
  { vertical: 'Financial Sponsors', yoy: -84.4, fee: 1 },
  { vertical: 'Energy', yoy: -6.3, fee: 26 },
  { vertical: 'FIG', yoy: -3.9, fee: 66 },
  { vertical: 'Business Services', yoy: 5.6, fee: 91 },
  { vertical: 'Conglomerates', yoy: 15.2, fee: 91 },
  { vertical: 'Technology', yoy: 15.4, fee: 127 },
  { vertical: 'Public Sector', yoy: 15.9, fee: 134 },
  { vertical: 'Healthcare', yoy: 21.2, fee: 159 },
  { vertical: 'Real Estate', yoy: 21.6, fee: 159 },
  { vertical: 'Consumer & Retail', yoy: 34.0, fee: 228 },
  { vertical: 'Telecom & Media', yoy: 39.2, fee: 235 },
  { vertical: 'PURE', yoy: 39.2, fee: 250 },
  { vertical: 'TLC', yoy: 42.0, fee: 253 },
  { vertical: 'Metals & Mining', yoy: 49.4, fee: 339 },
  { vertical: 'Chemicals', yoy: 49.7, fee: 416 },
  { vertical: 'Industrials', yoy: 52.1, fee: 516 },
];

// 2. 右侧绝对值图表数据（按金额从高到低排序，还原原图顺序）
const feeSortedData = [...chartData].sort((a, b) => b.fee - a.fee);

// 3. 主组件
const MarketPerformanceChart: React.FC = () => {
  return (
    <Card title="Overall Market Performance Update - All" style={{ width: '100%' }}>
      <p style={{ fontSize: 16, margin: '0 0 16px 0' }}>
        Global IB fees up 21% 2025 YTD and All is up 21%
      </p>

      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        {/* 左图：YoY 同比增速柱状图 */}
        <div style={{ flex: 1, minWidth: 500 }}>
          <h4 style={{ margin: '0 0 8px 0' }}>Global adjusted IB fee pool per vertical: YoY Performance</h4>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="vertical"
                angle={-90}
                textAnchor="end"
                height={100}
                tick={{ fontSize: 11 }}
              />
              <YAxis
                tickFormatter={(value) => `${value}%`}
                domain={[-100, 60]}
                tick={{ fontSize: 11 }}
              >
                <Label value="YoY %" position="insideLeft" angle={-90} style={{ textAnchor: 'middle' }} />
              </YAxis>
              <Tooltip
                formatter={(value: number) => [`${value}%`, 'YoY Growth']}
                labelFormatter={(label) => `Vertical: ${label}`}
              />
              <Bar
                dataKey="yoy"
                fill="#8c8c8c"
                radius={[4, 4, 0, 0]}
                label={{
                  position: 'top',
                  formatter: (value: number) => `${value}%`,
                  fontSize: 11,
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 右图：2025 YTD 绝对值柱状图 */}
        <div style={{ flex: 1, minWidth: 500 }}>
          <h4 style={{ margin: '0 0 8px 0' }}>Global adjusted IB fee pool per sector: 2025 YTD</h4>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={feeSortedData}
              margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="vertical"
                angle={-90}
                textAnchor="end"
                height={100}
                tick={{ fontSize: 11 }}
              />
              <YAxis
                tickFormatter={(value) => `${value}M`}
                domain={[0, 550]}
                tick={{ fontSize: 11 }}
              >
                <Label value="IB Fees 2025 YTD USDm" position="insideLeft" angle={-90} style={{ textAnchor: 'middle' }} />
              </YAxis>
              <Tooltip
                formatter={(value: number) => [`$${value}M`, 'IB Fees']}
                labelFormatter={(label) => `Sector: ${label}`}
              />
              <Bar
                dataKey="fee"
                fill="#8c8c8c"
                radius={[4, 4, 0, 0]}
                label={{
                  position: 'top',
                  formatter: (value: number) => `${value}`,
                  fontSize: 11,
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 数据来源标注 */}
      <p style={{ fontSize: 12, color: '#666', marginTop: 16 }}>
        1. Source: Dealogic as of 30 Jun 2025, Updated as of 5-July-25
      </p>
    </Card>
  );
};

export default MarketPerformanceChart;
