## Pet Adoption Platform
This repository contains the code for a comprehensive Pet Adoption Platform designed to streamline the adoption process
by matching pets with potential adopters using a machine-learning model. Users can browse pets, view details and see adoption likelihood, while shelters can manage listings and connect with adopters. The platform also supports community engagement through events and donations.

We can design a web application with both staff and admin interfaces to create an interface for pet adoption platform with the mentioned features. 
## Features

- **Adoption Likelihood Prediction Model:**
  Utilizes a Random Forest machine learning model to predict the likelihood of a pet being adopted based on features like weight, breed, health, etc.

- **Separate Access for Admin and Normal Users:**
  Distinct access levels for administrative functions and regular user activities.

- **Reports and Analytics:**
  - Generates visualizations (charts) to analyze the relationship between various features and adoption likelihood for admin access.
  - Offers insights into trends, management, and potential issues within the adoption process.

- **Pet Management:**
  Admins can add, update, and delete pet listings.

- **Shelter Management:**
  Admins can add and update shelter information.

- **Adoption Process:**
  - Monitors the adoption process through a personality questionnaire to assess user compatibility.
  - Schedules appointments with adoption centers based on user responses.

- **Events and Donations:**
  - Enables users to register for and participate in events and campaigns organized by shelters.
  - Provides functionality for users to donate to shelters and adoption centers.

- **User-Friendly Interface:**
  Allows users to browse pets and view details, including adoption likelihood.

- **Community Engagement Features:**
  Supports community involvement through events and donation options.



## Technologies used

- Used machine learning models for data analysis and adoption prediction, user-friendly adoption process, and  user personality tests.
- Implement backend using Python with frameworks like Flask.
- Frontend: ReactJS, ChartJS (UI not emphasized in this repository)


## Installation

1.Clone the repository:

```bash
  git clone https://github.com/MonilMehta/LOC-CheckIn-HotelManagement

```

2.Install dependencies:

```bash
cd core
Pip install -r requirements.txt
```
    
## Usage
1.run the server

```bash
cd Backend
python manage.py runserver
```

2.navigate to frontend directory and install dependencies


```bash
cd Frontend
npm install
```

3.start the development server

```bash
npm run dev
```


## Contributing

Contributions are always welcome!😊
. If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## Acknowledgements

- The need for efficient adoption management systems in the hospitality industry inspired this project.
- Special acknowledgment to the developers of the libraries and frameworks used in this project.
