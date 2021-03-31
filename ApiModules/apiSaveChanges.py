import sys, os, hashlib
sys.path.append('./DBModules/')
from flask import (
    render_template,
    request,
    redirect,
)

import loginModule
import editModule
import checker

def saveTeacherChanges(r, saveFirstParam):
    photoGetted = 0
    try:
        variablePhoto = r.files['photo']
        photoGetted = 1
    except:
        pass
    
    user = loginModule.getUserToToken(r.form.get("token"))
    if user == "Error":
        return "Пользователь не найден"

    if(r.form.get("pass") != ""):
        if(checker.CheckPassword(r.form.get("pass")) == False):
            return "Указанный пароль недопустим"
        hash_object = hashlib.md5(r.form.get("pass").encode())
        user["Пароль"] = hash_object.hexdigest()

    if(checker.CheckAbout(r.form.get("about")) == False):
        return "Содержимое поле \"О себе\" недопустимо"
    user["О себе"] = r.form.get("about")

    if(checker.CheckSecondName(r.form.get("secondName")) == False):
        return "Содержимое поле \"Фамилия\" недопустимо"
    user["Фамилия"] = r.form.get("secondName")

    if(checker.CheckFirstName(r.form.get("firstName")) == False):
        return "Содержимое поле \"Имя\" недопустимо"
    user["Имя"] = r.form.get("firstName")

    if(checker.CheckBirthday(r.form.get("birth")) == False):
        return "Содержимое поле \"Дата рождения\" недопустимо"
    user["Дата рождения"] = r.form.get("birth")

    if(checker.CheckEducation(r.form.get("edu")) == False):
        return "Содержимое поле \"Образование\" недопустимо"
    user["Образование"] = r.form.get("edu")

    if(checker.CheckStash(r.form.get("stash")) == False):
        return "Содержимое поле \"Стаж\" недопустимо"
    user["Стаж"] = int(r.form.get("stash"))

    if(checker.CheckEmailForm(r.form.get("email")) == False):
        return "Содержимое поле \"Email\" недопустимо"

    if user["Email"] != r.form.get("email"):
        if checker.CheckEmail(r.form.get("email")) == False:
            return "Email адрес уже зарегистрирован другим пользователем"
            
    if(checker.CheckPhoneForm(r.form.get("phone")) == False):
        return "Содержимое поле \"Телефон\" недопустимо"

    if(r.form.get("phone") != user["Телефон"]):
        if checker.CheckPhone(r.form.get("phone")) == False:
            return "Номер телефона уже зарегистрирован другим пользователем"
            
    if(checker.CheckPrice(r.form.get("price")) == False):
        return "Содержимое поле \"Ставка\" недопустимо"
    user["Ставка"] = int(r.form.get("price"))

    formatLessons = []
    if r.form.get("stot") == '1':
        formatLessons.append('Ученик ко мне')
    if r.form.get("ttos") == '1':
        formatLessons.append('Я к ученику')
    if r.form.get("dist") == '1':
        formatLessons.append('Дистанционно')
    user["Формат занятий"] = formatLessons

    if r.form.get("sex") == 'm':
        user["Пол"] = "М"
    else:
        user["Пол"] = "Ж"

    viewLessons = []
    if r.form.get("solo") == '1':
        viewLessons.append('Разовые')
    if r.form.get("group") == '1':
        viewLessons.append('Групповые')
    if r.form.get("home") == '1':
        viewLessons.append('Помощь с домашней работой')
    if r.form.get("standart") == '1':
        viewLessons.append('Обычные')
    user["Вид занятий"] = viewLessons

    lessons = []
    if r.form.get("math") == '1':
        lessons.append('Математика')
    if r.form.get("rus") == '1':
        lessons.append('Русский язык')
    if r.form.get("phis") == '1':
        lessons.append('Физика')
    if r.form.get("inf") == '1':
        lessons.append('Информатика')
    if r.form.get("chem") == '1':
        lessons.append('Химия')
    if r.form.get("bio") == '1':
        lessons.append('Биология')
    if r.form.get("hist") == '1':
        lessons.append('История')
    if r.form.get("soc") == '1':
        lessons.append('Обществознание')
    if r.form.get("lit") == '1':
        lessons.append('Литература')
    if r.form.get("geo") == '1':
        lessons.append('География')
    if r.form.get("eco") == '1':
        lessons.append('Экономика')
    if r.form.get("eng") == '1':
        lessons.append('Английский язык')
    if r.form.get("nem") == '1':
        lessons.append('Немецкий язык')
    user["Преподаваемые предметы"] = lessons

    if photoGetted == 1:
        filename = str(user["ID"]) + "." + variablePhoto.filename.split('.')[len(variablePhoto.filename.split('.'))-1]
        if (variablePhoto.filename.split('.')[len(variablePhoto.filename.split('.'))-1] in ["jpg", "jpeg", "bmp", "png"]):
            variablePhoto.save(os.path.join(saveFirstParam, filename))
            user["Фото"] = "./static/profilesImages/" + filename
        else:
            return "Фотография может быть лишь в форматах .jpg .jpeg .bmp и .png"

    
    if(checker.CheckCity(r.form.get("city")) == False):
        return "Содержимое поле \"Город\" недопустимо"

    if (user["Город"] == r.form.get("city")):
        editModule.updateUser(user, r.form.get("email"), r.form.get("phone"))
    else:
        editModule.migrateUserToCity(user, r.form.get("city"))
        editModule.updateUser(user, r.form.get("email"), r.form.get("phone"))
    return "0"


