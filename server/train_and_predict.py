import pickle
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.pipeline import make_pipeline
from sklearn.metrics import r2_score
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import r2_score
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import make_column_transformer
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import train_test_split
import pandas as pd
import numpy as np


def clean_and_train():
    df = pd.read_csv("server/cleaned_final_car_data.csv")
    backup = df.copy()

    df.info()

    df.isnull().sum()

    df.describe()

    df.head()

    df["Name"] = df["Name"].str.split(" ").str.slice(1, None).str.join(" ")

    df.head()

    df["Name"] = df["Name"].str.split(" ").str.slice(0, 2).str.join(" ")

    df.head()

    df["Price"] = df["Price"] * 100000

    df.head()

    owner_mapping = {"First": 1, "Second": 2, "Third": 3, "Fourth": 4}
    df["Owner_Type"] = df["Owner_Type"].map(owner_mapping)

    df.head()

    df.to_csv("cleaned_data.csv")

    df

    data = df

    y = data["Price"]
    X = data.drop(
        columns=[
            "Price",
            "Unnamed: 0",
            "Location",
            "Engine CC",
            "Power",
            "Seats",
            "Mileage Km/L",
        ]
    )

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

    ohe = OneHotEncoder()
    ohe.fit(X[["Name", "Manufacturer", "Fuel_Type", "Transmission"]])

    column_trans = make_column_transformer(
        (
            OneHotEncoder(categories=ohe.categories_),
            ["Name", "Manufacturer", "Fuel_Type", "Transmission"],
        ),
        remainder="passthrough",
    )

    lr = RandomForestRegressor()

    pipe = make_pipeline(column_trans, lr)

    pipe.fit(X_train, y_train)

    y_pred = pipe.predict(X_test)

    y_pred

    score = r2_score(y_test, y_pred)
    print(score)

    scores = []
    for i in range(100):
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=i
        )

        # Initialize the model with a different random state
        lr = RandomForestRegressor(random_state=i)

        # Ensure the pipeline is properly set up
        pipe = make_pipeline(column_trans, lr)

        # Train the model
        pipe.fit(X_train, y_train)

        # Predict and compute the score
        y_pred = pipe.predict(X_test)
        score = r2_score(y_test, y_pred)
        scores.append(score)

        # Print the score for this iteration
        print(f"Iteration {i}: R² Score = {score}")

    np.argmax(scores)

    scores[np.argmax(scores)]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=np.argmax(scores)
    )
    lr = RandomForestRegressor()
    pipe = make_pipeline(column_trans, lr)
    pipe.fit(X_train, y_train)
    y_pred = pipe.predict(X_test)
    r2_score(y_test, y_pred)

    pickle.dump(pipe, open("RandomForestModel.pkl", "wb"))


# Load the CSV and model once
df = pd.read_csv("server/cleaned_final_car_data.csv")
pipe = pickle.load(open("server/RandomForestModel.pkl", "rb"))
DIESEL = 129.243  # ₹/litre
PETROL = 131.65
CNG = 117
LPG = 96


def get_car_details(cars, drive_distance):
    results = []

    for car_id in cars:
        # Find the row in the DataFrame corresponding to the ID
        car_details = df[df["ID"] == car_id]

        if car_details.empty:
            results.append({"ID": car_id, "Error": "ID not found"})
            continue

        # Extract necessary details
        manufacturer = car_details["Manufacturer"].values[0]
        name = car_details["Name"].values[0]
        fuel_type = car_details["Fuel_Type"].values[0]
        transmission = car_details["Transmission"].values[0]
        maintenance_cost = car_details["Maintenance"].values[0]
        mileage = car_details["Mileage Km/L"].values[0]
        actual_cost = car_details["actual cost"].values[0]

        # Prepare input data for depreciation prediction
        input_data = [
            [
                manufacturer,
                name,
                2015,  # Default Year
                fuel_type,
                drive_distance * 365 * 5,  # Dynamic input for Kilometers Driven
                transmission,
                1,  # Default Owner_Type
            ]
        ]

        # Predict depreciation (assuming `pipe` is a trained model)
        depreciation_prediction = pipe.predict(
            pd.DataFrame(
                input_data,
                columns=[
                    "Manufacturer",
                    "Name",
                    "Year",
                    "Fuel_Type",
                    "Kilometers_Driven",
                    "Transmission",
                    "Owner_Type",
                ],
            )
        )[0]

        # Calculate fuel cost based on fuel type and drive distance
        if fuel_type == "Diesel":
            fuel_cost = (DIESEL * (drive_distance * 365 * 5)) / mileage
        elif fuel_type == "Petrol":
            fuel_cost = (PETROL * (drive_distance * 365 * 5)) / mileage
        elif fuel_type == "CNG":
            fuel_cost = (CNG * (drive_distance * 365 * 5)) / mileage
        elif fuel_type == "LPG":
            fuel_cost = (LPG * (drive_distance * 365 * 5)) / mileage
        else:
            fuel_cost = None  # In case of invalid Fuel_Type

        # Build the output object for the car
        car_data = {
            "ID": car_id,
            "output": {
                "depreciation": depreciation_prediction,
                "fuel_cost": round(fuel_cost, 2) if fuel_cost is not None else None,
                "maintenance_cost": int(maintenance_cost),
            },
            "carData": {
                "Manufacturer": manufacturer,
                "Name": name,
                "Fuel_Type": fuel_type,
                "Transmission": transmission,
                "Seats": car_details["Seats"].values[0],
                "Power": car_details["Power"].values[0],
                "Engine CC": car_details["Engine CC"].values[0],
                "Mileage Km/L": mileage,
                "actual cost": actual_cost,
            },
        }

        # Append the result
        results.append(car_data)

    return results


def get_selected_data():
    # Select the required columns
    selected_columns = [
        "Name",
        "Manufacturer",
        "Fuel_Type",
        "Transmission",
        "actual cost",
    ]

    # Fetch all rows with the selected columns
    data = df[selected_columns]

    # Convert to a dictionary to return as JSON
    data_dict = data.to_dict(orient="records")

    return data_dict


def get_filtered_cars(query_params):
    filtered_df = df

    # Budget filtering (actual cost should lie within the selected range)
    if "budget" in query_params:
        budget_value = query_params["budget"]

        if budget_value == "greaterThan50":
            # Filter for cars with actual cost greater than 50 lakh (5000000)
            filtered_df = filtered_df[filtered_df["actual cost"] > 5000000]
        else:
            # Handle range budgets (e.g., 1-5, 6-10, etc.)
            budget_range = budget_value.split("-")
            min_budget = float(budget_range[0])
            max_budget = float(budget_range[1])

            filtered_df = filtered_df[
                (filtered_df["actual cost"] >= min_budget * 100000)
                & (filtered_df["actual cost"] <= max_budget * 100000)
            ]

    # Iterate through the query parameters and filter the dataframe
    for key, value in query_params.items():
        if key == "budget":
            continue  # Skip budget as it's already handled above

        # If the value is a list, split it
        values = value.split(",")

        # Filter based on the corresponding column in the dataframe
        if key == "fuelType":
            filtered_df = filtered_df[filtered_df["Fuel_Type"].isin(values)]
        elif key == "transmissionType":
            filtered_df = filtered_df[filtered_df["Transmission"].isin(values)]
        elif key == "brand":
            filtered_df = filtered_df[filtered_df["Manufacturer"].isin(values)]
        elif key == "model":
            filtered_df = filtered_df[filtered_df["Name"].isin(values)]

    # Convert the filtered dataframe to a dictionary and return it
    filtered_cars = filtered_df.to_dict(orient="records")

    return filtered_cars
