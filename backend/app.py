import json
import pickle
from typing import List
from typing import Tuple

import sys
import pandas

from flask import Flask, request, jsonify
from flask_cors import CORS


Test_PATH = "./data/future_unseen_examples.csv"
DEMOGRAPHICS_PATH = "data/zipcode_demographics.csv"
SALES_COLUMN_SELECTION = [
    "bedrooms",
    "bathrooms",
    "sqft_living",
    "sqft_lot",
    "floors",
    "sqft_above",
    "sqft_basement",
    "zipcode",
]

MODEL_DIR = "model/model.pkl"

app = Flask(__name__)
CORS(app)


def load_input(
    task: json, demographics_path: str, sales_column_selection: List[str]
) -> Tuple[pandas.DataFrame, pandas.Series]:
    """Load the target and feature data by merging sales and demographics.

    Args:
        sales_path: path to CSV file with home sale data
        demographics_path: path to CSV file with home sale data
        sales_column_selection: list of columns from sales data to be used as
            features

    Returns:
        Tuple containg with two elements: a DataFrame and a Series of the same
        length.  The DataFrame contains features for machine learning, the
        series contains the target variable (home sale price).

    """
    data = pandas.DataFrame([task], columns=sales_column_selection)
    data["zipcode"] = data["zipcode"].astype(str)
    demographics = pandas.read_csv(demographics_path, dtype={"zipcode": str})

    merged_data = data.merge(demographics, how="left", on="zipcode").drop(
        columns="zipcode"
    )
    # Remove the target variable from the dataframe, features will remain
    x = merged_data
    return x


@app.route("/predict", methods=["POST"])
def model_inference():
    try:
        task = request.json.get("task", {})
        print(f"Received prediction request: {task}")

        model_input = load_input(task, DEMOGRAPHICS_PATH, SALES_COLUMN_SELECTION)
        with open(MODEL_DIR, "rb") as file:
            model = pickle.load(file)
        output = model.predict(model_input)

        print(f"Prediction result: {output[0]}")
        return {"price": float(output[0])}  # Convert to float for JSON serialization

    except Exception as e:
        print(f"Error in prediction: {str(e)}")
        return jsonify({"error": str(e)}), 500


@app.route("/", methods=["POST", "GET"])
def check_status():
    res = {"Status": "Running"}
    return jsonify(res)


if __name__ == "__main__":
    port = 5000
    if len(sys.argv) > 1:
        port = int(sys.argv[1])

    app.run(host="0.0.0.0", debug=False, port=port)
