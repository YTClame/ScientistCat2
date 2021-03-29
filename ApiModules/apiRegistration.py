import sys
sys.path.append('./DBModules/')

import registration

from flask import (
    request,
)

def api_registerStudent(r):
    user = {}
    if(registration.CheckLogin(r.form.get("login")) == False):
        return "Bad Login"
    if(registration.CheckPhone(r.form.get("phone")) == False):
        return "Bad Phone"
    if(registration.CheckEmail(r.form.get("email")) == False):
        return "Bad Email"

    user["Город"] = r.form.get("city")
    user["Фамилия"] = r.form.get("secondName")
    user["Имя"] = r.form.get("firstName")
    user["Дата рождения"] = r.form.get("birth")
    user["Класс"] = r.form.get("class")

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
    
    user["Телефон"] = r.form.get("phone")
    user["Логин"] = r.form.get("login")
    user["Пароль"] = r.form.get("pass")
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
    return user["Токен"]

def api_registerTeacher(r):
    user = {}
    if(registration.CheckLogin(r.form.get("login")) == False):
        return "Bad Login"
    if(registration.CheckPhone(r.form.get("phone")) == False):
        return "Bad Phone"
    if(registration.CheckEmail(r.form.get("email")) == False):
        return "Bad Email"

    user["Город"] = r.form.get("city")
    user["Фамилия"] = r.form.get("secondName")
    user["Имя"] = r.form.get("firstName")
    user["Дата рождения"] = r.form.get("birth")

    formatLessons = []
    if(r.form.get("stot") == "1"):
        formatLessons.append("Ученик ко мне")
    if(r.form.get("ttos") == "1"):
        formatLessons.append("Я к ученику")
    if(r.form.get("dist") == "1"):
        formatLessons.append("Дистанционно")
    user["Формат занятий"] = formatLessons

    user["Образование"] = r.form.get("edu")
    user["Стаж"] = int(r.form.get("stash"))

    if(r.form.get("sex") == "m"):
        user["Пол"] = "М"
    else:
        user["Пол"] = "Ж"
    
    user["Телефон"] = r.form.get("phone")
    user["Логин"] = r.form.get("login")
    user["Пароль"] = r.form.get("pass")
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

    user["Ставка"] = int(r.form.get("price"))

    typeOfLessons=[]
    if(r.form.get("solo") == "1"):
        typeOfLessons.append("Одиночные")
    if(r.form.get("group") == "1"):
        typeOfLessons.append("Групповые")
    if(r.form.get("home") == "1"):
        typeOfLessons.append("Помощь с домашней работой")
    if(r.form.get("standart") == "1"):
        typeOfLessons.append("Обычные")

    registration.AddTeacherToDatabase(user)
    return user["Токен"]