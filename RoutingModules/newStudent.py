from flask import (
    render_template,
)

def newStudent():
    return render_template("newStudent.html")