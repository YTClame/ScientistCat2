import sys, json
sys.path.append('./DBModules/')
import checker
import foundToFilter

def foundTeacher(r):
    if(checker.Check0or1(r.form.get("stot")) == False):
        return "Ошибка в параметре поездки репетитора к ученику"
    stot = r.form.get("stot")

    if(checker.Check0or1(r.form.get("ttos")) == False):
        return "Ошибка в параметре поездки ученика к репетитору"
    ttos = r.form.get("ttos")

    if(checker.Check0or1(r.form.get("dist")) == False):
        return "Ошибка в параметре дистанционных занятий"
    dist = r.form.get("dist")

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

    if(checker.CheckStash(r.form.get("minS")) == False and r.form.get("minS") != ""):
        return "Ошибка в минимальном стаже"
    if r.form.get("minS") != "":
        minS = int(r.form.get("minS"))

    if(checker.CheckStash(r.form.get("maxS")) == False and r.form.get("maxS") != ""):
        return "Ошибка в максимальном стаже"
    if r.form.get("maxS") != "":
        maxS = int(r.form.get("maxS"))

    if(checker.CheckPrice(r.form.get("minP")) == False and r.form.get("minP") != ""):
        return "Ошибка в минимальном стаже"
    if r.form.get("minP") != "":
        minP = int(r.form.get("minP"))

    if(checker.CheckPrice(r.form.get("maxP")) == False and r.form.get("maxP") != ""):
        return "Ошибка в максимальном стаже"
    if r.form.get("maxP") != "":
        maxP = int(r.form.get("maxP"))

    if(checker.Check0or1(r.form.get("edS")) == False):
        return "Ошибка в образовании студента"
    edS = r.form.get("edS")

    if(checker.Check0or1(r.form.get("edA")) == False):
        return "Ошибка в образовании аспиранта"
    edA = r.form.get("edA")

    if(checker.Check0or1(r.form.get("edT")) == False):
        return "Ошибка в образовании учителя"
    edT = r.form.get("edT")

    if(checker.Check0or1(r.form.get("edP")) == False):
        return "Ошибка в образовании преподавателя"
    edP = r.form.get("edP")
    
    
    fil = {}
    formatLessons = []
    if stot == "1":
        formatLessons.append("Ученик ко мне")
    if ttos == "1":
        formatLessons.append("Я к ученику")
    if dist == "1":
        formatLessons.append("Дистанционно")
    if len(formatLessons) != 0:
        fil["Формат занятий"] = {"$in": formatLessons}
    
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
        fil["Преподаваемые предметы"] = {"$all":lessons}

    if r.form.get("minS") != "" and r.form.get("maxS") !=  "":
        fil["Стаж"] = {"$lte":maxS, "$gte":minS}
    if r.form.get("minS") != "" and r.form.get("maxS") == "":
        fil["Стаж"] = {"$gte":minS}
    if r.form.get("minS") == "" and r.form.get("maxS") != "":
        fil["Стаж"] = {"$lte":maxS}

    if r.form.get("minP") != "" and r.form.get("maxP") !=  "":
        fil["Ставка"] = {"$lte":maxP, "$gte":minP}
    if r.form.get("minP") != "" and r.form.get("maxP") == "":
        fil["Ставка"] = {"$gte":minP}
    if r.form.get("minP") == "" and r.form.get("maxP") != "":
        fil["Ставка"] = {"$lte":maxP}

    educs = []
    if edS == "1":
        educs.append("Студент")
    if edA == "1":
        educs.append("Аспирант")
    if edT == "1":
        educs.append("Учитель")
    if edP == "1":
        educs.append("Преподаватель")
    if len(educs) != 0:
        fil["Образование"] = {"$in": educs}
    
    return json.dumps(foundToFilter.foundTeacherToFilter(fil, r.form.get("token")), ensure_ascii=False).encode('utf8').decode()