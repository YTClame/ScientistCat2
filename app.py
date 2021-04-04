import sys, os
sys.path.append('./RoutingModules/')
sys.path.append('./ApiModules/')

import auth
import newStudent
import newTeacher
import cityNames
import apiRegistration
import apiLogin
import profileLK
import apiGetInformation
import edit
import apiSaveChanges
import foundPage
import apiFoundStudent
import apiFoundTeacher
import userProfile
import raspRoute
import apiUpdateRasp
import messengerRouting
import apiMessenger
import apiWasOnline
import report
import apiReport

from flask import (
    Flask,
    render_template,
    request,
)

if os.path.exists("./static/profilesImages"):
    pass
else:
    os.mkdir("./static/profilesImages")

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = './static/profilesImages/'

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

@app.route("/edit")
def editprofile():
    return edit.editInf(request)

@app.route("/found")
def found():
    return foundPage.found(request)

@app.route("/user/<id>")
def userProfileFunc(id):
    return userProfile.loadProfile(request, id)

@app.route("/rasp")
def userRaspFunc():
    return raspRoute.loadRaspPage(request)

@app.route("/messenger", methods=["get"])
def messengerFunc():
    return messengerRouting.loadMessenger(request)

@app.route("/report/<id>")
def userReportFunc(id):
    return report.reportPage(request)



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

@app.route("/api/getInformationAboutTeacher", methods=["get"])
def getInformationAboutTeacher():
    try:
        token = request.args['token']
        return apiGetInformation.getInformationAboutTeacherToToken(token)
    except:
        id = request.args['id']
        return apiGetInformation.getInformationAboutTeacherToId(id)

@app.route("/api/getInformationAboutStudent", methods=["get"])
def getInformationAboutStudent():
    try:
        token = request.args['token']
        return apiGetInformation.getInformationAboutStudentToToken(token)
    except:
        id = request.args['id']
        return apiGetInformation.getInformationAboutStudentToId(id)

@app.route("/api/saveTeacherChanges", methods=["post"])
def saveTeacherChanges():
    return apiSaveChanges.saveTeacherChanges(request, app.config['UPLOAD_FOLDER'])

@app.route("/api/saveStudentChanges", methods=["post"])
def saveStudentChanges():
    return apiSaveChanges.saveStudentChanges(request, app.config['UPLOAD_FOLDER'])

@app.route("/api/foundStudent", methods=["post"])
def foundStudent():
    return apiFoundStudent.foundStudent(request)

@app.route("/api/foundTeacher", methods=["post"])
def foundTeacher():
    return apiFoundTeacher.foundTeacher(request)

@app.route("/api/getRasp", methods=["get"])
def rasp():
    try:
        token = request.args['token']
        return apiGetInformation.getRaspToToken(token)
    except:
        id = request.args['id']
        return apiGetInformation.getRaspToId(request.args['id'])

@app.route("/api/updateRasp", methods=["post"])
def updateRaspFunc():
    return apiUpdateRasp.updateRaspElement(request)

@app.route("/api/writeToUser", methods=["post"])
def writeToUserFunc():
    return apiMessenger.createNewContact(request)

@app.route("/api/wasOnline", methods=["post"])
def wasOnlineFunc():
    return apiWasOnline.wasOnline(request)

@app.route("/api/loadContacts", methods=["post"])
def loadContactsFunc():
    return apiMessenger.loadContactsInfo(request)

@app.route("/api/sendMessage", methods=["post"])
def sendMessageFunc():
    return apiMessenger.sendMessage(request)

@app.route("/api/loadMessages", methods=["post"])
def loadMessageFunc():
    return apiMessenger.loadMessages(request)

@app.route("/api/getMessagesSize", methods=["post"])
def getMessagesSizeFunc():
    return apiMessenger.getMessagesSize(request)

@app.route("/api/sendReport", methods=["post"])
def sendReportFunc():
    return apiReport.report(request)

@app.route("/api/getNameForReport", methods=["post"])
def getNameForReportFunc():
    return apiReport.getName(request)


if __name__ == "__main__":
    app.run(host = '0.0.0.0', debug=True, port = 5000)