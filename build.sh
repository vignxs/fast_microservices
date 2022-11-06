#!/bin/bash
. ../fast/bin/activate
echo "Venv activated"

# pip install  -r requirements.txt
echo "All the dependancies have been installed"

echo "Starting services..."
cd inventory
uvicorn main:app --reload --port 8000 > ../app_logs/uvicorn.log &
python consumer.py > ../app_logs/event.log &

cd ../payment
uvicorn main:app --reload --port 8001 > ../app_logs/uvicorn.log &
python consumer.py  > ../app_logs/event.log &

echo "Starting Application..."
cd ../inventory-frontend

# npm i > ../app_logs/npmstart.log &

npm start > ../app_logs/npmstart.log &

echo "Build Completed Sucesssfully."
