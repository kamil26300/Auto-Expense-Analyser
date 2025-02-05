# Use the official Python image
FROM python:3.10

# Set the working directory
WORKDIR /app

# Copy all the files to the container
COPY . /app

# Install pip and dependencies from requirements.txt
RUN apt-get update && apt-get install -y python3-pip
RUN pip3 install --no-cache-dir -r requirements.txt

# Expose the port
EXPOSE 8000

# Command to run the app
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:8000", "server:app"]