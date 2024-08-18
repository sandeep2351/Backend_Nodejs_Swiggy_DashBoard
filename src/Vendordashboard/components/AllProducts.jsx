import React, { useEffect, useState } from 'react';
import { API_URL } from '../helpers/ApiPath';

const AllProducts = () => {
  const [product, setProduct] = useState([]);

  const producthandler = async () => {
    const firmid = localStorage.getItem('firmId');
    console.log(firmid);
    try {
      const response = await fetch(`${API_URL}/product/${firmid}/products`);
      const newproductdata = await response.json();
      setProduct(newproductdata.products);
      console.log(newproductdata);
    } catch (error) {
      console.error('Failed to fetch products', error);
      alert('Failed to fetch products');
    }
  };

  useEffect(() => {
    producthandler();
    console.log('this is useEffect');
  }, []);

  const deleteproductbyid = async (productId) => {
    const loginToken = localStorage.getItem('logintoken');
    
    if (!loginToken) {
        alert("User not authenticated");
        return;
    }
    
    console.log("Token:", loginToken); // Log the token for debugging
    
    try {
        const response = await fetch(`${API_URL}/product/${productId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${loginToken}` // Add Authorization header
            }
        });
        
        if (response.ok) {
            setProduct(product.filter(item => item._id !== productId));
            alert("Are you sure to delete");
            alert('Product deleted successfully');
        } else {
            const data = await response.json();
            console.error('Failed to delete the product:', data.error || 'Unknown error');
            alert('Failed to delete the product');
        }
    } catch (error) {
        console.error('Failed to delete the product:', error);
        alert('An error occurred while deleting the product');
    }
};

  

  return (
    <div className="table-container">
      { !product? (
        <p>No products added</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {product.map((item) => (
              <tr key={item._id}>
                <td>{item.productName}</td>
                <td>₹{item.price}</td>
                <td>
                  {item.image && (
                    <img src={`${API_URL}/uploads/${item.image}`} alt={item.productName} />
                  )}
                </td>
                <td>
                  <button className="delete-button" onClick={()=>deleteproductbyid(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllProducts;
