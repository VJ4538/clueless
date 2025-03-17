FROM python:3.9-slim

#Set the working directory in container
WORKDIR /app

#Copy the requirements file into container
COPY requirements.txt .

#Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

#Copy the current directory contents into container
COPY . .

#port 8000 for networking
EXPOSE 8000

#Run  FastAPI server
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]