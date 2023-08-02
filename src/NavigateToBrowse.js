import React, { useState } from "react";
import './App.css';
import logo from './logo.svg';
import star from './star.png'
import axios from 'axios';


export default function NavigateToBrowse() {

console.log('in browsing')

  async function handleBrowse(event) {

  console.log('in browsing')
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
                 const response = await axios.post(url, json, {headers: headers})
                 console.log(response)

                  return (
                          <div className="App">
                                <p className="font">response is {response}</p>
                          </div>
                            );
             } catch (err) {
                 console.error(err);
             }
  }

  return (
          <div className="App">
          const number =
                <p className="font">X number of properties found</p>
                <button className="button" onClick={handleBrowse} data-inline="true">Browse location</button>
          </div>
            );
 }

