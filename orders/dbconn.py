from redis_om import get_redis_connection


#DB Connection
redis = get_redis_connection(
    host = "redis-17296.c301.ap-south-1-1.ec2.cloud.redislabs.com",
    port = 17296,
    password = "NRUDTBtZmzyrNU2hjQP0JhcwFERxvJKW",
    decode_responses = True
)
