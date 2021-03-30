import sys
sys.path.append('./DBModules/')

import registration
import checker

from flask import (
    request,
)

def api_registerStudent(r):
    user = {}
    if(checker.CheckLogin(r.form.get("login")) == False):
        return "Указанный логин недопустим (или занят)"
    if(checker.CheckPhone(r.form.get("phone")) == False):
        return "Указанный номер телефона недопустим или занят"
    if(checker.CheckEmail(r.form.get("email")) == False):
        return "Указанный email недопустим или занят"

    if (checker.CheckCity(r.form.get("city")) == False):
        return "Указанный город недопустим!"
    user["Город"] = r.form.get("city")

    if (checker.CheckSecondName(r.form.get("secondName")) == False):
        return "Указанная фамилия недопустима!"
    user["Фамилия"] = r.form.get("secondName")

    if (checker.CheckFirstName(r.form.get("firstName")) == False):
        return "Указанное имя недопустимо!"
    user["Имя"] = r.form.get("firstName")

    if (checker.CheckBirthday(r.form.get("birth")) == False):
        return "Указанная дата рождения недопустима!"
    user["Дата рождения"] = r.form.get("birth")

    if (checker.CheckClass(r.form.get("class")) == False):
        return "Указанный класс недопустим!"
    user["Класс"] = int(r.form.get("class"))

    formatLessons = []
    if(r.form.get("stot") == "1"):
        formatLessons.append("Я к репетитору")
    if(r.form.get("ttos") == "1"):
        formatLessons.append("Репетитор ко мне")
    if(r.form.get("dist") == "1"):
        formatLessons.append("Дистанционно")
    user["Формат занятий"] = formatLessons

    if(r.form.get("sex") == "m"):
        user["Пол"] = "М"
    else:
        user["Пол"] = "Ж"
    

    if (checker.CheckPhoneForm(r.form.get("phone")) == False):
        return "Указанный номер телефона недопустим!"
    user["Телефон"] = r.form.get("phone")

    if (checker.CheckLoginForm(r.form.get("login")) == False):
        return "Указанный логин недопустим!"
    user["Логин"] = r.form.get("login")

    if (checker.CheckPassword(r.form.get("pass")) == False):
        return "Указанный пароль недопустим!"
    user["Пароль"] = r.form.get("pass")

    if (checker.CheckEmailForm(r.form.get("email")) == False):
        return "Указанный email недопустим!"
    user["Email"] = r.form.get("email")

    lessons=[]
    if(r.form.get("math") == "1"):
        lessons.append("Математика")
    if(r.form.get("rus") == "1"):
        lessons.append("Русский язык")
    if(r.form.get("phis") == "1"):
        lessons.append("Физика")
    if(r.form.get("inf") == "1"):
        lessons.append("Информатика")
    if(r.form.get("chem") == "1"):
        lessons.append("Химия")
    if(r.form.get("bio") == "1"):
        lessons.append("Биология")
    if(r.form.get("hist") == "1"):
        lessons.append("История")
    if(r.form.get("soc") == "1"):
        lessons.append("Обществознание")
    if(r.form.get("lit") == "1"):
        lessons.append("Литература")
    if(r.form.get("geo") == "1"):
        lessons.append("География")
    if(r.form.get("eco") == "1"):
        lessons.append("Экономика")
    if(r.form.get("eng") == "1"):
        lessons.append("Английский язык")
    if(r.form.get("nem") == "1"):
        lessons.append("Немецкий язык")
    user["Изучаемые предметы"] = lessons
    registration.AddStudentToDatabase(user)
    return "token: " + user["Токен"]

