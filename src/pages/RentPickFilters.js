import React, { useState } from "react";
import '../styling/App.css';
import logo from '../logo.svg';
import star from '../star.png'


export default function RentPickFilters({ location }) {
    console.log('postcode is ' + location)

    async function handleBrowse(event) {
              event.preventDefault()

            }

if(!!location) {
   const title = 'Please pick rent filters for ' + location
   return (
        <div className="App">
           <header className="App-header">
            <p className="font">{title}</p>
            <button className="button" onClick={handleBrowse} data-inline="true">Browse location'</button>
          </header>
        </div>
        );
} else {
    return "";
}
}

