import sys, os
sys.path.append('./DBModules/')
from flask import (
    render_template,
    request,
    redirect,
)

import loginModule
import messenger

def createNewContact(r):
    token = r.form.get('token')
    id = r.form.get('id')
    return messenger.createNewContact(token, int(id))

def loadContactsInfo(r):
    token = r.form.get('token')
    return messenger.loadContacts(token)