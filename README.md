import React from 'react';
import { Table, Tag } from 'antd';
import type { TableProps } from 'antd/es/table';

// 1. 定义数据源类型
interface KpiItem {
  key: string;
  indicator: string;
  value2024FY: string;
  value2024YTD: string;
  value2025YTD: string;
  target: string;
  // 辅助字段：用于控制第一列合并
  rowSpan?: number;
}

// 2. 模拟表格数据
const tableData: KpiItem[] = [
  {
    key: '1',
    indicator: 'Revenues in USDm',
    value2024FY: '275.1',
    value2024YTD: '105.7',
    value2025YTD: '96\nYoY - (9)%',
    target: '0',
    rowSpan: 4, // 该列占据4行
  },
  {
    key: '2',
    indicator: 'Origination Intensity',
    value2024FY: '7.6',
    value2024YTD: '6.1',
    value2025YTD: '4.5\nYoY - (26)%',
    target: '10',
    // 此行被第一列合并，rowSpan 为 0
  },
  {
    key: '3',
    indicator: 'Share of Wallet %',
    value2024FY: '7.1%',
    value2024YTD: '5.2%',
    value2025YTD: '7.4%\nYoY - 221 bps',
    target: '10.0%',
  },
  {
    key: '4',
    indicator: '% of Clients in Top 5 for SPC',
    value2024FY: '22.7%',
    value2024YTD: '16.7%',
    value2025YTD: '13.6%\nYoY - (303) bps',
    target: '50.0%',
  },
];

// 3. 定义列配置
const columns: TableProps<KpiItem>['columns'] = [
  {
    title: 'Key Performance Indicators',
    dataIndex: 'indicator',
    key: 'indicator',
    width: 220,
    // 第一列左对齐
    align: 'left',
    // 关键：合并单元格，第一行保留，其余行隐藏
    onCell: (record, index) => ({
      rowSpan: record.rowSpan || (index === 0 ? 1 : 0),
    }),
  },
  // 2024 FY 列
  {
    title: '2024 FY',
    dataIndex: 'value2024FY',
    key: 'value2024FY',
    align: 'center',
  },
  // 2024 YTD 列
  {
    title: '2024 YTD',
    dataIndex: 'value2024YTD',
    key: 'value2024YTD',
    align: 'center',
  },
  // 2025 YTD 列（核心：带颜色的单元格）
  {
    title: '2025 YTD',
    dataIndex: 'value2025YTD',
    key: 'value2025YTD',
    align: 'center',
    // 自定义单元格渲染与样式
    customRender: (text: string) => {
      // 处理换行符，antd 默认不解析 \n，需用 div 包裹
      return <div>{text}</div>;
    },
    // 关键：动态设置背景色
    customCell: (record) => {
      const text = record.value2025YTD;
      let bgColor = '#fff';
      let textColor = '#000';

      // 逻辑：包含 "(9)%" 或 "(26)%" 设为红色背景
      if (text.includes('(9)%') || text.includes('(26)%')) {
        bgColor = '#f5222d'; // 红色
        textColor = '#fff';
      } 
      // 包含 "221 bps" 设为绿色背景
      else if (text.includes('221 bps')) {
        bgColor = '#52c41a'; // 绿色
        textColor = '#fff';
      }
      // 包含 "(303) bps" 设为浅黄色背景
      else if (text.includes('(303) bps')) {
        bgColor = '#faad14'; // 黄色/火山
        textColor = '#000';
      }

      return {
        style: {
          backgroundColor: bgColor,
          color: textColor,
          fontWeight: 'bold',
        },
      };
    },
  },
  // Target 列
  {
    title: 'Target',
    dataIndex: 'target',
    key: 'target',
    align: 'center',
    // 目标列使用 Tag 标签展示
    customRender: (text: string) => {
      // 0 表示无目标，不显示标签
      if (text === '0') return '-';
      
      // 根据目标值匹配 Tag 颜色
      let color: TagProps['color'] = 'gray';
      if (text === '10') color = 'blue';
      if (text === '10.0%') color = 'cyan';
      if (text === '50.0%') color = 'purple';

      return <Tag color={color}>{text}</Tag>;
    },
  },
];

// 4. 图例说明（底部的颜色解释）
const Legend = () => (
  <div style={{ marginTop: 16, fontSize: 12 }}>
    <div style={{ display: 'inline-block', marginRight: 16 }}>
      <span style={{ display: 'inline-block', width: 12, height: 12, backgroundColor: '#f5222d', marginRight: 4 }}></span>
      More than 20% down
    </div>
    <div style={{ display: 'inline-block', marginRight: 16 }}>
      <span style={{ display: 'inline-block', width: 12, height: 12, backgroundColor: '#faad14', marginRight: 4 }}></span>
      Less than 20% down
    </div>
    <div style={{ display: 'inline-block' }}>
      <span style={{ display: 'inline-block', width: 12, height: 12, backgroundColor: '#52c41a', marginRight: 4 }}></span>
      Flat or Up
    </div>
  </div>
);

// 5. 主组件
const KpiTable: React.FC = () => (
  <>
    <Table<KpiItem>
      columns={columns}
      dataSource={tableData}
      bordered
      pagination={false}
      size="middle"
      // 整体样式：表头加粗，边框更清晰
      style={{ marginBottom: 8 }}
    />
    <Legend />
  </>
);

export default KpiTable;
