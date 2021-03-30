import pymongo
from pymongo import MongoClient

def CheckAbout(about):
    return True

def CheckSecondName(secondName):
    return True

def CheckFirstName(firstName):
    return True

def CheckBirthday(birthday):
    return True

def CheckEducation(education):
    return True

#INT?
def CheckStash(stash):
    return True

def CheckEmailForm(email):
    return True

def CheckPhoneForm(email):
    return True

def CheckLoginForm(login):
    return True

#INT?
def CheckPrice(price):
    return True

def CheckCity(cityName):
    return True

#INT?
def CheckClass(classNumber):
    return True

def CheckPassword(password):
    return True

def CheckEmail(email):
    if CheckEmailForm(email) == False:
        return False
    client = MongoClient()
    db = client['SC_Service']
    emailCol = db["Emails"]
    filterEmail = {"Email": email}
    if(emailCol.count_documents(filterEmail)>=1):
        return False
    else:
        return True

def CheckPhone(phone):
    if CheckPhoneForm(phone) == False:
        return False
    client = MongoClient()
    db = client['SC_Service']
    phoneCol = db["Phones"]
    filterPhone = {"Телефон": phone}
    if(phoneCol.count_documents(filterPhone)>=1):
        return False
    else:
        return True

def CheckLogin(login):
    if CheckLoginForm(login) == False:
        return False
    client = MongoClient()
    db = client['SC_Service']
    loginCol = db["Logins"]
    filterLogin = {"Логин": login}
    if(loginCol.count_documents(filterLogin)>=1):
        return False
    else:
        return True