import sys
sys.path.append('./DBModules/')
from flask import (
    request,
)

import loginModule, block

def blockUser(r):
    token = r.form.get('token')
    id = r.form.get('id')
    return block.blockUser(token, id)

def unblockUser(r):
    token = r.form.get('token')
    id = r.form.get('id')
    return block.unblockUser(token, id)