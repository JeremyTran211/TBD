import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MainPage.css";
import { useState } from "react";
import SVGComponent from "./Map";
import SFPhoto from "./sanfrancisco.jpg";


const MainPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleSearchClick = async() => {
    console.log("Search button was clicked with query:", searchInput);
    console.log(searchInput);
    if (searchInput) {
      try{
        const response = await fetch(`/searchBar?searchParam=${encodeURIComponent(searchInput)}`);
        if (response.ok) {
          const data = await response.json();
          navigate("/listings", { state: { searchQuery: searchInput, searchData: data } });
        
        } else {
          console.log("Search API has failed", response.status);
        }
        
      } catch(error) {
        console.log("Error fetching search", error);
      }
      
    } else {
      navigate("/listings");
    }  
  };

  return (
    <div className="MainPage">
      <main>
        {/* <div class="photo-container"> */}
          {/* <img src={SFPhoto}></img> */}
        <h1 class="title"> Off-Campus Living Made Simple in the San Francisco Area</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by address or area"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit" onClick={handleSearchClick}>
            Search
          </button>
        </div>
        {/* </div> */}
        <div class="map-container">
          <SVGComponent width="400" height="400" />
        </div>
      </main>
    </div>
  );
};

export default MainPage;
