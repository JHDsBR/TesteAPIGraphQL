import requests

url = 'http://localhost:5812/'

def GraphQL(body:dict) -> requests.Response:
    return requests.post(url, json=body)

# teste de GET
def Get():
    id = "3"
    
    body = """
        query {
            getUserById(id: "$id") {
                id
                name
            }
        }
    """.replace("$id", id)

    r = GraphQL({"query":body})
    print("Houve um erro")/exit() if r.status_code != 200 else None
    print(r.json()["data"])


# teste de PUT
def Put():
    name = "tom"

    body = """
        mutation {
            createUser(name: "$name") {
                id
                name
            }
        }
    """.replace("$name", name)

    r = GraphQL({"query":body})
    print("Houve um erro ->", r.text)/exit() if r.status_code != 200 else None
    print(r.json()["data"])


# testes
Put() # cria
Get() # pega