from fastapi import APIRouter, Depends, HTTPException, Form
from sqlalchemy.orm import Session
from auth import verify_password, hashing_password
from model import User
from database import get_db

router = APIRouter(tags=['Auth'])

@router.post('/register')
def register_user(username:str = Form(...),email:str = Form(...),
                  number: int = Form(...),password:str = Form(...), db:Session = Depends(get_db)):
    existing_user = db.query(User).filter(
        (User.username == username.strip()) | (User.email == email.strip())
    ).first()

    if existing_user:
        raise HTTPException(status_code=400,detail='User is already taken please login')

    new_user =User(username= username.strip(),email = email.strip(),
                   number= number, h_password = hashing_password(password))
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {'message':'User register successfuly'}

@router.post('/login')
def login_user(username:str=Form(...), password:str= Form(...), db:Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username.strip()).first()
    if not user or not verify_password(password, user.h_password):
        raise HTTPException(status_code=400,detail='User is not found')

    return {'message':'Login Successful','user_id': user.id,'username': user.username}
