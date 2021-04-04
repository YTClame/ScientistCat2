import sys
sys.path.append('./DBModules/')
from flask import (
    render_template,
    request,
    redirect,
)

import loginModule

def loadProfile(r, id):
    user = loginModule.getUserToToken(r.cookies.get('token'))
    if user == "Error":
        return redirect("/")
    userForId = loginModule.getUserToID(id)
    if(userForId == "Error"):
        return redirect("/")
    if(userForId["Роль"] == "Репетитор"):
        return render_template("userTeacher.html", name=userForId["Фамилия"] + " " + userForId["Имя"])
    if(userForId["Роль"] == "Ученик"):
        return render_template("userStudent.html", name=userForId["Фамилия"] + " " + userForId["Имя"])