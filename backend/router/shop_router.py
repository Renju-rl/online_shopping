from fastapi import APIRouter, Depends, Form, HTTPException
from model import User, Product, Cart, Booking
from database import get_db
from sqlalchemy.orm import Session

router = APIRouter(tags=['SHOP'])

#view the carted product
# @router.get('/shops/{user_id}')
# def list_prod(user_id:int, db:Session =Depends(get_db)):
#     user = db.query(User).filter(User.id == user_id).first()
#     if not user:
#         raise HTTPException(status_code=404, detail='User is not Found')
#     return db.query(Cart).filter(Cart.user_detail == user_id).all()


# View cart products
@router.get('/shops/{user_id}')
def list_prod(user_id: int, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail='User is not Found')

    cart_items = db.query(Cart).filter(
        Cart.user_detail == user_id
    ).all()

    result = []

    for item in cart_items:
        result.append({
            "id": item.id,
            "name": item.prod_cart.product_name,
            "price": item.prod_cart.product_price,
            "quantity": item.quantity
        })

    return result

#Add to cart
# @router.post('/shops/create/{prod_id}')
# def cart_pro(prod_id:int,user_id:int =Form(...), db:Session= Depends(get_db)):
#     new_prod = db.query(Product).filter(Product.id == prod_id).first()
#     if not new_prod:
#         raise HTTPException(status_code=404, detail='Product is not carted')
#     cart_item = Cart(user_detail = user_id, product_detail = prod_id, quantity= 1)
#     db.add(cart_item)
#     db.commit()
#     db.refresh(cart_item)
#     return cart_item

# Add to cart
@router.post('/shops/create/{prod_id}')
def cart_pro(
    prod_id: int,
    user_id: int = Form(...),
    product_name: str = Form(...),
    product_category: str = Form(...),
    product_brand: str = Form(...),
    product_price: int = Form(...),
    db: Session = Depends(get_db)
):
    new_prod = db.query(Product).filter(Product.id == prod_id).first()

    if not new_prod:
        new_prod = Product(
            id=prod_id,
            product_name=product_name,
            product_category=product_category,
            product_brand=product_brand,
            product_price=product_price,
            user_id=user_id
        )

        db.add(new_prod)
        db.commit()
        db.refresh(new_prod)

    cart_item = Cart(
        user_detail=user_id,
        product_detail=prod_id,
        quantity=1
    )

    db.add(cart_item)
    db.commit()
    db.refresh(cart_item)

    return cart_item


#add to booking or buying 
# @router.post('/shops/booking/{pro_id}')
# def book_product(pro_id:int ,user_id:int = Form(...),  db:Session = Depends(get_db)):
#     buy_pro = db.query(Cart).filter(Cart.user_detail == pro_id).first()
#     if not buy_pro:
#         raise HTTPException(status_code=404, detail="Product is not found")
#     book_pro = Booking(user_detail = user_id,product_detail =pro_id)
#     db.add(book_pro)
#     db.commit()
#     db.refresh(book_pro)
#     return book_pro


@router.post('/shops/booking/{cart_id}')
def book_product(cart_id: int, user_id: int = Form(...), db: Session = Depends(get_db)):
    buy_pro = db.query(Cart).filter(Cart.id == cart_id,Cart.user_detail == user_id).first()
    if not buy_pro:
        raise HTTPException(status_code=404, detail="Cart product not found")

    book_pro = Booking(user_detail=user_id,product_detail=buy_pro.product_detail)
    db.add(book_pro)
    db.commit()
    db.refresh(book_pro)
    return book_pro


@router.get('/shops/bookings/{user_id}')
def get_bookings(user_id: int, db: Session = Depends(get_db)):

    bookings = db.query(Booking).filter(
        Booking.user_detail == user_id
    ).all()

    result = []

    for item in bookings:
        result.append({
            "id": item.id,
            "name": item.prod_book.product_name,
            "price": item.prod_book.product_price
        })

    return result

#to delete a product from cart
@router.post('/shops/delete/{prod_id}')
def delete_pro(prod_id:int, db:Session =Depends(get_db)):
    cart_p = db.query(Cart).filter(Cart.id ==prod_id).first()
    if not cart_p:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(cart_p)
    db.commit()
    return{'message':'Product is deleted'}


@router.delete('/shops/bookings/{booking_id}')
def delete_booking(
    booking_id: int,
    user_id: int,
    db: Session = Depends(get_db)
):
    booking = db.query(Booking).filter(
        Booking.id == booking_id,
        Booking.user_detail == user_id
    ).first()

    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    db.delete(booking)
    db.commit()

    return {"message": "Booking deleted successfully"}