def saveStudentChanges(r, saveFirstParam):
    photoGetted = 0
    try:
        variablePhoto = r.files['photo']
        photoGetted = 1
    except:
        pass
    
    user = loginModule.getUserToToken(r.form.get("token"))
    if user == "Error":
        return "Пользователь не найден"

    if(r.form.get("pass") != ""):
        if(checker.CheckPassword(r.form.get("pass")) == False):
            return "Указанный пароль недопустим"
        hash_object = hashlib.md5(r.form.get("pass").encode())
        user["Пароль"] = hash_object.hexdigest()

    if(checker.CheckAbout(r.form.get("about")) == False):
        return "Содержимое поле \"О себе\" недопустимо"
    user["О себе"] = r.form.get("about")

    if(checker.CheckSecondName(r.form.get("secondName")) == False):
        return "Содержимое поле \"Фамилия\" недопустимо"
    user["Фамилия"] = r.form.get("secondName")

    if(checker.CheckFirstName(r.form.get("firstName")) == False):
        return "Содержимое поле \"Имя\" недопустимо"
    user["Имя"] = r.form.get("firstName")

    if(checker.CheckBirthday(r.form.get("birth")) == False):
        return "Содержимое поле \"Дата рождения\" недопустимо"
    user["Дата рождения"] = r.form.get("birth")

    if(checker.CheckClass(r.form.get("class")) == False):
        return "Содержимое поле \"Класс\" недопустимо"
    user["Класс"] = int(r.form.get("class"))

    if(checker.CheckEmailForm(r.form.get("email")) == False):
        return "Содержимое поле \"Email\" недопустимо"

    if user["Email"] != r.form.get("email"):
        if checker.CheckEmail(r.form.get("email")) == False:
            return "Email адрес уже зарегистрирован другим пользователем"
            
    if(checker.CheckPhoneForm(r.form.get("phone")) == False):
        return "Содержимое поле \"Телефон\" недопустимо"

    if(r.form.get("phone") != user["Телефон"]):
        if checker.CheckPhone(r.form.get("phone")) == False:
            return "Номер телефона уже зарегистрирован другим пользователем"
            

    formatLessons = []
    if r.form.get("stot") == '1':
        formatLessons.append('Я к репетитору')
    if r.form.get("ttos") == '1':
        formatLessons.append('Репетитор ко мне')
    if r.form.get("dist") == '1':
        formatLessons.append('Дистанционно')
    user["Формат занятий"] = formatLessons

    if r.form.get("sex") == 'm':
        user["Пол"] = "М"
    else:
        user["Пол"] = "Ж"

    lessons = []
    if r.form.get("math") == '1':
        lessons.append('Математика')
    if r.form.get("rus") == '1':
        lessons.append('Русский язык')
    if r.form.get("phis") == '1':
        lessons.append('Физика')
    if r.form.get("inf") == '1':
        lessons.append('Информатика')
    if r.form.get("chem") == '1':
        lessons.append('Химия')
    if r.form.get("bio") == '1':
        lessons.append('Биология')
    if r.form.get("hist") == '1':
        lessons.append('История')
    if r.form.get("soc") == '1':
        lessons.append('Обществознание')
    if r.form.get("lit") == '1':
        lessons.append('Литература')
    if r.form.get("geo") == '1':
        lessons.append('География')
    if r.form.get("eco") == '1':
        lessons.append('Экономика')
    if r.form.get("eng") == '1':
        lessons.append('Английский язык')
    if r.form.get("nem") == '1':
        lessons.append('Немецкий язык')
    user["Изучаемые предметы"] = lessons

    if photoGetted == 1:
        filename = str(user["ID"]) + "." + variablePhoto.filename.split('.')[len(variablePhoto.filename.split('.'))-1]
        if (variablePhoto.filename.split('.')[len(variablePhoto.filename.split('.'))-1] in ["jpg", "jpeg", "bmp", "png"]):
            variablePhoto.save(os.path.join(saveFirstParam, filename))
            user["Фото"] = "./static/profilesImages/" + filename
        else:
            return "Фотография может быть лишь в форматах .jpg .jpeg .bmp и .png"

    
    if(checker.CheckCity(r.form.get("city")) == False):
        return "Содержимое поле \"Город\" недопустимо"

    if (user["Город"] == r.form.get("city")):
        editModule.updateUser(user, r.form.get("email"), r.form.get("phone"))
    else:
        editModule.migrateUserToCity(user, r.form.get("city"))
        editModule.updateUser(user, r.form.get("email"), r.form.get("phone"))
    return "0"