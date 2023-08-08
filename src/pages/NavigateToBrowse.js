import React, { useState, useEffect, useContext } from "react";
import "../styling/App.css";
import axios from "axios";
import { responseContext, locationContext } from "../context/responseContext.js";

export default function NavigateToBrowse(props, state) {
  const { response } = useContext(responseContext);
  const { location } = useContext(locationContext);
  console.log(response);
  console.log("in browsing");
  const maxBedrooms = "";
  const minBedrooms = "";
  const maxPrice = "";
  const minPrice = "";
  const radius = "";
  const propertyTypes = "";
  const maxDaysSinceAdded = "";
  const includeSSTC = false;
  const mustHave = "";
  const dontShow = "";
  const furnishTypes = "";
  const keywords = "";

  const url = `http://localhost:8080/http://127.0.0.1:5000/properties`;

  const rightmoveUrl = `https://www.rightmove.co.uk/property-for-sale/find.html?maxBedrooms=${maxBedrooms}&locationIdentifier=OUTCODE%5E2737&minBedrooms=${minBedrooms}&maxPrice=${maxPrice}&minPrice=${minPrice}&radius=${radius}&propertyTypes=${propertyTypes}&maxDaysSinceAdded=${maxDaysSinceAdded}&includeSSTC=${includeSSTC}&mustHave=${mustHave}&dontShow=${dontShow}&furnishTypes=${furnishTypes}&keywords=${keywords}`;

  const json = {
    url: rightmoveUrl,
  };
  const headers = {
    "Content-Type": "application/json",
  };

  const [Listing, setListing] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // const response = await axios.post(url, json, { headers: headers });
      // setListing(response.data);
      // console.log("final response is ");
      // console.log(response.data);
    };

    fetchData();
  }, []);

  //                <div>
  //                      {list. Map((item) => (
  //                        <div key={item}>{item}</div>
  //                      ))}
  //                    </div>

  async function handleBrowse(event) {
    console.log("in browsing");
  }

  return (
    <div className="App">
      const number =<p className="font">X number of properties found</p>
      <button className="button" onClick={handleBrowse} data-inline="true">
        Browse location
      </button>
      {response[0].map((item, index) => {
        return (
          <div key={index}>
            <img src={item.propertyImages.images[0].srcUrl} alt="" />
            <br />
            <p>{item.displayAddress}</p>
          </div>
        );
      })}
    </div>
  );
}
