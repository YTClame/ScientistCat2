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

def createNewRaspElem(token, time1, time2, task, day):
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
            taskDict = {}
            taskDict["День"] = day
            taskDict["От"] = time1
            taskDict["До"] = time2
            taskDict["Занятие"] = task
            raspUser = user["Расписание"]
            raspUser.append(taskDict)
            collect.update_one(userFilter, {"$set": {"Расписание": raspUser}})
            return "OK"
    else:
        return "Error"

def removeRaspElem(token, time1, time2, task, day):
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
            userRaspList = user["Расписание"]
            index = -1
            for raspElem in userRaspList:
                if raspElem["День"] == day and raspElem["От"] == time1 and raspElem["До"] == time2 and raspElem["Занятие"] == task:
                    index = userRaspList.index(raspElem)
                    break
            if index == -1:
                return "Error"
            userRaspList.pop(index)
            collect.update_one(userFilter, {"$set": {"Расписание": userRaspList}})
            return "OK"
    else:
        return "Error"