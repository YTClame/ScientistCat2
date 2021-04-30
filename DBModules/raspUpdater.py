import pymongo, hashlib, json
from pymongo import MongoClient

import loginModule

def updateRaspElem(token, day, time1old, time1, time2old, time2, taskOld, task):
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
            rasp = user["Расписание"]
            raspCurrentElem = {}
            for raspElem in rasp:
                if raspElem["День"] == day and raspElem["От"] == time1old and raspElem["До"] == time2old and raspElem["Занятие"] == taskOld:
                    raspCurrentElem = raspElem
                    break
            
            index = rasp.index(raspCurrentElem) 
            rasp[index]["От"] = time1
            rasp[index]["До"] = time2
            rasp[index]["Занятие"] = task
            collect.update_one(userFilter, {"$set": {"Расписание": rasp}})
            return "OK"
        else:
            return "Error"
    else:
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
        return "Error"
    else:
        return "Error"