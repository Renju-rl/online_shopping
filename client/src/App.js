import './App.css';
import React, {useState, useEffect, use} from 'react';
import Home from './Componenets/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Componenets/Navbar';
import Authcard from './Componenets/Authentication';
import CartPage from './Componenets/CartPage';
import BuyPage from './Componenets/BuyPage';
import PurchasedPage from './Componenets/PurchasedPage';

const API_URL = "http://localhost:8000/api"

function App(){
  const[user,setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const[error,setError] = useState("");
  const[cart, setCart] = useState([]);
  const [page, setPage] = useState('home');
  const [selectedBuy, setSelectedBuy] = useState(null);
  const [purchases, setPurchases] = useState([]);

  //use to fetch the cart data
  useEffect(()=>{
    if(!user) return;
    console.log("User Data:", user);
    console.log("User ID:", user.user_id);
    const fetchCart = async() =>{
      try{
        const res = await fetch(`${API_URL}/shops/${user.user_id}`);
        const data = await res.json();
        setCart(data)
      }catch(err){
        console.error(err)
        
      }
    };
  fetchCart();
  },[user]);

//use to reload the when we add new cart
  const reloadCart = async() =>{
    try{
      const res = await fetch(`${API_URL}/shops/${user.user_id}`);
      // const data = await res.json();
      // setCart(data)
      const data = await res.json();

      console.log("Cart API Response:", JSON.stringify(data, null, 2));
      setCart(data);
    }catch(err){
      console.error(err)
    }
  };

  const handleBuy = (product) => {
      setSelectedBuy(product);
      setPage('buy');
  };

// this helps to send the request of login to the backend 
  const handleLogin = async(username, password) =>{
    setError(' '); //clear the previous error
    const FormData = new URLSearchParams({username , password}) // encodes data to send backend
    try{
      const res = await fetch(`${API_URL}/login`, { method: 'POST', body: FormData });
      const data = await res.json();                                              //Receive backend data
      // if (!res.ok) throw new Error(data.detail || 'Invalid credentials');         //check the user is exist else throw ann error
      if (!res.ok) {
        const message = Array.isArray(data.detail)
            ? data.detail.map(err => err.msg).join(', ')
            : data.detail;

        throw new Error(message || 'Invalid credentials');
    }
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
    }catch(err){
      setError(err.message);
    }
  };
  
  const handleRegister = async(username,email,number,password) => {
    setError("");
    const FormData = new URLSearchParams({username,email,number,password});
    try{
      const res = await fetch(`${API_URL}/register`, { method: 'POST', body: FormData });
      const data = await res.json();
      // if(!res.ok) throw new Error(data.detail || 'Registeration Failed');
      if (!res.ok) {
          throw new Error(JSON.stringify(data.detail));
      }
      setUser(data);
      localStorage.setItem('user',JSON.stringify(data));
    }catch (err){
      setError(err.message);
    }
  };

  const handleLogout =() =>{
    setUser(null);
    localStorage.removeItem('user');
    setCart([ ]);
  };

  // const addCart = async(prod_id) =>{
  //   const FormData = new URLSearchParams({user_id:user.user_id});
  //   await fetch(`${API_URL}/shops/create/${prod_id}`,{method:'POST',body:FormData});
  //   reloadCart();
  // };



const confirmBuy = async () => {
    if (!selectedBuy) return;

    try {
        const FormData = new URLSearchParams({
            user_id: user.user_id
        });

        const res = await fetch(
            `${API_URL}/shops/booking/${selectedBuy.id}`,
            {
                method: 'POST',
                body: FormData
            }
        );

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.detail || 'Booking failed');
        }

        // Remove the purchased product from the cart
        await fetch(`${API_URL}/shops/delete/${selectedBuy.id}`, {
            method: 'POST'
        });

        alert("Your product will be delivered within 5 days.");

        setSelectedBuy(null);
        setPage('home');

        reloadCart();
        await reloadPurchases();

    } catch (err) {
        setError(err.message);
    }
};

    const reloadPurchases = async () => {
        try {
            const res = await fetch(
                `${API_URL}/shops/bookings/${user.user_id}`
            );

            const data = await res.json();

            setPurchases(data);

        } catch (err) {
            console.error(err);
        }
    };


  const addCart = async (product) => {

    const FormData = new URLSearchParams({
        user_id: user.user_id,
        product_name: product.name,
        product_category: product.category,
        product_brand: product.brand,
        product_price: product.price
    });

    try {
        const res = await fetch(
            `${API_URL}/shops/create/${product.id}`,
            {
                method: 'POST',
                body: FormData
            }
        );

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.detail || 'Unable to add product');
        }

        console.log("Product Added:", data);

        reloadCart();

    } catch (err) {
        console.error("Add Cart Error:", err);
    }
};


  const buyProduct = async(cart_id) =>{
    const FormData = new URLSearchParams({user_id:user.user_id});
    await fetch(`${API_URL}/shops/booking/${cart_id}`,{method:'POST',body:FormData});
    reloadCart();
  };

  const deletePro = async(cart_id)=>{
    await fetch(`${API_URL}/shops/delete/${cart_id}`,{method:'POST'});
    reloadCart();
  };

      
    const cancelBuy = async () => {
        if (!selectedBuy) return;

        try {
            await fetch(`${API_URL}/shops/delete/${selectedBuy.id}`, {
                method: 'POST'
            });

            setSelectedBuy(null);
            await reloadCart();
            setPage('cart');

        } catch (err) {
            console.error("Cancel Error:", err);
        }
    };
  // return(
  //   <div>
  //     <NavBar user = {user} onLogout = {handleLogout}
  //     onHome={() => setPage('home')}
  //     onCart={() => setPage('cart')}
  //     />
  //     <main >
  //       {error && <div>{error}</div>}
  //       {!user?(
  //         <Authcard
  //         onLogin={handleLogin}
  //         onRegister = {handleRegister}
  //         setError={setError}
  //         error = {error}
  //         />
  //       ): page === 'home' ? (
  //         <Home tocart={addCart} />
  //       ):(
  //         <CartPage
  //         Cart={cart}
  //         onDelete={deletePro}
  //         onBuy={buyProduct}
  //         />
  //       )}
  //     </main>
  //   </div>
  // )

    const deletePurchase = async (booking_id) => {
        try {
            const res = await fetch(
                `${API_URL}/shops/bookings/${booking_id}?user_id=${user.user_id}`,
                {
                    method: 'DELETE'
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.detail || 'Unable to delete purchase');
            }

            await reloadPurchases();

        } catch (err) {
            console.error("Delete Purchase Error:", err);
        }
    };


  return (
    <div>
        <NavBar
            user={user}
            onLogout={handleLogout}
            onHome={() => setPage('home')}
            onBuy={() => {
                reloadPurchases();
                setPage('orders');
            }}
            onCart={() => setPage('cart')}
        />

        <main>
            {error && <div>{error}</div>}

            {!user ? (
                <Authcard
                    onLogin={handleLogin}
                    onRegister={handleRegister}
                    setError={setError}
                    error={error}
                />
            ) : page === 'home' ? (
                <Home tocart={addCart} />
            ) : page === 'cart' ? (
                <CartPage
                    Cart={cart}
                    onDelete={deletePro}
                    onBuy={handleBuy}
                />
            ) : page === 'buy' ? (
                <BuyPage
                    Buy={selectedBuy}
                    onCancel={cancelBuy}
                    onConfirm={confirmBuy}
                />
            ) : page === 'orders' ? (
                <PurchasedPage purchases={purchases} onDelete={deletePurchase} />
                
            ) : (
                <Home tocart={addCart} />
            )}
        </main>
    </div>
);
}

export default App;
