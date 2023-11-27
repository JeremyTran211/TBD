import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./EditProperties.css";

const editedPropertiesData = [
  {
    id: 1,
    image: "https://via.placeholder.com/150?text=The+Cottage.png",
    title: "Apartments",
    address: "123 Maple Drive, Lakeview",
    price: "$1,500/Month",
    beds: 4,
    baths: 1.5,
    status: "Hidden",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/150?text=Orchard+Valley.png",
    title: "Apartments",
    address: "456 Oak Lane, Rivertown",
    price: "$700/Month",
    beds: 1,
    baths: 1,
    status: "Active",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/150?text=The+White+House.png",
    title: "Condo",
    address: "789 Pine Street, Hilltop",
    price: "$1,000/Month",
    beds: 2,
    baths: 2,
    status: "Active",
  },
  {
    id: 4,
    image: "https://via.placeholder.com/150?text=The+Old+Post+Office.png",
    title: "Family Home",
    address: "321 Birch Road, Oldtown",
    price: "$1,200/Month",
    beds: 1,
    baths: 2,
    status: "Active",
  },
  {
    id: 5,
    image: "https://via.placeholder.com/150?text=The+Nook.png",
    title: "Shared Home",
    address: "654 Cedar Ave, Westwood",
    price: "$1,115/Month",
    beds: 3,
    baths: 1.5,
    status: "Active",
  },
];

const EditedPropertiesPage = () => {
  const [editedProperties, setEditedProperties] =
    useState(editedPropertiesData);
  const [selectedProperties, setSelectedProperties] = useState({});
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleCheckboxChange = (id) => {
    setSelectedProperties((prevSelectedProperties) => ({
      ...prevSelectedProperties,
      [id]: !prevSelectedProperties[id],
    }));
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const confirmDeletion = () => {
    const newEditedProperties = editedProperties.filter(
      (property) => !selectedProperties[property.id]
    );
    setEditedProperties(newEditedProperties);
    setSelectedProperties({});
    setShowDeleteConfirmation(false);
  };

  const cancelDeletion = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="bookmarkPage">
      <h1 className="header">Properties</h1>
      <table className="table">
        <thead>
          <tr>
            <th className="th"></th>
            <th className="th">Image</th>
            <th className="th">Title</th>
            <th className="th">Address</th>
            <th className="th">Price</th>
            <th className="th">Beds</th>
            <th className="th">Baths</th>
            <th className="th">Status</th>
            <th className="th"></th>
          </tr>
        </thead>
        <tbody>
          {editedProperties.map((property) => (
            <tr key={property.id}>
              <td className="td">
                <input
                  type="checkbox"
                  checked={!!selectedProperties[property.id]}
                  onChange={() => handleCheckboxChange(property.id)}
                />
              </td>
              <td className="td">
                <img
                  src={property.image}
                  alt={`${property.title} thumbnail`}
                  className="image"
                />
              </td>
              <td className="td">{property.title}</td>
              <td className="td">{property.address}</td>
              <td className="td">{property.price}</td>
              <td className="td">{property.beds}</td>
              <td className="td">{property.baths}</td>
              <td className="td">{property.status}</td>
              <td className="td">
                <Link to="/edit-listing">
                  <button className="viewButton">Edit Property</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {Object.values(selectedProperties).some((isSelected) => isSelected) && (
        <button className="deleteButton" onClick={handleDeleteClick}>
          Delete Listing
        </button>
      )}
      {showDeleteConfirmation && (
        <div className="confirmationBox">
          <p>Are you sure you want to delete the selected listings?</p>
          <button onClick={confirmDeletion}>Confirm</button>
          <button onClick={cancelDeletion}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default EditedPropertiesPage;
