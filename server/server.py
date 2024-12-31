from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from train_and_predict import get_car_details, get_selected_data, get_filtered_cars

# Initialize the Flask app
app = Flask(__name__)
CORS(app)


@app.route("/car-details", methods=["GET"])
def get_car_details_route():
    # Get query parameters (car IDs, drive distance, and kilometers driven)
    car_ids = request.args.get("id", "").split(",")  # Default to an empty string if 'id' is not provided
    
    # Convert the list of string IDs to integers
    car_ids = [int(car_id) for car_id in car_ids]
    
    drive_distance = float(
        request.args.get("driveDistance", 50)
    )  # Default to 50 if not provided

    # Call the merged function to process the data
    result = get_car_details(car_ids, drive_distance)

    # Function to convert numpy types to native Python types
    def convert_to_serializable(value):
        if isinstance(value, (np.int64, np.float64)):
            return float(value) if isinstance(value, np.float64) else int(value)
        elif isinstance(value, dict):
            return {k: convert_to_serializable(v) for k, v in value.items()}
        elif isinstance(value, list):
            return [convert_to_serializable(v) for v in value]
        return value

    # Convert result to JSON serializable format
    serializable_result = [convert_to_serializable(car) for car in result]

    # Return the result as JSON
    return jsonify(serializable_result)


@app.route("/fetch-car-filters", methods=["GET"])
def fetch_selected_data_route():
    try:
        # Get the selected data from fetch_data.py
        data = get_selected_data()
        return jsonify({"data": data})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/cars", methods=["GET"])
def get_cars():
    # Extract query parameters
    query_params = request.args.to_dict()

    # Call utility function to get filtered cars based on query
    cars = get_filtered_cars(query_params)

    return jsonify(cars)


# Run the server
if __name__ == "__main__":
    app.run(port=5000)
