# Use a lightweight Python image
FROM python:3.11-slim

# Set working directory in container
WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the code
COPY . .

# Expose port Flask runs on
EXPOSE 5000

# Run Flask
CMD ["python", "app.py"]
