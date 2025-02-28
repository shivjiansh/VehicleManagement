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

```bash
git clone https://github.com/your-username/issue-tracking.git
cd issue-tracking

### Step 2: Set up a Virtual Environment
Create a virtual environment to manage your dependencies.
 
 ```bash 
 python3 -m venv venv
```
Step 3: Install Dependencies
Install the required Python dependencies using pip.

bash
Copy
pip install -r requirements.txt
If requirements.txt does not exist, you can install the dependencies manually, including Django, djangorestframework, axios, and others.

bash
Copy
pip install Django djangorestframework
Step 4: Set up the Database
Create and apply database migrations.

bash
Copy
python manage.py migrate
To create a superuser for the admin panel, run the following command:

bash
Copy
python manage.py createsuperuser
Follow the instructions to create an admin user.

Step 5: Start the Development Server
Run the Django development server:

bash
Copy
python manage.py runserver
The application will be running at http://127.0.0.1:8000/.

Step 6: Frontend (React)
Go to the frontend folder (if you have one) and install dependencies.
bash
Copy
cd frontend
npm install
Start the React development server.
bash
Copy
npm start
This will start the React app on http://localhost:3000.

API Endpoints
GET /api/vehicles/
Fetch a list of all vehicles in the system.

GET /api/components/
Fetch a list of all components available.

POST /api/issues/
Create a new issue with selected vehicle, components, and labor cost.

Request Body Example:
json
Copy
{
  "vehicle": 1,
  "components": [1, 2],
  "labor_cost": "500",
  "use_new_components": true
}
GET /payment/{issue_id}/
Redirects to the payment page for the specific issue.

Database Management
Flush the Database
To remove all data from the database (while keeping the schema intact), run:

bash
Copy
python manage.py flush
Reset the Database (Optional)
To drop the database and recreate tables, you can manually delete the SQLite database file (or drop the tables if using PostgreSQL or MySQL), then run:

bash
Copy
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
Contributing