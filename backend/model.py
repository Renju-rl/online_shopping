from sqlalchemy import Integer,Column,String, Boolean, ForeignKey
from database import Base
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer,primary_key=True,index=True)
    username = Column(String(100),index=True,nullable=False)
    email = Column(String(200),unique=True,index=True,nullable=False)
    number = Column(Integer,unique=True,nullable=False,index=True)
    h_password = Column(String(100),nullable=False)

    # main = relationship('Product',back_populates='prod',cascade='all,delete-orphan')

    main = relationship('Product',back_populates='prod',cascade='all,delete-orphan')

    cart_items = relationship('Cart', back_populates='user_cart')
    bookings = relationship('Booking', back_populates='user_book')

class Product(Base):
    __tablename__ = 'items'

    id = Column(Integer,primary_key=True,index=True)
    product_name = Column(String(100),index=True,nullable=False)
    product_category = Column(String(100),index=True,nullable=False)
    product_brand = Column(String(100),index=True,nullable=False)
    product_price = Column(Integer,index=True,nullable=False)
    user_id = Column(Integer,ForeignKey("users.id"),nullable=False)

    # prod = relationship('User',back_populates='main')

    prod = relationship('User', back_populates='main')

    cart_items = relationship('Cart', back_populates='prod_cart')
    bookings = relationship('Booking', back_populates='prod_book')

class Cart(Base):
    __tablename__ = 'carted_item'

    id = Column(Integer,primary_key=True,nullable=False)
    quantity = Column(Integer, default=1)
    user_detail = Column(Integer,ForeignKey('users.id'),nullable=False)
    product_detail = Column(Integer,ForeignKey('items.id'),nullable=False)
    
    # user_cart = relationship('User',back_populates='main')
    # prod_cart = relationship('Product',back_populates='prod')

    user_cart = relationship('User',back_populates='cart_items')
    prod_cart = relationship('Product',back_populates='cart_items')

class Booking(Base):
    __tablename__ = 'book_detail'

    id = Column(Integer,primary_key=True,nullable=False)
    user_detail = Column(Integer,ForeignKey('users.id'),nullable=False)
    product_detail = Column(Integer,ForeignKey('items.id'),nullable=False)

    # user_book = relationship('User',back_populates='main')
    # prod_book = relationship('Product',back_populates='prod')

    user_book = relationship('User',back_populates='bookings')
    prod_book = relationship('Product',back_populates='bookings')