from redis_om import HashModel
from dbconn import redis

class Orders(HashModel):
    product_id = str
    price = float
    fee = int
    total = float
    quantity = int
    status = str
    
    class Meta:
        database= redis