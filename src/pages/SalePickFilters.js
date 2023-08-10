import React, { useState} from "react";
import '../styling/App.css';
import NavigateToBrowse from './NavigateToBrowse'
import logo from '../logo.svg';
import star from '../star.png'
import axios from 'axios';
import {Routes, Route, useNavigate} from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import Checkbox from '../components/Checkbox'


function SalePickFilters({ location, props}) {

  console.log('postcode is ' + location)
  console.log('props is ' + props)

  const [state, setState] = useState({
        properties: "",
        selectRadius: "",
        maxBedrooms: ""
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

 const handleChange = (e) => {
     const { value, name } = e.target;
     setState({
       ...state,
       [name]: value,
     });
   };

 <Routes>
      <Route path="/browse" render={(props) => <NavigateToBrowse {...props}/>} />
 </Routes>

  async function handleBrowse(event, props) {
            event.preventDefault()
            // encode the location
            // create the url
            // send to the backend

const selectRadius = '';
const maxBedrooms = '';
            console.log('selectRadius is ' + state.selectRadius)
            console.log('maxBedrooms is ' + state.maxBedrooms)
            console.log('minBedrooms is ' + state.minBedrooms)
            console.log('minPRices is ' + state.minPrice)
            console.log('maxPrice is ' + state.maxPrice)

            const minBedrooms = state.minBedrooms;
            const maxPrice = state.maxPrice;
            const minPrice = state.minPrice;
            const radius = state.selectRadius;
            const propertyTypes = state.noOfBedrooms;
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
              <span className="font-filter">Select radius</span>
                            <select className= "dropdown" name="selectRadius" id="selectRadius" onChange={handleChange}>
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
               <span className="font-filter">Property Type</span>
                                          <select className= "dropdown" name="propertyType" id="propertyType" onChange={handleChange}>
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
               <div>
                              <span className="font-filter">Price Range (£)</span>
                                                         <select className= "dropdown" className= "dropdown" name="minPrice" id="minPrice" onChange={handleChange}>
                                                           <option value="" selected="selected">No min</option>
                                                           <option value="50000">50,000</option>
                                                           <option value="60000">60,000</option>
                                                           <option value="70000">70,000</option>
                                                           <option value="80000">80,000</option>
                                                           <option value="90000">90,000</option>
                                                           <option value="100000">100,000</option>
                                                           <option value="110000">110,000</option>
                                                           <option value="120000">120,000</option>
                                                           <option value="125000">125,000</option>
                                                           <option value="130000">130,000</option>
                                                           <option value="140000">140,000</option>
                                                           <option value="150000">150,000</option>
                                                           <option value="160000">160,000</option>
                                                           <option value="170000">170,000</option>
                                                           <option value="175000">175,000</option>
                                                           <option value="180000">180,000</option>
                                                           <option value="190000">190,000</option>
                                                           <option value="200000">200,000</option>
                                                           <option value="210000">210,000</option>
                                                           <option value="220000">220,000</option>
                                                           <option value="230000">230,000</option>
                                                           <option value="240000">240,000</option>
                                                           <option value="250000">250,000</option>
                                                           <option value="260000">260,000</option>
                                                           <option value="270000">270,000</option>
                                                           <option value="280000">280,000</option>
                                                           <option value="290000">290,000</option>
                                                           <option value="300000">300,000</option>
                                                           <option value="325000">325,000</option>
                                                           <option value="350000">350,000</option>
                                                           <option value="375000">375,000</option>
                                                           <option value="400000">400,000</option>
                                                           <option value="425000">425,000</option>
                                                           <option value="450000">450,000</option>
                                                           <option value="475000">475,000</option>
                                                           <option value="500000">500,000</option>
                                                           <option value="550000">550,000</option>
                                                           <option value="600000">600,000</option>
                                                           <option value="650000">650,000</option>
                                                           <option value="700000">700,000</option>
                                                           <option value="800000">800,000</option>
                                                           <option value="900000">900,000</option>
                                                           <option value="1000000">1,000,000</option>
                                                           <option value="1250000">1,250,000</option>
                                                           <option value="1500000">1,500,000</option>
                                                           <option value="1750000">1,750,000</option>
                                                           <option value="2000000">2,000,000</option>
                                                           <option value="2500000">2,500,000</option>
                                                           <option value="3000000">3,000,000</option>
                                                           <option value="4000000">4,000,000</option>
                                                           <option value="5000000">5,000,000</option>
                                                           <option value="7000000">7,000,000</option>
                                                           <option value="10000000">10,000,000</option>
                                                           <option value="15000000">15,000,000</option>
                                                           <option value="20000000">20,000,000</option>
                                                         </select>
                                                         <select className= "dropdown" name="maxPrice" id="maxPRice" onChange={handleChange}>
                                                            <option value="" selected="selected">No max</option>
                                                            <option value="" selected="selected">No min</option>
                                                                                                                       <option value="50000">50,000</option>
                                                                                                                       <option value="60000">60,000</option>
                                                                                                                       <option value="70000">70,000</option>
                                                                                                                       <option value="80000">80,000</option>
                                                                                                                       <option value="90000">90,000</option>
                                                                                                                       <option value="100000">100,000</option>
                                                                                                                       <option value="110000">110,000</option>
                                                                                                                       <option value="120000">120,000</option>
                                                                                                                       <option value="125000">125,000</option>
                                                                                                                       <option value="130000">130,000</option>
                                                                                                                       <option value="140000">140,000</option>
                                                                                                                       <option value="150000">150,000</option>
                                                                                                                       <option value="160000">160,000</option>
                                                                                                                       <option value="170000">170,000</option>
                                                                                                                       <option value="175000">175,000</option>
                                                                                                                       <option value="180000">180,000</option>
                                                                                                                       <option value="190000">190,000</option>
                                                                                                                       <option value="200000">200,000</option>
                                                                                                                       <option value="210000">210,000</option>
                                                                                                                       <option value="220000">220,000</option>
                                                                                                                       <option value="230000">230,000</option>
                                                                                                                       <option value="240000">240,000</option>
                                                                                                                       <option value="250000">250,000</option>
                                                                                                                       <option value="260000">260,000</option>
                                                                                                                       <option value="270000">270,000</option>
                                                                                                                       <option value="280000">280,000</option>
                                                                                                                       <option value="290000">290,000</option>
                                                                                                                       <option value="300000">300,000</option>
                                                                                                                       <option value="325000">325,000</option>
                                                                                                                       <option value="350000">350,000</option>
                                                                                                                       <option value="375000">375,000</option>
                                                                                                                       <option value="400000">400,000</option>
                                                                                                                       <option value="425000">425,000</option>
                                                                                                                       <option value="450000">450,000</option>
                                                                                                                       <option value="475000">475,000</option>
                                                                                                                       <option value="500000">500,000</option>
                                                                                                                       <option value="550000">550,000</option>
                                                                                                                       <option value="600000">600,000</option>
                                                                                                                       <option value="650000">650,000</option>
                                                                                                                       <option value="700000">700,000</option>
                                                                                                                       <option value="800000">800,000</option>
                                                                                                                       <option value="900000">900,000</option>
                                                                                                                       <option value="1000000">1,000,000</option>
                                                                                                                       <option value="1250000">1,250,000</option>
                                                                                                                       <option value="1500000">1,500,000</option>
                                                                                                                       <option value="1750000">1,750,000</option>
                                                                                                                       <option value="2000000">2,000,000</option>
                                                                                                                       <option value="2500000">2,500,000</option>
                                                                                                                       <option value="3000000">3,000,000</option>
                                                                                                                       <option value="4000000">4,000,000</option>
                                                                                                                       <option value="5000000">5,000,000</option>
                                                                                                                       <option value="7000000">7,000,000</option>
                                                                                                                       <option value="10000000">10,000,000</option>
                                                                                                                       <option value="15000000">15,000,000</option>
                                                                                                                       <option value="20000000">20,000,000</option>
                                                         </select>
                              </div>

                              <div>
                                 <span className="font-filter">No. of bedrooms</span>
                                   <select className= "dropdown" name="minBedrooms" id="minBedrooms" onChange={handleChange}>
                                       <option value="" selected="selected">No min</option>
                                       <option value="0">Studio</option>
                                       <option value="1">1</option>
                                       <option value="2">2</option>
                                       <option value="3">3</option>
                                       <option value="4">4</option>
                                       <option value="5">5</option>
                                   </select>
                                   <select className= "dropdown" name="maxBedrooms" id="maxBedrooms" onChange={handleChange}>
                                       <option value="" selected="selected">No max</option>
                                       <option value="0">Studio</option>
                                       <option value="1">1</option>
                                       <option value="2">2</option>
                                       <option value="3">3</option>
                                       <option value="4">4</option>
                                       <option value="5">5</option>
                                   </select>
                              </div>

                              <div>
                                  <span className="font-filter">Added to site</span>
                                    <select className= "dropdown" name="noOfBedrooms" id="noOfBedrooms" onChange={handleChange}>
                                       <option value="" selected="selected">Anytime</option>
                                       <option value="1">Last 24 hours</option>
                                       <option value="3">Last 3 days</option>
                                       <option value="7">Last 7 days</option>
                                       <option value="14">Last 14 days</option>
                                    </select>
                              </div>

                              <Checkbox className="font-filter" label="Include Under Offer, Sold STC... (?)" />


              <button className="button" onClick={handleBrowse} data-inline="true">Browse location</button>
        </div>
          );
  } else {
      return "";
  }
}

export default SalePickFilters;

