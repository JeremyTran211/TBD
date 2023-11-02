import React, { useState } from "react";
import { Link } from "react-router-dom";

const SingleListing = ({ imageUrl, address, price, bedrooms, bathrooms }) => {
  return (
    <div
      style={{
        display: "flex",
        margin: "10px",
        border: "1px solid #ccc",
        padding: "10px",
        borderRadius: "5px",
        position: "relative",
      }}
    >
      {/* Image Section for Listing */}
      <div style={{ marginRight: "10px" }}>
        <img
          src={imageUrl}
          alt="Apartment Thumbnail"
          style={{ width: "150px", height: "100px" }}
        />
      </div>

      {/* Details Section for Listing */}
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: "bold", fontSize: "0.9em" }}>{address}</div>
        <div style={{ color: "green", fontWeight: "bold", fontSize: "0.9em" }}>
          {price}
        </div>
        <div style={{ fontSize: "0.85em" }}>{bedrooms} Bedrooms</div>
        <div style={{ fontSize: "0.85em" }}>{bathrooms} Bathrooms</div>
      </div>

      {/* View Listing Button to view the entire listing */}
      <div style={{ position: "absolute", right: "10px", bottom: "10px" }}>
      <Link to="/listing-details"><button
          style={{
            padding: "4px 8px",
            fontSize: "0.85em",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          View Listing
        </button></Link>
      </div>
    </div>
  );
};

const ApartmentListing = () => {
  const [filter, setFilter] = useState({
    rent: "",
    bedrooms: "",
    bathrooms: "",
  });
  const [sort, setSort] = useState("");

  return (
    <div style={{ display: "flex" }}>
      {/* Map Container */}
      <div style={{ width: "60%", borderRight: "1px solid #ccc" }}>
        {/* Placeholder for the map */}
        <div
          style={{
            width: "100%",
            height: "calc(100vh - 20px)",
            backgroundColor: "#e0e0e0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span>Map Placeholder</span>
        </div>
      </div>

      {/* Listings Container */}
      <div style={{ width: "40%", overflowY: "scroll" }}>
        {/* Back to Home Button */}<Link to="/">
        <button
          style={{
            margin: "10px",
            padding: "4px 8px",
            fontSize: "0.85em",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Back to Home
        </button></Link>

        {/* Filter and Sort Section */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "10px",
            padding: "5px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          {/* Rent Filter */}
          <div style={{ marginRight: "5px" }}>
            <strong style={{ fontSize: "0.85em" }}>Rent:</strong>
            <input
              value={filter.rent}
              onChange={(e) => setFilter({ ...filter, rent: e.target.value })}
              placeholder="Rent"
              style={{ fontSize: "0.85em", width: "80px" }}
            />
            <button style={{ fontSize: "0.85em" }}>Apply</button>
          </div>

          {/* Bedroom Filter */}
          <div style={{ marginRight: "5px" }}>
            <strong style={{ fontSize: "0.85em" }}>Bedrooms:</strong>
            <input
              value={filter.bedrooms}
              onChange={(e) =>
                setFilter({ ...filter, bedrooms: e.target.value })
              }
              placeholder="Bedrooms"
              style={{ fontSize: "0.85em", width: "50px" }}
            />
            <button style={{ fontSize: "0.85em" }}>Apply</button>
          </div>

          {/* Bathroom Filter */}
          <div style={{ marginRight: "5px" }}>
            <strong style={{ fontSize: "0.85em" }}>Bathrooms:</strong>
            <input
              value={filter.bathrooms}
              onChange={(e) =>
                setFilter({ ...filter, bathrooms: e.target.value })
              }
              placeholder="Bathrooms"
              style={{ fontSize: "0.85em", width: "60px" }}
            />
            <button style={{ fontSize: "0.85em" }}>Apply</button>
          </div>

          {/* Sort Section for the Listings */}
          <div style={{ marginLeft: "auto" }}>
            <strong style={{ fontSize: "0.85em" }}>Sort:</strong>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              style={{ fontSize: "0.85em" }}
            >
              <option value="">Select</option>
              <option value="lowHigh">Low to High</option>
              <option value="highLow">High to Low</option>
              <option value="video">Video</option>
              <option value="3DTour">3D Tour</option>
            </select>
          </div>
        </div>

        {/* Displaying the Listings */}
        <SingleListing
          imageUrl="https://via.placeholder.com/150"
          address="123 Example St, Example City, EX 12345"
          price="$1,000/month"
          bedrooms="2"
          bathrooms="1"
        />
        <SingleListing
          imageUrl="https://via.placeholder.com/150"
          address="456 Sample Rd, Sample City, SC 12345"
          price="$1,200/month"
          bedrooms="3"
          bathrooms="2"
        />
        <SingleListing
          imageUrl="https://via.placeholder.com/150"
          address="789 Demo Blvd, Demo City, DM 12345"
          price="$900/month"
          bedrooms="1"
          bathrooms="1"
        />
        <SingleListing
          imageUrl="https://via.placeholder.com/150"
          address="101 Another St, Some City, SC 67890"
          price="$1,500/month"
          bedrooms="3"
          bathrooms="2"
        />
      </div>
    </div>
  );
};

export default ApartmentListing;
