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

def sendMessage(r):
    token = r.form.get('token')
    id = r.form.get('id')
    message = r.form.get('message')
    return messenger.send(token, int(id), message)

def loadMessages(r):
    token = r.form.get('token')
    id = r.form.get('id')
    return messenger.loadMessages(token, int(id))

def getMessagesSize(r):
    token = r.form.get('token')
    id = r.form.get('id')
    return messenger.getMessagesSize(token, int(id))