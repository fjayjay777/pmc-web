import React from 'react';
import ReactECharts from 'echarts-for-react';

let professors = [];
let option = {
  title: {
    left: 'center',
    text: 'Average Student Grade by Professors',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '5%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      data: [],
      axisTick: {
        alignWithLabel: true,
      },
    },
  ],
  yAxis: [
    {
      show: false,
      type: 'category',
      data: ['F', 'D', 'D+', 'C-', 'C', 'C+', 'B-', 'B', 'B+', 'A-', 'A'],
      axisLabel: {
        fontSize: 14,
        align: 'right',
      },
    },
  ],
  series: [
    {
      name: 'Average Grade',
      type: 'scatter',
      barWidth: '40%',
      data: [],
      symbolSize: 55,
    },
  ],
};

function generateLetterGrade(value) {
  if (value >= (3.7 + 4) / 2) return 'A';
  if (value >= (3.3 + 3.7) / 2) return 'A-';
  if (value >= (3 + 3.3) / 2) return 'B+';
  if (value >= (2.7 + 4) / 2) return 'B';
  if (value >= (2.3 + 2.7) / 2) return 'B-';
  if (value >= (2 + 2.3) / 2) return 'C+';
  if (value >= (1.7 + 2) / 2) return 'C';
  if (value >= (1.3 + 1.7) / 2) return 'C-';
  if (value >= (1 + 1.3) / 2) return 'D+';
  if (value >= (0.7 + 1) / 2) return 'D';
  return 'F';
}

function populateProfessorLabels(professorRanking, reviews) {
  option.xAxis[0].data = [];
  option.series[0].data = [];
  for (let i = 0; i < professorRanking.length; i++) {
    option.xAxis[0].data.push(professorRanking[i].name);
    option.series[0].data.push(generateLetterGrade(professorRanking[i].rating));

    // console.log(option.xAxis[0].data);
    // console.log(option.series);
  }
}

export default function StatsDetailedProfessor({ reviews, professorRanking }) {
  populateProfessorLabels(professorRanking, reviews);
  return <ReactECharts option={option} style={{ height: 380 }} onEvents={{}} />;
}