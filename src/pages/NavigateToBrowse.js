import React, { useState, useEffect, useContext } from "react";
import "../styling/App.css";
import axios from "axios";
import { responseContext } from "../context/responseContext.js";
import { postcodeContext } from "../context/postcodeContext.js";

export default function NavigateToBrowse(props, state) {
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
  // first, access the response setResponse
  const { response, setResponse } = useContext(responseContext);

  const url = `http://localhost:8080/http://127.0.0.1:5000/properties`;

  const rightmoveUrl = `https://www.rightmove.co.uk/property-for-sale/find.html?maxBedrooms=${maxBedrooms}&locationIdentifier=OUTCODE%5E2737&minBedrooms=${minBedrooms}&maxPrice=${maxPrice}&minPrice=${minPrice}&radius=${radius}&propertyTypes=${propertyTypes}&maxDaysSinceAdded=${maxDaysSinceAdded}&includeSSTC=${includeSSTC}&mustHave=${mustHave}&dontShow=${dontShow}&furnishTypes=${furnishTypes}&keywords=${keywords}`;

  const json = {
    url: rightmoveUrl,
  };
  const headers = {
    "Content-Type": "application/json",
  };

  const [Listing, setListing] = useState([]);
  // access postcode
  const { postcode } = useContext(postcodeContext)
  useEffect(() => {
    // TODO THIS RESPONSE IS WHAT I WANT TO DIS|PLAY IN THE HTML BELOW
    const fetchData = async () => {
      console.log("sending request from navigate to browse....")
      console.log(`Postcode is: ${postcode}`)
      // const response = await axios.post(url, json, { headers: headers });
      const response = [
        [
        {
        "addedOrReduced": "Added on 11/07/2023",
        "auction": false,
        "bathrooms": null,
        "bedrooms": 3,
        "channel": "BUY",
        "commercial": false,
        "contactUrl": "/property-for-sale/contactBranch.html?propertyId=137177411",
        "countryCode": "GB",
        "customer": {
        "branchDisplayName": "Barratt London",
        "branchId": 208460,
        "branchLandingPageUrl": "/developer/branch/Barratt-London/Hayes-Village-208460.html",
        "branchName": "Hayes Village",
        "brandPlusLogoURI": "/brand/brand_rmchoice_logo_80444_0000.jpeg",
        "brandPlusLogoUrl": "https://media.rightmove.co.uk:443/dir/brand/brand_rmchoice_logo_80444_0000_max_100x50.jpeg",
        "brandTradingName": "Barratt London",
        "buildToRent": false,
        "buildToRentBenefits": [],
        "commercial": false,
        "contactTelephone": "01702 967262",
        "development": true,
        "developmentContent": {
        "features": [
        "Under 10 minutes to Hayes & Harlington Station (served by Crossrail)",
        "Reach Bond Street in 20 minutes",
        "Car club for residents",
        "New canal-side realm"
        ],
        "headline": "Hayes Village"
        },
        "enhancedListing": true,
        "showOnMap": true,
        "showReducedProperties": true
        },
        "development": true,
        "displayAddress": "Nestles Avenue,\r\nHayes,\r\nUB3 4QF",
        "displaySize": "",
        "displayStatus": "",
        "distance": null,
        "enhancedListing": false,
        "enquiredTimestamp": null,
        "featuredProperty": true,
        "feesApply": false,
        "feesApplyText": null,
        "firstVisibleDate": "2023-07-11T02:53:50Z",
        "formattedBranchName": " by Barratt London",
        "formattedDistance": "",
        "hasBrandPlus": true,
        "heading": "Featured New Home",
        "hidden": false,
        "id": 137177411,
        "isRecent": false,
        "keywordMatchType": "no_keyword",
        "keywords": [],
        "listingUpdate": {
        "listingUpdateDate": "2023-07-11T02:59:02Z",
        "listingUpdateReason": "new"
        },
        "location": {
        "latitude": 51.50068,
        "longitude": -0.41665
        },
        "lozengeModel": {
        "matchingLozenges": [
        {
        "priority": 3,
        "type": "NEW_HOME"
        }
        ]
        },
        "numberOfFloorplans": 1,
        "numberOfImages": 10,
        "numberOfVirtualTours": 6,
        "onlineViewingsAvailable": false,
        "premiumListing": true,
        "price": {
        "amount": 556000,
        "currencyCode": "GBP",
        "displayPrices": [
        {
        "displayPrice": "Â£556,000",
        "displayPriceQualifier": ""
        }
        ],
        "frequency": "not specified"
        },
        "productLabel": {
        "productLabelText": "Move In Now",
        "spotlightLabel": true
        },
        "propertyImages": {
        "images": [
        {
        "caption": "living",
        "srcUrl": "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/209k/208460/137177411/208460_3_H7253254_IMG_06_0016_max_476x317.jpeg",
        "url": "209k/208460/137177411/208460_3_H7253254_IMG_06_0016.jpeg"
        },
        {
        "caption": "Wallis Gardens",
        "srcUrl": "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/209k/208460/137177411/208460_3_H7253254_IMG_01_0000_max_476x317.jpeg",
        "url": "209k/208460/137177411/208460_3_H7253254_IMG_01_0000.jpeg"
        },
        {
        "caption": "Living Room",
        "srcUrl": "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/209k/208460/137177411/208460_3_H7253254_IMG_02_0000_max_476x317.jpeg",
        "url": "209k/208460/137177411/208460_3_H7253254_IMG_02_0000.jpeg"
        },
        {
        "caption": "Hayes",
        "srcUrl": "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/209k/208460/137177411/208460_3_H7253254_IMG_07_0016_max_476x317.jpeg",
        "url": "209k/208460/137177411/208460_3_H7253254_IMG_07_0016.jpeg"
        },
        {
        "caption": "Hayes Village",
        "srcUrl": "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/209k/208460/137177411/208460_3_H7253254_IMG_04_0000_max_476x317.jpeg",
        "url": "209k/208460/137177411/208460_3_H7253254_IMG_04_0000.jpeg"
        },
        {
        "caption": "hayes bathroom dufour image 1",
        "srcUrl": "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/209k/208460/137177411/208460_3_H7253254_IMG_05_0000_max_476x317.jpeg",
        "url": "209k/208460/137177411/208460_3_H7253254_IMG_05_0000.jpeg"
        },
        {
        "caption": "Canalside",
        "srcUrl": "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/209k/208460/137177411/208460_3_H7253254_IMG_32_0017_max_476x317.jpeg",
        "url": "209k/208460/137177411/208460_3_H7253254_IMG_32_0017.jpeg"
        },
        {
        "caption": "Hayes External",
        "srcUrl": "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/209k/208460/137177411/208460_3_H7253254_IMG_31_0003_max_476x317.jpeg",
        "url": "209k/208460/137177411/208460_3_H7253254_IMG_31_0003.jpeg"
        },
        {
        "caption": "LocalArea",
        "srcUrl": "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/209k/208460/137177411/208460_3_H7253254_IMG_25_0000_max_476x317.jpeg",
        "url": "209k/208460/137177411/208460_3_H7253254_IMG_25_0000.jpeg"
        },
        {
        "caption": "VictoriaandRyan",
        "srcUrl": "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/209k/208460/137177411/208460_3_H7253254_IMG_17_0000_max_476x317.jpeg",
        "url": "209k/208460/137177411/208460_3_H7253254_IMG_17_0000.jpeg"
        }
        ],
        "mainImageSrc": "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/209k/208460/137177411/208460_3_H7253254_IMG_06_0016_max_476x317.jpeg",
        "mainMapImageSrc": "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/209k/208460/137177411/208460_3_H7253254_IMG_06_0016_max_296x197.jpeg"
        },
        "propertySubType": "Apartment",
        "propertyTypeFullDescription": "3 bedroom apartment for sale",
        "propertyUrl": "/properties/137177411#/?channel=RES_BUY",
        "residential": true,
        "saved": false,
        "showOnMap": true,
        "staticMapUrl": null,
        "students": false,
        "summary": "THIS SPACIOUS THREE-BEDROOM APARTMENT COMES WITH MODERN INTERIOR DESIGN AND SCENIC LIVING, THAT CAN BE ENJOYED ON YOUR PRIVATE 17FT BALCONY AREA OVERLOOKING THE LANDSCAPED GARDENS AT HAYES VILLAGE.Â Additional benefits of this home are the large utility room, open plan living and plenty of space t...",
        "transactionType": "buy"
        },
        {
        "addedOrReduced": "Added on 17/05/2023",
        "auction": false,
        "bathrooms": 0,
        "bedrooms": 8,
        "channel": "BUY",
        "commercial": false,
        "contactUrl": "/property-for-sale/contactBranch.html?propertyId=134914577",
        "countryCode": "GB",
        "customer": {
        "branchDisplayName": "Move Inn Estates, Heston",
        "branchId": 113317,
        "branchLandingPageUrl": "/estate-agents/agent/Move-Inn-Estates/Heston-113317.html",
        "branchName": "Heston",
        "brandPlusLogoURI": "/114k/113317/branch_rmchoice_logo_113317_0007.jpeg",
        "brandPlusLogoUrl": "https://media.rightmove.co.uk:443/dir/114k/113317/branch_rmchoice_logo_113317_0007_max_100x50.jpeg",
        "brandTradingName": "Move Inn Estates",
        "buildToRent": false,
        "buildToRentBenefits": [],
        "commercial": false,
        "contactTelephone": "020 3835 3655",
        "development": false,
        "developmentContent": null,
        "enhancedListing": false,
        "showOnMap": true,
        "showReducedProperties": true
        },
        "development": false,
        "displayAddress": "Cromwell Road, Hayes",
        "displaySize": "",
        "displayStatus": "",
        "distance": null,
        "enhancedListing": false,
        "enquiredTimestamp": null,
        "featuredProperty": false,
        "feesApply": false,
        "feesApplyText": null,
        "firstVisibleDate": "2023-05-17T16:38:55Z",
        "formattedBranchName": " by Move Inn Estates, Heston",
        "formattedDistance": "",
        "hasBrandPlus": true,
        "heading": "",
        "hidden": false,
        "id": 134914577,
        "isRecent": false,
        "keywordMatchType": "no_keyword",
        "keywords": [],
        "listingUpdate": {
        "listingUpdateDate": "2023-05-17T16:44:04Z",
        "listingUpdateReason": "new"
        },
        "location": {
        "latitude": 51.520202,
        "longitude": -0.433953
        },
        "lozengeModel": {
        "matchingLozenges": []
        },
        "numberOfFloorplans": 0,
        "numberOfImages": 21,
        "numberOfVirtualTours": 0,
        "onlineViewingsAvailable": false,
        "premiumListing": false,
        "price": {
        "amount": 2050000,
        "currencyCode": "GBP",
        "displayPrices": [
        {
        "displayPrice": "Â£2,050,000",
        "displayPriceQualifier": "Guide Price"
        }
        ],
        "frequency": "not specified"
        },
        "productLabel": {
        "productLabelText": "",
        "spotlightLabel": false
        },
        "propertyImages": {
        "images": [
        {
        "caption": "9236_31885806_IMG_20_0000.jpeg",
        "srcUrl": "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/134914577/113317_32322190_IMG_00_0000_max_476x317.jpeg",
        "url": "114k/113317/134914577/113317_32322190_IMG_00_0000.jpeg"
        },
        {
        "caption": "9236_31885806_IMG_19_0000.jpeg",
        "srcUrl": "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/134914577/113317_32322190_IMG_01_0000_max_476x317.jpeg",
        "url": "114k/113317/134914577/113317_32322190_IMG_01_0000.jpeg"
        },
        {
        "caption": "9236_31885806_IMG_18_0000.jpeg",
        "srcUrl": "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/134914577/113317_32322190_IMG_02_0000_max_476x317.jpeg",
        "url": "114k/113317/134914577/113317_32322190_IMG_02_0000.jpeg"
        },
        {
        "caption": "9236_31885806_IMG_17_0000.jpeg",
        "srcUrl": "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/134914577/113317_32322190_IMG_03_0000_max_476x317.jpeg",
        "url": "114k/113317/134914577/113317_32322190_IMG_03_0000.jpeg"
        },
        {
        "caption": "9236_31885806_IMG_16_0000.jpeg",
        "srcUrl": "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/134914577/113317_32322190_IMG_04_0000_max_476x317.jpeg",
        "url": "114k/113317/134914577/113317_32322190_IMG_04_0000.jpeg"
        },
        {
        "caption": "9236_31885806_IMG_15_0000.jpeg",
        "srcUrl": "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/134914577/113317_32322190_IMG_05_0000_max_476x317.jpeg",
        "url": "114k/113317/134914577/113317_32322190_IMG_05_0000.jpeg"
        },
        {
        "caption": "9236_31885806_IMG_14_0000.jpeg",
        "srcUrl": "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/134914577/113317_32322190_IMG_06_0000_max_476x317.jpeg",
        "url": "114k/113317/134914577/113317_32322190_IMG_06_0000.jpeg"
        },
        {
        "caption": "9236_31885806_IMG_13_0000.jpeg",
        "srcUrl": "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/134914577/113317_32322190_IMG_07_0000_max_476x317.jpeg",
        "url": "114k/113317/134914577/113317_32322190_IMG_07_0000.jpeg"
        },
        {
        "caption": "9236_31885806_IMG_12_0000.jpeg",
        "srcUrl": "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/134914577/113317_32322190_IMG_08_0000_max_476x317.jpeg",
        "url": "114k/113317/134914577/113317_32322190_IMG_08_0000.jpeg"
        },
        {
        "caption": "9236_31885806_IMG_11_0000.jpeg",
        "srcUrl": "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/134914577/113317_32322190_IMG_09_0000_max_476x317.jpeg",
        "url": "114k/113317/134914577/113317_32322190_IMG_09_0000.jpeg"
        },
        {
        "caption": "9236_31885806_IMG_10_0000.jpeg",
        "srcUrl": "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/134914577/113317_32322190_IMG_10_0000_max_476x317.jpeg",
        "url": "114k/113317/134914577/113317_32322190_IMG_10_0000.jpeg"
        },
        {
        "caption": "9236_31885806_IMG_09_0000.jpeg",
        "srcUrl": "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/134914577/113317_32322190_IMG_11_0000_max_476x317.jpeg",
        "url": "114k/113317/134914577/113317_32322190_IMG_11_0000.jpeg"
        },
        {
        "caption": "9236_31885806_IMG_08_0000.jpeg",
        "srcUrl": "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/134914577/113317_32322190_IMG_12_0000_max_476x317.jpeg",
        "url": "114k/113317/134914577/113317_32322190_IMG_12_0000.jpeg"
        },
        {
        "caption": "9236_31885806_IMG_07_0000.jpeg",
        "srcUrl": "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/134914577/113317_32322190_IMG_13_0000_max_476x317.jpeg",
        "url": "114k/113317/134914577/113317_32322190_IMG_13_0000.jpeg"
        },
        {
        "caption": "9236_31885806_IMG_06_0000.jpeg",
        "srcUrl": "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/134914577/113317_32322190_IMG_14_0000_max_476x317.jpeg",
        "url": "114k/113317/134914577/113317_32322190_IMG_14_0000.jpeg"
        },
        {
        "caption": "9236_31885806_IMG_05_0000.jpeg",
        "srcUrl": "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/134914577/113317_32322190_IMG_15_0000_max_476x317.jpeg",
        "url": "114k/113317/134914577/113317_32322190_IMG_15_0000.jpeg"
        },
        {
        "caption": "9236_31885806_IMG_04_0000.jpeg",
        "srcUrl": "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/134914577/113317_32322190_IMG_16_0000_max_476x317.jpeg",
        "url": "114k/113317/134914577/113317_32322190_IMG_16_0000.jpeg"
        },
        {
        "caption": "9236_31885806_IMG_03_0000.jpeg",
        "srcUrl": "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/134914577/113317_32322190_IMG_17_0000_max_476x317.jpeg",
        "url": "114k/113317/134914577/113317_32322190_IMG_17_0000.jpeg"
        },
        {
        "caption": "9236_31885806_IMG_02_0000.jpeg",
        "srcUrl": "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/134914577/113317_32322190_IMG_18_0000_max_476x317.jpeg",
        "url": "114k/113317/134914577/113317_32322190_IMG_18_0000.jpeg"
        },
        {
        "caption": "9236_31885806_IMG_01_0000.jpeg",
        "srcUrl": "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/134914577/113317_32322190_IMG_19_0000_max_476x317.jpeg",
        "url": "114k/113317/134914577/113317_32322190_IMG_19_0000.jpeg"
        },
        {
        "caption": "9236_31885806_IMG_00_0000.jpeg",
        "srcUrl": "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/134914577/113317_32322190_IMG_20_0000_max_476x317.jpeg",
        "url": "114k/113317/134914577/113317_32322190_IMG_20_0000.jpeg"
        }
        ],
        "mainImageSrc": "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/134914577/113317_32322190_IMG_00_0000_max_476x317.jpeg",
        "mainMapImageSrc": "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/134914577/113317_32322190_IMG_00_0000_max_296x197.jpeg"
        },
        "propertySubType": "Apartment",
        "propertyTypeFullDescription": "8 bedroom apartment for sale",
        "propertyUrl": "/properties/134914577#/?channel=RES_BUY",
        "residential": true,
        "saved": false,
        "showOnMap": true,
        "staticMapUrl": null,
        "students": false,
        "summary": "An opportunity to acquire an investment opportunity comprising of 8 one bedroom flats and 9 garages. An opportunity to acquire an investment opportunity comprising of 8 one bedroom flats and 9 garages. There may be potential to re-develop to add another storey to create further dwellings...",
        "transactionType": "buy"
        }
        ]
        ]
      // setListing(response.data);
      console.log("final response is ");
      console.log(response[0]);
      //      try {
      //        const newResponse = await axios.post(url, json, { headers: headers });
      setResponse(response.data);
      //      } catch (error) {
      //        throw new Error(error);
      //      }
    };

    fetchData();
  }, [postcode]);

  //                <div>
  //                      {list. Map((item) => (
  //                        <div key={item}>{item}</div>
  //                      ))}
  //                    </div>

  async function handleBrowse(event) {
    console.log("in browsing");
  }

  return (
    <responseContext.Provider value={{ response, setResponse }}>
      <div className="App">
        const number =<p className="font">X number of properties found</p>
        <button className="button" onClick={handleBrowse} data-inline="true">
          Browse location
        </button>
        {/* {response[0].map((item, index) => {
        return (
          <div key={index}>
            <img src={item.propertyImages.images[0].srcUrl} alt="" />
            <br />
            <p>{item.displayAddress}</p>
          </div>
        );
      })} */}
      </div>
    </responseContext.Provider>
  );
}
