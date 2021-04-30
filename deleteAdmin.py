import pymongo, hashlib, sys
from pymongo import MongoClient

sys.path.append('./RoutingModules/')
sys.path.append('./ApiModules/')
sys.path.append('./DBModules/')

import checker, loginModule

while True:
    inputLogin = input("Введите логин администратора: ")
    admin = loginModule.getAdminToLogin(inputLogin)
    if admin == "Error":
        print("Логин администратора не найден!")
        continue
    else:
        break

tokenAdmin = admin['Токен']

client = MongoClient()
dbLogin = client['SC_Service']
collectLogin = dbLogin["Logins"]
collectLogin.delete_one({"Логин": inputLogin, "Коллекция":"Admins"})

collect = dbLogin["Tokens"]
collect.delete_one({"Токен": tokenAdmin, "Роль":"Админ"})

dbLogin = client['SC_Users']
collect = dbLogin["Admins"]
collect.delete_one({"Токен": tokenAdmin, "Логин": inputLogin, "Роль": "Админ"})

print("Администратор " + inputLogin + " успешно удалён!")