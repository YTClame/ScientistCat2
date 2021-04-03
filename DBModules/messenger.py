import pymongo, json
from pymongo import MongoClient

import loginModule, time

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
        ###
        return "OK"
        #dbMes = client['SC_Messages']
        #ids = [userMain["ID"], id]
        #ids.sort()
        #collectName = str(ids[0]) + "and" + str(ids[1])
        #collect = dbMes[collectName]

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