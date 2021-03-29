import pymongo, hashlib
from pymongo import MongoClient

def getTokenToLoginAndPassword(login, password):
    client = MongoClient()
    db = client['SC_Service']
    usersLogins = db["Logins"]
    doc = {'Логин': str(login)}
    if(usersLogins.count_documents(doc)==1):
        userLogin = usersLogins.find_one(doc)
        nameCollect = userLogin["Коллекция"]

        db = client["SC_Users"]
        collect = db[nameCollect]

        hash_object = hashlib.md5(password.encode())
        password = hash_object.hexdigest()

        userFilter = {"Логин":login, "Пароль":password}
        if(collect.count_documents(userFilter)==1):
            user = collect.find_one(userFilter)
            return user["Токен"]
        else:
            return "Error"
    return "Error"

def getUserToToken(token):
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
            return user
        else:
            return "Error"
    return "Error"