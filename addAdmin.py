import pymongo, hashlib, sys
from pymongo import MongoClient

sys.path.append('./RoutingModules/')
sys.path.append('./ApiModules/')
sys.path.append('./DBModules/')

import checker

while True:
    inputLogin = input("Введите логин администратора: ")
    if checker.CheckLogin(inputLogin) == False:
        print("Логин недопустим или занят!")
        continue
    else:
        break
inputPassword = input("Введите пароль администратора: ")
passwordTemp = hashlib.md5(inputPassword.encode())
password = passwordTemp.hexdigest()

count = 0
while True:
    tokenSTR = inputLogin + password + str(count)
    hash_object = hashlib.md5(tokenSTR.encode())
    hex_dig = hash_object.hexdigest()
    client = MongoClient()
    db = client['SC_Service']
    collect = db['Tokens']
    findRes = collect.find_one({'Токен': hex_dig})
    if findRes != None:
        count += 1
        continue
    break
tokenAdmin = hex_dig

client = MongoClient()
dbLogin = client['SC_Service']
collectLogin = dbLogin["Logins"]
collectLogin.insert_one({"Логин": inputLogin, "Коллекция":"Admins"})

collect = dbLogin["Tokens"]
collect.insert_one({"Токен": tokenAdmin, "Роль":"Админ"})

dbLogin = client['SC_Users']
collect = dbLogin["Admins"]
collect.insert_one({"Токен": tokenAdmin, "Логин": inputLogin, "Пароль": password, "Роль": "Админ"})

print("Администратор добавлен успешно!")