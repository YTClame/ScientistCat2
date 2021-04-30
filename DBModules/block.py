import pymongo, hashlib, json
from pymongo import MongoClient

import loginModule

def blockUser(token, id):
    return WorkWithBlockingUser(token, id, True)

def unblockUser(token, id):
    return WorkWithBlockingUser(token, id, False)


def WorkWithBlockingUser(token, id, isBlockNow): #true - заблочить. false - разблочить
    if not loginModule.userIsAdmin(token):
        return "Error"
    user = loginModule.getUserToID(id)
    if user == "Error":
        return "Error"

    nameCollect = ''
    if(user["Роль"] == "Репетитор"):
        nameCollect = user["Город"] + "Teachers"
    if(user["Роль"] == "Ученик"):
        nameCollect = user["Город"] + "Students"

    if isBlockNow:
        user["Доступ"] = "Закрыт"
    else:
        user["Доступ"] = "Открыт"

    client = MongoClient()
    db = client['SC_Users']
    collect = db[nameCollect]

    fil = {"ID": int(id)}
    collect.update_one(fil, {"$set": {"Доступ": user["Доступ"]}})
    return "OK"