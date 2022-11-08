from main import redis, Product
import time
import sys
sys.path.append("..")
from utilities import send_mail

key = 'order_completed'
group = 'inventory-group'

try:
    redis.xgroup_create(key, group)
except Exception as e :
    print(e)
    print('Group already exists!')

while True:
        results = redis.xreadgroup(group, key, {key: '>'}, None)

        if results != []:
            print('Event Triggered')
            for result in results:
                obj = result[1][0][1]
                try:
                    product = Product.get(obj['product_id'])
                    print(product.quantity)
                    print(type(product.quantity))
                    if product.quantity <= 0 or product.quantity < int(obj['quantity'])  :
                        raise ValueError
                    product.quantity = int(product.quantity) - int(obj['quantity'])   
                    print(product.quantity)
                    
                    if product.quantity < 0:
                        raise ValueError
                    print(product.quantity)
                    product.save()
                except Exception as e:
                    send_mail.mail(obj['email'], refund=True)
                    print('Refund Event Triggered')
                    redis.xadd('refund_order', obj, '*')

  