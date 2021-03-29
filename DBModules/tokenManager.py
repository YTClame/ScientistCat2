import pymongo, hashlib
from pymongo import MongoClient
def getNewToken(user):
    count = 0
    while True:
        tokenSTR = user['Логин'] + user['Пароль'] + str(user['ID']) + user['Дата рождения'] + str(count)
        hash_object = hashlib.md5(tokenSTR.encode())
        hex_dig = hash_object.hexdigest()
        client = MongoClient()
        db = client['SC_Service']
        collect = db['Tokens']
        findRes = collect.find_one({'Токен': hex_dig})
        if findRes != None:
            count += 1
            continue
        TokenInfo = {}
        TokenInfo['Токен'] = hex_dig
        TokenInfo['ID'] = user['ID']
        TokenInfo['Роль'] = user['Роль']
        TokenInfo['Город'] = user['Город']
        collect.insert_one(TokenInfo)
        return hex_dig