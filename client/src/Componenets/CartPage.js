// import React, {useState} from "react";

// function CartPage({Cart, onDelete, onBuy}){

//     const [updatequantiy, setQuantity] = useState(1);

//     const handlequantity = ()=>{
//         setQuantity(updatequantiy + 1)
//     }

//     const handlequantiydecrese = () =>{
//         if (updatequantiy > 1){
//             setQuantity(updatequantiy - 1)
//         }
//     }

//     const handlebuy = (product) =>{
//         onBuy({
//         // this section helps to give the product details to buy page after the update of quantiy and price
//             ...product,
//             quantity : updatequantiy,
//             totalPrice : product.price * updatequantiy
//         })
//     }

//     return(
        
//         <ul>
//             {Cart.map((product)=>{
                
//                 const totalPrice = product.price * updatequantiy;
//             // Here we use return to genrate the new elements create by map
//                 return(
//                     <li key={product.id}>
                    
//                         <h2>{product.name}</h2>
//                         <p>{totalPrice}</p>
//                         <div>
//                             <button onClick={handlequantity}>+</button>
//                             <span>{updatequantiy}</span>
//                             <button onClick={handlequantiydecrese}>-</button>

//                             <button onClick={() => onDelete(product.id)}>
//                                 Remove
//                             </button>
//                         </div>  
                    
//                         <div>
//                             <button onClick={() =>handlebuy(product)}>Buy</button>
//                         </div> 
//                     </li>
//                 )
//             })}
//         </ul>
//     )
// }
// export default CartPage;

import React, { useState } from "react";

function CartPage({ Cart, onDelete, onBuy }) {

    const [quantities, setQuantities] = useState({});

    const handlequantity = (productId) => {
        setQuantities(prev => ({
            ...prev,
            [productId]: (prev[productId] || 1) + 1
        }));
    };

    const handlequantiydecrese = (productId) => {
        setQuantities(prev => ({
            ...prev,
            [productId]: Math.max((prev[productId] || 1) - 1, 1)
        }));
    };

    const handlebuy = (product) => {
        const quantity = quantities[product.id] || 1;

        onBuy({
            ...product,
            quantity: quantity,
            totalPrice: product.price * quantity
        });
    };

    return (
        <ul className="cart-list">

            {(Array.isArray(Cart) ? Cart : []).map((product) => {

                const quantity = quantities[product.id] || 1;
                const totalPrice = product.price * quantity;

                return (
                    <li key={product.id} className="cart-item">

                        <h2 className="cart-product-name">
                            {product.name}
                        </h2>

                        <p className="cart-product-price">
                            ₹{totalPrice}
                        </p>

                        <div className="cart-actions">

                            <button
                                className="quantity-btn"
                                onClick={() => handlequantity(product.id)}
                            >
                                +
                            </button>

                            <span className="quantity-value">
                                {quantity}
                            </span>

                            <button
                                className="quantity-btn"
                                onClick={() => handlequantiydecrese(product.id)}
                            >
                                -
                            </button>

                            <button
                                className="btn-remove"
                                onClick={() => onDelete(product.id)}
                            >
                                Remove
                            </button>

                        </div>

                        <div className="cart-buy-section">

                            <button
                                className="btn-buy"
                                onClick={() => handlebuy(product)}
                            >
                                Buy
                            </button>

                        </div>

                    </li>
                );
            })}

        </ul>
    );
}

export default CartPage;