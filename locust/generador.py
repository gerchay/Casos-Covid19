import time
from locust import HttpUser, task
import json
import random

class QuickstartUser(HttpUser):
    @task
    def access_model(self):
        f = open("prueba.json", "r")
        jsonlist = json.loads(f.read())
        index = random.randint(0, 51)
        data = jsonlist[index]
        self.client.post("/publish/json",json=data)

    # def on_start(self):
    #     self.client.get("/")
