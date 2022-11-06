from functools import reduce
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.background import BackgroundTasks
from redis_om import get_redis_connection, HashModel, Field
from starlette.requests import Request
import requests, time
from collections import Counter
import sys
sys.path.append("..")
from utilities import send_mail
from datetime import datetime

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
    product_name:str =None
    price: float
    fee: float
    total: float
    quantity: int
    email:str = None
    month:str= str(datetime.now().strftime('%B'))
    status: str  # pending, completed, refunded

    class Meta:
        database = redis



#TODO change the way we are pulling the data.

def format2(pk: str):
    order = Order.get(pk)
    return { 'Product': order.product_name}

def format(pk: str):
    order = Order.get(pk)
    return { 'Profit': order.total, 'Date': order.month}
    
@app.get('/all_prods')
def all():
    dicts = [format2(pk) for pk in Order.all_pks()]
    c = Counter(player['Product'] for player in dicts).most_common(5)
    return dict(c)

@app.get('/all_orders')
def all():
    dicts = [format(pk) for pk in Order.all_pks()]
    months = {'January': 0, 'February':0, 'March':0, 'April':0, 'May':0, 'June':0, 'July':0,  'August':0, 'September':0, 'October':0, 'November':0, 'December':0}

    for i in dicts:
        if i['Date'] in months:
            months[i['Date']] += i['Profit']
    # print(months)
    return months
    
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
        product_name=body['name'],
        price=product['price'],
        fee=0.2 * product['price'],
        total=1.2 * product['price'],
        quantity=body['quantity'],
        status='pending',
        month= str(datetime.now().strftime('%B')),
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

