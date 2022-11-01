from xmlrpc.client import _datetime_type
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.background import BackgroundTasks
from redis_om import get_redis_connection, HashModel
from starlette.requests import Request
import requests, time
import sys
sys.path.append("..")
from utilities import send_mail
from typing import Optional
from datetime import datetime
from datetime import date

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    allow_methods=['*'],
    allow_headers=['*']
)

# This should be a different database
redis = get_redis_connection(
    host = "redis-12507.c305.ap-south-1-1.ec2.cloud.redislabs.com",
    port = 12507,
    password = "3BWvoODitSgRGylEa0ctRixV66JkuZFt",
    decode_responses = True
)


class Order(HashModel):
    product_id: str
    price: float
    fee: float
    total: float
    quantity: int
    email:str
    created_timestamp:str= str(datetime.now().date())
    status: str  # pending, completed, refunded

    class Meta:
        database = redis

@app.get('/all_orders')
def all():
    return [format(pk) for pk in Order.all_pks()]

@app.get('/orders/{pk}')
def get(pk: str):
    return Order.get(pk)


@app.post('/orders')
async def create(request: Request, background_tasks: BackgroundTasks):  # id, quantity
    body = await request.json()
    print(body)
    req = requests.get('http://localhost:8000/products/%s' % body['id'])
    product = req.json()

    order = Order(
        product_id=body['id'],
        price=product['price'],
        fee=0.2 * product['price'],
        total=1.2 * product['price'],
        quantity=body['quantity'],
        status='pending',
        email = body['email']
    )
    order.save()

    background_tasks.add_task(order_completed, order)

    return order


def order_completed(order: Order):
    time.sleep(5)
    order.status = 'completed'
    order.save()
    send_mail.mail(order.email)
    redis.xadd('order_completed', order.dict(), '*')
