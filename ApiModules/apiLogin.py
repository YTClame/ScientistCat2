import sys
sys.path.append('./DBModules/')
from flask import (
    request,
)

import loginModule

def login(r):
    token = loginModule.getTokenToLoginAndPassword(r.form.get("login"), r.form.get("password"))
    if token == "Error":
        return "Error"
    else:
        return token