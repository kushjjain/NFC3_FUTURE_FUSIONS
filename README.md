## Pet Adoption Platform
This repository contains the code for a comprehensive Pet Adoption Platform designed to streamline the adoption process
by matching pets with potential adopters using a machine-learning model. Users can browse pets, view details and see adoption likelihood, while shelters can manage listings and connect with adopters. The platform also supports community engagement through events and donations.

We can design a web application with both staff and admin interfaces to create an interface for pet adoption platform with the mentioned features. 
## Features

- Adoption Likelihood Prediction Model:

Utilizes machine learning model Random Forest to predict the percentage of the likelihood of a particular pet to be adopted based on features like weight, breed, health etc.

- Adoption Process:

Monitors the adoption process by accessing the user's personality via a personality questionnaire and schedules an appointment with an adoption center.

- Events and donations:

Users can register and participate in events and campaigns organized by the centers. Users can also donate to shelters and adoption centers.
- Report and Analytics:

Generates charts for different features and the relation between feature and adoption likelihood for the admin access.
Provides insights into trends, management, and identified issues.



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
