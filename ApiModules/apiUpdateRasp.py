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
    time1old = r.form.get("time1old")
    time2old = r.form.get("time2old")
    taskOld = r.form.get("taskold")
    time1 = r.form.get("time1")
    time2 = r.form.get("time2")
    task = r.form.get("task")
    return raspUpdater.updateRaspElem(token, day, time1old, time1, time2old, time2, taskOld, task)

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