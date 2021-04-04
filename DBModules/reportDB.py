import pymongo, hashlib
from pymongo import MongoClient

import loginModule

def sendReport(token, id, message): #str int str
    userSender = loginModule.getUserToToken(token)
    if userSender == "Error":
        return "Error"
    userBad = loginModule.getUserToID(id)
    if userBad == "Error":
        return "Error"
    rec = {}
    rec["Отправитель"] = userSender["ID"]
    rec["Обвиняемый"] = userBad["ID"]
    rec["Жалоба"] = message
    client = MongoClient()
    db = client['SC_Service']
    collect = db["Reports"]
    collect.insert_one(rec)
    return "OK"