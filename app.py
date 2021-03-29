import sys
sys.path.append('./RoutingModules/')
sys.path.append('./ApiModules/')

import auth
import newStudent
import newTeacher
import cityNames
import apiRegistration
import apiLogin
import profileLK

from flask import (
    Flask,
    render_template,
    request,
)

app = Flask(__name__)

@app.after_request
def add_header(response):
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'public, max-age=0'
    return response

@app.route("/")
def login():
    return auth.auth(request)

@app.route("/newTeacher")
def regTeacher():
    return newTeacher.newTeacher()

@app.route("/newStudent")
def regStudent():
    return newStudent.newStudent()

@app.route("/profile")
def profileURL():
    return profileLK.loadProfile(request)

@app.route("/api/getCityNames")
def apiCityNames():
    return cityNames.getCityNames()

@app.route("/api/registerTeacher", methods=["post"])
def regTeacherApi():
    return apiRegistration.api_registerTeacher(request)

@app.route("/api/registerStudent", methods=["post"])
def regStudentApi():
    return apiRegistration.api_registerStudent(request)

@app.route("/api/login", methods=["post"])
def singin():
    return apiLogin.login(request)


if __name__ == "__main__":
    app.run(host = '0.0.0.0', debug=True, port = 80)