import sys, json
sys.path.append('./DBModules/')
import checker
import foundToFilter

def foundStudent(r):
    if(checker.Check0or1(r.form.get("stot")) == False):
        return "Ошибка в параметре поездки репетитора к ученику"
    stot = r.form.get("stot")

    if(checker.Check0or1(r.form.get("ttos")) == False):
        return "Ошибка в параметре поездки ученика к репетитору"
    ttos = r.form.get("ttos")

    if(checker.Check0or1(r.form.get("dist")) == False):
        return "Ошибка в параметре дистанционных занятий"
    dist = r.form.get("dist")

    if(checker.CheckClass(r.form.get("minClass")) == False):
        return "Ошибка в минимальном классе"
    minClass = int(r.form.get("minClass"))

    if(checker.CheckClass(r.form.get("maxClass")) == False):
        return "Ошибка в максимальном классе"
    maxClass = int(r.form.get("maxClass"))

    if(r.form.get("sex") != "m" and r.form.get("sex") != "w" and r.form.get("sex") != "a"):
        return "Ошибка в поле"
    sex = r.form.get("sex")

    if(checker.Check0or1(r.form.get("math")) == False):
        return "Ошибка в предмете математика"
    math = r.form.get("math")

    if(checker.Check0or1(r.form.get("rus")) == False):
        return "Ошибка в предмете русский язык"
    rus = r.form.get("rus")

    if(checker.Check0or1(r.form.get("phis")) == False):
        return "Ошибка в предмете физика"
    phis = r.form.get("phis")

    if(checker.Check0or1(r.form.get("inf")) == False):
        return "Ошибка в предмете информатика"
    inf = r.form.get("inf")

    if(checker.Check0or1(r.form.get("chem")) == False):
        return "Ошибка в предмете химия"
    chem = r.form.get("chem")

    if(checker.Check0or1(r.form.get("bio")) == False):
        return "Ошибка в предмете биология"
    bio = r.form.get("bio")

    if(checker.Check0or1(r.form.get("hist")) == False):
        return "Ошибка в предмете история"
    hist = r.form.get("hist")

    if(checker.Check0or1(r.form.get("soc")) == False):
        return "Ошибка в предмете обществознание"
    soc = r.form.get("soc")

    if(checker.Check0or1(r.form.get("lit")) == False):
        return "Ошибка в предмете литература"
    lit = r.form.get("lit")

    if(checker.Check0or1(r.form.get("geo")) == False):
        return "Ошибка в предмете география"
    geo = r.form.get("geo")

    if(checker.Check0or1(r.form.get("eco")) == False):
        return "Ошибка в предмете экономика"
    eco = r.form.get("eco")

    if(checker.Check0or1(r.form.get("eng")) == False):
        return "Ошибка в предмете английский язык"
    eng = r.form.get("eng")

    if(checker.Check0or1(r.form.get("nem")) == False):
        return "Ошибка в предмете немецкий язык"
    nem = r.form.get("nem")
    
    fil = {}
    formatLessons = []
    if stot == "1":
        formatLessons.append("Я к репетитору")
    if ttos == "1":
        formatLessons.append("Репетитор ко мне")
    if dist == "1":
        formatLessons.append("Дистанционно")
    if len(formatLessons) != 0:
        fil["Формат занятий"] = {"$in": formatLessons}
    
    fil["Класс"] = {"$gte":minClass, "$lte":maxClass}
    if sex == "m":
        fil["Пол"] = "М"
    if sex == "w":
        fil["Пол"] = "Ж"
    
    lessons = []
    if math == "1":
        lessons.append("Математика")
    if rus == "1":
        lessons.append("Русский язык")
    if phis == "1":
        lessons.append("Физика")
    if inf == "1":
        lessons.append("Информатика")
    if chem == "1":
        lessons.append("Химия")
    if bio == "1":
        lessons.append("Биология")
    if hist == "1":
        lessons.append("История")
    if soc == "1":
        lessons.append("Обществознание")
    if lit == "1":
        lessons.append("Литература")
    if geo == "1":
        lessons.append("География")
    if eco == "1":
        lessons.append("Экономика")
    if eng == "1":
        lessons.append("Английский язык")
    if nem == "1":
        lessons.append("Немецкий язык")
    if(len(lessons) != 0):
        fil["Изучаемые предметы"] = {"$all":lessons}
    fil["Доступ"] = "Открыт"
    return json.dumps(foundToFilter.foundStudentToFilter(fil, r.form.get("token")), ensure_ascii=False).encode('utf8').decode()