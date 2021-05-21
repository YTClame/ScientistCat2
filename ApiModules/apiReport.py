import sys, os, json
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

def loadReports(r):
    token = r.form.get('token')
    if not loginModule.userIsAdmin(token):
        return "Error"
    reports = reportDB.getReports()
    reportsRes = []
    for report in reports:
        nameObj = getNameForId(report["Отправитель"])
        tmp = {}
        tmp["Отправитель"] = report["Отправитель"]
        tmp["Обвиняемый"] = report["Обвиняемый"]
        tmp["Жалоба"] = report["Жалоба"]
        tmp["ID"] = report["ID"]
        tmp["Имя отправителя"] = nameObj["Имя"]
        tmp["Фамилия отправителя"] = nameObj["Фамилия"]
        nameObj = getNameForId(report["Обвиняемый"])
        tmp["Имя обвиняемого"] = nameObj["Имя"]
        tmp["Фамилия обвиняемого"] = nameObj["Фамилия"]
        reportsRes.append(tmp)
    reportsRes.reverse()
    return json.dumps(reportsRes, ensure_ascii=False).encode('utf8').decode()

def getNameForId(id):
    user = loginModule.getUserToID(int(id))
    if user == "Error":
        return "Error"
    res = {}
    res["Имя"] = user["Имя"]
    res["Фамилия"] = user["Фамилия"]
    return res 

def deleteReportForId(r):
    token = r.form.get('token')
    if not loginModule.userIsAdmin(token):
        return "Error"
    id = r.form.get('id')
    return reportDB.deleteReport(id)