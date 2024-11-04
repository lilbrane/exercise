@echo off

cd backend
start cmd /k "python -m venv venv"

:: Activate the virtual environment
call .\venv\Scripts\activate

:: Install backend dependencies
pip install "fastapi[standard]"

:: Start the FastAPI server in a new command prompt
start cmd /k "fastapi dev main.py"

timeout /t 5

:: Navigate to the frontend directory
cd ../frontend


:: Start the frontend application in a new command prompt
start cmd /k "npm install && npm run start
"
