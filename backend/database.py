from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base 

db_url = 'sqlite:///./online_shop.db'

#here me connect with data base and use engine to connect python with database , session is used to communicate
#with database , Base is a class used to define our database tables

engine = create_engine(db_url,connect_args={'check_same_thread':False})
sessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# yield helps session to wait until the work is done , 
# that way fast API can  perform operations until it finished 

#try and finally is used to when an opration is happend try execute it ,after execution complete finally helps to 
# close it and come back  , even if an error occure 
def get_db():
    db=sessionLocal()
    try:
        yield db
    finally:
        db.close()