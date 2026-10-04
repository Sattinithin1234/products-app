import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=0")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        return response.json();
      })
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError("Something went wrong");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  // Product Details
  if (selectedProduct) {
    return (
      <div className="app">
        <button
          className="back-button"
          onClick={() => setSelectedProduct(null)}
        >
          ← Back
        </button>

        <div className="details">
          <img
            src={selectedProduct.thumbnail}
            alt={selectedProduct.title}
          />

          <h1>{selectedProduct.title}</h1>

          <p>{selectedProduct.description}</p>

          <h2>${selectedProduct.price}</h2>

          <p>
            Category: {selectedProduct.category}
          </p>

          <p>
            Rating: {selectedProduct.rating}
          </p>
        </div>
      </div>
    );
  }

  // Search
  const filteredProducts = products.filter((product) => {
    const searchText = search.toLowerCase();

    return (
      product.title.toLowerCase().includes(searchText) ||
      product.category.toLowerCase().includes(searchText) ||
      product.description.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="app">
      <h1>Products App</h1>

      <input
        className="search-box"
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <div className="products-container">
        {filteredProducts.map((product) => (
          <div
            className="product-card"
            key={product.id}
          >
            <img
              src={product.thumbnail}
              alt={product.title}
            />

            <h2>{product.title}</h2>

            <p>${product.price}</p>

            <button
              onClick={() => setSelectedProduct(product)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <h2>No products found</h2>
      )}
    </div>
  );
}

export default App;