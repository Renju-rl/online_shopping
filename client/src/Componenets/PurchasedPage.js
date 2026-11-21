import React from "react";

function PurchasedPage({ purchases, onDelete }) {

    return (
        <div className="cart-list">

            <h2>My Purchases</h2>

            {purchases.length === 0 ? (
                <p>You haven't purchased any products yet.</p>
            ) : (
                purchases.map((product) => (

                    <div key={product.id} className="cart-item">

                        <h3>{product.name}</h3>

                        <p>Price: ₹{product.price}</p>

                        <p>Delivery: Within 5 days</p>

                        <button
                            className="btn-remove"
                            onClick={() => onDelete(product.id)}
                        >
                            Delete
                        </button>

                    </div>

                ))
            )}

        </div>
    );
}

export default PurchasedPage;