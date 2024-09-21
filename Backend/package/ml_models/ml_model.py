# import pickle
# import numpy as np
import joblib
import pandas as pd
import os
# rf_model = joblib.load()
main_path = os.path.join(os.path.dirname(__file__))
def predict_pet_adoption(input_data):
    # Load the saved model
    model = joblib.load(os.path.join(main_path, "rf_model.pkl"))
    
    # Assuming input_data is a dictionary with keys matching your features
    # Example input_data: {"PetType": "Rabbit", "Color": "White", "Breed": "Labrador", "Size": "Small", ...}
    
    # Encode the input data similarly to how the training data was encoded
    label_encoder_pet_type = joblib.load(os.path.join(main_path, "label_encoder_pet_type.pkl"))
    label_encoder_color = joblib.load(os.path.join(main_path, "label_encoder_color.pkl"))
    input_data['PetType'] = label_encoder_pet_type.transform([input_data['PetType']])[0]
    input_data['Color'] = label_encoder_color.transform([input_data['Color']])[0]
    
    # One-hot encoding for Size
    size_columns = ['Size_Small', 'Size_Medium', 'Size_Large']  # Adjust based on your data
    size_data = pd.get_dummies([input_data['Size']], columns=['Size'], dtype=int)
    size_data = size_data.reindex(columns=size_columns, fill_value=0).iloc[0]  # Ensure columns are aligned
    
    # Target encoding for Breed
    breed_target_mean = joblib.load(os.path.join(main_path, "breed_target_mean.pkl"))
    input_data['Breed'] = breed_target_mean.get(input_data['Breed'], 0.5)  # Default value if breed not found
    
    cols =['PetType', 'Breed', 'AgeMonths', 'Color', 'WeightKg',
       'Vaccinated', 'HealthCondition', 'TimeInShelterDays', 'AdoptionFee',
       'PreviousOwner',  'Size_Large', 'Size_Medium',"Size_Small"]

    # Combine all features into a single array for prediction
    features = [
        input_data['PetType'],
        input_data['Breed'],
        input_data['AgeMonths'],
        input_data['Color'],
        input_data['WeightKg'],

        input_data['Vaccinated'],
        input_data['HealthCondition'],
        input_data['TimeInShelterDays'],
        input_data['AdoptionFee'],
        input_data['PreviousOwner'],
        
        size_data['Size_Large'],
        size_data['Size_Medium'],
        size_data['Size_Small'],

    ]
    
    # features_array = np.array([features])  # Convert to 2D array
    
    # Make prediction using the loaded model
    prediction = model.predict_proba(pd.DataFrame([features], columns=cols))
    
    return prediction[0][1]  # Return the prediction

input_data = {
    "PetType": "Rabbit",
    "Color": "White",
    "Breed": "Labrador",
    "Size": "Small",
    "AgeMonths": 12,
    "WeightKg": 5.5,
    "Vaccinated": 1,
    "HealthCondition": 0,
    "TimeInShelterDays": 30,
    "AdoptionFee": 100,
    "PreviousOwner": 1
}

predicted_likelihood = predict_pet_adoption(input_data)
# print(f"Predicted Adoption Likelihood: {predicted_likelihood}")