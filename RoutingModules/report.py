import sys
sys.path.append('./DBModules/')
from flask import (
    render_template,
    request,
    redirect,
)

import loginModule

def reportPage(r):
    token = r.cookies.get('token')
    user = loginModule.getUserToToken(token)
    if(user == "Error"):
        return redirect("/")
    else:
        if user["Роль"] == "Репетитор":
            return render_template("report.html", foundIs="ученика")
        else:
            return render_template("report.html", foundIs="репетитора")