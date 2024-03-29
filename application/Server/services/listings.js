/* listing.js 
* This file serves as functions to create, get, remove, and update a listing
* with error handling and also logging to determine sucess.
*/
const db = require('./db');
const helper = require('../helper');
const config = require('../config');


// For creating a listing
// Listing_ID | User_ID | Location_ID | Rooms | Bathrooms | Price | Property_Type | Description 
// Gas_And_Electric | Internet | Water | Garbage | Square_Feet | Image_Path   | Time_Stamp         // |  Hidden | Title
async function createListing(listing) {
  //insert location info into location of Location_Of_Rental_Listing table.
  let locationResult = await db.query(
    'INSERT INTO Location_Of_Rental_Listing (Address, Region_ID) VALUES (?,?)', [listing.Address, listing.ZipCode]
  );

  let locationID = locationResult.insertId;
  
  console.log(locationID);
  //Prepares values to insert into our Rental_Listing table.
  const values = [listing.User_ID, locationID, listing.Rooms, listing.Bathrooms, 
    listing.Price, listing.Property_Type || null, listing.Description, listing.Gas_And_Electric || null,
    listing.Internet || null, listing.Water || null, listing.Garbage || null, listing.Square_Feet, listing.Image_Path || null, listing.Hidden || null, listing.Title ]

  console.log("Values being inserted:", values);
  // Insert into the 'Rental_Listing' table.
  const result = await db.query(
  `INSERT INTO Rental_Listing
   (User_ID, Location_ID, Rooms, Bathrooms, Price, Property_Type, Description, Gas_And_Electric, 
    Internet, Water, Garbage, Square_Feet, Image_Path, Hidden, Title) 
  VALUES 
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, values
  );
  //Error message to determine success or fail.
  let message = 'Error in creating Rental Listing';

  if (result.affectedRows) {
    message = 'Rental Listing created successfully';
  }

  return {message};
}

// for retrieving and reading the listings in the Rental_Listing Table
async function getListings(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  // Join Rental_Listing and Location_Of_Rental_Listing tables to include address.
  const rows = await db.query(
    `SELECT Rental_Listing.*, Location_Of_Rental_Listing.Address
    FROM Rental_Listing 
    INNER JOIN Location_Of_Rental_Listing ON Rental_Listing.Location_ID = Location_Of_Rental_Listing.Location_ID
    LIMIT ${config.listPerPage};`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};
  return {
    data,
    meta
  }
}
//For updating a listing.
// Listing_ID | User_ID | Location_ID | Rooms | Bathrooms | Price | Property_Type | Description 
// Gas_And_Electric | Internet | Water | Garbage | Square_Feet | Image_Path   | Time_Stamp         // |  Hidden | Title
async function updateListing(listing_id, listing){
  //Use conditonal updates to prevent undefine data from overwriting existing ones.
  const result = await db.query(
    `UPDATE Rental_Listing

    SET User_ID = IF("${listing.User_ID}"='undefined', User_ID,"${listing.User_ID}"),
    Location_ID = IF("${listing.Location_ID}"='undefined', Location_ID,"${listing.Location_ID}"),
    Rooms = IF("${listing.Rooms}"='undefined', Rooms,"${listing.Rooms}"),
    Bathrooms= IF("${listing.Bathrooms}"='undefined', Bathrooms,"${listing.Bathrooms}"),
    Price = IF("${listing.Price}"='undefined', Price,"${listing.Price}"), 
    Property_Type = IF("${listing.Property_Type}"='undefined', Property_Type,"${listing.Property_Type}"),
    Description = IF("${listing.Description}"='undefined', Description,"${listing.Description}"),
    Gas_And_Electric = IF("${listing.Gas_And_Electric}"='undefined', Gas_And_Electric,"${listing.Gas_And_Electric}"), 
    Internet = IF("${listing.Internet}"='undefined', Internet,"${listing.Internet}"),
    Water = IF("${listing.Water}"='undefined', Water,"${listing.Water}"), 
    Garbage = IF("${listing.Garbage}"='undefined', Garbage,"${listing.Garbage}"), 
    Square_Feet = IF("${listing.Square_Feet}"='undefined', Square_Feet,"${listing.Square_Feet}"), 
    Image_Path = IF("${listing.Image_Path}"='undefined', Image_Path,"${listing.Image_Path}"), 
    Time_Stamp = IF("${listing.Time_Stamp}"='undefined', Time_Stamp,"${listing.Time_Stamp}"), 
    Hidden = IF("${listing.Hidden}"='undefined', Hidden,"${listing.Hidden}"), 
    Title = IF("${listing.Title}"='undefined', Title,"${listing.Title}") 
    WHERE Listing_ID=${listing_id}`

  );
  //Error message to determine success or fail.
  let message = 'Error in updating Rental Listing';

  if (result.affectedRows) {
    message = 'Rental Listing updated successfully';
  }

  return {message};
}

 // for deleting a listing
async function removeListing(listing_id){
  //Delete listing from Rental_Listing table.
  const result = await db.query(
    `DELETE FROM Rental_Listing WHERE Listing_id=${listing_id}`
  );
  // Error message to determine success or fail.
  let message = 'Error in deleting rental listing';

  if (result.affectedRows) {
    message = 'Rental listing was deleted successfully';
  }

  return {message};
}


module.exports = {
  getListings,
  updateListing, 
  removeListing,
  createListing
}