import React, { useState } from 'react';
import { API_URL } from '../../helpers/ApiPath';

const AddProducts = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState([]);
  const [isBestSeller, setIsBestSeller] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  const handleBestSellerChange = (event) => {
    setIsBestSeller(event.target.value);
  };

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
  
    try {
      console.log("Checking localStorage for loginToken and firmId...");
      const loginToken = localStorage.getItem('logintoken');
      const firmId = localStorage.getItem('firmId');
  
      console.log("loginToken:", loginToken);
      console.log("firmId:", firmId);
  
      if (!loginToken || !firmId) {
        console.error("User not authenticated or firm ID missing");
        alert("User not authenticated or firm ID missing");
        return;
      }
  
      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('image', image);
      formData.append('isBestSeller', isBestSeller);
  
      category.forEach((value) => {
        formData.append('category', value);
      });
  
      const response = await fetch(`${API_URL}/product/add-product/${firmId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${loginToken}`, // Ensure correct header format
        },
        body: formData,
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("Product added successfully");
        setProductName('');
        setPrice('');
        setCategory([]);
        setIsBestSeller('');
        setDescription('');
        setImage(null);
        console.log("Product added successfully");
      } else {
        alert(`Failed to add product: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product");
    }
  };
  

  return (
    <div className="productsection">
      <form className="productform" onSubmit={handleAddProduct}>
        <h2>Add Product</h2>
        <label htmlFor="productName">Product Name:</label><br />
        <input
          type="text"
          id="productName"
          placeholder="Enter your product name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        /><br />

        <label htmlFor="price">Price:</label><br />
        <input
          type="text"
          id="price"
          placeholder="Enter Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        /><br />

        <div className="category">
          <label htmlFor="">Category:</label><br />
          <div className="checkboxcontainer">
            <label htmlFor="veg">Veg:</label>
            <input
              type="checkbox"
              id="veg"
              value="veg"
              checked={category.includes('veg')}
              onChange={handleCategoryChange}
            />
            <label htmlFor="non-veg">Non-Veg:</label>
            <input
              type="checkbox"
              id="non-veg"
              value="non-veg"
              checked={category.includes('non-veg')}
              onChange={handleCategoryChange}
            />
          </div>
        </div>

        <div className="bestseller">
          <label htmlFor="">Bestseller:</label><br />
          <div className="radiobuttoncontainer">
            <label htmlFor="yes">Yes:</label>
            <input
              type="radio"
              id="yes"
              name="bestseller"
              value="yes"
              checked={isBestSeller === 'yes'}
              onChange={handleBestSellerChange}
            />
            <label htmlFor="no">No:</label>
            <input
              type="radio"
              id="no"
              name="bestseller"
              value="no"
              checked={isBestSeller === 'no'}
              onChange={handleBestSellerChange}
            />
          </div>
        </div>

        <label htmlFor="description">Description:</label><br />
        <input
          type="text"
          id="description"
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        /><br />

        <label htmlFor="image">Product Image:</label><br />
        <input
          type="file"
          id="image"
          onChange={handleImageUpload}
        /><br />

        <button type="submit" className="btnsubmit">Submit</button>
      </form>
    </div>
  );
};

export default AddProducts;
