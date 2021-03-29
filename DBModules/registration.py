import idManager, hashlib, tokenManager
import pymongo
from pymongo import MongoClient

def AddStudentToDatabase(student):
    student["ID"] = idManager.getNewId()
    student["Роль"] = "Ученик"

    hash_object = hashlib.md5(student["Пароль"].encode())
    student["Пароль"] = hash_object.hexdigest()

    student["Токен"] = tokenManager.getNewToken(student)
    student["Фото"] = "./static/img/avatar.jpg"
    student["Доступ"] = "Открыт"
    student["О себе"] = ""

    rasp = {}
    day = []
    for i in range(15):
        day.append("Свободен")
    rasp["Пн"] = day
    rasp["Вт"] = day
    rasp["Ср"] = day
    rasp["Чт"] = day
    rasp["Пт"] = day
    rasp["Сб"] = day
    rasp["Вс"] = day
    student["Расписание"] = rasp

    loginClient = MongoClient()
    dbLogin = loginClient['SC_Service']
    collectLogin = dbLogin["Logins"]
    collectLogin.insert_one({"Логин": student["Логин"], "Коллекция":str(student["Город"])+"Students"})

    client = MongoClient()
    db = client['SC_Users']
    collect = db[str(student["Город"])+"Students"]
    collect.insert_one(student)

def AddTeacherToDatabase(teacher):
    teacher["ID"] = idManager.getNewId()
    teacher["Роль"] = "Репетитор"

    hash_object = hashlib.md5(teacher["Пароль"].encode())
    teacher["Пароль"] = hash_object.hexdigest()

    teacher["Токен"] = tokenManager.getNewToken(teacher)
    teacher["Фото"] = "./static/img/avatar.jpg"
    teacher["Доступ"] = "Открыт"
    teacher["О себе"] = ""

    rasp = {}
    day = []
    for i in range(15):
        day.append("Свободен")
    rasp["Пн"] = day
    rasp["Вт"] = day
    rasp["Ср"] = day
    rasp["Чт"] = day
    rasp["Пт"] = day
    rasp["Сб"] = day
    rasp["Вс"] = day
    teacher["Расписание"] = rasp

    loginClient = MongoClient()
    dbLogin = loginClient['SC_Service']
    collectLogin = dbLogin["Logins"]
    collectLogin.insert_one({"Логин": teacher["Логин"], "Коллекция":str(teacher["Город"])+"Teachers"})

    phoneClient = MongoClient()
    dbPhone = phoneClient['SC_Service']
    collectPhone = dbPhone["Phones"]
    collectPhone.insert_one({"Телефон": teacher["Телефон"]})

    emailClient = MongoClient()
    dbEmail = emailClient['SC_Service']
    collectEmail = dbEmail["Emails"]
    collectEmail.insert_one({"Email": teacher["Email"]})

    client = MongoClient()
    db = client['SC_Users']
    collect = db[str(teacher["Город"])+"Teachers"]
    collect.insert_one(teacher)

def CheckLogin(login):
    client = MongoClient()
    db = client['SC_Service']
    loginCol = db["Logins"]
    filterLogin = {"Логин": login}
    if(loginCol.count_documents(filterLogin)>=1):
        return False
    else:
        return True

def CheckPhone(phone):
    client = MongoClient()
    db = client['SC_Service']
    phoneCol = db["Phones"]
    filterPhone = {"Телефон": phone}
    if(phoneCol.count_documents(filterPhone)>=1):
        return False
    else:
        return True

def CheckEmail(email):
    client = MongoClient()
    db = client['SC_Service']
    emailCol = db["Emails"]
    filterEmail = {"Email": email}
    if(emailCol.count_documents(filterEmail)>=1):
        return False
    else:
        return True