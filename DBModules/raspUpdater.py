import pymongo, hashlib, json
from pymongo import MongoClient

import loginModule

def updateRaspElem(token, day, hourIndex):
    client = MongoClient()
    db = client['SC_Service']
    collect = db["Tokens"]
    doc = {'Токен': token}
    if(collect.count_documents(doc)==1):
        userTokenInfo = collect.find_one(doc)

        if(userTokenInfo["Роль"] == "Репетитор"):
            nameCollect = userTokenInfo["Город"] + "Teachers"
        if(userTokenInfo["Роль"] == "Ученик"):
            nameCollect = userTokenInfo["Город"] + "Students"

        db = client["SC_Users"]
        collect = db[nameCollect]

        userFilter = {"Токен":token}
        if(collect.count_documents(userFilter)==1):
            user = collect.find_one(userFilter)
            if user["Расписание"][day][hourIndex] == "Свободен":
                user["Расписание"][day][hourIndex] = "Занят"
            elif user["Расписание"][day][hourIndex] == "Занят":
                user["Расписание"][day][hourIndex] = "Свободен"
            collect.update_one(userFilter, {"$set":{"Расписание":user["Расписание"]}})
            return json.dumps(user["Расписание"], ensure_ascii=False).encode('utf8').decode()
        else:
            return "Error"
    return "Error"