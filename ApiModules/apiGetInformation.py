import sys, json
sys.path.append('./DBModules/')
import loginModule

def getInformationAboutTeacherToToken(token):
    user = loginModule.getUserToToken(token)
    if(user == "Error"):
        return "Error"
    user.pop("_id")
    user.pop("Логин")
    user.pop("Пароль")
    user.pop("ID")
    user.pop("Роль")
    user.pop("Токен")
    return json.dumps(user, ensure_ascii=False).encode('utf8').decode()

def getInformationAboutStudentToToken(token):
    user = loginModule.getUserToToken(token)
    if(user == "Error"):
        return "Error"
    user.pop("_id")
    user.pop("Логин")
    user.pop("Пароль")
    user.pop("ID")
    user.pop("Роль")
    user.pop("Токен")
    return json.dumps(user, ensure_ascii=False).encode('utf8').decode()

def getInformationAboutTeacherToId(id):
    user = loginModule.getUserToID(id)
    if(user == "Error"):
        return "Error"
    user.pop("_id")
    user.pop("Логин")
    user.pop("Пароль")
    user.pop("ID")
    user.pop("Роль")
    user.pop("Токен")
    return json.dumps(user, ensure_ascii=False).encode('utf8').decode()

def getInformationAboutStudentToId(id):
    user = loginModule.getUserToID(id)
    if(user == "Error"):
        return "Error"
    user.pop("_id")
    user.pop("Логин")
    user.pop("Пароль")
    user.pop("ID")
    user.pop("Роль")
    user.pop("Токен")
    return json.dumps(user, ensure_ascii=False).encode('utf8').decode()

def getRaspToId(id):
    user = loginModule.getUserToID(id)
    return json.dumps(user["Расписание"], ensure_ascii=False).encode('utf8').decode()
