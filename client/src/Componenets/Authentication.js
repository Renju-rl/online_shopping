// import React, {useState} from "react";

// function Authcard({onLogin,onRegister,setError}){
//     const[view,setview] = useState('login');
//     const[username,setName] = useState('');
//     const[email,setEmail] = useState('');
//     const[number,setNumber] = useState('');
//     const[password,setPassword] = useState('');

//     const handleFormSubmit = (e) => {
//         e.priventDefault();
//         if(view === 'login'){
//             onLogin(username,password);
//         }else{
//             onRegister(username,email,number,password);
//         }
//     };

//     return(
//         <div>
//             <div>
//                 <h2>{view === 'login' ? 'welcome' : 'Create Account'}</h2>
//                 <p>{view === 'login' ? 'Enter your details to Buy the products' : 'You Can Buy your favorite'}</p>
//             </div>
        
//         #to navigate between signin and signup we use this section
//             <div>
//                 <button type="button" onClick={() => {setview('login');setError('');}} className={view === 'login' ? 'tab-item active' : 'tab-item'}>
//                     SignIN
//                 </button>

//                 <button type="button" onClick={() => {setview('register');setError('');}} 
//                 className={view === 'register' ? 'tab-item active' : 'tab-item'}>
//                     Sign Up
//                 </button>
//             </div>

//         #this section give the login page or register page based on the above button
//         <form onSubmit={handleFormSubmit}>
//             <div>
//                 <label>User Name: </label>
//                 <input type="text" placeholder="Enter Your name" value={username} onChange={e => setName(e.target.value)} required/>
//             </div>

//             {view === 'register' && (
//                 <>
//                 <div>
//                     <label>Email: </label>
//                     <input type="email" placeholder="Enter Your Email" value={email} onChange={e => setEmail(e.target.value)} required/>
//                 </div>

//                 <div>
//                     <label>Phone Number: </label>
//                     <input type="number" placeholder="Enter Your number" value={number} onChange={e => setNumber(e.target.value)} required/>
//                 </div>
//                 </>
//             )}

//             <div>
//                 <label>Password: </label>
//                 <input type="password" placeholder="Enter Your password" value={password} onChange={e => setPassword(e.target.value)} required/>
//             </div>

//             <button>
//                 {view === 'login'? 'SigIn' : 'Create Account'}
//             </button>

//         </form>
//         </div>
//     )
// }

// export default Authcard;



import React, {useState} from "react";

function Authcard({onLogin,onRegister,setError}){
    const[view,setview] = useState('login');
    const[username,setName] = useState('');
    const[email,setEmail] = useState('');
    const[number,setNumber] = useState('');
    const[password,setPassword] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if(view === 'login'){
            onLogin(username,password);
        }else{
            onRegister(username,email,number,password);
        }
    };

    return(
        <div className="auth-container">
            <div className="auth-header">
                <h2 className="auth-title">{view === 'login' ? 'welcome' : 'Create Account'}</h2>
                <p className="auth-subtitle">{view === 'login' ? 'Enter your details to Buy the products' : 'You Can Buy your favorite'}</p>
            </div>
        
            {/* to navigate between signin and signup we use this section */}
            <div className="auth-tabs">
                <button type="button" onClick={() => {setview('login');setError('');}} className={view === 'login' ? 'tab-item active' : 'tab-item'}>
                    SignIN
                </button>

                <button type="button" onClick={() => {setview('register');setError('');}} 
                className={view === 'register' ? 'tab-item active' : 'tab-item'}>
                    Sign Up
                </button>
            </div>

            {/* this section give the login page or register page based on the above button */}
            <form onSubmit={handleFormSubmit} className="auth-form">
                <div className="form-group">
                    <label className="form-label">User Name: </label>
                    <input className="form-input" type="text" placeholder="Enter Your name" value={username} onChange={e => setName(e.target.value)} required/>
                </div>

                {view === 'register' && (
                    <>
                    <div className="form-group">
                        <label className="form-label">Email: </label>
                        <input className="form-input" type="email" placeholder="Enter Your Email" value={email} onChange={e => setEmail(e.target.value)} required/>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Phone Number: </label>
                        <input className="form-input" type="tel" placeholder="Enter Your number" value={number} onChange={e => setNumber(e.target.value)} required/>
                    </div>
                    </>
                )}

                <div className="form-group">
                    <label className="form-label">Password: </label>
                    <input className="form-input" type="password" placeholder="Enter Your password" value={password} onChange={e => setPassword(e.target.value)} required/>
                </div>

                <button className="auth-submit-btn">
                    {view === 'login'? 'SigIn' : 'Create Account'}
                </button>

            </form>
        </div>
    )
}

export default Authcard;