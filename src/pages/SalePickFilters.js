import React, { useState} from "react";
import '../styling/App.css';
import NavigateToBrowse from './NavigateToBrowse'
import logo from '../logo.svg';
import star from '../star.png'
import axios from 'axios';
import {Routes, Route, useNavigate} from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';


function SalePickFilters({ location, props}) {

  console.log('postcode is ' + location)
  console.log('props is ' + props)

  const [state, setState] = useState({
        properties: ""
      });

   const [open, setOpen] = React.useState(false);

     const handleOpen = () => {
       setOpen(!open);
     };

  //get the locationId

  const navigate = useNavigate();

  const navigateToBrowse = () => {
        navigate('/browse');
 };

 <Routes>
      <Route path="/browse" render={(props) => <NavigateToBrowse {...props}/>} />
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
//                 const response = await axios.post(url, json, {headers: headers})
//
//                 console.log('response i want to display is ')
//                 console.log("%j", response.data)
//
//                 setState({
//                     ...state,
//                     properties: response.data
//                 });
//
//                console.log('setting state of properties to be ' + state.properties)
//
//                 debugger;
//                 console.log('posted now should be returning')
                 navigate("/browse")


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

             // Search radius correclates to &radius=0.5
             // search property type to &displayPropertyType=houses
  }

  console.log('outside of handle browse to post the url')

  if(!!location) {
     const title = 'Please pick sale filters for ' + location
     return (
        <div className="App">
              <p className="font">{title}</p>
              <div>
              <p className="font-filter">Select radius</p>
                            <select name="selectRadius" id="selectRadius">
                              <option value="0.0">This area only</option>
                              <option value="0.25">Within 1/4 mile</option>
                              <option value="0.5">Within 1/2 mile</option>
                              <option value="1.0">Within 1 mile</option>
                              <option value="3.0">Within 3 miles</option>
                              <option value="5.0">Within 5 miles</option>
                              <option value="10.0">Within 10 miles</option>
                              <option value="15.0">Within 15 miles</option>
                              <option value="30.0">Within 30 miles</option>
                              <option value="40.0">Within 40 miles</option>
                              <option value="50.0">Within 50 miles</option>
                            </select>
              </div>
              <div>
               <p className="font-filter">Property Type</p>
                                          <select name="selectPropertyType" id="selectPropertyType">
                                            <option value="" selected="selected">Any</option>
                                            <option value="houses">Houses</option>
                                            <option value="flats">Flats/Apartments</option>
                                            <option value="bungalows">Bungalows</option>
                                            <option value="land">Land</option>
                                            <option value="commercial">Commercial Property</option>
                                            <option value="other">Other</option>
                                            <option value="50.0">Within 50 miles</option>
                                          </select>
                            </div>
              <button className="button" onClick={handleBrowse} data-inline="true">Browse location</button>
        </div>
          );
  } else {
      return "";
  }
}

export default SalePickFilters;

