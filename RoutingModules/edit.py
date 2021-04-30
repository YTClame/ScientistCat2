import sys
sys.path.append('./DBModules/')
from flask import (
    render_template,
    request,
    redirect,
)

import loginModule

def editInf(r):
    token = r.cookies.get('token')
    user = loginModule.getUserToToken(token)
    if(user == "Error"):
        return redirect("/")
    else:
        if user["Роль"] == "Репетитор":
            return render_template("editTeacher.html")
        if user["Роль"] == "Ученик":
            return render_template("editStudent.html")
        if user["Роль"] == "Админ":
            return redirect("/admin")