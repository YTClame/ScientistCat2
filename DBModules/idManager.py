import pymongo
from pymongo import MongoClient
def getNewId():
    newID = 0
    client = MongoClient()
    db = client['SC_Service']
    collect = db['ID']
    if collect.estimated_document_count()==0:
        collect.insert_one({'ID':0})
        newID=0
    else:
        newID = int(collect.find().sort('ID', -1)[0].get('ID'))+1
        collect.update_one({'ID':int(newID-1)},{'$set' : {'ID': newID}})
    return newID

def getNewReportId():
    newID = 0
    client = MongoClient()
    db = client['SC_Service']
    collect = db['ReportsID']
    if collect.estimated_document_count()==0:
        collect.insert_one({'ID':0})
        newID=0
    else:
        newID = int(collect.find().sort('ID', -1)[0].get('ID'))+1
        collect.update_one({'ID':int(newID-1)},{'$set' : {'ID': newID}})
    return newID