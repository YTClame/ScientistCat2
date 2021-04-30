import sys
sys.path.append('./DBModules/')
from flask import (
    render_template,
    request,
    redirect,
)

import loginModule

def loadPage(r):
    token = r.cookies.get('token')
    user = loginModule.getUserToToken(token)
    if(user == "Error" or user["Роль"] != "Админ"):
        return redirect("/")
    else:
        return render_template("admin.html")