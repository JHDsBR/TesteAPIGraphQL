import requests

url = 'http://localhost:4000/'

def GetGraphQL(body:dict) -> requests.Response:
    return requests.post(url, json=body)

def PostGraphQL(body:dict):
    pass

r = GetGraphQL({"query":"{id}"})

print("Houve um erro")/exit() if r.status_code != 200 else None

print(r.json()["data"])