import sys
sys.path.append('./DBModules/')
from flask import (
    render_template,
    request,
    redirect,
)

import loginModule

def loadProfile(r):
    userForToken = loginModule.getUserToToken(r.cookies.get('token'))
    if(userForToken == "Error"):
        return redirect("/")
    if(userForToken["Роль"] == "Админ"):
        return redirect("/admin")
    if(userForToken["Доступ"] == "Закрыт"):
        return render_template("bannedUser.html")
    if(userForToken["Роль"] == "Репетитор"):
        return render_template("lkteacher.html")
    if(userForToken["Роль"] == "Ученик"):
        return render_template("lkstudent.html")
    