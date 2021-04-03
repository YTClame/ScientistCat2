import sys, os
sys.path.append('./DBModules/')
from flask import (
    render_template,
    request,
    redirect,
)

import updateOnline

def wasOnline(r):
    token = r.form.get('token')
    return updateOnline.updateOnlineFunc(token)
