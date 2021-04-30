import sys
sys.path.append('./DBModules/')
from flask import (
    render_template,
    request,
    redirect,
)

import loginModule

def loadRaspPage(r):
    token = r.cookies.get('token')
    user = loginModule.getUserToToken(token)
    if(user == "Error"):
        return redirect("/")
    else:
        if user["Роль"] == "Админ":
            return redirect("/admin")
        if user["Доступ"] == "Закрыт":
            return redirect("/profile")
        if user["Роль"] == "Репетитор":
            return render_template("rasp.html", foundIs="ученика")
        if user["Роль"] == "Ученик":
            return render_template("rasp.html", foundIs="репетитора")
        