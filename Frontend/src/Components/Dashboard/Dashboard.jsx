import React, { useState } from 'react';
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, RadialLinearScale } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

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

const Dashboard = () => {
  const [selectedFeature, setSelectedFeature] = useState('Distribution');

  // Distribution Data
  const distributionData = {
    labels: ['Likely', 'Unlikely'],
    datasets: [{ label: 'Adoption Likelihood Distribution', data: [180, 70], backgroundColor: ['#4BC0C0', '#FF6384'] }],
  };

  // Feature-specific Data
  const featureData = {
    breed: {
      labels: ['Labrador', 'Golden Retriever', 'Persian', 'Siamese', 'Poodle'],
      datasets: [
        { label: 'Likely to be Adopted', data: [30, 40, 10, 20, 15], backgroundColor: '#4BC0C0' },
        { label: 'Unlikely to be Adopted', data: [10, 15, 5, 10, 8], backgroundColor: '#FF6384' }
      ]
    },
    age: {
      labels: ['0-6 months', '6-12 months', '1-2 years', '2+ years'],
      datasets: [
        { label: 'Likely to be Adopted', data: [40, 50, 30, 20], backgroundColor: '#4BC0C0' },
        { label: 'Unlikely to be Adopted', data: [10, 15, 10, 20], backgroundColor: '#FF6384' }
      ]
    },
    color: {
      labels: ['Black', 'White', 'Brown', 'Golden'],
      datasets: [
        { label: 'Likely to be Adopted', data: [30, 40, 25, 20], backgroundColor: '#4BC0C0' },
        { label: 'Unlikely to be Adopted', data: [15, 10, 15, 10], backgroundColor: '#FF6384' }
      ]
    },
    size: {
      labels: ['Small', 'Medium', 'Large'],
      datasets: [
        { label: 'Likely to be Adopted', data: [50, 70, 30], backgroundColor: '#4BC0C0' },
        { label: 'Unlikely to be Adopted', data: [10, 15, 10], backgroundColor: '#FF6384' }
      ]
    },
    weight: {
      labels: ['0-5 kg', '5-10 kg', '10-15 kg', '15+ kg'],
      datasets: [
        { label: 'Likely to be Adopted', data: [40, 50, 20, 10], backgroundColor: '#4BC0C0' },
        { label: 'Unlikely to be Adopted', data: [10, 20, 10, 10], backgroundColor: '#FF6384' }
      ]
    },
    vaccination: {
      labels: ['Vaccinated', 'Not Vaccinated'],
      datasets: [
        { label: 'Likely to be Adopted', data: [150, 30], backgroundColor: '#4BC0C0' },
        { label: 'Unlikely to be Adopted', data: [30, 20], backgroundColor: '#FF6384' }
      ]
    },
    health: {
      labels: ['Healthy', 'Medical Condition'],
      datasets: [
        { label: 'Likely to be Adopted', data: [170, 20], backgroundColor: '#4BC0C0' },
        { label: 'Unlikely to be Adopted', data: [20, 10], backgroundColor: '#FF6384' }
      ]
    },
    timeInShelter: {
      labels: ['0-30 days', '30-60 days', '60-90 days', '90+ days'],
      datasets: [
        { label: 'Likely to be Adopted', data: [70, 60, 30, 20], backgroundColor: '#4BC0C0' },
        { label: 'Unlikely to be Adopted', data: [20, 20, 10, 10], backgroundColor: '#FF6384' }
      ]
    }
  };

  const handleFeatureChange = (e) => {
    setSelectedFeature(e.target.value);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Pet Adoption Analytics Dashboard</h2>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="feature-select" style={styles.label}>Select Feature: </label>
        <select id="feature-select" value={selectedFeature} onChange={handleFeatureChange} style={styles.select}>
          <option value="Distribution">Distribution of Adoption Likelihood</option>
          <option value="breed">Breed</option>
          <option value="age">Age</option>
          <option value="color">Color</option>
          <option value="size">Size</option>
          <option value="weight">Weight</option>
          <option value="vaccination">Vaccination</option>
          <option value="health">Health</option>
          <option value="timeInShelter">Time in Shelter</option>
        </select>
      </div>
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
        {selectedFeature === 'age' && (
          <div>
            <div style={styles.chartContainer}>
              <h3>Age Distribution</h3>
              <Doughnut data={featureData.age} options={{ plugins: { datalabels: { display: true } } }} />
            </div>
            <div style={{ ...styles.chartContainer, marginTop: '30px' }}>
              <h3>Age vs Adoption Likelihood</h3>
              <Bar data={featureData.age} options={{ plugins: { datalabels: { display: true } } }} />
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
        {selectedFeature === 'weight' && (
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
        )}
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
        {selectedFeature === 'timeInShelter' && (
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
        )}
      </div>
    </div>
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
