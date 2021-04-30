import sys
sys.path.append('./DBModules/')
from flask import (
    render_template,
    request,
    redirect,
)

import loginModule

def auth(r):
    token = r.cookies.get('token')
    user = loginModule.getUserToToken(token)
    if(user == "Error"):
        return render_template("auth.html")
    else:
        if(user["Роль"] != "Админ"):
            return redirect("/profile")
        if(user["Роль"] == "Админ"):
            return redirect("/admin")