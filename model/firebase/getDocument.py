from firestore import db


def getAllCollections():
    collections = db.collections()
    data = []
    for i in collections:
        data.append(i.id)
    return data


def getAllDocuments(collection):
    docs = db.collection(collection).stream()
    return docs


def getDocument(collection, docId):
    doc = db.collection(collection).document(docId).get()
    return doc


def updateDocument(collection, docId, data):
    db.collection(collection).document(docId).update(data)
    return True


def deleteDocument(collection, docId):
    db.collection(collection).document(docId).delete()
    return True


# rev = getAllDocuments("Campus 12")
# updateDocument("reviews", "V5LzbwukukLiVYXaMU7I", {"sentiment":value})
# value = from_feedback Model
# r = requests.patch(SERVER_URL/"Campus 12", json = {"sentiment":avgValue})
