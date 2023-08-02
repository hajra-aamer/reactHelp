import React, { useState } from "react";
import './App.css';
import NavigateToBrowse from './NavigateToBrowse'
import logo from './logo.svg';
import star from './star.png'
import axios from 'axios';
import {Routes, Route, useNavigate} from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';


function SalePickFilters({ location }) {
  console.log('postcode is ' + location)

  const navigate = useNavigate();

  const navigateToBrowse = () => {
        navigate('/browse');
 };

 <Routes>
                    <Route path="/browse" element={<NavigateToBrowse/>} />
          </Routes>

  async function handleBrowse(event, props) {
            event.preventDefault()
            // encode the location
            // create the url
            // send to the backend

            const maxBedrooms = '';
            const minBedrooms = '';
            const maxPrice = '';
            const minPrice = '';
            const radius = '';
            const propertyTypes = '';
            const maxDaysSinceAdded = '';
            const includeSSTC = false;
            const mustHave = '';
            const dontShow = '';
            const furnishTypes = '';
            const keywords = '';

             console.log('handling sale filters')
             const url = `http:\/\/localhost:8080/http:\/\/127.0.0.1:5000/properties`
             event.preventDefault()

             const rightmoveUrl = `https:\/\/www.rightmove.co.uk/property-for-sale/find.html?maxBedrooms=${maxBedrooms}&locationIdentifier=OUTCODE%5E2737&minBedrooms=${minBedrooms}&maxPrice=${maxPrice}&minPrice=${minPrice}&radius=${radius}&propertyTypes=${propertyTypes}&maxDaysSinceAdded=${maxDaysSinceAdded}&includeSSTC=${includeSSTC}&mustHave=${mustHave}&dontShow=${dontShow}&furnishTypes=${furnishTypes}&keywords=${keywords}`

             const json = {
                 "url": rightmoveUrl
             }
             const headers = {
                'Content-Type': 'application/json'
             }

             try {
             event.preventDefault();
             console.log('about to post the url')
                 const response = await axios.post(url, json, {headers: headers})
                 debugger;
                 console.log('posted now should be returning')
                 navigate("/browse",{state :{ name : "raeon"}, replace:true})


//                 return props.history.push(`/browse`)
//                 return (
//                                           <div className="App">
//                                                 <p className="font">response is {response}</p>
//                                           </div>
//                                             );
//                 return (<NavigateToBrowse/>)

             } catch (err) {
                 console.error(err);
             }
  }

  console.log('outside of handle browse to post the url')

  if(!!location) {
     const title = 'Please pick sale filters for ' + location
     return (
        <div className="App">
              <p className="font">{title}</p>
              <button className="button" onClick={handleBrowse} data-inline="true">Browse location</button>
        </div>
          );
  } else {
      return "";
  }
}

export default SalePickFilters;

