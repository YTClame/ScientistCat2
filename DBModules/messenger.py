import pymongo, json, sys, os, datetime
from pymongo import MongoClient

sys.path.append('./ApiModules/')

import loginModule, time, cityNames

def send(token, id, message):#str int str
    user = loginModule.getUserToToken(token)
    if user == "Error":
        return "Error"
    idSender = user["ID"]
    client = MongoClient()
    dbMes = client['SC_Messages']
    ids = [idSender, id]
    ids.sort()
    collectName = str(ids[0]) + "and" + str(ids[1])
    collect = dbMes[collectName]

    city = {}
    cities = json.loads(cityNames.getCityNames())
    for cityTemp in cities:
        if cityTemp["Name"] == user["Город"]:
            city = cityTemp
            break

    date = datetime.datetime.today()
    delta = datetime.timedelta(hours=city["Hours"], minutes=city["Minutes"])
    resDate = date + delta
    
    sendDate = resDate.strftime("%d.%m.%Y")
    sendTime = resDate.strftime("%H:%M:%S")
    sender = user["ID"]
    
    messageRecord = {}
    messageRecord["Отправитель"] = sender
    messageRecord["Сообщение"] = message
    messageRecord["Дата"] = sendDate
    messageRecord["Время"] = sendTime
    
    collect.insert_one(messageRecord)
    return "OK"

def loadMessages(token, id):#str int
    user = loginModule.getUserToToken(token)
    if user == "Error":
        return "Error"
    idSender = user["ID"]
    user2 = loginModule.getUserToID(id)
    client = MongoClient()
    dbMes = client['SC_Messages']
    ids = [idSender, id]
    ids.sort()
    collectName = str(ids[0]) + "and" + str(ids[1])
    collect = dbMes[collectName]
    messages = list(collect.find({},{"_id":0}))
    result = {}
    result["Messages"] = messages
    result["MobileName"] = user2["Фамилия"] + " " + user2["Имя"][0] + "."
    return json.dumps(result, ensure_ascii=False).encode('utf8').decode()

def getMessagesSize(token, id):#str int
    user = loginModule.getUserToToken(token)
    if user == "Error":
        return "Error"
    idSender = user["ID"]
    client = MongoClient()
    dbMes = client['SC_Messages']
    ids = [idSender, id]
    ids.sort()
    collectName = str(ids[0]) + "and" + str(ids[1])
    collect = dbMes[collectName]
    messages = list(collect.find({},{"_id":0}))
    return str(len(messages))



def createNewContact(token, id): #str int
    userMain = loginModule.getUserToToken(token)
    userSecond = loginModule.getUserToID(id)

    if userMain == "Error" or userSecond == "Error":
        return "Error"

    userMainContacts = userMain["Контакты"]
    userSecondContacts = userSecond["Контакты"]

    if id in userMainContacts:
        return "OK"
    else:
        userMainContacts.append(id)
        userSecondContacts.append(userMain["ID"])
        ###
        client = MongoClient()
        dbUsers = client['SC_Users']
        collectName = ''

        if userMain["Роль"] == "Репетитор":
            collectName = userMain["Город"] + "Teachers"
        else:
            collectName = userMain["Город"] + "Students"
        collect = dbUsers[collectName]
        fil = {"Токен": token}
        collect.update_one(fil, {"$set": {"Контакты": userMainContacts}})
        ###
        if userSecond["Роль"] == "Ученик":
            collectName = userSecond["Город"] + "Students"
        else:
            collectName = userSecond["Город"] + "Teachers"
        collect = dbUsers[collectName]
        fil = {"ID": id}
        collect.update_one(fil, {"$set": {"Контакты": userSecondContacts}})
        return "OK"

def loadContacts(token):
    user = loginModule.getUserToToken(token)
    if user == "Error":
        return "Error"
    contacts = user["Контакты"]
    contactsList = []
    for id in contacts:
        contact = loginModule.getUserToID(id)
        contactSended = {}
        contactSended["Фамилия"] = contact["Фамилия"]
        contactSended["Имя"] = contact["Имя"]
        if (int(time.time()//1) - contact["Был в сети"]) < 150:
            contactSended["Статус"] = "Online"
        else:
            contactSended["Статус"] = "Offline"
        contactSended["ID"] = contact["ID"]
        contactSended["Фото"] = contact["Фото"]
        contactsList.append(contactSended)
    contactsList.reverse()
    return json.dumps(contactsList, ensure_ascii=False).encode('utf8').decode()