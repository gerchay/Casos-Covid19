import redis
import json

def hello_world():
    pool = redis.ConnectionPool(host="35.238.130.224", port=6379\
    ,password="redissopes1",db=0,decode_responses=True)

    r = redis.Redis(connection_pool=pool)

    val = r.get("a")
    lista = r.lrange("listaCasos", 0, -1)
    lista2 = ['2', '1']
    jsonlist = json.dumps(lista)
    print(jsonlist)
    print(val)

    # headers = {
    #     'Access-Control-Allow-Origin': '*'
    # }

    # return (jsonlist, 200, headers)

hello_world()