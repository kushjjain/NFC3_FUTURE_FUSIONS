import React, { useState, useEffect } from 'react';
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, RadialLinearScale } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import axios from 'axios';
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement, 
  RadialLinearScale,
  ChartDataLabels
);

const Dashboard = ({isAdmin}) => {
  const [ loading, setloading] = useState(false)
  const [selectedFeature, setSelectedFeature] = useState('Distribution');
  const [colors, setColors] = useState([
    "#4BC0C0", 
    "#FF6384",  
    "#FF9F40",  
    "#FFCD56",  
    "#A5A5A5",  
    "#6B8E23",  
    "#8FBC8F",  
    "#4682B4",  
    "#D3D3D3", 
    "#B0C4DE", 
    "#D2B48C", 
    "#C0C0C0"   
]
)
  const [featureData, setFeatureData] = useState({
    breed: {
      labels: ['Labrador', 'Golden Retriever', 'Persian', 'Siamese', 'Poodle'],
      datasets: [
        { label: 'Likely to be Adopted', data: [30, 40, 10, 20, 15], backgroundColor: '#4BC0C0' },
        { label: 'Unlikely to be Adopted', data: [10, 15, 5, 10, 8], backgroundColor: '#FF6384' }
      ]
    },
    // age: {
    //   labels: ['0-6 months', '6-12 months', '1-2 years', '2+ years'],
    //   datasets: [
    //     { label: 'Likely to be Adopted', data: [40, 50, 30, 20], backgroundColor: '#4BC0C0' },
    //     { label: 'Unlikely to be Adopted', data: [10, 15, 10, 20], backgroundColor: '#FF6384' }
    //   ]
    // },
    color: {
      labels: ['Black', 'White', 'Brown', 'Golden'],
      datasets: [
        { label: 'Likely to be Adopted', data: [30, 40, 25, 20], backgroundColor: colors },
        { label: 'Unlikely to be Adopted', data: [15, 10, 15, 10], backgroundColor: colors }
      ]
    },
    type: {
      labels: ["Rabbit", "Dog", "Cat", "Bird"],
      datasets: [
        { label: 'Likely to be Adopted', data: [20, 22, 24, 26], backgroundColor: colors },
        { label: 'Unlikely to be Adopted', data: [21, 23, 25, 27], backgroundColor: colors }
      ]
    },
    size: {
      labels: ['Small', 'Medium', 'Large'],
      datasets: [
        { label: 'Likely to be Adopted', data: [50, 70, 30], backgroundColor: colors },
        { label: 'Unlikely to be Adopted', data: [10, 15, 10], backgroundColor: colors }
      ]
    },
    // weight: {
    //   labels: ['0-5 kg', '5-10 kg', '10-15 kg', '15+ kg'],
    //   datasets: [
    //     { label: 'Likely to be Adopted', data: [40, 50, 20, 10], backgroundColor: '#4BC0C0' },
    //     { label: 'Unlikely to be Adopted', data: [10, 20, 10, 10], backgroundColor: '#FF6384' }
    //   ]
    // },
    vaccination: {
      labels: ['Vaccinated', 'Not Vaccinated'],
      datasets: [
        { label: 'Likely to be Adopted', data: [150, 30], backgroundColor: colors },
        { label: 'Unlikely to be Adopted', data: [30, 20], backgroundColor: colors }
      ]
    },
    // health: {
    //   labels: ['Healthy', 'Medical Condition'],
    //   datasets: [
    //     { label: 'Likely to be Adopted', data: [170, 20], backgroundColor: '#4BC0C0' },
    //     { label: 'Unlikely to be Adopted', data: [20, 10], backgroundColor: '#FF6384' }
    //   ]
    // },
    // timeInShelter: {
    //   labels: ['0-30 days', '30-60 days', '60-90 days', '90+ days'],
    //   datasets: [
    //     { label: 'Likely to be Adopted', data: [70, 60, 30, 20], backgroundColor: '#4BC0C0' },
    //     { label: 'Unlikely to be Adopted', data: [20, 20, 10, 10], backgroundColor: '#FF6384' }
    //   ]
    // }
  });
  const [distributionData, setDistributionData] = useState({
    labels: ['Likely', 'Unlikely'],
    datasets: [{ label: 'Adoption Likelihood Distribution', data: [180, 70], backgroundColor: ['#4BC0C0', '#FF6384'] }],
  })

  // Distribution Data
  // const distributionData = {
  //   labels: ['Likely', 'Unlikely'],
  //   datasets: [{ label: 'Adoption Likelihood Distribution', data: [180, 70], backgroundColor: ['#4BC0C0', '#FF6384'] }],
  // };

  // Feature-specific Data
  // const featureData = {
  //   breed: {
  //     labels: ['Labrador', 'Golden Retriever', 'Persian', 'Siamese', 'Poodle'],
  //     datasets: [
  //       { label: 'Likely to be Adopted', data: [30, 40, 10, 20, 15], backgroundColor: '#4BC0C0' },
  //       { label: 'Unlikely to be Adopted', data: [10, 15, 5, 10, 8], backgroundColor: '#FF6384' }
  //     ]
  //   },
  //   age: {
  //     labels: ['0-6 months', '6-12 months', '1-2 years', '2+ years'],
  //     datasets: [
  //       { label: 'Likely to be Adopted', data: [40, 50, 30, 20], backgroundColor: '#4BC0C0' },
  //       { label: 'Unlikely to be Adopted', data: [10, 15, 10, 20], backgroundColor: '#FF6384' }
  //     ]
  //   },
  //   color: {
  //     labels: ['Black', 'White', 'Brown', 'Golden'],
  //     datasets: [
  //       { label: 'Likely to be Adopted', data: [30, 40, 25, 20], backgroundColor: '#4BC0C0' },
  //       { label: 'Unlikely to be Adopted', data: [15, 10, 15, 10], backgroundColor: '#FF6384' }
  //     ]
  //   },
  //   size: {
  //     labels: ['Small', 'Medium', 'Large'],
  //     datasets: [
  //       { label: 'Likely to be Adopted', data: [50, 70, 30], backgroundColor: '#4BC0C0' },
  //       { label: 'Unlikely to be Adopted', data: [10, 15, 10], backgroundColor: '#FF6384' }
  //     ]
  //   },
  //   weight: {
  //     labels: ['0-5 kg', '5-10 kg', '10-15 kg', '15+ kg'],
  //     datasets: [
  //       { label: 'Likely to be Adopted', data: [40, 50, 20, 10], backgroundColor: '#4BC0C0' },
  //       { label: 'Unlikely to be Adopted', data: [10, 20, 10, 10], backgroundColor: '#FF6384' }
  //     ]
  //   },
  //   vaccination: {
  //     labels: ['Vaccinated', 'Not Vaccinated'],
  //     datasets: [
  //       { label: 'Likely to be Adopted', data: [150, 30], backgroundColor: '#4BC0C0' },
  //       { label: 'Unlikely to be Adopted', data: [30, 20], backgroundColor: '#FF6384' }
  //     ]
  //   },
  //   health: {
  //     labels: ['Healthy', 'Medical Condition'],
  //     datasets: [
  //       { label: 'Likely to be Adopted', data: [170, 20], backgroundColor: '#4BC0C0' },
  //       { label: 'Unlikely to be Adopted', data: [20, 10], backgroundColor: '#FF6384' }
  //     ]
  //   },
  //   timeInShelter: {
  //     labels: ['0-30 days', '30-60 days', '60-90 days', '90+ days'],
  //     datasets: [
  //       { label: 'Likely to be Adopted', data: [70, 60, 30, 20], backgroundColor: '#4BC0C0' },
  //       { label: 'Unlikely to be Adopted', data: [20, 20, 10, 10], backgroundColor: '#FF6384' }
  //     ]
  //   }
  // };
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setloading(true)
  //       const response = await axios.get('http://127.0.0.1:5008/api/admin/feature_data', {withCredentials: true});
  //       console.log('API Response:', response.data);
  //       const data = response.data.result;
  //       setFeatureData({
  //         labels: data.labels,
  //         datasets: [
  //           {
  //             label: 'Likely to be Adopted',
  //             data: data.data.filter((_, index) => index % 2 === 0),
  //             backgroundColor: '#4BC0C0',
  //           },
  //           {
  //             label: 'Unlikely to be Adopted',
  //             data: data.data.filter((_, index) => index % 2 !== 0),
  //             backgroundColor: '#FF6384',
  //           },
  //         ],
  //       });
  //     } catch (error) {
  //       console.error("Error fetching data: ", error);
  //     }
  //     finally{
  //       setloading(false)
  //     }
  //   };
  //   fetchData();
  // }, [selectedFeature]);
  useEffect(()=>{
    const fetchData = async () => {
      try {
        setloading(true)
        let response = await axios.get('http://127.0.0.1:5008/api/admin/distribution-data', {withCredentials: true});
        // console.log('API Response:', response.data);
        let data_val = response.data.data;
        setDistributionData({
          labels: ['Likely', 'Unlikely'],
          datasets: [{ label: 'Adoption Likelihood Distribution', data: [data_val[0], data_val[1]], backgroundColor: colors }],
        })
        response = await axios.get('http://127.0.0.1:5008/api/admin/feature_data', {withCredentials: true});
        // console.log('API Response:', response.data);
        data_val = response.data.result;
        let d = data_val.data
        setFeatureData(
          {
            breed: {
              labels: ['Labrador', 'Golden Retriever', 'Persian', 'Siamese', 'Poodle', "Parakeet", "Rabbit"],
              datasets: [
                { label: 'Likely to be Adopted', data: [d[0], d[2], d[4], d[6], d[8], d[10], d[12]], backgroundColor: colors },
                { label: 'Unlikely to be Adopted', data: [d[1], d[3], d[5], d[7], d[9], d[11], d[13]], backgroundColor: colors }
              ]
            },
            type: {
              labels: ["Rabbit", "Dog", "Bird", "Cat"],
              datasets: [
                { label: 'Likely to be Adopted', data: [d[20], d[22], d[24], d[26]], backgroundColor: colors },
                { label: 'Unlikely to be Adopted', data: [d[21], d[23], d[25], d[27]], backgroundColor: colors }
              ]
            },
            // age: {
            //   labels: ['0-6 months', '6-12 months', '1-2 years', '2+ years'],
            //   datasets: [
            //     { label: 'Likely to be Adopted', data: [40, 50, 30, 20], backgroundColor: '#4BC0C0' },
            //     { label: 'Unlikely to be Adopted', data: [10, 15, 10, 20], backgroundColor: '#FF6384' }
            //   ]
            // },
            color: {
              labels: ['Black', 'White', 'Brown', 'Orange', "Gray"],
              datasets: [
                { label: 'Likely to be Adopted', data: [d[28], d[30], d[32], d[34], d[36]], backgroundColor: colors },
                { label: 'Unlikely to be Adopted', data: [d[29], d[31], d[33], d[35], d[37]], backgroundColor: colors }
              ]
            },
            size: {
              labels: ['Small', 'Medium', 'Large'],
              datasets: [
                { label: 'Likely to be Adopted', data: [d[14], d[16], d[18]], backgroundColor: colors  },
                { label: 'Unlikely to be Adopted', data: [d[15], d[17], d[19]], backgroundColor: colors }
              ]
            },
            // weight: {
            //   labels: ['0-5 kg', '5-10 kg', '10-15 kg', '15+ kg'],
            //   datasets: [
            //     { label: 'Likely to be Adopted', data: [40, 50, 20, 10], backgroundColor: '#4BC0C0' },
            //     { label: 'Unlikely to be Adopted', data: [10, 20, 10, 10], backgroundColor: '#FF6384' }
            //   ]
            // },
            vaccination: {
              labels: ['Vaccinated', 'Not Vaccinated'],
              datasets: [
                { label: 'Likely to be Adopted', data: [d[38], d[39]], backgroundColor: colors },
                { label: 'Unlikely to be Adopted', data: [d[40], d[41]], backgroundColor: colors }
              ]
            },
            health: {
              labels: ['Healthy', 'Medical Condition'],
              datasets: [
                { label: 'Likely to be Adopted', data: [d[42], d[43]], backgroundColor: colors },
                { label: 'Unlikely to be Adopted', data: [d[44], d[45]], backgroundColor: colors }
              ]
            },
            previousOwner: {
              labels: ['Yes', 'No'],
              datasets: [
                { label: 'Likely to be Adopted', data: [d[46], d[47]], backgroundColor: colors},
                { label: 'Unlikely to be Adopted', data: [d[48], d[49]], backgroundColor: colors }
              ]
            },
            // timeInShelter: {
            //   labels: ['0-30 days', '30-60 days', '60-90 days', '90+ days'],
            //   datasets: [
            //     { label: 'Likely to be Adopted', data: [70, 60, 30, 20], backgroundColor: '#4BC0C0' },
            //     { label: 'Unlikely to be Adopted', data: [20, 20, 10, 10], backgroundColor: '#FF6384' }
            //   ]
            // }
          });
        //   const [distributionData, setDistributionData] = useState({
        //     labels: ['Likely', 'Unlikely'],
        //     datasets: [{ label: 'Adoption Likelihood Distribution', data: [180, 70], backgroundColor: ['#4BC0C0', '#FF6384'] }],
        //   }

        // )

      } catch (error) {
        console.error("Error fetching data: ", error);
      }
      finally{
        setloading(false)
      }
    };

    fetchData();
  }, [])

  const handleFeatureChange = (e) => {
    setSelectedFeature(e.target.value);
  };

  return (
    isAdmin ?
    <div style={{ padding: '20px' }}>
      <h2>Pet Adoption Analytics Dashboard</h2>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="feature-select" style={styles.label}>Select Feature: </label>
        <select id="feature-select" value={selectedFeature} onChange={handleFeatureChange} style={styles.select}>
          <option value="Distribution">Distribution of Adoption Likelihood</option>
          <option value="breed">Breed</option>
          <option value="type">Type</option>
          <option value="color">Color</option>
          <option value="size">Size</option>
          {/* <option value="weight">Weight</option> */}
          <option value="vaccination">Vaccination</option>
          <option value="health">Health</option>
          <option value="previousOwner">Previous Owner</option>
          {/* <option value="timeInShelter">Time in Shelter</option> */}
        </select>
      </div>
      {
        loading ? 'Data Loading':
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        {selectedFeature === 'Distribution' && (
          <div style={styles.chartContainer}>
            <h3>Distribution of Adoption Likelihood</h3>
            <Pie data={distributionData} options={{ plugins: { datalabels: { display: true } } }} />
          </div>
        )}
        {selectedFeature === 'breed' && (
          <div>
            <div style={styles.chartContainer}>
              <h3>Breed Distribution</h3>
              <Doughnut data={featureData.breed} options={{ plugins: { datalabels: { display: true } } }} />
            </div>
            <div style={{ ...styles.chartContainer, marginTop: '30px' }}>
              <h3>Breed vs Adoption Likelihood</h3>
              <Bar data={featureData.breed} options={{ plugins: { datalabels: { display: true } } }} />
            </div>
          </div>
        )}
        {selectedFeature === 'type' && (
          <div>
            <div style={styles.chartContainer}>
              <h3>Type Distribution</h3>
              <Doughnut data={featureData.type} options={{ plugins: { datalabels: { display: true } } }} />
            </div>
            <div style={{ ...styles.chartContainer, marginTop: '30px' }}>
              <h3>Type vs Adoption Likelihood</h3>
              <Bar data={featureData.type} options={{ plugins: { datalabels: { display: true } } }} />
            </div>
          </div>
        )}
        {selectedFeature === 'color' && (
          <div>
            <div style={styles.chartContainer}>
              <h3>Color Distribution</h3>
              <Doughnut data={featureData.color} options={{ plugins: { datalabels: { display: true } } }} />
            </div>
            <div style={{ ...styles.chartContainer, marginTop: '30px' }}>
              <h3>Color vs Adoption Likelihood</h3>
              <Bar data={featureData.color} options={{ plugins: { datalabels: { display: true } } }} />
            </div>
          </div>
        )}
        {selectedFeature === 'size' && (
          <div>
            <div style={styles.chartContainer}>
              <h3>Size Distribution</h3>
              <Doughnut data={featureData.size} options={{ plugins: { datalabels: { display: true } } }} />
            </div>
            <div style={{ ...styles.chartContainer, marginTop: '30px' }}>
              <h3>Size vs Adoption Likelihood</h3>
              <Bar data={featureData.size} options={{ plugins: { datalabels: { display: true } } }} />
            </div>
          </div>
        )}
        {/* {selectedFeature === 'weight' && (
          <div>
            <div style={styles.chartContainer}>
              <h3>Weight Distribution</h3>
              <Doughnut data={featureData.weight} options={{ plugins: { datalabels: { display: true } } }} />
            </div>
            <div style={{ ...styles.chartContainer, marginTop: '30px' }}>
              <h3>Weight vs Adoption Likelihood</h3>
              <Bar data={featureData.weight} options={{ plugins: { datalabels: { display: true } } }} />
            </div>
          </div>
        )} */}
        {selectedFeature === 'vaccination' && (
          <div>
            <div style={styles.chartContainer}>
              <h3>Vaccination Distribution</h3>
              <Doughnut data={featureData.vaccination} options={{ plugins: { datalabels: { display: true } } }} />
            </div>
            <div style={{ ...styles.chartContainer, marginTop: '30px' }}>
              <h3>Vaccination vs Adoption Likelihood</h3>
              <Bar data={featureData.vaccination} options={{ plugins: { datalabels: { display: true } } }} />
            </div>
          </div>
        )}
        {selectedFeature === 'health' && (
          <div>
            <div style={styles.chartContainer}>
              <h3>Health Distribution</h3>
              <Doughnut data={featureData.health} options={{ plugins: { datalabels: { display: true } } }} />
            </div>
            <div style={{ ...styles.chartContainer, marginTop: '30px' }}>
              <h3>Health vs Adoption Likelihood</h3>
              <Bar data={featureData.health} options={{ plugins: { datalabels: { display: true } } }} />
            </div>
          </div>
        )}
        {selectedFeature === 'previousOwner' && (
          <div>
            <div style={styles.chartContainer}>
              <h3>Previous Owner Distribution</h3>
              <Doughnut data={featureData.previousOwner} options={{ plugins: { datalabels: { display: true } } }} />
            </div>
            <div style={{ ...styles.chartContainer, marginTop: '30px' }}>
              <h3>Previous Owner vs Adoption Likelihood</h3>
              <Bar data={featureData.previousOwner} options={{ plugins: { datalabels: { display: true } } }} />
            </div>
          </div>
        )}
        {/* {selectedFeature === 'timeInShelter' && (
          <div>
            <div style={styles.chartContainer}>
              <h3>Time in Shelter Distribution</h3>
              <Doughnut data={featureData.timeInShelter} options={{ plugins: { datalabels: { display: true } } }} />
            </div>
            <div style={{ ...styles.chartContainer, marginTop: '30px' }}>
              <h3>Time in Shelter vs Adoption Likelihood</h3>
              <Bar data={featureData.timeInShelter} options={{ plugins: { datalabels: { display: true } } }} />
            </div>
          </div>
        )} */}
      </div>
      }

    </div>
    : "Not an admin user"
  );
};

const styles = {
  chartContainer: {
    width: '600px',
    height: '500px',
    marginBottom: '20px',
    padding: '50px'
  },
  label: {
    fontSize: '18px',
    marginRight: '10px'
  },
  select: {
    fontSize: '16px',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  }
};

export default Dashboard;
