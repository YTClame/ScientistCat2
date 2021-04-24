import json

def getCityNames():
    cities = []
    city = {}

    city = {
        "Name": "Самара",
        "Hours": 0,
        "Minutes": 0,
    }
    cities.append(city)

    city = {
        "Name": "Москва",
        "Hours": -1,
        "Minutes": 0,
    }
    cities.append(city)

    city = {
        "Name": "Казань",
        "Hours": -1,
        "Minutes": 0,
    }
    cities.append(city)

    return json.dumps(cities, ensure_ascii=False).encode('utf8').decode()