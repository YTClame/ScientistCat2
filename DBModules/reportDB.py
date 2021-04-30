import pymongo, hashlib
from pymongo import MongoClient

import loginModule, idManager

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
    rec["ID"] = idManager.getNewReportId()
    client = MongoClient()
    db = client['SC_Service']
    collect = db["Reports"]
    collect.insert_one(rec)
    return "OK"

def getReports():
    client = MongoClient()
    db = client['SC_Service']
    col = db["Reports"]
    reports = col.find({}, {"_id":0})
    res = []
    for report in reports:
        res.append(dict(report))
    return res

def deleteReport(id):
    client = MongoClient()
    db = client['SC_Service']
    col = db["Reports"]
    col.delete_one({"ID": int(id)})
    return "OK"