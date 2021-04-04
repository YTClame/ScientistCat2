import sys, os
sys.path.append('./DBModules/')
from flask import (
    render_template,
    request,
    redirect,
)

import reportDB
import loginModule

def report(r):
    try:
        token = r.form.get('token')
        id = r.form.get('id')
        message = r.form.get('message')
    except:
        return "Error"
    return reportDB.sendReport(token, int(id), message)

def getName(r):
    user = loginModule.getUserToID(int(r.form.get('id')))
    if user == "Error":
        return "Error"
    return user["Фамилия"] + " " + user["Имя"]