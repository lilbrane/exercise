from typing import Union,List, Optional
from pydantic import BaseModel

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

import users

app = FastAPI()

# cors for allowing access from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class User(BaseModel):
    id: int
    firstName: str
    lastName: str
    age: int
    gender: str
    email: str
    phone: str

# @app.get("/")
# def read_root():
#     return {"Hello": "World"}

# get limit and sortBy from query
@app.get("/users")
def get_users(limit: Optional[int] = 20, sortBy: Optional[str] = 'id'):
    usersArr = users.get_users()

    if sortBy == "fName":
        usersArr = sorted(usersArr, key=lambda user: user["firstName"])
    elif sortBy == "lName":
        usersArr = sorted(usersArr, key=lambda user: user["lastName"])
    else:
        usersArr = sorted(usersArr, key=lambda user: user["id"])

    return {"users": usersArr[:limit]}

# update user, could update field by field instead of changing all
@app.put("/users/{user_id}")
def update_user(user_id: str, updated_user: User):

    for user in users.get_users():
        if int(user_id) == user["id"]:
            user = updated_user
            return user

    raise HTTPException(status_code=404, detail="User not found")
