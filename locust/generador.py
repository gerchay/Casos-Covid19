import time
from locust import HttpUser, task
import json
import random

class QuickstartUser(HttpUser):
    @task
    def access_model(self):
        f = open("pruebacalificacion.json", "r")
        jsonlist = json.loads(f.read())
        index = random.randint(0, 184)
        data = jsonlist[index]
        self.client.post("/publish",json=data)

    # def on_start(self):
    #     self.client.get("/")
