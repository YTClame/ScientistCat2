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