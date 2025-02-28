# Django Issue Tracking Application

This is a Django-based application for creating and managing issues related to vehicle components. It allows users to report issues, track their status, and make payments for the services rendered. The application supports features such as managing vehicles, components, and tracking costs associated with each issue.

## Features
- **Vehicle Management**: Select and associate vehicles with issues.
- **Component Management**: Choose multiple components for an issue (with the ability to mark components as new or old).
- **Labor Cost Tracking**: Enter and store labor cost for each issue.
- **Payment Integration**: Redirect to a payment page after an issue is created.

## Technologies Used
- Python 3.x
- Django
- SQLite/PostgreSQL (depending on your setup)
- Axios (for API requests)
- React (for frontend UI)
- Material UI (for UI components)

## Installation

Follow these steps to get the application running locally on your machine.

### Step 1: Clone the Repository

Clone the repository to your local machine.

```
git clone https://github.com/your-username/issue-tracking.git
cd issue-tracking
```
### Step 2: Set up a Virtual Environment
Create a virtual environment to manage your dependencies.
 ``` 
 python3 -m venv venv
```
### Step 3: Install Dependencies
Install the required Python dependencies using pip.

```
pip install -r requirements.txt
```
If requirements.txt does not exist, you can install the dependencies manually, including Django, djangorestframework, axios, and others.

```

pip install Django djangorestframework
```
### Step 4: Set up the Database
Create and apply database migrations.

```
python manage.py migrate
```
To create a superuser for the admin panel, run the following command:
```
python manage.py createsuperuser
```
Follow the instructions to create an admin user.

### Step 5: Start the Development Server
Run the Django development server:
```
python manage.py runserver
The application will be running at http://127.0.0.1:8000/.
```
### Step 6: Frontend (React)
Go to the frontend folder (if you have one) and install dependencies.
```

cd frontend
npm install
Start the React development server.

npm start
```
This will start the React app on http://localhost:3000.


## Screen shots
![vehicle add](https://github.com/user-attachments/assets/a58579cc-fbfa-4be6-9c0f-1deeb9d6079f)
![revenue](https://github.com/user-attachments/assets/7cb431b6-c484-4804-ae29-f767284cf798)
![make payment](https://github.com/user-attachments/assets/fa2de325-3964-4d5d-8c0c-215797c6aee3)
![issue created](https://github.com/user-attachments/assets/f904ef97-2056-4c40-b835-2330bc54826c)
![dashboard](https://github.com/user-attachments/assets/b31c3b50-e9b8-4830-9e54-df1c952e3895)
![componen added](https://github.com/user-attachments/assets/e47c3527-3376-4a3b-9c49-db376f448ee7)


## Video Recording
https://www.loom.com/share/50a8a7a9172748649dd4cd0df20a7671?sid=6d428eeb-9c24-49e8-be7a-80cca01382a8

## API Endpoints
GET /api/vehicles/
Fetch a list of all vehicles in the system.

GET /api/components/
Fetch a list of all components available.

POST /api/issues/
Create a new issue with selected vehicle, components, and labor cost.

Request Body Example:
```
json
{
  "vehicle": 1,
  "components": [1, 2],
  "labor_cost": "500",
  "use_new_components": true
}
```
GET /payment/{issue_id}/
Redirects to the payment page for the specific issue.

###  Database Management
Flush the Database
To remove all data from the database (while keeping the schema intact), run:
```
python manage.py flush
Reset the Database (Optional)
```
To drop the database and recreate tables, you can manually delete the SQLite database file, then run:
```
python manage.py migrate
Code Overview
Django App Structure
models.py: Contains the models for vehicles, components, and issues.
views.py: Contains the logic for handling API requests related to vehicles, components, and issues.
serializers.py: Converts data to and from JSON format for the API.
urls.py: Defines the URL patterns for the Django application.
React Frontend
App.js: Contains the main React components for the application.
components/IssueForm.js: The form where users can create issues.
components/VehicleSelect.js: The component for selecting a vehicle.
components/ComponentSelect.js: The component for selecting components.
```
