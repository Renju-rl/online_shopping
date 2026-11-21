// import React from 'react';

// function NavBar({user, onLogout, onHome, onCart}) {
//     return (
//         <header className='navbar'>
//             <div className='brand'>
//                 <span className="brand-icon">✨</span>
//                 <h1>SHOPY</h1>
//                 <span className="welcome-text">
//                     Hello, <strong>{user ? user.username : 'Guest'}</strong>
//                 </span>
//             </div>

//             {user && (
//                 <div className="user-profile">
//                     <button onClick={onHome}>Products</button>
//                     <button onClick={onCart}>Cart</button>
//                     <button onClick={onLogout} className="btn-logout">
//                         Logout
//                     </button>
//                 </div>
//             )}
//         </header>
//     );
// }

// export default NavBar;




import React from 'react';

function NavBar({ user, onLogout, onHome, onBuy, onCart }) {

    return (
        <nav className="navbar navbar-dark bg-dark px-3">

            <h3 className="text-white mb-0">
                ✨ SHOPY
            </h3>

            {user && (
                <>
                    <span className="text-white ms-4">
                        Hello, {user.username}
                    </span>

                    <div className="ms-auto d-flex gap-2">

                        <button
                            className="btn btn-outline-light"
                            onClick={onHome}
                        >
                            Home
                        </button>

                        <button
                            className="btn btn-outline-light"
                            onClick={onBuy}
                        >
                            Buy
                        </button>

                        <button
                            className="btn btn-outline-light"
                            onClick={onCart}
                        >
                            Cart
                        </button>

                        <button
                            className="btn btn-danger"
                            onClick={onLogout}
                        >
                            Logout
                        </button>

                    </div>
                </>
            )}

        </nav>
    );
}

export default NavBar;