def api_registerTeacher(r):
    user = {}
    if(checker.CheckLogin(r.form.get("login")) == False):
        return "Bad Login"
    if(checker.CheckPhone(r.form.get("phone")) == False):
        return "Bad Phone"
    if(checker.CheckEmail(r.form.get("email")) == False):
        return "Bad Email"

    if (checker.CheckCity(r.form.get("city")) == False):
        return "Указанный город недопустим!"
    user["Город"] = r.form.get("city")

    if (checker.CheckSecondName(r.form.get("secondName")) == False):
        return "Указанная фамилия недопустима!"
    user["Фамилия"] = r.form.get("secondName")

    if (checker.CheckFirstName(r.form.get("firstName")) == False):
        return "Указанное имя недопустимо!"
    user["Имя"] = r.form.get("firstName")

    if (checker.CheckBirthday(r.form.get("birth")) == False):
        return "Указанная дата рождения недопустима!"
    user["Дата рождения"] = r.form.get("birth")

    formatLessons = []
    if(r.form.get("stot") == "1"):
        formatLessons.append("Ученик ко мне")
    if(r.form.get("ttos") == "1"):
        formatLessons.append("Я к ученику")
    if(r.form.get("dist") == "1"):
        formatLessons.append("Дистанционно")
    user["Формат занятий"] = formatLessons

    if (checker.CheckEducation(r.form.get("edu")) == False):
        return "Указанное образование недопустимо!"
    user["Образование"] = r.form.get("edu")

    if (checker.CheckStash(r.form.get("stash")) == False):
        return "Указанный стаж недопустим!"
    user["Стаж"] = int(r.form.get("stash"))

    if(r.form.get("sex") == "m"):
        user["Пол"] = "М"
    else:
        user["Пол"] = "Ж"
    
    if (checker.CheckPhoneForm(r.form.get("phone")) == False):
        return "Указанный номер телефона недопустим!"
    user["Телефон"] = r.form.get("phone")

    if (checker.CheckLoginForm(r.form.get("login")) == False):
        return "Указанный логин недопустим!"
    user["Логин"] = r.form.get("login")

    if (checker.CheckPassword(r.form.get("pass")) == False):
        return "Указанный пароль недопустим!"
    user["Пароль"] = r.form.get("pass")

    if (checker.CheckEmailForm(r.form.get("email")) == False):
        return "Указанный email недопустим!"
    user["Email"] = r.form.get("email")

    lessons=[]
    if(r.form.get("math") == "1"):
        lessons.append("Математика")
    if(r.form.get("rus") == "1"):
        lessons.append("Русский язык")
    if(r.form.get("phis") == "1"):
        lessons.append("Физика")
    if(r.form.get("inf") == "1"):
        lessons.append("Информатика")
    if(r.form.get("chem") == "1"):
        lessons.append("Химия")
    if(r.form.get("bio") == "1"):
        lessons.append("Биология")
    if(r.form.get("hist") == "1"):
        lessons.append("История")
    if(r.form.get("soc") == "1"):
        lessons.append("Обществознание")
    if(r.form.get("lit") == "1"):
        lessons.append("Литература")
    if(r.form.get("geo") == "1"):
        lessons.append("География")
    if(r.form.get("eco") == "1"):
        lessons.append("Экономика")
    if(r.form.get("eng") == "1"):
        lessons.append("Английский язык")
    if(r.form.get("nem") == "1"):
        lessons.append("Немецкий язык")
    user["Преподаваемые предметы"] = lessons

    if (checker.CheckEmailForm(r.form.get("price")) == False):
        return "Указанная ставка недопустима!"
    user["Ставка"] = int(r.form.get("price"))

    typeOfLessons=[]
    if(r.form.get("solo") == "1"):
        typeOfLessons.append("Разовые")
    if(r.form.get("group") == "1"):
        typeOfLessons.append("Групповые")
    if(r.form.get("home") == "1"):
        typeOfLessons.append("Помощь с домашней работой")
    if(r.form.get("standart") == "1"):
        typeOfLessons.append("Обычные")
    user["Вид занятий"] = typeOfLessons

    registration.AddTeacherToDatabase(user)
    return "token: " + user["Токен"]