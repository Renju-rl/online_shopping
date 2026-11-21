// import React, { useState } from "react";
// import { Button, Card } from "react-bootstrap";
// import { Products } from "./ProductDetail";
// import NavBar from './Navbar';


// function Home({tocart}) {
//   const [items] = useState(Products);

//   return (
//     <div className="home-container">
        
//       <h2 className="section-title">Explore Our Products</h2>
      
//       <div className="product-grid">
//         {items.map((prod) => (
//           <Card className="product-card" key={prod.id}>
//             {prod.image && (
//               <div className="card-img-wrapper">
//                 <Card.Img variant="top" src={require(`./Assets/${prod.image}.png`)} alt={prod.name} />
//               </div>
//             )}
//             <Card.Body className="d-flex flex-column justify-content-between">
//               <div>
//                 <span className="category-badge">{prod.category}</span>
//                 <Card.Title className="product-title">{prod.name}</Card.Title>
//               </div>

//               <div className="card-footer-content">
//                 <div className="price-tag">
//                   <span className="price-label">Price</span>
//                   <span className="price-value">{prod.price}</span>
//                 </div>
//                 <Button className="custom-btn" variant="danger" onClick={() => tocart(prod)} >
//                   Add to Cart
//                 </Button>
//               </div>
//             </Card.Body>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Home;



import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Products } from "./ProductDetail";

function Home({ tocart }) {

    const [items] = useState(Products);
    const [showCategories, setShowCategories] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Get all unique categories
    const categories = [
        ...new Set(items.map((product) => product.category))
    ];

    // Filter products based on selected category
    const filteredProducts = selectedCategory === "All"
        ? items
        : items.filter((product) => product.category === selectedCategory);

    // Reset category filter
    const handleReset = () => {
        setSelectedCategory("All");
        setShowCategories(false);
    };

    return (
        <div className="home-container">

            <h2 className="section-title">Explore Our Products</h2>

            {/* Category Button */}
            <div className="category-section">

                <Button
                    variant="dark"
                    onClick={() => setShowCategories(!showCategories)}
                >
                    Categories
                </Button>

                {selectedCategory !== "All" && (
                    <Button
                        variant="danger"
                        onClick={handleReset}
                        className="ms-2"
                    >
                        Reset
                    </Button>
                )}

            </div>

            {/* Display Categories */}
            {showCategories && (
                <div className="category-list">

                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant={selectedCategory === category ? "danger" : "outline-dark"}
                            onClick={() => setSelectedCategory(category)}
                            className="m-1"
                        >
                            {category}
                        </Button>
                    ))}

                    <Button
                        variant="success"
                        onClick={handleReset}
                        className="m-1"
                    >
                        All Products
                    </Button>

                </div>
            )}

            {/* Display Products */}
            <div className="product-grid">

                {filteredProducts.map((prod) => (

                    <Card className="product-card" key={prod.id}>

                        {prod.image && (
                            <div className="card-img-wrapper">
                                <Card.Img
                                    variant="top"
                                    src={require(`./Assets/${prod.image}.png`)}
                                    alt={prod.name}
                                />
                            </div>
                        )}

                        <Card.Body className="d-flex flex-column justify-content-between">

                            <div>
                                <span className="category-badge">
                                    {prod.category}
                                </span>

                                <Card.Title className="product-title">
                                    {prod.name}
                                </Card.Title>
                            </div>

                            <div className="card-footer-content">

                                <div className="price-tag">
                                    <span className="price-label">Price</span>

                                    <span className="price-value">
                                        ₹{prod.price}
                                    </span>
                                </div>

                                <Button
                                    className="custom-btn"
                                    variant="danger"
                                    onClick={() => tocart(prod)}
                                >
                                    Add to Cart
                                </Button>

                            </div>

                        </Card.Body>

                    </Card>

                ))}

            </div>

        </div>
    );
}

export default Home;