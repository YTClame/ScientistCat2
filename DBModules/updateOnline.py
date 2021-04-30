import pymongo, hashlib
from pymongo import MongoClient

import loginModule, time

def updateOnlineFunc(token):
    user = loginModule.getUserToToken(token)
    if user == "Error":
        return "Error"
    client = MongoClient()
    db = client['SC_Users']
    collectName = ''
    if user["Роль"] == "Репетитор":
        collectName = user["Город"] + "Teachers"
    else:
        collectName = user["Город"] + "Students"
    collect = db[collectName]
    fil = {"Токен": token}
    collect.update_one(fil, {"$set": {"Был в сети": int(time.time()//1)}})
    return "OK"