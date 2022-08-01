import requests, time
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from orders_models import Orders
from dbconn import redis
from starlette.requests import Request
from fastapi.background import BackgroundTasks

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ['http://localhost:3000/'],
    allow_methods = ["*"],
    allow_headers = ["*"]
)

@app.get('/order/{pk}')
def get(pk):
    return Orders.get(pk)
    
@app.post("/orders")
async def create(request: Request, bgt: BackgroundTasks):
    body = await request.json()
    
    req = requests.get("http://localhost:8000/product/%s" % body['id'])
    
    product = req.json()
    
    order = Orders(
        product_id = body['id'],
        price = product['price'],
        fee = int(product['price']) * 0.2,
        total = 1.2 * int(product['price']),
        quantity = body['quantity'],
        status = 'pending'
    ) 
    order.save()
    
    #background task
    bgt.add_task(order_completed, order)
    
    return order
    
def order_completed(order:Orders):
    
    time.sleep(10)
    order.status = "completed"
    order.save()
    
    redis.xadd("order_completed", order.dict(), "*")
    