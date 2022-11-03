from collections import Counter
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from redis_om import get_redis_connection, HashModel

app = FastAPI()

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



class Product(HashModel):
    name: str
    price: float
    quantity: int

    class Meta:
        database = redis

def format2(pk: str):
    order = Product.get(pk)
    return { 'Product': order.name, 'Count': order.quantity}
    
@app.get('/all_prods_count')
def all():
    dicts = [format2(pk) for pk in Product.all_pks()]
    prods = { x['Product']:0 for x in dicts}
    
    for i in dicts:
        if i['Product'] in prods:
            prods[i['Product']] += i['Count']
    return dict(Counter(prods).most_common(5))

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


@app.post('/products')
def create(product: Product):
    return product.save()


@app.get('/products/{pk}')
def get(pk: str):
    return Product.get(pk)


@app.delete('/products/{pk}')
def delete(pk: str):
    return Product.delete(pk)
