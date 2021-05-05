import pymongo, hashlib, json
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

            resultObj = {}
            resultObj["Токен"] = user["Токен"]
            if nameCollect == "Admins":
                resultObj["Роль"] = "Админ"
            elif user["Роль"] == "Ученик":
                resultObj["Роль"] = "Ученик"
            elif user["Роль"] == "Репетитор":
                resultObj["Роль"] = "Репетитор"
            return json.dumps(resultObj, ensure_ascii=False).encode('utf8').decode()
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
        if(userTokenInfo["Роль"] == "Админ"):
            nameCollect = "Admins"

        db = client["SC_Users"]
        collect = db[nameCollect]

        userFilter = {"Токен":token}
        if(collect.count_documents(userFilter)==1):
            user = collect.find_one(userFilter)
            return user
        else:
            return "Error"
    return "Error"

def getUserToID(id):
    client = MongoClient()
    db = client['SC_Service']
    collect = db["Tokens"]
    doc = {'ID': int(id)}
    if(collect.count_documents(doc)==1):
        userIdInfo = collect.find_one(doc)

        if(userIdInfo["Роль"] == "Репетитор"):
            nameCollect = userIdInfo["Город"] + "Teachers"
        if(userIdInfo["Роль"] == "Ученик"):
            nameCollect = userIdInfo["Город"] + "Students"

        db = client["SC_Users"]
        collect = db[nameCollect]

        userFilter = {"ID":int(id)}
        if(collect.count_documents(userFilter)==1):
            user = collect.find_one(userFilter)
            return user
        else:
            return "Error"
    return "Error"

def userIsAdmin(token):
    client = MongoClient()
    db = client['SC_Users']
    collect = db["Admins"]
    doc = {'Токен': token}
    if(collect.count_documents(doc)==1):
        return True
    return False

def getAdminToLogin(login):
    client = MongoClient()
    db = client['SC_Users']
    collect = db["Admins"]
    doc = {'Логин': login}
    if(collect.count_documents(doc)==1):
        return collect.find_one(doc)
    return "Error"