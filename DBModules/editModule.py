import pymongo, hashlib
from pymongo import MongoClient

def updateUser(user, newEmail, newPhone):
    if newEmail != user["Email"]:
        _updateEmailUser(user["Email"], newEmail)
        user["Email"] = newEmail
    if newPhone != user["Телефон"]:
        _updatePhoneUser(user["Телефон"], newPhone)
        user["Телефон"] = newPhone

    client = MongoClient()
    db = client['SC_Users']
    collectName = ""
    if user["Роль"] == "Репетитор":
        collectName = user["Город"] + "Teachers"
    if user["Роль"] == "Ученик":
        collectName = user["Город"] + "Students"
    collect = db[collectName]
    fil = {"ID": user["ID"]}
    if collect.count_documents(fil)>0:
        collect.delete_one(fil)
    collect.insert_one(user)

def migrateUserToCity(user, newCity):
    oldCity = user["Город"]
    newCollectName = ""
    if user["Роль"] == "Репетитор":
        newCollectName = newCity + "Teachers"
    if user["Роль"] == "Ученик":
        newCollectName = newCity + "Students"

    client = MongoClient()
    db = client['SC_Service']
    collect = db['Logins']

    fil = {"Логин": user["Логин"]}
    collect.update_one(fil, {"$set": {"Коллекция": newCollectName}})

    collect = db['Tokens']
    fil = {"ID": user["ID"]}
    collect.update_one(fil, {"$set": {"Город": newCity}})

    db = client['SC_Users']
    if user["Роль"] == "Репетитор":
        collect = db[oldCity + "Teachers"]
    if user["Роль"] == "Ученик":
        collect = db[oldCity + "Students"]
    collect.delete_one({"ID": user["ID"]})
    user["Город"] = newCity


def _updateEmailUser(oldEmail, newEmail):
    emailClient = MongoClient()
    dbEmail = emailClient['SC_Service']
    collectEmail = dbEmail["Emails"]
    fil = {"Email": oldEmail}
    collectEmail.update_one(fil, {"$set": {"Email": newEmail}})

def _updatePhoneUser(oldPhone, newPhone):
    phoneClient = MongoClient()
    dbPhone = phoneClient['SC_Service']
    collectPhone = dbPhone["Phones"]
    fil = {"Телефон": oldPhone}
    collectPhone.update_one(fil, {"$set": {"Телефон": newPhone}})