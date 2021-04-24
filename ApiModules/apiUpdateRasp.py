import sys
sys.path.append('./DBModules/')
from flask import (
    request,
    redirect,
)

import raspUpdater

def updateRaspElement(r):
    token = r.form.get("token")
    day = r.form.get("day")
    hourIndex = r.form.get('hourIndex')
    return raspUpdater.updateRaspElem(token, day, int(hourIndex))

def createRaspElement(r):
    token = r.form.get("token")
    time1 = r.form.get("time1")
    time2 = r.form.get("time2")
    task = r.form.get("task")
    day = r.form.get("day")
    return raspUpdater.createNewRaspElem(token, time1, time2, task, day)

def removeRaspElement(r):
    token = r.form.get("token")
    time1 = r.form.get("time1")
    time2 = r.form.get("time2")
    task = r.form.get("task")
    day = r.form.get("day")
    return raspUpdater.removeRaspElem(token, time1, time2, task, day)