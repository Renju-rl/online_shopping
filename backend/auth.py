import bcrypt
from fastapi import Request
from sqlalchemy.orm import Session
from model import User

#-> str it tell to return the password in string
def hashing_password(password : str) -> str:
    bytes_password = password.encode('utf-8')  #encode - used to convert string to bytes
    if len(bytes_password) > 72:
        bytes_password = bytes_password[:72]
    salt = bcrypt.gensalt()  #gensalt - helps to hash the password so same password can store 

    #bcrypt.hashpw(bytes_password,salt) - helps to hash the passwords
    #decode('utf-8') - used to convert bytes to string
    return bcrypt.hashpw(bytes_password,salt).decode('utf-8')


def verify_password(plain_password: str, hashed_password: str) -> bool:
    login_pswd = plain_password.encode('utf-8')
    if len(login_pswd) > 72:
        login_pswd =login_pswd[:72]

    #bcrypt.checkpw - helps to check the user entered password is same as database
    return bcrypt.checkpw(login_pswd, hashed_password.encode('utf-8'))

#request helps to access the information send from frontend
def get_current_user(request: Request, db:Session):
    #.get - helps to retrive the value
    #'user_id' - helps to store the retrived value 
    user_id = request.cookies.get('user_id')

    if not user_id:
        return None
    try:
        return db.query(User).filter(User.id == int(user_id)).first()
    except ValueError():
        return None