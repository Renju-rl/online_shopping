// import React, { useState } from "react";

// function BuyPage({ Buy, onCancel, onDelete }) {

//     const [error, setError] = useState('');

//     const handlebuysubmit = () => {
//         if (!Buy) {
//             setError('First select the product');
//             return;
//         }

//         setError('');
//     };

//     return (
//         <div>
//             {Buy && (
//                 <div>
//                     <h2>{Buy.name}</h2>

//                     <p>Price: ₹{Buy.price}</p>

//                     <p>Quantity: {Buy.quantity}</p>

//                     <p>Total Amount: ₹{Buy.totalPrice}</p>

//                     <button onClick={handlebuysubmit}>
//                         Buy
//                     </button>

//                     <button onClick={onCancel}>
//                         Cancel
//                     </button>

//                     <button onClick={() => onDelete(Buy.id)}>Remove</button>
//                 </div>
//             )}

//             {error && <p>{error}</p>}
//         </div>
//     );
// }

// export default BuyPage;


import React from "react";

function BuyPage({ Buy, onCancel, onConfirm }) {

    if (!Buy) {
        return <h3>No product selected</h3>;
    }

    return (
        <div className="buy-container">

            <h2>Purchase Details</h2>

            <div className="buy-card">

                <h3>{Buy.name}</h3>

                <p>Price: ₹{Buy.price}</p>

                <p>Quantity: {Buy.quantity}</p>

                <h4>Total Price: ₹{Buy.totalPrice}</h4>

                <div className="buy-buttons">

                    <button
                        className="btn btn-secondary"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                    <button
                        className="btn btn-danger"
                        onClick={onConfirm}
                    >
                        Confirm Buy
                    </button>

                </div>

            </div>

        </div>
    );
}

export default BuyPage;