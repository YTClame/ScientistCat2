import pymongo
from pymongo import MongoClient

def _getCityToToken(token):
    client = MongoClient()
    db = client['SC_Service']
    tokens = db["Tokens"]
    fil = {'Токен': token}
    rec = tokens.find_one(fil)
    return rec["Город"]

def foundStudentToFilter(fil, token):
    client = MongoClient()
    db = client['SC_Users']
    city = _getCityToToken(token)
    usersCol = db[city + "Students"]
    users = usersCol.find(fil, {"_id":0, "Логин":0, "Пароль":0, "Роль":0, "Токен":0})
    res = []
    for user in users:
        res.append(dict(user))
    return res

def foundTeacherToFilter(fil, token):
    client = MongoClient()
    db = client['SC_Users']
    city = _getCityToToken(token)
    usersCol = db[city + "Teachers"]
    users = usersCol.find(fil, {"_id":0, "Логин":0, "Пароль":0, "Роль":0, "Токен":0})
    res = []
    for user in users:
        res.append(dict(user))
    return res
