import requests
import uuid

task = {
    "bedrooms": 4,
    "bathrooms": 1.0,
    "sqft_living": 1680,
    "sqft_lot": 5043,
    "floors": 1.5,
    "sqft_above": 1680,
    "sqft_basement": 0,
    "zipcode": "98027",
    # "yr_built": 1911,
    # "waterfront": 0,
    # "view": 0,
    # "condition": 4,
    # "grade": 6,
    # "yr_renovated": 0,
    # "lat": 47.5,
    # "long": -122.273,
    # "sqft_living15": 1560,
    # "sqft_lot15": 5765,
}
payload = {
    "task": task,
    "request_id": str(uuid.uuid4()),
    "task_type": "house_price_prediction",
}
response = requests.post("http://127.0.0.1:5000/predict", json=payload)
price = response.json()["price"]
print(f"Price: {price}$")
