import json
from fastapi import BackgroundTasks, Body, Depends, FastAPI, Form, Request, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, conint
from pyparsing import Optional
from redis_om import get_redis_connection, HashModel
import os
from  PIL import Image
import secrets
from fastapi.staticfiles import StaticFiles

app = FastAPI()
os. getcwd()
app.mount('/static', StaticFiles(directory="static"), name='static')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    allow_methods=['*'],
    allow_headers=['*']
)

redis = get_redis_connection(
    host = "redis-12507.c305.ap-south-1-1.ec2.cloud.redislabs.com",
    port = 12507,
    password = "3BWvoODitSgRGylEa0ctRixV66JkuZFt",
    decode_responses = True
)


class Productimage(BaseModel):
    name: str
    price: int
    quantity: int

class Product(HashModel):
    name: str
    price: float
    quantity: int
    img_url:str=None

    class Meta:
        database = redis


def format2(pk: str):
    order = Product.get(pk)
    return { 'Product': order.name, 'Count' : order.quantity}


@app.get('/all_prods_count')
def all():
    dicts = [format2(pk) for pk in Product.all_pks()]
    print(dicts)
    prods = {x['Product']:0 for x in dicts}

    for i in dicts:
        if i['Product'] in prods:
            prods[i['Product']] += i['Count']
    # print(months)
    return prods

@app.get('/products')
def all():
    return [format(pk) for pk in Product.all_pks()]


def format(pk: str):
    product = Product.get(pk)

    return {
        'id': product.pk,
        'name': product.name,
        'price': product.price,
        'quantity': product.quantity
    }
    
    

#name : Productimage =  Form(...) , file : UploadFile = File(...)) :
@app.post('/products') #name: str = Body(...), price: int = Body(...), quantity: int =Body(...),
async def create( name: str = Body(...), price: int = Body(...), quantity: int =Body(...), file: UploadFile = File(...)):
    print(file)
    path = "./static/images"
    print(file.content_type)
    file_ext = file.filename.split(".")[1]
    
    token = secrets.token_hex(10)
    generated_name = path + token + "." + file_ext 
    print(generated_name)
    
    file_content = await file.read()
    
    with open(generated_name , "wb") as file:
        file.write(file_content)
    
    img = Image.open(generated_name)
    img = img.resize(size=(200,200))
    img.save(generated_name)
    img_url = generated_name
    file.close()
    product = Product( name=name, price=price, quantity=quantity, img_url=img_url )
    product.save()


@app.get('/products/{pk}')
def get(pk: str):
    return Product.get(pk)


@app.delete('/products/{pk}')
def delete(pk: str):
    return Product.delete(pk)
