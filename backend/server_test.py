from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_get_users():
    # Test specific limit
    response = client.get("/users?limit=2")
    assert response.status_code == 200
    data = response.json()
    assert "users" in data
    assert len(data["users"]) == 2

    # test default limit and default sort order by Ids
    response = client.get("/users")
    assert response.status_code == 200
    data = response.json()
    assert "users" in data
    assert len(data["users"]) <= 20

    # Verify that the ids are sorted
    ids = [user["id"] for user in data["users"]]
    assert ids == sorted(ids), "IDs are not sorted by default."

    # print("Response ids:", ids)
    # print("expected  sorted ids:", sorted(ids))

    # Test sorting by first name
    response = client.get("/users?sortBy=fName")
    assert response.status_code == 200
    data = response.json()

    # Extract first names for sorting comparison
    first_names = [user["firstName"] for user in data["users"]]
    assert first_names == sorted(first_names), "First names are not sorted as expected."

    # print("Response first names:", first_names)
    # print("expected sorted first names:", sorted(first_names))

    response = client.get("/users?sortBy=lName")
    assert response.status_code == 200
    data = response.json()

    # Extract first names for sorting comparison
    first_names = [user["lastName"] for user in data["users"]]
    assert first_names == sorted(first_names), "Last names are not sorted as expected."

    # print("Response last names:", first_names)
    # print("expected sorted last names:", sorted(first_names))


def test_update_user():
    # test user
    new_user_data = {
        "id": 2,
        "firstName": "Johnny",
        "lastName": "Doe",
        "age": 31,
        "gender": "male",
        "email": "johnny@example.com",
        "phone": "123-456"
    }

    id_of_user_to_update = "1"

    # comparing if response is same as test user, so if its correctly updated
    response = client.put(f"/users/{id_of_user_to_update}", json=new_user_data)
    assert response.status_code == 200
    updated_user = response.json()

    assert updated_user["firstName"] == "Johnny"
    assert updated_user["email"] == "johnny@example.com"

    # check if we correctly didnt update the users id
    assert updated_user["id"] != new_user_data["id"]


    # test for non existing user
    response = client.put("/users/999", json=new_user_data)
    assert response.status_code == 404
    assert response.json() == {"detail": "User not found"}

def test_update_user_missing_fields():
    # user with missing fields
    incomplete_user = {
        "id": 1,
        "firstName": "Incomplete"
    }
    response = client.put("/users/1", json=incomplete_user)
    assert response.status_code == 422  # err bacause test user doesnt match user class defined in main.py
