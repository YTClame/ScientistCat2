import sys
sys.path.append('./DBModules/')
from flask import (
    render_template,
    request,
    redirect,
)

import loginModule

def loadMessenger(r):
    userForToken = loginModule.getUserToToken(r.cookies.get('token'))
    if(userForToken == "Error"):
        return redirect("/")
    else:
        if userForToken["Роль"] == "Админ":
            return render_template("messengerAW.html")
        if userForToken["Доступ"] == "Закрыт":
            return redirect("/profile")
        if userForToken["Роль"] == "Репетитор":
            return render_template("messenger.html", foundIs="ученика")
        if userForToken["Роль"] == "Ученик":
            return render_template("messenger.html", foundIs="репетитора")
        
