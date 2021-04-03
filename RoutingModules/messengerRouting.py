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
        if userForToken["Роль"] == "Репетитор":
            return render_template("messenger.html", foundIs="ученика")
        else:
            return render_template("messenger.html", foundIs="репетитора")
