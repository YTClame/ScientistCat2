import json

def getCityNames():
    cities = []
    city = {}

    city = {
        "Name": "Самара",
    }
    cities.append(city)

    city = {
        "Name": "Москва",
    }
    cities.append(city)

    return json.dumps(cities, ensure_ascii=False).encode('utf8').decode()