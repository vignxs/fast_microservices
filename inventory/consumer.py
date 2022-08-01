from itertools import product
import time
from dbconn import redis
from inventory_models import Products

key = "order_completed"
group = "invenry_group"

try:
    redis.xgroup_create(key, group)
except:
    print("group already exists")
    
while True:
    try:
        result = redis.xreadgroup(group , key, {key: ">"}, None)
        print(result)
        if result !=  []:
            for res in result:
                obj = res[1][0][1]
                product = Products.get(obj['product_id'])
                print(product)
                product.quantity = int(product.quantity) - int(obj["quantity"])
                product.save()
    except Exception as e :
        print(str(e))
    
    time.sleep(1)