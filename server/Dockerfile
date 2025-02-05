# Use official Python image
FROM python:3.10

# Set working directory
WORKDIR /app

# Copy all files to the container
COPY . /app

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port your app runs on
EXPOSE 8000

# Command to run Gunicorn server
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:8000", "server:app"]
