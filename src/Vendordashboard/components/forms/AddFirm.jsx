import React, { useState } from 'react';
import { API_URL } from '../../helpers/ApiPath';

const AddFirm = () => {
  const [firmName, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [image, setImage] = useState(null);

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setCategory(prevCategory =>
      prevCategory.includes(value) ? prevCategory.filter(item => item !== value) : [...prevCategory, value]
    );
  };

  const handleRegionChange = (event) => {
    const value = event.target.value;
    setRegion(prevRegion =>
      prevRegion.includes(value) ? prevRegion.filter(item => item !== value) : [...prevRegion, value]
    );
  };

  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };

  const handleFirmSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginToken = localStorage.getItem('logintoken');
      if (!loginToken) {
        console.error("User not authenticated");
        alert("User not authenticated");
        return;
      }

      const formData = new FormData();
      formData.append('firmName', firmName);
      formData.append('area', area);
      formData.append('offer', offer);
      formData.append('image', image);

      category.forEach(value => formData.append('category', value));
      region.forEach(value => formData.append('region', value));

      const response = await fetch(`${API_URL}/firm/add-firm`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${loginToken}`
        },
        body: formData
      });

      const data = await response.json();
      if (response.ok) {
        alert('Firm added successfully');
        localStorage.setItem('firmId', data.firmid);
        // Reset form fields
        setFirmName("");
        setArea("");
        setCategory([]);
        setRegion([]);
        setOffer("");
        setImage(null);
      } else {
        console.error('Failed to add firm:', data.error || 'Unknown error');
        alert('vendor can have only one firm 🤖🤖🤖.');
        // Reset form fields
        setFirmName("");
        setArea("");
        setCategory([]);
        setRegion([]);
        setOffer("");
        setImage(null);
      }
    } catch (error) {
      console.error('Failed to add firm:', error);
      alert('An error occurred while adding the firm');
    }
  };

  return (
    <div className="firmsection1">
      <form className='tableform1' onSubmit={handleFirmSubmit}>
        <h2 className='name-section'>Add Firm</h2>

        <label className='first-name'>Firm Name:</label><br />
        <input
          type="text"
          placeholder='Enter Firm Name'
          value={firmName}
          onChange={(e) => setFirmName(e.target.value)}
        /><br />

        <label className='area'>Area:</label><br />
        <input
          type="text"
          placeholder='Enter Area'
          value={area}
          onChange={(e) => setArea(e.target.value)}
        /><br />

        <div className='category'>
          <label className='category-label'>Category:</label><br />
          <div className="checkInp checkboxcontainer">
            <div>
              <p>Veg:</p>
              <input
                type="checkbox"
                checked={category.includes('veg')}
                value="veg"
                onChange={handleCategoryChange}
                className='vegcontainer'
                id='veg'
              />
            </div>
            <div>
              <p>Non-Veg:</p>
              <input
                type="checkbox"
                checked={category.includes('non-veg')}
                value="non-veg"
                onChange={handleCategoryChange}
                className='non-vegcontainer'
                id='non-veg'
              />
            </div>
          </div>
        </div>

        <div className='region'>
          <label className='region-label'>Region:</label><br />
          <div className="checkInp checkboxcontainer">
            <div>
              <p>South-Indian:</p>
              <input
                type="checkbox"
                checked={region.includes('south-indian')}
                value="south-indian"
                onChange={handleRegionChange}
                id='south-indian'
              />
            </div>
            <div>
              <p>North-Indian:</p>
              <input
                type="checkbox"
                checked={region.includes('north-indian')}
                value="north-indian"
                onChange={handleRegionChange}
                id='north-indian'
              />
            </div>
            <div>
              <p>Chinese:</p>
              <input
                type="checkbox"
                checked={region.includes('chinese')}
                value="chinese"
                onChange={handleRegionChange}
                id='chinese'
              />
            </div>
            <div>
              <p>Bakery:</p>
              <input
                type="checkbox"
                checked={region.includes('bakery')}
                value="bakery"
                onChange={handleRegionChange}
                id='bakery'
              />
            </div>
          </div>
        </div>

        <label className='offer'>Offer:</label><br />
        <input
          type="text"
          placeholder='Enter Offer'
          value={offer}
          onChange={(e) => setOffer(e.target.value)}
        />

        <label className='firmimage'>Firm Image:</label><br />
        <input
          type="file"
          onChange={handleImageUpload}
        />

        <button type="submit" className="btnsubmit">Submit</button>
      </form>
    </div>
  );
};

export default AddFirm;
