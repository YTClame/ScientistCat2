import sys
sys.path.append('./DBModules/')
from flask import (
    render_template,
    request,
    redirect,
)

import loginModule

def found(r):
    user = loginModule.getUserToToken(r.cookies.get('token'))
    if(user == "Error"):
        return redirect("/")
    else:
        if user["Роль"] == "Админ":
            return redirect("/admin")
        if user["Доступ"] == "Закрыт":
            return redirect("/profile")
        if user["Роль"] == "Репетитор":
            return render_template("foundStudent.html")
        if user["Роль"] == "Ученик":
            return render_template("foundTeacher.html")
        