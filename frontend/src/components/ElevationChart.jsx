import React from 'react';
import Chart from 'react-apexcharts';

/**
 * Componente que exibe o gráfico de elevação.
 * @param {Array<{x: number, y: number}>} data - Dados de elevação [distância, elevação].
 */
export default function ElevationChart({ data }) {
  // Converte x e y para números reais, garantindo a compatibilidade com o ApexCharts
  const numericData = data
    .map(p => ({
      x: parseFloat(p.x),
      y: parseFloat(p.y),
    }))
    .filter(p => !isNaN(p.x) && !isNaN(p.y)); // Filtra pontos inválidos

  if (!numericData || numericData.length < 2) {
    return (
      <div className="text-center p-4 text-gray-500">
        Dados de elevação não disponíveis para o gráfico.
      </div>
    );
  }

  const minY = Math.min(...numericData.map(p => p.y));

  const chartOptions = {
    chart: {
      zoom: { enabled: true },
      toolbar: { show: false },
      id: 'elevation-chart',
    },
    fill: {
      opacity: 0.3,
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: 'smooth',
      width: 3,
      colors: ['#22c55e'],
    },
    xaxis: {
      title: {
        text: 'Distância (km)',
        style: { color: '#374151', fontSize: '14px' },
      },
      type: 'numeric',
      labels: {
        formatter: val => `${parseFloat(val).toFixed(1)} km`,
        style: { colors: '#6b7280' },
      },
      tooltip: { enabled: false },
    },
    yaxis: {
      title: {
        text: 'Elevação (m)',
        style: { color: '#374151', fontSize: '14px' },
      },
      labels: {
        formatter: val => `${Math.round(val)}m`,
        style: { colors: '#6b7280' },
      },
      // Ajusta o mínimo para evitar que o gráfico comece muito abaixo da trilha
      min: Math.max(0, minY - (minY > 100 ? 100 : 20)),
    },
    grid: { borderColor: '#f1f1f1' },
    colors: ['#22c55e'],
    tooltip: {
      x: {
        formatter: val => `Distância: ${parseFloat(val).toFixed(1)} km`,
      },
      y: {
        formatter: val => `Elevação: ${Math.round(val)} m`,
      },
    },
  };

  const series = [
    {
      name: 'Elevação (m)',
      data: numericData,
    },
  ];

  return (
    <div className="w-full">
      <Chart options={chartOptions} series={series} type="area" height={300} />
    </div>
  );
}
