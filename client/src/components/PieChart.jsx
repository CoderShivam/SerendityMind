import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ refresh }) => {
  const [chartData, setChartData] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const userId = user?._id;

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        const { data } = await axios.get(`https://serenditymind-backend.onrender.com/phq9/result/${userId}`);
        const items = data.data || [];

        const severityCounts = items.reduce((acc, item) => {
          // map severity based on item.score
          const category = (item.score <= 4)
            ? 'Minimal depression'
            : item.score <= 9
            ? 'Mild depression'
            : item.score <= 14
            ? 'Moderate depression'
            : item.score <= 19
            ? 'Moderately severe depression'
            : 'Severe depression';

          acc[category] = (acc[category] || 0) + 1;
          return acc;
        }, {});

        const labels = Object.keys(severityCounts);
        const values = Object.values(severityCounts);
        const backgroundColors = labels.map(sev => ({
          'Minimal depression': '#81C784',
          'Mild depression': '#FFEB3B',
          'Moderate depression': '#FF9800',
          'Moderately severe depression': '#F44336',
          'Severe depression': '#D32F2F'
        }[sev] || '#B0BEC5'));

        setChartData({ labels, datasets: [{ data: values, backgroundColor: backgroundColors, hoverBackgroundColor: backgroundColors }] });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId, refresh]);  // <-- note: includes `refresh`

  const currentDate = new Date().toLocaleDateString();

  return (
    <div className='m-auto'>
      {chartData ? (
        <>
          <Pie data={chartData} />
          <h2 className='text-sky-400 mt-4 text-lg font-bold'>
            User Severity Pie Chart for {currentDate}
          </h2>
        </>
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
};

export default PieChart;
