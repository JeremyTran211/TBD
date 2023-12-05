import React, { useState ,useEffect} from "react";
import "./PropertyListing.css";
import { useLocation } from "react-router-dom";

const PropertyDetailPage = () => {
  const location = useLocation();
  const { address, description, title, price } = location.state || {};
 
  var addressWord = " ";
 
  console.log("Passed in:", address, description, title, price);
  //console.log(address);
  
  const [imageSet, setImageSet] = useState(1);

  // cost calculator
  const [cost, setCost] = useState(0);
  /*
  cost = pge+water+garbage+internet+price/rooms
  
  database missing utilites in rental_listing table
  Property has no api call to gather listing info
  and no variable declariations for listing info 
   */

  const percent = 11 * 0.3;
  async function calculator() {
    setCost(percent);
  }

  // Handler for unimplemented features
  const handleAlert = () => {
    alert("You clicked a feature that is not implemented in the backend");
  };



  // Image display logic
  const totalImages = 6; // Update this as per your number of images
  const imagesPerSet = 3; // Number of images per set
  const totalSets = Math.ceil(totalImages / imagesPerSet); // Calculate total sets

  const handlePrevImages = () => {
    setImageSet((prev) => Math.max(prev - 1, 1)); // Decrease imageSet, minimum 1
  };

  const handleNextImages = () => {
    setImageSet((prev) => Math.min(prev + 1, totalSets)); // Increase imageSet, maximum totalSets
  };
const getMapEmbed=(address)=>{
  return `https://www.google.com/maps?q=${address}&output=embed`
}
  return (
    //<div><h1>{title}</h1>
    <div className="page-container">
      <div className="image-and-map-container">
        <div className="image-navigation-section">
          {/* Previous Image Set Button */}
          {imageSet > 1 && (
            <button onClick={handlePrevImages} className="nav-button">
              Prev
            </button>
          )}

          {/* Image placeholders */}
          {[...Array(totalImages)].map((_, i) => (
            <div
              key={i}
              className={`image-section${Math.ceil((i + 1) / imagesPerSet) === imageSet ? "" : " hidden"
                }`}
            >
              <div className="address-section" >
                <img
                  src={`https://picsum.photos/id/${Math.floor(Math.random() * 100)}/200`} // Replace with actual image paths
                  alt={`Property ${i + 1}`}
                />
              </div>
            </div>
          ))}
          {/* 123 Main St, South San Francisco, CA 94080 */}
          {/*<p className="Address">
            The address is {addressWord}
          </p>
          */}
          {/* Next Image Set Button */}
          {imageSet < totalSets && (
            <button onClick={handleNextImages} className="nav-button">
              Next
            </button>
          )}
        </div>

        {/* Map placeholder */}
        <div className="map-placeholder"  >
          <iframe src={getMapEmbed(address)} width={300} height={300} >
        </iframe>
        </div>
      </div>
    

      <div className="details-container">
        <div className="property-details card-box">
          <h3>Address</h3>
          <p>{ address }</p>
        </div>

        {/* Cost calculator */}
        <div className="calculator-container card-box">
          <h1>Cost Calculator</h1>
          <p className="calculator-text"> Estimated Yearly Salary = </p>
          <p className="calculator-value">{"$" + (price/.3) * 12}</p>
        </div>

        <div className="contact-details card-box">
          <div>Phone Number: XXX-XXX-XXXX</div>
          <button onClick={handleAlert} className="contact-button">
            Request Tour
          </button>
          <button onClick={handleAlert} className="contact-button">
            Bookmark
          </button>
        </div>
      </div>

      <div className='abouts-section'>
        {/* About Property Section */}
        <div className="about-section">
          <h3>About Property</h3>
          <p className="details-text">
            { description }
          </p>
        </div>

        {/* About Landlord Section */}
        <div className="about-section">
          <h3>About Landlord</h3>
          <p className="details-text">
            John Doe has been a dedicated property owner for over a decade, known
            for his attention to detail and commitment to maintaining high-quality
            living standards. With a background in architecture, John brings a
            unique perspective to property management, ensuring that each home is
            not only aesthetically pleasing but also functional and comfortable.
            An avid community supporter, he actively participates in local events
            and initiatives to improve the neighborhood. His hobbies include
            gardening, which is evident in the well-kept landscapes of his
            properties, biking along the city's scenic routes, and hiking in the
            nearby mountains. John prides himself on being approachable and
            responsive, always available to address tenants' needs and concerns.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
