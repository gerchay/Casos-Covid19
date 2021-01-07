import json
import random

f = open("prueba.json", "r")
jsonlist = json.loads(f.read())
index = random.randint(0, 51)
print(jsonlist[index])