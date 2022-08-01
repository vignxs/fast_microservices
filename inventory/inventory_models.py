from redis_om import HashModel
from dbconn import redis

class Products(HashModel):
    name = str
    price = int
    quantity = int
    
    class Meta:
        database= redis