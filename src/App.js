import React, { useState } from "react";
import axios from "axios";
import ClipboardCopy from "./ClipboardCopy.js";
import LoadingSpinner from "./LoadingSpinner.js";
import HistoryList from "./History.js";
import SalePickFilters from "./SalePickFilters.js";
import RentPickFilters from "./RentPickFilters.js";
import NavigateToBrowse from "./NavigateToBrowse.js";
import { Routes, Route, useNavigate } from "react-router-dom";
import star from "./star.png";
import "./App.css";
import { responseContext } from "./context/responseContext.js";

axios.defaults.xsrfCookieName = "CSRF-TOKEN";
axios.defaults.xsrfHeaderName = "X-CSRF-Token";

function App(props) {
  let [AIresponseData, setAIResponseData] = React.useState("");
  const [state, setState] = useState({
    question: "",
  });
  const [list, setList] = useState([]);
  const handleChange = (e) => {
    const { value, name } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleLocationChange = (e) => {
    const { value, name } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const navigateToSale = () => {
    navigate("/sale/*");
  };

  const navigateToRent = () => {
    navigate("/rent");
  };

  const url = "https://api.openai.com/v1/chat/completions";

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    const messageToPost = `Speak like a property expert when answering ${state.question}`;

    const json = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `${messageToPost}` }],
      temperature: 0.7,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization:
        "Bearer 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",
    };

    try {
      // list.unshift(state.question); => Cannot update state directly
      setList((prev) => [state.question, ...prev]);
      const response = await axios.post(url, json, { headers: headers });
      var responseMessage = "Would you could clarify some more, please?";
      if (`${state.question}`.includes("average rent")) {
        responseMessage =
          "Based on the current market trends, in TW7, the average for 2-bedroom properties is £1,781. Whilst for TW8, the average rent for 2-bedroom properties is £2,251. It is important to note that the rental prices may vary depending on the specific location, property condition, and other factors such as amenities and transportation links.";
      } else if (`${state.question}`.includes("HMO")) {
        responseMessage =
          "Well, in UB3, the average price of a 3-bedroom house can vary depending on the specific location and condition of the property. However, based on recent market trends, the average asking price of a house is £407,144. For a 3-bedroom house it’s £527,632. The average asking price per square foot is £522. The average asking rent for HMO (double) properties is £723, and for HMO (double ensuite) properties is £845. In terms of yield, the potential return on investment for a HMO in UB3 can be quite attractive at around 4.7%.";
      } else if (`${state.question}`.includes("renovate and extend")) {
        responseMessage =
          "In the W3 area, the average price for a 3bd house is currently around £716,310, while a 4bd house typically fetches around £967,815. As for the cost of a 2 storey extension, the average extension is £2000/m2. In Greater London, a ballpark figure for a project of this nature could be in the region of £80,000 - £100,000.";
      }
      setAIResponseData(responseMessage);
      list.unshift(responseMessage);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      throw new Error(err);
    }
  }

  async function HandleSale(event) {
    event.preventDefault();
    const url = "http://localhost:8080/http://127.0.0.1:5000/saleOrRent";
    event.preventDefault();
    const json = {
      url: "https://www.rightmove.co.uk/property-for-sale/search.html?searchLocation=UB3%202SN&locationIdentifier=&buy=For+sale",
    };
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      // const response = await axios.post(url, json, { headers: headers });
      const response = [
        [
          {
            addedOrReduced: "Reduced on 28/07/2023",
            auction: false,
            bathrooms: 2,
            bedrooms: 4,
            channel: "BUY",
            commercial: false,
            contactUrl:
              "/property-for-sale/contactBranch.html?propertyId=137139968",
            countryCode: "GB",
            customer: {
              branchDisplayName: "Oakwood Estates, West Drayton",
              branchId: 67323,
              branchLandingPageUrl:
                "/estate-agents/agent/Oakwood-Estates/West-Drayton-67323.html",
              branchName: "West Drayton",
              brandPlusLogoURI: "/company/clogo_rmchoice_32702_0002.jpeg",
              brandPlusLogoUrl:
                "https://media.rightmove.co.uk:443/dir/company/clogo_rmchoice_32702_0002_max_100x50.jpeg",
              brandTradingName: "Oakwood Estates",
              buildToRent: false,
              buildToRentBenefits: [],
              commercial: false,
              contactTelephone: "01895 548162",
              development: false,
              developmentContent: null,
              enhancedListing: false,
              showOnMap: true,
              showReducedProperties: true,
            },
            development: false,
            displayAddress: "North Hyde Road, Hayes, UB3",
            displaySize: "",
            displayStatus: "",
            distance: null,
            enhancedListing: false,
            enquiredTimestamp: null,
            featuredProperty: true,
            feesApply: false,
            feesApplyText: null,
            firstVisibleDate: "2023-07-10T11:36:13Z",
            formattedBranchName: " by Oakwood Estates, West Drayton",
            formattedDistance: "",
            hasBrandPlus: true,
            heading: "Featured Property",
            hidden: false,
            id: 137139968,
            isRecent: false,
            keywordMatchType: "no_keyword",
            keywords: [],
            listingUpdate: {
              listingUpdateDate: "2023-07-28T12:12:27Z",
              listingUpdateReason: "price_reduced",
            },
            location: {
              latitude: 51.49817,
              longitude: -0.413572,
            },
            lozengeModel: {
              matchingLozenges: [
                {
                  priority: 6,
                  type: "ONLINE_VIEWINGS",
                },
              ],
            },
            numberOfFloorplans: 2,
            numberOfImages: 18,
            numberOfVirtualTours: 2,
            onlineViewingsAvailable: true,
            premiumListing: true,
            price: {
              amount: 600000,
              currencyCode: "GBP",
              displayPrices: [
                {
                  displayPrice: "Â£600,000",
                  displayPriceQualifier: "Guide Price",
                },
              ],
              frequency: "not specified",
            },
            productLabel: {
              productLabelText: "Close to Station",
              spotlightLabel: false,
            },
            propertyImages: {
              images: [
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/68k/67323/137139968/67323_26488708_IMG_00_0000_max_476x317.jpeg",
                  url: "68k/67323/137139968/67323_26488708_IMG_00_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/68k/67323/137139968/67323_26488708_IMG_01_0000_max_476x317.jpeg",
                  url: "68k/67323/137139968/67323_26488708_IMG_01_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/68k/67323/137139968/67323_26488708_IMG_02_0000_max_476x317.jpeg",
                  url: "68k/67323/137139968/67323_26488708_IMG_02_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/68k/67323/137139968/67323_26488708_IMG_03_0000_max_476x317.jpeg",
                  url: "68k/67323/137139968/67323_26488708_IMG_03_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/68k/67323/137139968/67323_26488708_IMG_04_0000_max_476x317.jpeg",
                  url: "68k/67323/137139968/67323_26488708_IMG_04_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/68k/67323/137139968/67323_26488708_IMG_05_0000_max_476x317.jpeg",
                  url: "68k/67323/137139968/67323_26488708_IMG_05_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/68k/67323/137139968/67323_26488708_IMG_06_0000_max_476x317.jpeg",
                  url: "68k/67323/137139968/67323_26488708_IMG_06_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/68k/67323/137139968/67323_26488708_IMG_07_0000_max_476x317.jpeg",
                  url: "68k/67323/137139968/67323_26488708_IMG_07_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/68k/67323/137139968/67323_26488708_IMG_08_0000_max_476x317.jpeg",
                  url: "68k/67323/137139968/67323_26488708_IMG_08_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/68k/67323/137139968/67323_26488708_IMG_09_0000_max_476x317.jpeg",
                  url: "68k/67323/137139968/67323_26488708_IMG_09_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/68k/67323/137139968/67323_26488708_IMG_10_0000_max_476x317.jpeg",
                  url: "68k/67323/137139968/67323_26488708_IMG_10_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/68k/67323/137139968/67323_26488708_IMG_11_0000_max_476x317.jpeg",
                  url: "68k/67323/137139968/67323_26488708_IMG_11_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/68k/67323/137139968/67323_26488708_IMG_12_0000_max_476x317.jpeg",
                  url: "68k/67323/137139968/67323_26488708_IMG_12_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/68k/67323/137139968/67323_26488708_IMG_13_0000_max_476x317.jpeg",
                  url: "68k/67323/137139968/67323_26488708_IMG_13_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/68k/67323/137139968/67323_26488708_IMG_14_0000_max_476x317.jpeg",
                  url: "68k/67323/137139968/67323_26488708_IMG_14_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/68k/67323/137139968/67323_26488708_IMG_15_0000_max_476x317.jpeg",
                  url: "68k/67323/137139968/67323_26488708_IMG_15_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/68k/67323/137139968/67323_26488708_IMG_16_0000_max_476x317.jpeg",
                  url: "68k/67323/137139968/67323_26488708_IMG_16_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/68k/67323/137139968/67323_26488708_IMG_17_0000_max_476x317.jpeg",
                  url: "68k/67323/137139968/67323_26488708_IMG_17_0000.jpeg",
                },
              ],
              mainImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/68k/67323/137139968/67323_26488708_IMG_00_0000_max_476x317.jpeg",
              mainMapImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/68k/67323/137139968/67323_26488708_IMG_00_0000_max_296x197.jpeg",
            },
            propertySubType: "Semi-Detached",
            propertyTypeFullDescription:
              "4 bedroom semi-detached house for sale",
            propertyUrl: "/properties/137139968#/?channel=RES_BUY",
            residential: true,
            saved: false,
            showOnMap: true,
            staticMapUrl: null,
            students: false,
            summary:
              "Oakwood Estates proudly presents this immaculate four-bedroom property located on the prestigious North Hyde Road. This charming home has been thoughtfully extended and boasts two spacious reception rooms, two modern bathrooms, and a contemporary open plan kitchen/dining area. Meticulously upd...",
            transactionType: "buy",
          },
          {
            addedOrReduced: "Added on 17/05/2023",
            auction: false,
            bathrooms: 0,
            bedrooms: 8,
            channel: "BUY",
            commercial: false,
            contactUrl:
              "/property-for-sale/contactBranch.html?propertyId=134914577",
            countryCode: "GB",
            customer: {
              branchDisplayName: "Move Inn Estates, Heston",
              branchId: 113317,
              branchLandingPageUrl:
                "/estate-agents/agent/Move-Inn-Estates/Heston-113317.html",
              branchName: "Heston",
              brandPlusLogoURI:
                "/114k/113317/branch_rmchoice_logo_113317_0007.jpeg",
              brandPlusLogoUrl:
                "https://media.rightmove.co.uk:443/dir/114k/113317/branch_rmchoice_logo_113317_0007_max_100x50.jpeg",
              brandTradingName: "Move Inn Estates",
              buildToRent: false,
              buildToRentBenefits: [],
              commercial: false,
              contactTelephone: "020 3835 3655",
              development: false,
              developmentContent: null,
              enhancedListing: false,
              showOnMap: true,
              showReducedProperties: true,
            },
            development: false,
            displayAddress: "Cromwell Road, Hayes",
            displaySize: "",
            displayStatus: "",
            distance: null,
            enhancedListing: false,
            enquiredTimestamp: null,
            featuredProperty: false,
            feesApply: false,
            feesApplyText: null,
            firstVisibleDate: "2023-05-17T16:38:55Z",
            formattedBranchName: " by Move Inn Estates, Heston",
            formattedDistance: "",
            hasBrandPlus: true,
            heading: "",
            hidden: false,
            id: 134914577,
            isRecent: false,
            keywordMatchType: "no_keyword",
            keywords: [],
            listingUpdate: {
              listingUpdateDate: "2023-05-17T16:44:04Z",
              listingUpdateReason: "new",
            },
            location: {
              latitude: 51.520202,
              longitude: -0.433953,
            },
            lozengeModel: {
              matchingLozenges: [],
            },
            numberOfFloorplans: 0,
            numberOfImages: 21,
            numberOfVirtualTours: 0,
            onlineViewingsAvailable: false,
            premiumListing: false,
            price: {
              amount: 2050000,
              currencyCode: "GBP",
              displayPrices: [
                {
                  displayPrice: "Â£2,050,000",
                  displayPriceQualifier: "Guide Price",
                },
              ],
              frequency: "not specified",
            },
            productLabel: {
              productLabelText: "",
              spotlightLabel: false,
            },
            propertyImages: {
              images: [
                {
                  caption: "9236_31885806_IMG_20_0000.jpeg",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/134914577/113317_32322190_IMG_00_0000_max_476x317.jpeg",
                  url: "114k/113317/134914577/113317_32322190_IMG_00_0000.jpeg",
                },
                {
                  caption: "9236_31885806_IMG_19_0000.jpeg",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/134914577/113317_32322190_IMG_01_0000_max_476x317.jpeg",
                  url: "114k/113317/134914577/113317_32322190_IMG_01_0000.jpeg",
                },
                {
                  caption: "9236_31885806_IMG_18_0000.jpeg",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/134914577/113317_32322190_IMG_02_0000_max_476x317.jpeg",
                  url: "114k/113317/134914577/113317_32322190_IMG_02_0000.jpeg",
                },
                {
                  caption: "9236_31885806_IMG_17_0000.jpeg",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/134914577/113317_32322190_IMG_03_0000_max_476x317.jpeg",
                  url: "114k/113317/134914577/113317_32322190_IMG_03_0000.jpeg",
                },
                {
                  caption: "9236_31885806_IMG_16_0000.jpeg",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/134914577/113317_32322190_IMG_04_0000_max_476x317.jpeg",
                  url: "114k/113317/134914577/113317_32322190_IMG_04_0000.jpeg",
                },
                {
                  caption: "9236_31885806_IMG_15_0000.jpeg",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/134914577/113317_32322190_IMG_05_0000_max_476x317.jpeg",
                  url: "114k/113317/134914577/113317_32322190_IMG_05_0000.jpeg",
                },
                {
                  caption: "9236_31885806_IMG_14_0000.jpeg",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/134914577/113317_32322190_IMG_06_0000_max_476x317.jpeg",
                  url: "114k/113317/134914577/113317_32322190_IMG_06_0000.jpeg",
                },
                {
                  caption: "9236_31885806_IMG_13_0000.jpeg",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/134914577/113317_32322190_IMG_07_0000_max_476x317.jpeg",
                  url: "114k/113317/134914577/113317_32322190_IMG_07_0000.jpeg",
                },
                {
                  caption: "9236_31885806_IMG_12_0000.jpeg",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/134914577/113317_32322190_IMG_08_0000_max_476x317.jpeg",
                  url: "114k/113317/134914577/113317_32322190_IMG_08_0000.jpeg",
                },
                {
                  caption: "9236_31885806_IMG_11_0000.jpeg",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/134914577/113317_32322190_IMG_09_0000_max_476x317.jpeg",
                  url: "114k/113317/134914577/113317_32322190_IMG_09_0000.jpeg",
                },
                {
                  caption: "9236_31885806_IMG_10_0000.jpeg",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/134914577/113317_32322190_IMG_10_0000_max_476x317.jpeg",
                  url: "114k/113317/134914577/113317_32322190_IMG_10_0000.jpeg",
                },
                {
                  caption: "9236_31885806_IMG_09_0000.jpeg",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/134914577/113317_32322190_IMG_11_0000_max_476x317.jpeg",
                  url: "114k/113317/134914577/113317_32322190_IMG_11_0000.jpeg",
                },
                {
                  caption: "9236_31885806_IMG_08_0000.jpeg",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/134914577/113317_32322190_IMG_12_0000_max_476x317.jpeg",
                  url: "114k/113317/134914577/113317_32322190_IMG_12_0000.jpeg",
                },
                {
                  caption: "9236_31885806_IMG_07_0000.jpeg",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/134914577/113317_32322190_IMG_13_0000_max_476x317.jpeg",
                  url: "114k/113317/134914577/113317_32322190_IMG_13_0000.jpeg",
                },
                {
                  caption: "9236_31885806_IMG_06_0000.jpeg",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/134914577/113317_32322190_IMG_14_0000_max_476x317.jpeg",
                  url: "114k/113317/134914577/113317_32322190_IMG_14_0000.jpeg",
                },
                {
                  caption: "9236_31885806_IMG_05_0000.jpeg",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/134914577/113317_32322190_IMG_15_0000_max_476x317.jpeg",
                  url: "114k/113317/134914577/113317_32322190_IMG_15_0000.jpeg",
                },
                {
                  caption: "9236_31885806_IMG_04_0000.jpeg",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/134914577/113317_32322190_IMG_16_0000_max_476x317.jpeg",
                  url: "114k/113317/134914577/113317_32322190_IMG_16_0000.jpeg",
                },
                {
                  caption: "9236_31885806_IMG_03_0000.jpeg",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/134914577/113317_32322190_IMG_17_0000_max_476x317.jpeg",
                  url: "114k/113317/134914577/113317_32322190_IMG_17_0000.jpeg",
                },
                {
                  caption: "9236_31885806_IMG_02_0000.jpeg",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/134914577/113317_32322190_IMG_18_0000_max_476x317.jpeg",
                  url: "114k/113317/134914577/113317_32322190_IMG_18_0000.jpeg",
                },
                {
                  caption: "9236_31885806_IMG_01_0000.jpeg",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/134914577/113317_32322190_IMG_19_0000_max_476x317.jpeg",
                  url: "114k/113317/134914577/113317_32322190_IMG_19_0000.jpeg",
                },
                {
                  caption: "9236_31885806_IMG_00_0000.jpeg",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/134914577/113317_32322190_IMG_20_0000_max_476x317.jpeg",
                  url: "114k/113317/134914577/113317_32322190_IMG_20_0000.jpeg",
                },
              ],
              mainImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/134914577/113317_32322190_IMG_00_0000_max_476x317.jpeg",
              mainMapImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/134914577/113317_32322190_IMG_00_0000_max_296x197.jpeg",
            },
            propertySubType: "Apartment",
            propertyTypeFullDescription: "8 bedroom apartment for sale",
            propertyUrl: "/properties/134914577#/?channel=RES_BUY",
            residential: true,
            saved: false,
            showOnMap: true,
            staticMapUrl: null,
            students: false,
            summary:
              "An opportunity to acquire an investment opportunity comprising of 8 one bedroom flats and 9 garages. An opportunity to acquire an investment opportunity comprising of 8 one bedroom flats and 9 garages. There may be potential to re-develop to add another storey to create further dwellings...",
            transactionType: "buy",
          },
          {
            addedOrReduced: "Added on 12/06/2023",
            auction: false,
            bathrooms: 3,
            bedrooms: 5,
            channel: "BUY",
            commercial: false,
            contactUrl:
              "/property-for-sale/contactBranch.html?propertyId=135994109",
            countryCode: "GB",
            customer: {
              branchDisplayName: "Hunters, Hayes",
              branchId: 404,
              branchLandingPageUrl:
                "/estate-agents/agent/Hunters/Hayes-404.html",
              branchName: "Hayes",
              brandPlusLogoURI: "/brand/brand_rmchoice_logo_5736_0001.jpeg",
              brandPlusLogoUrl:
                "https://media.rightmove.co.uk:443/dir/brand/brand_rmchoice_logo_5736_0001_max_100x50.jpeg",
              brandTradingName: "Hunters",
              buildToRent: false,
              buildToRentBenefits: [],
              commercial: false,
              contactTelephone: "020 3871 3813",
              development: false,
              developmentContent: null,
              enhancedListing: false,
              showOnMap: true,
              showReducedProperties: true,
            },
            development: false,
            displayAddress: "Granville Road, Hayes, UB3 4PL",
            displaySize: "",
            displayStatus: "",
            distance: null,
            enhancedListing: false,
            enquiredTimestamp: null,
            featuredProperty: false,
            feesApply: false,
            feesApplyText: null,
            firstVisibleDate: "2023-06-12T10:12:49Z",
            formattedBranchName: " by Hunters, Hayes",
            formattedDistance: "",
            hasBrandPlus: true,
            heading: "",
            hidden: false,
            id: 135994109,
            isRecent: false,
            keywordMatchType: "no_keyword",
            keywords: [],
            listingUpdate: {
              listingUpdateDate: "2023-06-12T10:18:04Z",
              listingUpdateReason: "new",
            },
            location: {
              latitude: 51.497535,
              longitude: -0.417524,
            },
            lozengeModel: {
              matchingLozenges: [],
            },
            numberOfFloorplans: 1,
            numberOfImages: 8,
            numberOfVirtualTours: 0,
            onlineViewingsAvailable: false,
            premiumListing: false,
            price: {
              amount: 750000,
              currencyCode: "GBP",
              displayPrices: [
                {
                  displayPrice: "Â£750,000",
                  displayPriceQualifier: "Guide Price",
                },
              ],
              frequency: "not specified",
            },
            productLabel: {
              productLabelText: "",
              spotlightLabel: false,
            },
            propertyImages: {
              images: [
                {
                  caption: "thumbnail_IMG_7689.jpg",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/1k/404/135994109/404_32385444_IMG_00_0000_max_476x317.jpeg",
                  url: "1k/404/135994109/404_32385444_IMG_00_0000.jpeg",
                },
                {
                  caption: "thumbnail_IMG_7665.jpg",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/1k/404/135994109/404_32385444_IMG_01_0000_max_476x317.jpeg",
                  url: "1k/404/135994109/404_32385444_IMG_01_0000.jpeg",
                },
                {
                  caption: "thumbnail_IMG_7670.jpg",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/1k/404/135994109/404_32385444_IMG_02_0000_max_476x317.jpeg",
                  url: "1k/404/135994109/404_32385444_IMG_02_0000.jpeg",
                },
                {
                  caption: "thumbnail_IMG_7671.jpg",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/1k/404/135994109/404_32385444_IMG_03_0000_max_476x317.jpeg",
                  url: "1k/404/135994109/404_32385444_IMG_03_0000.jpeg",
                },
                {
                  caption: "thumbnail_IMG_7674.jpg",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/1k/404/135994109/404_32385444_IMG_04_0000_max_476x317.jpeg",
                  url: "1k/404/135994109/404_32385444_IMG_04_0000.jpeg",
                },
                {
                  caption: "thumbnail_IMG_7679.jpg",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/1k/404/135994109/404_32385444_IMG_05_0000_max_476x317.jpeg",
                  url: "1k/404/135994109/404_32385444_IMG_05_0000.jpeg",
                },
                {
                  caption: "thumbnail_IMG_7683.jpg",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/1k/404/135994109/404_32385444_IMG_06_0000_max_476x317.jpeg",
                  url: "1k/404/135994109/404_32385444_IMG_06_0000.jpeg",
                },
                {
                  caption: "thumbnail_IMG_7693.jpg",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/1k/404/135994109/404_32385444_IMG_07_0000_max_476x317.jpeg",
                  url: "1k/404/135994109/404_32385444_IMG_07_0000.jpeg",
                },
              ],
              mainImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/1k/404/135994109/404_32385444_IMG_00_0000_max_476x317.jpeg",
              mainMapImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/1k/404/135994109/404_32385444_IMG_00_0000_max_296x197.jpeg",
            },
            propertySubType: "House",
            propertyTypeFullDescription: "5 bedroom house for sale",
            propertyUrl: "/properties/135994109#/?channel=RES_BUY",
            residential: true,
            saved: false,
            showOnMap: true,
            staticMapUrl: null,
            students: false,
            summary:
              "An expertly extended and vastly accommodating five bedroom home in Granville Road, South Hayes. This property is perfect for large families or a potential HMO opportunity. The property comprises entrance porch/hall, ground floor fifth bedroom, separate dining room, open plan kitchen and...",
            transactionType: "buy",
          },
          {
            addedOrReduced: "Reduced on 31/01/2023",
            auction: false,
            bathrooms: 6,
            bedrooms: 6,
            channel: "BUY",
            commercial: false,
            contactUrl:
              "/property-for-sale/contactBranch.html?propertyId=121606337",
            countryCode: "GB",
            customer: {
              branchDisplayName: "Simple Estate Agents, Hayes",
              branchId: 238229,
              branchLandingPageUrl:
                "/estate-agents/agent/Simple-Estate-Agents/Hayes-238229.html",
              branchName: "Hayes",
              brandPlusLogoURI:
                "/239k/238229/branch_rmchoice_logo_238229_0000.jpeg",
              brandPlusLogoUrl:
                "https://media.rightmove.co.uk:443/dir/239k/238229/branch_rmchoice_logo_238229_0000_max_100x50.jpeg",
              brandTradingName: "Simple Estate Agents",
              buildToRent: false,
              buildToRentBenefits: [],
              commercial: false,
              contactTelephone: "020 3834 8492",
              development: false,
              developmentContent: null,
              enhancedListing: false,
              showOnMap: true,
              showReducedProperties: true,
            },
            development: false,
            displayAddress: "Central Avenue, Hayes, UB3",
            displaySize: "",
            displayStatus: "",
            distance: null,
            enhancedListing: false,
            enquiredTimestamp: null,
            featuredProperty: false,
            feesApply: false,
            feesApplyText: null,
            firstVisibleDate: "2022-03-27T16:34:19Z",
            formattedBranchName: " by Simple Estate Agents, Hayes",
            formattedDistance: "",
            hasBrandPlus: true,
            heading: "",
            hidden: false,
            id: 121606337,
            isRecent: false,
            keywordMatchType: "no_keyword",
            keywords: [],
            listingUpdate: {
              listingUpdateDate: "2023-01-31T14:23:01Z",
              listingUpdateReason: "price_reduced",
            },
            location: {
              latitude: 51.51122,
              longitude: -0.41787,
            },
            lozengeModel: {
              matchingLozenges: [],
            },
            numberOfFloorplans: 2,
            numberOfImages: 21,
            numberOfVirtualTours: 1,
            onlineViewingsAvailable: false,
            premiumListing: false,
            price: {
              amount: 700000,
              currencyCode: "GBP",
              displayPrices: [
                {
                  displayPrice: "Â£700,000",
                  displayPriceQualifier: "",
                },
              ],
              frequency: "not specified",
            },
            productLabel: {
              productLabelText: "",
              spotlightLabel: false,
            },
            propertyImages: {
              images: [
                {
                  caption: "Photo 1",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/121606337/238229_SIM_000712_IMG_00_0000_max_476x317.jpeg",
                  url: "239k/238229/121606337/238229_SIM_000712_IMG_00_0000.jpeg",
                },
                {
                  caption: "Photo 2",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/121606337/238229_SIM_000712_IMG_01_0000_max_476x317.jpeg",
                  url: "239k/238229/121606337/238229_SIM_000712_IMG_01_0000.jpeg",
                },
                {
                  caption: "Photo 3",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/121606337/238229_SIM_000712_IMG_02_0000_max_476x317.jpeg",
                  url: "239k/238229/121606337/238229_SIM_000712_IMG_02_0000.jpeg",
                },
                {
                  caption: "Photo 4",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/121606337/238229_SIM_000712_IMG_03_0000_max_476x317.jpeg",
                  url: "239k/238229/121606337/238229_SIM_000712_IMG_03_0000.jpeg",
                },
                {
                  caption: "Photo 5",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/121606337/238229_SIM_000712_IMG_04_0000_max_476x317.jpeg",
                  url: "239k/238229/121606337/238229_SIM_000712_IMG_04_0000.jpeg",
                },
                {
                  caption: "Photo 6",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/121606337/238229_SIM_000712_IMG_05_0000_max_476x317.jpeg",
                  url: "239k/238229/121606337/238229_SIM_000712_IMG_05_0000.jpeg",
                },
                {
                  caption: "Photo 7",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/121606337/238229_SIM_000712_IMG_06_0000_max_476x317.jpeg",
                  url: "239k/238229/121606337/238229_SIM_000712_IMG_06_0000.jpeg",
                },
                {
                  caption: "Photo 8",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/121606337/238229_SIM_000712_IMG_07_0000_max_476x317.jpeg",
                  url: "239k/238229/121606337/238229_SIM_000712_IMG_07_0000.jpeg",
                },
                {
                  caption: "Photo 9",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/121606337/238229_SIM_000712_IMG_08_0000_max_476x317.jpeg",
                  url: "239k/238229/121606337/238229_SIM_000712_IMG_08_0000.jpeg",
                },
                {
                  caption: "Photo 10",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/121606337/238229_SIM_000712_IMG_09_0000_max_476x317.jpeg",
                  url: "239k/238229/121606337/238229_SIM_000712_IMG_09_0000.jpeg",
                },
                {
                  caption: "Photo 11",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/121606337/238229_SIM_000712_IMG_10_0000_max_476x317.jpeg",
                  url: "239k/238229/121606337/238229_SIM_000712_IMG_10_0000.jpeg",
                },
                {
                  caption: "Photo 12",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/121606337/238229_SIM_000712_IMG_11_0000_max_476x317.jpeg",
                  url: "239k/238229/121606337/238229_SIM_000712_IMG_11_0000.jpeg",
                },
                {
                  caption: "Photo 13",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/121606337/238229_SIM_000712_IMG_12_0000_max_476x317.jpeg",
                  url: "239k/238229/121606337/238229_SIM_000712_IMG_12_0000.jpeg",
                },
                {
                  caption: "Photo 14",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/121606337/238229_SIM_000712_IMG_13_0000_max_476x317.jpeg",
                  url: "239k/238229/121606337/238229_SIM_000712_IMG_13_0000.jpeg",
                },
                {
                  caption: "Photo 15",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/121606337/238229_SIM_000712_IMG_14_0000_max_476x317.jpeg",
                  url: "239k/238229/121606337/238229_SIM_000712_IMG_14_0000.jpeg",
                },
                {
                  caption: "Photo 16",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/121606337/238229_SIM_000712_IMG_15_0000_max_476x317.jpeg",
                  url: "239k/238229/121606337/238229_SIM_000712_IMG_15_0000.jpeg",
                },
                {
                  caption: "Photo 17",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/121606337/238229_SIM_000712_IMG_16_0000_max_476x317.jpeg",
                  url: "239k/238229/121606337/238229_SIM_000712_IMG_16_0000.jpeg",
                },
                {
                  caption: "Photo 18",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/121606337/238229_SIM_000712_IMG_17_0000_max_476x317.jpeg",
                  url: "239k/238229/121606337/238229_SIM_000712_IMG_17_0000.jpeg",
                },
                {
                  caption: "Photo 19",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/121606337/238229_SIM_000712_IMG_18_0000_max_476x317.jpeg",
                  url: "239k/238229/121606337/238229_SIM_000712_IMG_18_0000.jpeg",
                },
                {
                  caption: "Photo 20",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/121606337/238229_SIM_000712_IMG_19_0000_max_476x317.jpeg",
                  url: "239k/238229/121606337/238229_SIM_000712_IMG_19_0000.jpeg",
                },
                {
                  caption: "Photo 21",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/121606337/238229_SIM_000712_IMG_20_0000_max_476x317.jpeg",
                  url: "239k/238229/121606337/238229_SIM_000712_IMG_20_0000.jpeg",
                },
              ],
              mainImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/121606337/238229_SIM_000712_IMG_00_0000_max_476x317.jpeg",
              mainMapImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/121606337/238229_SIM_000712_IMG_00_0000_max_296x197.jpeg",
            },
            propertySubType: "Terraced",
            propertyTypeFullDescription: "6 bedroom terraced house for sale",
            propertyUrl: "/properties/121606337#/?channel=RES_BUY",
            residential: true,
            saved: false,
            showOnMap: true,
            staticMapUrl: null,
            students: false,
            summary:
              "HMO!! Simple Estate Agents present to the market this 6 bedroom HMO property only refurbished last year. The property comprise of 6 bedrooms (five with en suite), large communal kitchen area, off street parking, private rear garden and bathroom. This is a great investment opportunity for someone ...",
            transactionType: "buy",
          },
          {
            addedOrReduced: "Added on 07/02/2023",
            auction: false,
            bathrooms: null,
            bedrooms: 4,
            channel: "BUY",
            commercial: false,
            contactUrl:
              "/property-for-sale/contactBranch.html?propertyId=134362952",
            countryCode: "GB",
            customer: {
              branchDisplayName: "Charrison Davis, Harlington, Hayes",
              branchId: 63938,
              branchLandingPageUrl:
                "/estate-agents/agent/Charrison-Davis/Harlington-Hayes-63938.html",
              branchName: "Harlington, Hayes",
              brandPlusLogoURI: "/brand/brand_rmchoice_logo_14954_0000.png",
              brandPlusLogoUrl:
                "https://media.rightmove.co.uk:443/dir/brand/brand_rmchoice_logo_14954_0000_max_100x50.png",
              brandTradingName: "Charrison Davis",
              buildToRent: false,
              buildToRentBenefits: [],
              commercial: false,
              contactTelephone: "020 3889 8404",
              development: false,
              developmentContent: null,
              enhancedListing: false,
              showOnMap: true,
              showReducedProperties: true,
            },
            development: false,
            displayAddress: "Forris Avenue, Hayes, UB3 2AS",
            displaySize: "",
            displayStatus: "",
            distance: null,
            enhancedListing: false,
            enquiredTimestamp: null,
            featuredProperty: false,
            feesApply: false,
            feesApplyText: null,
            firstVisibleDate: "2023-05-03T09:26:50Z",
            formattedBranchName: " by Charrison Davis, Harlington, Hayes",
            formattedDistance: "",
            hasBrandPlus: true,
            heading: "",
            hidden: false,
            id: 134362952,
            isRecent: false,
            keywordMatchType: "no_keyword",
            keywords: [],
            listingUpdate: {
              listingUpdateDate: "2023-02-07T16:52:04Z",
              listingUpdateReason: "new",
            },
            location: {
              latitude: 51.511086,
              longitude: -0.423528,
            },
            lozengeModel: {
              matchingLozenges: [],
            },
            numberOfFloorplans: 1,
            numberOfImages: 15,
            numberOfVirtualTours: 0,
            onlineViewingsAvailable: false,
            premiumListing: false,
            price: {
              amount: 689950,
              currencyCode: "GBP",
              displayPrices: [
                {
                  displayPrice: "Â£689,950",
                  displayPriceQualifier: "",
                },
              ],
              frequency: "not specified",
            },
            productLabel: {
              productLabelText: "",
              spotlightLabel: false,
            },
            propertyImages: {
              images: [
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/64k/63938/134362952/63938_411846_IMG_00_0000_max_476x317.jpeg",
                  url: "64k/63938/134362952/63938_411846_IMG_00_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/64k/63938/134362952/63938_411846_IMG_01_0000_max_476x317.jpeg",
                  url: "64k/63938/134362952/63938_411846_IMG_01_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/64k/63938/134362952/63938_411846_IMG_02_0000_max_476x317.jpeg",
                  url: "64k/63938/134362952/63938_411846_IMG_02_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/64k/63938/134362952/63938_411846_IMG_03_0000_max_476x317.jpeg",
                  url: "64k/63938/134362952/63938_411846_IMG_03_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/64k/63938/134362952/63938_411846_IMG_04_0000_max_476x317.jpeg",
                  url: "64k/63938/134362952/63938_411846_IMG_04_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/64k/63938/134362952/63938_411846_IMG_05_0000_max_476x317.jpeg",
                  url: "64k/63938/134362952/63938_411846_IMG_05_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/64k/63938/134362952/63938_411846_IMG_06_0000_max_476x317.jpeg",
                  url: "64k/63938/134362952/63938_411846_IMG_06_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/64k/63938/134362952/63938_411846_IMG_07_0000_max_476x317.jpeg",
                  url: "64k/63938/134362952/63938_411846_IMG_07_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/64k/63938/134362952/63938_411846_IMG_08_0000_max_476x317.jpeg",
                  url: "64k/63938/134362952/63938_411846_IMG_08_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/64k/63938/134362952/63938_411846_IMG_09_0000_max_476x317.jpeg",
                  url: "64k/63938/134362952/63938_411846_IMG_09_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/64k/63938/134362952/63938_411846_IMG_10_0000_max_476x317.jpeg",
                  url: "64k/63938/134362952/63938_411846_IMG_10_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/64k/63938/134362952/63938_411846_IMG_11_0000_max_476x317.jpeg",
                  url: "64k/63938/134362952/63938_411846_IMG_11_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/64k/63938/134362952/63938_411846_IMG_12_0000_max_476x317.jpeg",
                  url: "64k/63938/134362952/63938_411846_IMG_12_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/64k/63938/134362952/63938_411846_IMG_13_0000_max_476x317.jpeg",
                  url: "64k/63938/134362952/63938_411846_IMG_13_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/64k/63938/134362952/63938_411846_IMG_14_0000_max_476x317.jpeg",
                  url: "64k/63938/134362952/63938_411846_IMG_14_0000.jpeg",
                },
              ],
              mainImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/64k/63938/134362952/63938_411846_IMG_00_0000_max_476x317.jpeg",
              mainMapImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/64k/63938/134362952/63938_411846_IMG_00_0000_max_296x197.jpeg",
            },
            propertySubType: "Semi-Detached",
            propertyTypeFullDescription:
              "4 bedroom semi-detached house for sale",
            propertyUrl: "/properties/134362952#/?channel=RES_BUY",
            residential: true,
            saved: false,
            showOnMap: true,
            staticMapUrl: null,
            students: false,
            summary:
              "4 BEDROOM HOUSE / GREAT LOCATION: This 4 bedroom house is situated in a popular residential location convenient for Hayes & Harlington mainline station to Paddington, bus routes to London Heathrow...",
            transactionType: "buy",
          },
          {
            addedOrReduced: "Added on 11/05/2023",
            auction: false,
            bathrooms: 2,
            bedrooms: 4,
            channel: "BUY",
            commercial: false,
            contactUrl:
              "/property-for-sale/contactBranch.html?propertyId=134709365",
            countryCode: "GB",
            customer: {
              branchDisplayName: "Stones Property, Middlesex",
              branchId: 91151,
              branchLandingPageUrl:
                "/estate-agents/agent/Stones-Property/Middlesex-91151.html",
              branchName: "Middlesex",
              brandPlusLogoURI: "/company/clogo_rmchoice_34994_0000.png",
              brandPlusLogoUrl:
                "https://media.rightmove.co.uk:443/dir/company/clogo_rmchoice_34994_0000_max_100x50.png",
              brandTradingName: "Stones Property",
              buildToRent: false,
              buildToRentBenefits: [],
              commercial: false,
              contactTelephone: "020 3870 9380",
              development: false,
              developmentContent: null,
              enhancedListing: false,
              showOnMap: true,
              showReducedProperties: true,
            },
            development: false,
            displayAddress: "Forris Avenue, Hayes, Greater London, UB3",
            displaySize: "",
            displayStatus: "",
            distance: null,
            enhancedListing: false,
            enquiredTimestamp: null,
            featuredProperty: false,
            feesApply: false,
            feesApplyText: null,
            firstVisibleDate: "2023-05-11T18:31:59Z",
            formattedBranchName: " by Stones Property, Middlesex",
            formattedDistance: "",
            hasBrandPlus: true,
            heading: "",
            hidden: false,
            id: 134709365,
            isRecent: false,
            keywordMatchType: "no_keyword",
            keywords: [],
            listingUpdate: {
              listingUpdateDate: "2023-05-11T18:37:03Z",
              listingUpdateReason: "new",
            },
            location: {
              latitude: 51.511659,
              longitude: -0.422996,
            },
            lozengeModel: {
              matchingLozenges: [],
            },
            numberOfFloorplans: 1,
            numberOfImages: 14,
            numberOfVirtualTours: 0,
            onlineViewingsAvailable: false,
            premiumListing: false,
            price: {
              amount: 689950,
              currencyCode: "GBP",
              displayPrices: [
                {
                  displayPrice: "Â£689,950",
                  displayPriceQualifier: "Guide Price",
                },
              ],
              frequency: "not specified",
            },
            productLabel: {
              productLabelText: "",
              spotlightLabel: false,
            },
            propertyImages: {
              images: [
                {
                  caption: "Front Aspect",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/92k/91151/134709365/91151_RHL230123_IMG_00_0000_max_476x317.jpeg",
                  url: "92k/91151/134709365/91151_RHL230123_IMG_00_0000.jpeg",
                },
                {
                  caption: "Kitchen",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/92k/91151/134709365/91151_RHL230123_IMG_01_0000_max_476x317.jpeg",
                  url: "92k/91151/134709365/91151_RHL230123_IMG_01_0000.jpeg",
                },
                {
                  caption: "Lounge",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/92k/91151/134709365/91151_RHL230123_IMG_02_0000_max_476x317.jpeg",
                  url: "92k/91151/134709365/91151_RHL230123_IMG_02_0000.jpeg",
                },
                {
                  caption: "Dining Room",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/92k/91151/134709365/91151_RHL230123_IMG_03_0000_max_476x317.jpeg",
                  url: "92k/91151/134709365/91151_RHL230123_IMG_03_0000.jpeg",
                },
                {
                  caption: "Conservatory",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/92k/91151/134709365/91151_RHL230123_IMG_04_0000_max_476x317.jpeg",
                  url: "92k/91151/134709365/91151_RHL230123_IMG_04_0000.jpeg",
                },
                {
                  caption: "Bedroom One",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/92k/91151/134709365/91151_RHL230123_IMG_05_0000_max_476x317.jpeg",
                  url: "92k/91151/134709365/91151_RHL230123_IMG_05_0000.jpeg",
                },
                {
                  caption: "Bedroom One (2)",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/92k/91151/134709365/91151_RHL230123_IMG_06_0000_max_476x317.jpeg",
                  url: "92k/91151/134709365/91151_RHL230123_IMG_06_0000.jpeg",
                },
                {
                  caption: "Bedroom Two",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/92k/91151/134709365/91151_RHL230123_IMG_07_0000_max_476x317.jpeg",
                  url: "92k/91151/134709365/91151_RHL230123_IMG_07_0000.jpeg",
                },
                {
                  caption: "Bedroom Three",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/92k/91151/134709365/91151_RHL230123_IMG_08_0000_max_476x317.jpeg",
                  url: "92k/91151/134709365/91151_RHL230123_IMG_08_0000.jpeg",
                },
                {
                  caption: "Bedroom Four",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/92k/91151/134709365/91151_RHL230123_IMG_09_0000_max_476x317.jpeg",
                  url: "92k/91151/134709365/91151_RHL230123_IMG_09_0000.jpeg",
                },
                {
                  caption: "Bathroom",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/92k/91151/134709365/91151_RHL230123_IMG_10_0000_max_476x317.jpeg",
                  url: "92k/91151/134709365/91151_RHL230123_IMG_10_0000.jpeg",
                },
                {
                  caption: "W/C",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/92k/91151/134709365/91151_RHL230123_IMG_11_0000_max_476x317.jpeg",
                  url: "92k/91151/134709365/91151_RHL230123_IMG_11_0000.jpeg",
                },
                {
                  caption: "Shower Room W/C",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/92k/91151/134709365/91151_RHL230123_IMG_12_0000_max_476x317.jpeg",
                  url: "92k/91151/134709365/91151_RHL230123_IMG_12_0000.jpeg",
                },
                {
                  caption: "Garden &amp; Outbuilding",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/92k/91151/134709365/91151_RHL230123_IMG_13_0000_max_476x317.jpeg",
                  url: "92k/91151/134709365/91151_RHL230123_IMG_13_0000.jpeg",
                },
              ],
              mainImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/92k/91151/134709365/91151_RHL230123_IMG_00_0000_max_476x317.jpeg",
              mainMapImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/92k/91151/134709365/91151_RHL230123_IMG_00_0000_max_296x197.jpeg",
            },
            propertySubType: "Semi-Detached",
            propertyTypeFullDescription:
              "4 bedroom semi-detached house for sale",
            propertyUrl: "/properties/134709365#/?channel=RES_BUY",
            residential: true,
            saved: false,
            showOnMap: true,
            staticMapUrl: null,
            students: false,
            summary:
              "Stones welcome to the market this ideal four bedroom family home located in the heart of Hayes with a short walk to Hayes Town, Hayes & Harlington Station (Elizabeth Line) and a stones throw from local schools such as Lake Farm Academy and Lake Farm Country Park. The property featu...",
            transactionType: "buy",
          },
          {
            addedOrReduced: "Added on 12/06/2023",
            auction: false,
            bathrooms: 2,
            bedrooms: 5,
            channel: "BUY",
            commercial: false,
            contactUrl:
              "/property-for-sale/contactBranch.html?propertyId=136036874",
            countryCode: "GB",
            customer: {
              branchDisplayName: "Hiltons Estates, Southall",
              branchId: 242060,
              branchLandingPageUrl:
                "/estate-agents/agent/Hiltons-Estates/Southall-242060.html",
              branchName: "Southall",
              brandPlusLogoURI: "/company/clogo_rmchoice_74348_0000.jpeg",
              brandPlusLogoUrl:
                "https://media.rightmove.co.uk:443/dir/company/clogo_rmchoice_74348_0000_max_100x50.jpeg",
              brandTradingName: "Hiltons Estates",
              buildToRent: false,
              buildToRentBenefits: [],
              commercial: false,
              contactTelephone: "020 3905 5310",
              development: false,
              developmentContent: null,
              enhancedListing: false,
              showOnMap: true,
              showReducedProperties: true,
            },
            development: false,
            displayAddress: "North Hyde Gardens, Hayes",
            displaySize: "",
            displayStatus: "",
            distance: null,
            enhancedListing: false,
            enquiredTimestamp: null,
            featuredProperty: false,
            feesApply: false,
            feesApplyText: null,
            firstVisibleDate: "2023-06-12T17:51:15Z",
            formattedBranchName: " by Hiltons Estates, Southall",
            formattedDistance: "",
            hasBrandPlus: true,
            heading: "",
            hidden: false,
            id: 136036874,
            isRecent: false,
            keywordMatchType: "no_keyword",
            keywords: [],
            listingUpdate: {
              listingUpdateDate: "2023-06-12T17:57:01Z",
              listingUpdateReason: "new",
            },
            location: {
              latitude: 51.49847,
              longitude: -0.41269,
            },
            lozengeModel: {
              matchingLozenges: [],
            },
            numberOfFloorplans: 1,
            numberOfImages: 21,
            numberOfVirtualTours: 0,
            onlineViewingsAvailable: false,
            premiumListing: false,
            price: {
              amount: 675000,
              currencyCode: "GBP",
              displayPrices: [
                {
                  displayPrice: "Â£675,000",
                  displayPriceQualifier: "Offers in Region of",
                },
              ],
              frequency: "not specified",
            },
            productLabel: {
              productLabelText: "",
              spotlightLabel: false,
            },
            propertyImages: {
              images: [
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/243k/242060/136036874/242060_102765002408_IMG_00_0000_max_476x317.jpeg",
                  url: "243k/242060/136036874/242060_102765002408_IMG_00_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/243k/242060/136036874/242060_102765002408_IMG_01_0000_max_476x317.jpeg",
                  url: "243k/242060/136036874/242060_102765002408_IMG_01_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/243k/242060/136036874/242060_102765002408_IMG_02_0000_max_476x317.jpeg",
                  url: "243k/242060/136036874/242060_102765002408_IMG_02_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/243k/242060/136036874/242060_102765002408_IMG_03_0000_max_476x317.jpeg",
                  url: "243k/242060/136036874/242060_102765002408_IMG_03_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/243k/242060/136036874/242060_102765002408_IMG_23_0000_max_476x317.jpeg",
                  url: "243k/242060/136036874/242060_102765002408_IMG_23_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/243k/242060/136036874/242060_102765002408_IMG_24_0000_max_476x317.jpeg",
                  url: "243k/242060/136036874/242060_102765002408_IMG_24_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/243k/242060/136036874/242060_102765002408_IMG_07_0000_max_476x317.jpeg",
                  url: "243k/242060/136036874/242060_102765002408_IMG_07_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/243k/242060/136036874/242060_102765002408_IMG_08_0000_max_476x317.jpeg",
                  url: "243k/242060/136036874/242060_102765002408_IMG_08_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/243k/242060/136036874/242060_102765002408_IMG_25_0000_max_476x317.jpeg",
                  url: "243k/242060/136036874/242060_102765002408_IMG_25_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/243k/242060/136036874/242060_102765002408_IMG_10_0000_max_476x317.jpeg",
                  url: "243k/242060/136036874/242060_102765002408_IMG_10_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/243k/242060/136036874/242060_102765002408_IMG_11_0000_max_476x317.jpeg",
                  url: "243k/242060/136036874/242060_102765002408_IMG_11_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/243k/242060/136036874/242060_102765002408_IMG_12_0000_max_476x317.jpeg",
                  url: "243k/242060/136036874/242060_102765002408_IMG_12_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/243k/242060/136036874/242060_102765002408_IMG_13_0000_max_476x317.jpeg",
                  url: "243k/242060/136036874/242060_102765002408_IMG_13_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/243k/242060/136036874/242060_102765002408_IMG_14_0000_max_476x317.jpeg",
                  url: "243k/242060/136036874/242060_102765002408_IMG_14_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/243k/242060/136036874/242060_102765002408_IMG_15_0000_max_476x317.jpeg",
                  url: "243k/242060/136036874/242060_102765002408_IMG_15_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/243k/242060/136036874/242060_102765002408_IMG_16_0000_max_476x317.jpeg",
                  url: "243k/242060/136036874/242060_102765002408_IMG_16_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/243k/242060/136036874/242060_102765002408_IMG_17_0000_max_476x317.jpeg",
                  url: "243k/242060/136036874/242060_102765002408_IMG_17_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/243k/242060/136036874/242060_102765002408_IMG_19_0000_max_476x317.jpeg",
                  url: "243k/242060/136036874/242060_102765002408_IMG_19_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/243k/242060/136036874/242060_102765002408_IMG_20_0000_max_476x317.jpeg",
                  url: "243k/242060/136036874/242060_102765002408_IMG_20_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/243k/242060/136036874/242060_102765002408_IMG_26_0000_max_476x317.jpeg",
                  url: "243k/242060/136036874/242060_102765002408_IMG_26_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/243k/242060/136036874/242060_102765002408_IMG_22_0000_max_476x317.jpeg",
                  url: "243k/242060/136036874/242060_102765002408_IMG_22_0000.jpeg",
                },
              ],
              mainImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/243k/242060/136036874/242060_102765002408_IMG_00_0000_max_476x317.jpeg",
              mainMapImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/243k/242060/136036874/242060_102765002408_IMG_00_0000_max_296x197.jpeg",
            },
            propertySubType: "Semi-Detached",
            propertyTypeFullDescription:
              "5 bedroom semi-detached house for sale",
            propertyUrl: "/properties/136036874#/?channel=RES_BUY",
            residential: true,
            saved: false,
            showOnMap: true,
            staticMapUrl: null,
            students: false,
            summary:
              "Hiltons Estates brings to the market this Freehold 5 bedroom Semi Detached property located in Hayes, UB3!!! On the ground floor, there is a entrance hallway leading to the extended living room and extended kitchen with access to the spacious rear garden. Two further bedrooms benefit the ground f...",
            transactionType: "buy",
          },
          {
            addedOrReduced: "Added on 03/04/2019",
            auction: false,
            bathrooms: 2,
            bedrooms: 4,
            channel: "BUY",
            commercial: false,
            contactUrl:
              "/property-for-sale/contactBranch.html?propertyId=137623715",
            countryCode: "GB",
            customer: {
              branchDisplayName: "Simple Estate Agents, Hayes",
              branchId: 238229,
              branchLandingPageUrl:
                "/estate-agents/agent/Simple-Estate-Agents/Hayes-238229.html",
              branchName: "Hayes",
              brandPlusLogoURI:
                "/239k/238229/branch_rmchoice_logo_238229_0000.jpeg",
              brandPlusLogoUrl:
                "https://media.rightmove.co.uk:443/dir/239k/238229/branch_rmchoice_logo_238229_0000_max_100x50.jpeg",
              brandTradingName: "Simple Estate Agents",
              buildToRent: false,
              buildToRentBenefits: [],
              commercial: false,
              contactTelephone: "020 3834 8492",
              development: false,
              developmentContent: null,
              enhancedListing: false,
              showOnMap: true,
              showReducedProperties: true,
            },
            development: false,
            displayAddress: "Hunters Grove, Hayes, UB3",
            displaySize: "",
            displayStatus: "",
            distance: null,
            enhancedListing: false,
            enquiredTimestamp: null,
            featuredProperty: false,
            feesApply: false,
            feesApplyText: null,
            firstVisibleDate: "2023-07-20T10:17:51Z",
            formattedBranchName: " by Simple Estate Agents, Hayes",
            formattedDistance: "",
            hasBrandPlus: true,
            heading: "",
            hidden: false,
            id: 137623715,
            isRecent: false,
            keywordMatchType: "no_keyword",
            keywords: [],
            listingUpdate: {
              listingUpdateDate: "2019-04-03T13:18:13Z",
              listingUpdateReason: "new",
            },
            location: {
              latitude: 51.50847,
              longitude: -0.41421,
            },
            lozengeModel: {
              matchingLozenges: [],
            },
            numberOfFloorplans: 1,
            numberOfImages: 12,
            numberOfVirtualTours: 0,
            onlineViewingsAvailable: false,
            premiumListing: false,
            price: {
              amount: 650000,
              currencyCode: "GBP",
              displayPrices: [
                {
                  displayPrice: "Â£650,000",
                  displayPriceQualifier: "",
                },
              ],
              frequency: "not specified",
            },
            productLabel: {
              productLabelText: "",
              spotlightLabel: false,
            },
            propertyImages: {
              images: [
                {
                  caption: "Photo 12",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/137623715/238229_SIM_002984_IMG_00_0000_max_476x317.jpeg",
                  url: "239k/238229/137623715/238229_SIM_002984_IMG_00_0000.jpeg",
                },
                {
                  caption: "Photo 3",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/137623715/238229_SIM_002984_IMG_01_0000_max_476x317.jpeg",
                  url: "239k/238229/137623715/238229_SIM_002984_IMG_01_0000.jpeg",
                },
                {
                  caption: "Photo 4",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/137623715/238229_SIM_002984_IMG_02_0000_max_476x317.jpeg",
                  url: "239k/238229/137623715/238229_SIM_002984_IMG_02_0000.jpeg",
                },
                {
                  caption: "Photo 5",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/137623715/238229_SIM_002984_IMG_03_0000_max_476x317.jpeg",
                  url: "239k/238229/137623715/238229_SIM_002984_IMG_03_0000.jpeg",
                },
                {
                  caption: "Photo 11",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/137623715/238229_SIM_002984_IMG_04_0000_max_476x317.jpeg",
                  url: "239k/238229/137623715/238229_SIM_002984_IMG_04_0000.jpeg",
                },
                {
                  caption: "Photo 10",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/137623715/238229_SIM_002984_IMG_05_0000_max_476x317.jpeg",
                  url: "239k/238229/137623715/238229_SIM_002984_IMG_05_0000.jpeg",
                },
                {
                  caption: "Photo 1",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/137623715/238229_SIM_002984_IMG_06_0000_max_476x317.jpeg",
                  url: "239k/238229/137623715/238229_SIM_002984_IMG_06_0000.jpeg",
                },
                {
                  caption: "Photo 2",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/137623715/238229_SIM_002984_IMG_07_0000_max_476x317.jpeg",
                  url: "239k/238229/137623715/238229_SIM_002984_IMG_07_0000.jpeg",
                },
                {
                  caption: "Photo 7",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/137623715/238229_SIM_002984_IMG_08_0000_max_476x317.jpeg",
                  url: "239k/238229/137623715/238229_SIM_002984_IMG_08_0000.jpeg",
                },
                {
                  caption: "Photo 8",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/137623715/238229_SIM_002984_IMG_09_0000_max_476x317.jpeg",
                  url: "239k/238229/137623715/238229_SIM_002984_IMG_09_0000.jpeg",
                },
                {
                  caption: "Photo 9",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/137623715/238229_SIM_002984_IMG_10_0000_max_476x317.jpeg",
                  url: "239k/238229/137623715/238229_SIM_002984_IMG_10_0000.jpeg",
                },
                {
                  caption: "Photo 6",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/137623715/238229_SIM_002984_IMG_11_0000_max_476x317.jpeg",
                  url: "239k/238229/137623715/238229_SIM_002984_IMG_11_0000.jpeg",
                },
              ],
              mainImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/137623715/238229_SIM_002984_IMG_00_0000_max_476x317.jpeg",
              mainMapImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/137623715/238229_SIM_002984_IMG_00_0000_max_296x197.jpeg",
            },
            propertySubType: "Semi-Detached",
            propertyTypeFullDescription:
              "4 bedroom semi-detached house for sale",
            propertyUrl: "/properties/137623715#/?channel=RES_BUY",
            residential: true,
            saved: false,
            showOnMap: true,
            staticMapUrl: null,
            students: false,
            summary:
              "KING OF THE CASTLE! Simple Estate Agents present to the market this fantastic FOUR bed extended semi-detached house located close to Hayes Town. The property comprises of gates off street parking, large lounge, modern kitchen, four large bedroom (ground floor bedroom with ensuite) and good size r...",
            transactionType: "buy",
          },
          {
            addedOrReduced: "Added on 22/07/2023",
            auction: false,
            bathrooms: 2,
            bedrooms: 4,
            channel: "BUY",
            commercial: false,
            contactUrl:
              "/property-for-sale/contactBranch.html?propertyId=137759525",
            countryCode: "GB",
            customer: {
              branchDisplayName: "Hunters, Hayes",
              branchId: 404,
              branchLandingPageUrl:
                "/estate-agents/agent/Hunters/Hayes-404.html",
              branchName: "Hayes",
              brandPlusLogoURI: "/brand/brand_rmchoice_logo_5736_0001.jpeg",
              brandPlusLogoUrl:
                "https://media.rightmove.co.uk:443/dir/brand/brand_rmchoice_logo_5736_0001_max_100x50.jpeg",
              brandTradingName: "Hunters",
              buildToRent: false,
              buildToRentBenefits: [],
              commercial: false,
              contactTelephone: "020 3871 3813",
              development: false,
              developmentContent: null,
              enhancedListing: false,
              showOnMap: true,
              showReducedProperties: true,
            },
            development: false,
            displayAddress: "Hunters Grove, Hayes, UB3 3JF",
            displaySize: "",
            displayStatus: "",
            distance: null,
            enhancedListing: false,
            enquiredTimestamp: null,
            featuredProperty: false,
            feesApply: false,
            feesApplyText: null,
            firstVisibleDate: "2023-07-22T14:53:08Z",
            formattedBranchName: " by Hunters, Hayes",
            formattedDistance: "",
            hasBrandPlus: true,
            heading: "",
            hidden: false,
            id: 137759525,
            isRecent: false,
            keywordMatchType: "no_keyword",
            keywords: [],
            listingUpdate: {
              listingUpdateDate: "2023-07-22T14:59:02Z",
              listingUpdateReason: "new",
            },
            location: {
              latitude: 51.508708,
              longitude: -0.414758,
            },
            lozengeModel: {
              matchingLozenges: [],
            },
            numberOfFloorplans: 1,
            numberOfImages: 12,
            numberOfVirtualTours: 0,
            onlineViewingsAvailable: false,
            premiumListing: false,
            price: {
              amount: 650000,
              currencyCode: "GBP",
              displayPrices: [
                {
                  displayPrice: "Â£650,000",
                  displayPriceQualifier: "Guide Price",
                },
              ],
              frequency: "not specified",
            },
            productLabel: {
              productLabelText: "",
              spotlightLabel: false,
            },
            propertyImages: {
              images: [
                {
                  caption: "thumbnail_IMG_8956.jpg",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/1k/404/137759525/404_32482479_IMG_00_0000_max_476x317.jpeg",
                  url: "1k/404/137759525/404_32482479_IMG_00_0000.jpeg",
                },
                {
                  caption: "thumbnail_IMG_8955.jpg",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/1k/404/137759525/404_32482479_IMG_01_0000_max_476x317.jpeg",
                  url: "1k/404/137759525/404_32482479_IMG_01_0000.jpeg",
                },
                {
                  caption: "thumbnail_ba65aeac-5dd0-44cb-91e8-8307e94a9f91.jpg",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/1k/404/137759525/404_32482479_IMG_02_0000_max_476x317.jpeg",
                  url: "1k/404/137759525/404_32482479_IMG_02_0000.jpeg",
                },
                {
                  caption: "thumbnail_e0a4a2a7-6801-410c-ad53-7076e62adf65.jpg",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/1k/404/137759525/404_32482479_IMG_03_0000_max_476x317.jpeg",
                  url: "1k/404/137759525/404_32482479_IMG_03_0000.jpeg",
                },
                {
                  caption: "thumbnail_d8d7dcf4-393f-4fc2-81b0-64fe91b1b35c.jpg",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/1k/404/137759525/404_32482479_IMG_04_0000_max_476x317.jpeg",
                  url: "1k/404/137759525/404_32482479_IMG_04_0000.jpeg",
                },
                {
                  caption: "thumbnail_6c00980e-ad9f-47d4-a856-317cb1062718.jpg",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/1k/404/137759525/404_32482479_IMG_05_0000_max_476x317.jpeg",
                  url: "1k/404/137759525/404_32482479_IMG_05_0000.jpeg",
                },
                {
                  caption: "thumbnail_32823cd4-78eb-4a1d-a30e-115ced69d0b9.jpg",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/1k/404/137759525/404_32482479_IMG_06_0000_max_476x317.jpeg",
                  url: "1k/404/137759525/404_32482479_IMG_06_0000.jpeg",
                },
                {
                  caption: "thumbnail_fc99d575-393e-40ac-b69c-f1a58ad09e31.jpg",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/1k/404/137759525/404_32482479_IMG_07_0000_max_476x317.jpeg",
                  url: "1k/404/137759525/404_32482479_IMG_07_0000.jpeg",
                },
                {
                  caption: "thumbnail_ac1ac9ee-e105-4d34-81d3-d854d1124fd6.jpg",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/1k/404/137759525/404_32482479_IMG_08_0000_max_476x317.jpeg",
                  url: "1k/404/137759525/404_32482479_IMG_08_0000.jpeg",
                },
                {
                  caption: "thumbnail_39246ca9-1612-4402-815d-841824af9a25.jpg",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/1k/404/137759525/404_32482479_IMG_09_0000_max_476x317.jpeg",
                  url: "1k/404/137759525/404_32482479_IMG_09_0000.jpeg",
                },
                {
                  caption: "thumbnail_de39faf2-9132-42e2-bb92-f2f8ead6db81.jpg",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/1k/404/137759525/404_32482479_IMG_10_0000_max_476x317.jpeg",
                  url: "1k/404/137759525/404_32482479_IMG_10_0000.jpeg",
                },
                {
                  caption: "thumbnail_05b37600-9b97-4c4e-b00c-22cfe28303de.jpg",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/1k/404/137759525/404_32482479_IMG_11_0000_max_476x317.jpeg",
                  url: "1k/404/137759525/404_32482479_IMG_11_0000.jpeg",
                },
              ],
              mainImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/1k/404/137759525/404_32482479_IMG_00_0000_max_476x317.jpeg",
              mainMapImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/1k/404/137759525/404_32482479_IMG_00_0000_max_296x197.jpeg",
            },
            propertySubType: "House",
            propertyTypeFullDescription: "4 bedroom house for sale",
            propertyUrl: "/properties/137759525#/?channel=RES_BUY",
            residential: true,
            saved: false,
            showOnMap: true,
            staticMapUrl: null,
            students: false,
            summary:
              "Situated in a prominent location on Hunters Grove is this attractive and well appointed, four bedroom semi detached home. The property is offered for sale in modern condition throughout and is perfect for a growing family or a long term buy to let / HMO investment opportunity. *Further ...",
            transactionType: "buy",
          },
          {
            addedOrReduced: "Added on 02/05/2023",
            auction: false,
            bathrooms: 3,
            bedrooms: 5,
            channel: "BUY",
            commercial: false,
            contactUrl:
              "/property-for-sale/contactBranch.html?propertyId=134321456",
            countryCode: "GB",
            customer: {
              branchDisplayName: "Charrison Davis, Hayes",
              branchId: 29732,
              branchLandingPageUrl:
                "/estate-agents/agent/Charrison-Davis/Hayes-29732.html",
              branchName: "Hayes",
              brandPlusLogoURI: "/brand/brand_rmchoice_logo_14954_0000.png",
              brandPlusLogoUrl:
                "https://media.rightmove.co.uk:443/dir/brand/brand_rmchoice_logo_14954_0000_max_100x50.png",
              brandTradingName: "Charrison Davis",
              buildToRent: false,
              buildToRentBenefits: [],
              commercial: false,
              contactTelephone: "020 3907 3451",
              development: false,
              developmentContent: null,
              enhancedListing: false,
              showOnMap: true,
              showReducedProperties: false,
            },
            development: false,
            displayAddress: "Dawley Road, Hayes",
            displaySize: "",
            displayStatus: "",
            distance: null,
            enhancedListing: false,
            enquiredTimestamp: null,
            featuredProperty: false,
            feesApply: false,
            feesApplyText: null,
            firstVisibleDate: "2023-05-02T11:25:41Z",
            formattedBranchName: " by Charrison Davis, Hayes",
            formattedDistance: "",
            hasBrandPlus: true,
            heading: "",
            hidden: false,
            id: 134321456,
            isRecent: false,
            keywordMatchType: "no_keyword",
            keywords: [],
            listingUpdate: {
              listingUpdateDate: "2023-06-15T15:39:58Z",
              listingUpdateReason: "price_reduced",
            },
            location: {
              latitude: 51.500732,
              longitude: -0.430498,
            },
            lozengeModel: {
              matchingLozenges: [],
            },
            numberOfFloorplans: 1,
            numberOfImages: 16,
            numberOfVirtualTours: 0,
            onlineViewingsAvailable: false,
            premiumListing: true,
            price: {
              amount: 650000,
              currencyCode: "GBP",
              displayPrices: [
                {
                  displayPrice: "Â£650,000",
                  displayPriceQualifier: "Offers in Excess of",
                },
              ],
              frequency: "not specified",
            },
            productLabel: {
              productLabelText: "Premium Listing",
              spotlightLabel: false,
            },
            propertyImages: {
              images: [
                {
                  caption: "Reverse view",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/30k/29732/134321456/29732_32291428_IMG_13_0000_max_476x317.jpeg",
                  url: "30k/29732/134321456/29732_32291428_IMG_13_0000.jpeg",
                },
                {
                  caption: "Kitchen/Diner",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/30k/29732/134321456/29732_32291428_IMG_12_0000_max_476x317.jpeg",
                  url: "30k/29732/134321456/29732_32291428_IMG_12_0000.jpeg",
                },
                {
                  caption: "Rear garden",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/30k/29732/134321456/29732_32291428_IMG_08_0000_max_476x317.jpeg",
                  url: "30k/29732/134321456/29732_32291428_IMG_08_0000.jpeg",
                },
                {
                  caption: "Reception Room/Bedroom",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/30k/29732/134321456/29732_32291428_IMG_09_0000_max_476x317.jpeg",
                  url: "30k/29732/134321456/29732_32291428_IMG_09_0000.jpeg",
                },
                {
                  caption: "Lounge",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/30k/29732/134321456/29732_32291428_IMG_10_0000_max_476x317.jpeg",
                  url: "30k/29732/134321456/29732_32291428_IMG_10_0000.jpeg",
                },
                {
                  caption: "Alternative View",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/30k/29732/134321456/29732_32291428_IMG_11_0000_max_476x317.jpeg",
                  url: "30k/29732/134321456/29732_32291428_IMG_11_0000.jpeg",
                },
                {
                  caption: "Conservatory",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/30k/29732/134321456/29732_32291428_IMG_06_0000_max_476x317.jpeg",
                  url: "30k/29732/134321456/29732_32291428_IMG_06_0000.jpeg",
                },
                {
                  caption: "Bedroom",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/30k/29732/134321456/29732_32291428_IMG_00_0000_max_476x317.jpeg",
                  url: "30k/29732/134321456/29732_32291428_IMG_00_0000.jpeg",
                },
                {
                  caption: "Alternative View",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/30k/29732/134321456/29732_32291428_IMG_01_0000_max_476x317.jpeg",
                  url: "30k/29732/134321456/29732_32291428_IMG_01_0000.jpeg",
                },
                {
                  caption: "Bedroom",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/30k/29732/134321456/29732_32291428_IMG_03_0000_max_476x317.jpeg",
                  url: "30k/29732/134321456/29732_32291428_IMG_03_0000.jpeg",
                },
                {
                  caption: "Bathroom",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/30k/29732/134321456/29732_32291428_IMG_02_0000_max_476x317.jpeg",
                  url: "30k/29732/134321456/29732_32291428_IMG_02_0000.jpeg",
                },
                {
                  caption: "Loft Conversion/Bedroom",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/30k/29732/134321456/29732_32291428_IMG_04_0000_max_476x317.jpeg",
                  url: "30k/29732/134321456/29732_32291428_IMG_04_0000.jpeg",
                },
                {
                  caption: "En-Suite",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/30k/29732/134321456/29732_32291428_IMG_05_0000_max_476x317.jpeg",
                  url: "30k/29732/134321456/29732_32291428_IMG_05_0000.jpeg",
                },
                {
                  caption: "End of Garden",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/30k/29732/134321456/29732_32291428_IMG_07_0000_max_476x317.jpeg",
                  url: "30k/29732/134321456/29732_32291428_IMG_07_0000.jpeg",
                },
                {
                  caption: "Floor Plan",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/30k/29732/134321456/29732_32291428_IMG_15_0000_max_476x317.jpeg",
                  url: "30k/29732/134321456/29732_32291428_IMG_15_0000.jpeg",
                },
                {
                  caption: "new front.jpg",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/30k/29732/134321456/29732_32291428_IMG_16_0000_max_476x317.jpeg",
                  url: "30k/29732/134321456/29732_32291428_IMG_16_0000.jpeg",
                },
              ],
              mainImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/30k/29732/134321456/29732_32291428_IMG_13_0000_max_476x317.jpeg",
              mainMapImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/30k/29732/134321456/29732_32291428_IMG_13_0000_max_296x197.jpeg",
            },
            propertySubType: "Semi-Detached",
            propertyTypeFullDescription:
              "5 bedroom semi-detached house for sale",
            propertyUrl: "/properties/134321456#/?channel=RES_BUY",
            residential: true,
            saved: false,
            showOnMap: true,
            staticMapUrl: null,
            students: false,
            summary:
              "POTENTIAL!! POTENTIAL!! A substantial 5/6 Bedroom family house with additional potential to create an HMO / Buy-to-Let or even a Flat Conversion stpp. This spacious property offers generous sized rooms and high ceilings throughout and also boasts a huge rear garden. The accommodation prov...",
            transactionType: "buy",
          },
          {
            addedOrReduced: "Reduced on 26/06/2023",
            auction: false,
            bathrooms: 2,
            bedrooms: 4,
            channel: "BUY",
            commercial: false,
            contactUrl:
              "/property-for-sale/contactBranch.html?propertyId=126518816",
            countryCode: "GB",
            customer: {
              branchDisplayName: "Simple Estate Agents, Hayes",
              branchId: 238229,
              branchLandingPageUrl:
                "/estate-agents/agent/Simple-Estate-Agents/Hayes-238229.html",
              branchName: "Hayes",
              brandPlusLogoURI:
                "/239k/238229/branch_rmchoice_logo_238229_0000.jpeg",
              brandPlusLogoUrl:
                "https://media.rightmove.co.uk:443/dir/239k/238229/branch_rmchoice_logo_238229_0000_max_100x50.jpeg",
              brandTradingName: "Simple Estate Agents",
              buildToRent: false,
              buildToRentBenefits: [],
              commercial: false,
              contactTelephone: "020 3834 8492",
              development: false,
              developmentContent: null,
              enhancedListing: false,
              showOnMap: true,
              showReducedProperties: true,
            },
            development: false,
            displayAddress: "Keith Road, Hayes, UB3",
            displaySize: "",
            displayStatus: "",
            distance: null,
            enhancedListing: false,
            enquiredTimestamp: null,
            featuredProperty: false,
            feesApply: false,
            feesApplyText: null,
            firstVisibleDate: "2022-08-30T10:34:52Z",
            formattedBranchName: " by Simple Estate Agents, Hayes",
            formattedDistance: "",
            hasBrandPlus: true,
            heading: "",
            hidden: false,
            id: 126518816,
            isRecent: false,
            keywordMatchType: "no_keyword",
            keywords: [],
            listingUpdate: {
              listingUpdateDate: "2023-06-26T17:48:41Z",
              listingUpdateReason: "price_reduced",
            },
            location: {
              latitude: 51.5024,
              longitude: -0.42422,
            },
            lozengeModel: {
              matchingLozenges: [],
            },
            numberOfFloorplans: 2,
            numberOfImages: 14,
            numberOfVirtualTours: 1,
            onlineViewingsAvailable: false,
            premiumListing: false,
            price: {
              amount: 635000,
              currencyCode: "GBP",
              displayPrices: [
                {
                  displayPrice: "Â£635,000",
                  displayPriceQualifier: "Offers in Region of",
                },
              ],
              frequency: "not specified",
            },
            productLabel: {
              productLabelText: "",
              spotlightLabel: false,
            },
            propertyImages: {
              images: [
                {
                  caption: "Photo 1",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/126518816/238229_SIM_000378_IMG_00_0000_max_476x317.jpeg",
                  url: "239k/238229/126518816/238229_SIM_000378_IMG_00_0000.jpeg",
                },
                {
                  caption: "Photo 2",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/126518816/238229_SIM_000378_IMG_01_0000_max_476x317.jpeg",
                  url: "239k/238229/126518816/238229_SIM_000378_IMG_01_0000.jpeg",
                },
                {
                  caption: "Photo 3",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/126518816/238229_SIM_000378_IMG_02_0000_max_476x317.jpeg",
                  url: "239k/238229/126518816/238229_SIM_000378_IMG_02_0000.jpeg",
                },
                {
                  caption: "Photo 4",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/126518816/238229_SIM_000378_IMG_03_0000_max_476x317.jpeg",
                  url: "239k/238229/126518816/238229_SIM_000378_IMG_03_0000.jpeg",
                },
                {
                  caption: "Photo 5",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/126518816/238229_SIM_000378_IMG_04_0000_max_476x317.jpeg",
                  url: "239k/238229/126518816/238229_SIM_000378_IMG_04_0000.jpeg",
                },
                {
                  caption: "Photo 6",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/126518816/238229_SIM_000378_IMG_05_0000_max_476x317.jpeg",
                  url: "239k/238229/126518816/238229_SIM_000378_IMG_05_0000.jpeg",
                },
                {
                  caption: "Photo 7",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/126518816/238229_SIM_000378_IMG_06_0000_max_476x317.jpeg",
                  url: "239k/238229/126518816/238229_SIM_000378_IMG_06_0000.jpeg",
                },
                {
                  caption: "Photo 8",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/126518816/238229_SIM_000378_IMG_07_0000_max_476x317.jpeg",
                  url: "239k/238229/126518816/238229_SIM_000378_IMG_07_0000.jpeg",
                },
                {
                  caption: "Photo 9",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/126518816/238229_SIM_000378_IMG_08_0000_max_476x317.jpeg",
                  url: "239k/238229/126518816/238229_SIM_000378_IMG_08_0000.jpeg",
                },
                {
                  caption: "Photo 10",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/126518816/238229_SIM_000378_IMG_09_0000_max_476x317.jpeg",
                  url: "239k/238229/126518816/238229_SIM_000378_IMG_09_0000.jpeg",
                },
                {
                  caption: "Photo 11",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/126518816/238229_SIM_000378_IMG_10_0000_max_476x317.jpeg",
                  url: "239k/238229/126518816/238229_SIM_000378_IMG_10_0000.jpeg",
                },
                {
                  caption: "Photo 12",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/126518816/238229_SIM_000378_IMG_11_0000_max_476x317.jpeg",
                  url: "239k/238229/126518816/238229_SIM_000378_IMG_11_0000.jpeg",
                },
                {
                  caption: "Photo 13",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/126518816/238229_SIM_000378_IMG_12_0000_max_476x317.jpeg",
                  url: "239k/238229/126518816/238229_SIM_000378_IMG_12_0000.jpeg",
                },
                {
                  caption: "Photo 14",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/126518816/238229_SIM_000378_IMG_13_0000_max_476x317.jpeg",
                  url: "239k/238229/126518816/238229_SIM_000378_IMG_13_0000.jpeg",
                },
              ],
              mainImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/126518816/238229_SIM_000378_IMG_00_0000_max_476x317.jpeg",
              mainMapImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/126518816/238229_SIM_000378_IMG_00_0000_max_296x197.jpeg",
            },
            propertySubType: "Semi-Detached",
            propertyTypeFullDescription:
              "4 bedroom semi-detached house for sale",
            propertyUrl: "/properties/126518816#/?channel=RES_BUY",
            residential: true,
            saved: false,
            showOnMap: true,
            staticMapUrl: null,
            students: false,
            summary:
              "CLOSE TO THE STATION!! Simple Estate Agents present to the market this fantastic four bed extended semi-detached house located close to Hayes and Harlington Station. The property benefits from ample off street parking, 2 bathroom/shower rooms, through lounge, good size rooms and large outbuildin...",
            transactionType: "buy",
          },
          {
            addedOrReduced: "Added on 02/03/2023",
            auction: false,
            bathrooms: 1,
            bedrooms: 3,
            channel: "BUY",
            commercial: false,
            contactUrl:
              "/property-for-sale/contactBranch.html?propertyId=132167075",
            countryCode: "GB",
            customer: {
              branchDisplayName: "Simple Estate Agents, Hayes",
              branchId: 238229,
              branchLandingPageUrl:
                "/estate-agents/agent/Simple-Estate-Agents/Hayes-238229.html",
              branchName: "Hayes",
              brandPlusLogoURI:
                "/239k/238229/branch_rmchoice_logo_238229_0000.jpeg",
              brandPlusLogoUrl:
                "https://media.rightmove.co.uk:443/dir/239k/238229/branch_rmchoice_logo_238229_0000_max_100x50.jpeg",
              brandTradingName: "Simple Estate Agents",
              buildToRent: false,
              buildToRentBenefits: [],
              commercial: false,
              contactTelephone: "020 3834 8492",
              development: false,
              developmentContent: null,
              enhancedListing: false,
              showOnMap: true,
              showReducedProperties: true,
            },
            development: false,
            displayAddress: "Laburnum Road, Hayes, UB3",
            displaySize: "",
            displayStatus: "",
            distance: null,
            enhancedListing: false,
            enquiredTimestamp: null,
            featuredProperty: false,
            feesApply: false,
            feesApplyText: null,
            firstVisibleDate: "2023-03-02T13:25:25Z",
            formattedBranchName: " by Simple Estate Agents, Hayes",
            formattedDistance: "",
            hasBrandPlus: true,
            heading: "",
            hidden: false,
            id: 132167075,
            isRecent: false,
            keywordMatchType: "no_keyword",
            keywords: [],
            listingUpdate: {
              listingUpdateDate: "2023-03-02T13:31:03Z",
              listingUpdateReason: "new",
            },
            location: {
              latitude: 51.49655,
              longitude: -0.41693,
            },
            lozengeModel: {
              matchingLozenges: [],
            },
            numberOfFloorplans: 2,
            numberOfImages: 14,
            numberOfVirtualTours: 1,
            onlineViewingsAvailable: false,
            premiumListing: false,
            price: {
              amount: 635000,
              currencyCode: "GBP",
              displayPrices: [
                {
                  displayPrice: "Â£635,000",
                  displayPriceQualifier: "",
                },
              ],
              frequency: "not specified",
            },
            productLabel: {
              productLabelText: "",
              spotlightLabel: false,
            },
            propertyImages: {
              images: [
                {
                  caption: "Photo 2",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/132167075/238229_SIM_005168_IMG_01_0000_max_476x317.jpeg",
                  url: "239k/238229/132167075/238229_SIM_005168_IMG_01_0000.jpeg",
                },
                {
                  caption: "Photo 3",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/132167075/238229_SIM_005168_IMG_02_0000_max_476x317.jpeg",
                  url: "239k/238229/132167075/238229_SIM_005168_IMG_02_0000.jpeg",
                },
                {
                  caption: "Photo 4",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/132167075/238229_SIM_005168_IMG_03_0000_max_476x317.jpeg",
                  url: "239k/238229/132167075/238229_SIM_005168_IMG_03_0000.jpeg",
                },
                {
                  caption: "Photo 5",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/132167075/238229_SIM_005168_IMG_04_0000_max_476x317.jpeg",
                  url: "239k/238229/132167075/238229_SIM_005168_IMG_04_0000.jpeg",
                },
                {
                  caption: "Photo 6",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/132167075/238229_SIM_005168_IMG_05_0000_max_476x317.jpeg",
                  url: "239k/238229/132167075/238229_SIM_005168_IMG_05_0000.jpeg",
                },
                {
                  caption: "Photo 7",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/132167075/238229_SIM_005168_IMG_06_0000_max_476x317.jpeg",
                  url: "239k/238229/132167075/238229_SIM_005168_IMG_06_0000.jpeg",
                },
                {
                  caption: "Photo 8",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/132167075/238229_SIM_005168_IMG_07_0000_max_476x317.jpeg",
                  url: "239k/238229/132167075/238229_SIM_005168_IMG_07_0000.jpeg",
                },
                {
                  caption: "Photo 9",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/132167075/238229_SIM_005168_IMG_08_0000_max_476x317.jpeg",
                  url: "239k/238229/132167075/238229_SIM_005168_IMG_08_0000.jpeg",
                },
                {
                  caption: "Photo 10",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/132167075/238229_SIM_005168_IMG_09_0000_max_476x317.jpeg",
                  url: "239k/238229/132167075/238229_SIM_005168_IMG_09_0000.jpeg",
                },
                {
                  caption: "Photo 11",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/132167075/238229_SIM_005168_IMG_10_0000_max_476x317.jpeg",
                  url: "239k/238229/132167075/238229_SIM_005168_IMG_10_0000.jpeg",
                },
                {
                  caption: "Photo 12",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/132167075/238229_SIM_005168_IMG_11_0000_max_476x317.jpeg",
                  url: "239k/238229/132167075/238229_SIM_005168_IMG_11_0000.jpeg",
                },
                {
                  caption: "Photo 13",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/132167075/238229_SIM_005168_IMG_12_0000_max_476x317.jpeg",
                  url: "239k/238229/132167075/238229_SIM_005168_IMG_12_0000.jpeg",
                },
                {
                  caption: "Photo 14",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/132167075/238229_SIM_005168_IMG_13_0000_max_476x317.jpeg",
                  url: "239k/238229/132167075/238229_SIM_005168_IMG_13_0000.jpeg",
                },
                {
                  caption: "Photo 1",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/132167075/238229_SIM_005168_IMG_00_0000_max_476x317.jpeg",
                  url: "239k/238229/132167075/238229_SIM_005168_IMG_00_0000.jpeg",
                },
              ],
              mainImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/132167075/238229_SIM_005168_IMG_01_0000_max_476x317.jpeg",
              mainMapImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/132167075/238229_SIM_005168_IMG_01_0000_max_296x197.jpeg",
            },
            propertySubType: "Semi-Detached",
            propertyTypeFullDescription:
              "3 bedroom semi-detached house for sale",
            propertyUrl: "/properties/132167075#/?channel=RES_BUY",
            residential: true,
            saved: false,
            showOnMap: true,
            staticMapUrl: null,
            students: false,
            summary:
              "PERFECT LOCATION! Simple Estate Agents present to the market this extended three bed semi-detached house located in a popular road in South Hayes. The property benefits from off street parking, through lounge, three large bedrooms and spacious bathroom. The property is located a short distance fr...",
            transactionType: "buy",
          },
          {
            addedOrReduced: "Added on 11/07/2023",
            auction: false,
            bathrooms: 3,
            bedrooms: 4,
            channel: "BUY",
            commercial: false,
            contactUrl:
              "/property-for-sale/contactBranch.html?propertyId=137204780",
            countryCode: "GB",
            customer: {
              branchDisplayName: "Galaxy Real Estate, Norwood Green",
              branchId: 219908,
              branchLandingPageUrl:
                "/estate-agents/agent/Galaxy-Real-Estate/Norwood-Green-219908.html",
              branchName: "Norwood Green",
              brandPlusLogoURI: "/company/clogo_rmchoice_66797_0001.jpeg",
              brandPlusLogoUrl:
                "https://media.rightmove.co.uk:443/dir/company/clogo_rmchoice_66797_0001_max_100x50.jpeg",
              brandTradingName: "Galaxy Real Estate",
              buildToRent: false,
              buildToRentBenefits: [],
              commercial: false,
              contactTelephone: "020 3840 3636",
              development: false,
              developmentContent: null,
              enhancedListing: false,
              showOnMap: true,
              showReducedProperties: true,
            },
            development: false,
            displayAddress: "North Hyde Road,  Hayes, UB3",
            displaySize: "",
            displayStatus: "",
            distance: null,
            enhancedListing: false,
            enquiredTimestamp: null,
            featuredProperty: false,
            feesApply: false,
            feesApplyText: null,
            firstVisibleDate: "2023-07-11T14:11:22Z",
            formattedBranchName: " by Galaxy Real Estate, Norwood Green",
            formattedDistance: "",
            hasBrandPlus: true,
            heading: "",
            hidden: false,
            id: 137204780,
            isRecent: false,
            keywordMatchType: "no_keyword",
            keywords: [],
            listingUpdate: {
              listingUpdateDate: "2023-07-11T14:17:04Z",
              listingUpdateReason: "new",
            },
            location: {
              latitude: 51.49813,
              longitude: -0.41371,
            },
            lozengeModel: {
              matchingLozenges: [],
            },
            numberOfFloorplans: 1,
            numberOfImages: 19,
            numberOfVirtualTours: 0,
            onlineViewingsAvailable: false,
            premiumListing: false,
            price: {
              amount: 630000,
              currencyCode: "GBP",
              displayPrices: [
                {
                  displayPrice: "Â£630,000",
                  displayPriceQualifier: "",
                },
              ],
              frequency: "not specified",
            },
            productLabel: {
              productLabelText: "",
              spotlightLabel: false,
            },
            propertyImages: {
              images: [
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/220k/219908/137204780/219908_3196_IMG_00_0000_max_476x317.jpeg",
                  url: "220k/219908/137204780/219908_3196_IMG_00_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/220k/219908/137204780/219908_3196_IMG_01_0000_max_476x317.jpeg",
                  url: "220k/219908/137204780/219908_3196_IMG_01_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/220k/219908/137204780/219908_3196_IMG_02_0000_max_476x317.jpeg",
                  url: "220k/219908/137204780/219908_3196_IMG_02_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/220k/219908/137204780/219908_3196_IMG_03_0000_max_476x317.jpeg",
                  url: "220k/219908/137204780/219908_3196_IMG_03_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/220k/219908/137204780/219908_3196_IMG_04_0000_max_476x317.jpeg",
                  url: "220k/219908/137204780/219908_3196_IMG_04_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/220k/219908/137204780/219908_3196_IMG_05_0000_max_476x317.jpeg",
                  url: "220k/219908/137204780/219908_3196_IMG_05_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/220k/219908/137204780/219908_3196_IMG_06_0000_max_476x317.jpeg",
                  url: "220k/219908/137204780/219908_3196_IMG_06_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/220k/219908/137204780/219908_3196_IMG_07_0000_max_476x317.jpeg",
                  url: "220k/219908/137204780/219908_3196_IMG_07_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/220k/219908/137204780/219908_3196_IMG_08_0000_max_476x317.jpeg",
                  url: "220k/219908/137204780/219908_3196_IMG_08_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/220k/219908/137204780/219908_3196_IMG_09_0000_max_476x317.jpeg",
                  url: "220k/219908/137204780/219908_3196_IMG_09_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/220k/219908/137204780/219908_3196_IMG_10_0000_max_476x317.jpeg",
                  url: "220k/219908/137204780/219908_3196_IMG_10_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/220k/219908/137204780/219908_3196_IMG_11_0000_max_476x317.jpeg",
                  url: "220k/219908/137204780/219908_3196_IMG_11_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/220k/219908/137204780/219908_3196_IMG_12_0000_max_476x317.jpeg",
                  url: "220k/219908/137204780/219908_3196_IMG_12_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/220k/219908/137204780/219908_3196_IMG_13_0000_max_476x317.jpeg",
                  url: "220k/219908/137204780/219908_3196_IMG_13_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/220k/219908/137204780/219908_3196_IMG_14_0000_max_476x317.jpeg",
                  url: "220k/219908/137204780/219908_3196_IMG_14_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/220k/219908/137204780/219908_3196_IMG_15_0000_max_476x317.jpeg",
                  url: "220k/219908/137204780/219908_3196_IMG_15_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/220k/219908/137204780/219908_3196_IMG_16_0000_max_476x317.jpeg",
                  url: "220k/219908/137204780/219908_3196_IMG_16_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/220k/219908/137204780/219908_3196_IMG_17_0000_max_476x317.jpeg",
                  url: "220k/219908/137204780/219908_3196_IMG_17_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/220k/219908/137204780/219908_3196_IMG_18_0000_max_476x317.jpeg",
                  url: "220k/219908/137204780/219908_3196_IMG_18_0000.jpeg",
                },
              ],
              mainImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/220k/219908/137204780/219908_3196_IMG_00_0000_max_476x317.jpeg",
              mainMapImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/220k/219908/137204780/219908_3196_IMG_00_0000_max_296x197.jpeg",
            },
            propertySubType: "Semi-Detached",
            propertyTypeFullDescription:
              "4 bedroom semi-detached house for sale",
            propertyUrl: "/properties/137204780#/?channel=RES_BUY",
            residential: true,
            saved: false,
            showOnMap: true,
            staticMapUrl: null,
            students: false,
            summary:
              "This spotless four-bedroom home is presented with pride by Galaxy Real Estate and is situated on the exclusive North Hyde Road.",
            transactionType: "buy",
          },
          {
            addedOrReduced: "Added on 14/04/2023",
            auction: false,
            bathrooms: 2,
            bedrooms: 4,
            channel: "BUY",
            commercial: false,
            contactUrl:
              "/property-for-sale/contactBranch.html?propertyId=134275634",
            countryCode: "GB",
            customer: {
              branchDisplayName: "Hiltons Estates, Southall",
              branchId: 242060,
              branchLandingPageUrl:
                "/estate-agents/agent/Hiltons-Estates/Southall-242060.html",
              branchName: "Southall",
              brandPlusLogoURI: "/company/clogo_rmchoice_74348_0000.jpeg",
              brandPlusLogoUrl:
                "https://media.rightmove.co.uk:443/dir/company/clogo_rmchoice_74348_0000_max_100x50.jpeg",
              brandTradingName: "Hiltons Estates",
              buildToRent: false,
              buildToRentBenefits: [],
              commercial: false,
              contactTelephone: "020 3905 5310",
              development: false,
              developmentContent: null,
              enhancedListing: false,
              showOnMap: true,
              showReducedProperties: true,
            },
            development: false,
            displayAddress: "York Avenue, Hayes",
            displaySize: "",
            displayStatus: "",
            distance: null,
            enhancedListing: false,
            enquiredTimestamp: null,
            featuredProperty: false,
            feesApply: false,
            feesApplyText: null,
            firstVisibleDate: "2023-04-29T14:16:00Z",
            formattedBranchName: " by Hiltons Estates, Southall",
            formattedDistance: "",
            hasBrandPlus: true,
            heading: "",
            hidden: false,
            id: 134275634,
            isRecent: false,
            keywordMatchType: "no_keyword",
            keywords: [],
            listingUpdate: {
              listingUpdateDate: "2023-04-14T16:02:07Z",
              listingUpdateReason: "new",
            },
            location: {
              latitude: 51.5207,
              longitude: -0.44089,
            },
            lozengeModel: {
              matchingLozenges: [],
            },
            numberOfFloorplans: 0,
            numberOfImages: 10,
            numberOfVirtualTours: 0,
            onlineViewingsAvailable: false,
            premiumListing: false,
            price: {
              amount: 620000,
              currencyCode: "GBP",
              displayPrices: [
                {
                  displayPrice: "Â£620,000",
                  displayPriceQualifier: "Offers in Region of",
                },
              ],
              frequency: "not specified",
            },
            productLabel: {
              productLabelText: "",
              spotlightLabel: false,
            },
            propertyImages: {
              images: [
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/243k/242060/134275634/242060_102765002372_IMG_00_0000_max_476x317.jpeg",
                  url: "243k/242060/134275634/242060_102765002372_IMG_00_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/243k/242060/134275634/242060_102765002372_IMG_07_0000_max_476x317.jpeg",
                  url: "243k/242060/134275634/242060_102765002372_IMG_07_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/243k/242060/134275634/242060_102765002372_IMG_01_0000_max_476x317.jpeg",
                  url: "243k/242060/134275634/242060_102765002372_IMG_01_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/243k/242060/134275634/242060_102765002372_IMG_03_0000_max_476x317.jpeg",
                  url: "243k/242060/134275634/242060_102765002372_IMG_03_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/243k/242060/134275634/242060_102765002372_IMG_02_0000_max_476x317.jpeg",
                  url: "243k/242060/134275634/242060_102765002372_IMG_02_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/243k/242060/134275634/242060_102765002372_IMG_05_0000_max_476x317.jpeg",
                  url: "243k/242060/134275634/242060_102765002372_IMG_05_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/243k/242060/134275634/242060_102765002372_IMG_04_0000_max_476x317.jpeg",
                  url: "243k/242060/134275634/242060_102765002372_IMG_04_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/243k/242060/134275634/242060_102765002372_IMG_06_0000_max_476x317.jpeg",
                  url: "243k/242060/134275634/242060_102765002372_IMG_06_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/243k/242060/134275634/242060_102765002372_IMG_09_0000_max_476x317.jpeg",
                  url: "243k/242060/134275634/242060_102765002372_IMG_09_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/243k/242060/134275634/242060_102765002372_IMG_08_0000_max_476x317.jpeg",
                  url: "243k/242060/134275634/242060_102765002372_IMG_08_0000.jpeg",
                },
              ],
              mainImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/243k/242060/134275634/242060_102765002372_IMG_00_0000_max_476x317.jpeg",
              mainMapImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/243k/242060/134275634/242060_102765002372_IMG_00_0000_max_296x197.jpeg",
            },
            propertySubType: "Semi-Detached",
            propertyTypeFullDescription:
              "4 bedroom semi-detached house for sale",
            propertyUrl: "/properties/134275634#/?channel=RES_BUY",
            residential: true,
            saved: false,
            showOnMap: true,
            staticMapUrl: null,
            students: false,
            summary:
              "Hiltons Estates brings to the market this Semi Detached 3 bedroom house ideally located in Hayes, UB3. The ground floor consists of an entrance hallway leading to a reception room, modern open plan living/dining kitchen, with bifolding doors giving access to the large rear garden. On the first f...",
            transactionType: "buy",
          },
          {
            addedOrReduced: "Added on 19/06/2023",
            auction: false,
            bathrooms: 2,
            bedrooms: 3,
            channel: "BUY",
            commercial: false,
            contactUrl:
              "/property-for-sale/contactBranch.html?propertyId=136259066",
            countryCode: "GB",
            customer: {
              branchDisplayName: "Barnard Marcus, Feltham",
              branchId: 1903,
              branchLandingPageUrl:
                "/estate-agents/agent/Barnard-Marcus/Feltham-1903.html",
              branchName: "Feltham",
              brandPlusLogoURI: "/brand/brand_rmchoice_logo_282_0004.jpeg",
              brandPlusLogoUrl:
                "https://media.rightmove.co.uk:443/dir/brand/brand_rmchoice_logo_282_0004_max_100x50.jpeg",
              brandTradingName: "Barnard Marcus",
              buildToRent: false,
              buildToRentBenefits: [],
              commercial: false,
              contactTelephone: "020 3915 5904",
              development: false,
              developmentContent: null,
              enhancedListing: false,
              showOnMap: true,
              showReducedProperties: true,
            },
            development: false,
            displayAddress: "Bishops Road, HAYES",
            displaySize: "",
            displayStatus: "",
            distance: null,
            enhancedListing: false,
            enquiredTimestamp: null,
            featuredProperty: false,
            feesApply: false,
            feesApplyText: null,
            firstVisibleDate: "2023-06-19T10:51:33Z",
            formattedBranchName: " by Barnard Marcus, Feltham",
            formattedDistance: "",
            hasBrandPlus: true,
            heading: "",
            hidden: false,
            id: 136259066,
            isRecent: false,
            keywordMatchType: "no_keyword",
            keywords: [],
            listingUpdate: {
              listingUpdateDate: "2023-06-19T10:57:06Z",
              listingUpdateReason: "new",
            },
            location: {
              latitude: 51.51951,
              longitude: -0.43949,
            },
            lozengeModel: {
              matchingLozenges: [],
            },
            numberOfFloorplans: 1,
            numberOfImages: 9,
            numberOfVirtualTours: 0,
            onlineViewingsAvailable: false,
            premiumListing: true,
            price: {
              amount: 615000,
              currencyCode: "GBP",
              displayPrices: [
                {
                  displayPrice: "Â£615,000",
                  displayPriceQualifier: "Offers Over",
                },
              ],
              frequency: "not specified",
            },
            productLabel: {
              productLabelText: "Potential to extend (STPP)",
              spotlightLabel: false,
            },
            propertyImages: {
              images: [
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/2k/1903/136259066/1903_FEL111058_IMG_00_0000_max_476x317.jpeg",
                  url: "2k/1903/136259066/1903_FEL111058_IMG_00_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/2k/1903/136259066/1903_FEL111058_IMG_01_0000_max_476x317.jpeg",
                  url: "2k/1903/136259066/1903_FEL111058_IMG_01_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/2k/1903/136259066/1903_FEL111058_IMG_02_0000_max_476x317.jpeg",
                  url: "2k/1903/136259066/1903_FEL111058_IMG_02_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/2k/1903/136259066/1903_FEL111058_IMG_03_0000_max_476x317.jpeg",
                  url: "2k/1903/136259066/1903_FEL111058_IMG_03_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/2k/1903/136259066/1903_FEL111058_IMG_04_0000_max_476x317.jpeg",
                  url: "2k/1903/136259066/1903_FEL111058_IMG_04_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/2k/1903/136259066/1903_FEL111058_IMG_05_0000_max_476x317.jpeg",
                  url: "2k/1903/136259066/1903_FEL111058_IMG_05_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/2k/1903/136259066/1903_FEL111058_IMG_06_0000_max_476x317.jpeg",
                  url: "2k/1903/136259066/1903_FEL111058_IMG_06_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/2k/1903/136259066/1903_FEL111058_IMG_07_0000_max_476x317.jpeg",
                  url: "2k/1903/136259066/1903_FEL111058_IMG_07_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/2k/1903/136259066/1903_FEL111058_IMG_08_0000_max_476x317.jpeg",
                  url: "2k/1903/136259066/1903_FEL111058_IMG_08_0000.jpeg",
                },
              ],
              mainImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/2k/1903/136259066/1903_FEL111058_IMG_00_0000_max_476x317.jpeg",
              mainMapImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/2k/1903/136259066/1903_FEL111058_IMG_00_0000_max_296x197.jpeg",
            },
            propertySubType: "Semi-Detached",
            propertyTypeFullDescription:
              "3 bedroom semi-detached house for sale",
            propertyUrl: "/properties/136259066#/?channel=RES_BUY",
            residential: true,
            saved: false,
            showOnMap: true,
            staticMapUrl: null,
            students: false,
            summary:
              "Barnard Marcus welcome to the market this well- presented three bedroom, family home with huge scope for further development. Located within a popular location in Hayes, this property will be an ideal family home or long term investment.",
            transactionType: "buy",
          },
          {
            addedOrReduced: "Added on 13/07/2023",
            auction: false,
            bathrooms: 1,
            bedrooms: 3,
            channel: "BUY",
            commercial: false,
            contactUrl:
              "/property-for-sale/contactBranch.html?propertyId=137308745",
            countryCode: "GB",
            customer: {
              branchDisplayName: "Brian Cox, Northolt",
              branchId: 50889,
              branchLandingPageUrl:
                "/estate-agents/agent/Brian-Cox/Northolt-50889.html",
              branchName: "Northolt",
              brandPlusLogoURI: "/company/clogo_5210_0003.jpeg",
              brandPlusLogoUrl:
                "https://media.rightmove.co.uk:443/dir/company/clogo_5210_0003_max_100x50.jpeg",
              brandTradingName: "Brian Cox",
              buildToRent: false,
              buildToRentBenefits: [],
              commercial: false,
              contactTelephone: "020 3909 6488",
              development: false,
              developmentContent: null,
              enhancedListing: false,
              showOnMap: true,
              showReducedProperties: true,
            },
            development: false,
            displayAddress: "Wentworth Crescent, Hayes",
            displaySize: "",
            displayStatus: "",
            distance: null,
            enhancedListing: false,
            enquiredTimestamp: null,
            featuredProperty: false,
            feesApply: false,
            feesApplyText: null,
            firstVisibleDate: "2023-07-13T15:57:48Z",
            formattedBranchName: " by Brian Cox, Northolt",
            formattedDistance: "",
            hasBrandPlus: true,
            heading: "",
            hidden: false,
            id: 137308745,
            isRecent: false,
            keywordMatchType: "no_keyword",
            keywords: [],
            listingUpdate: {
              listingUpdateDate: "2023-07-13T16:03:04Z",
              listingUpdateReason: "new",
            },
            location: {
              latitude: 51.499657,
              longitude: -0.431854,
            },
            lozengeModel: {
              matchingLozenges: [],
            },
            numberOfFloorplans: 1,
            numberOfImages: 9,
            numberOfVirtualTours: 0,
            onlineViewingsAvailable: false,
            premiumListing: false,
            price: {
              amount: 600000,
              currencyCode: "GBP",
              displayPrices: [
                {
                  displayPrice: "Â£600,000",
                  displayPriceQualifier: "",
                },
              ],
              frequency: "not specified",
            },
            productLabel: {
              productLabelText: "",
              spotlightLabel: false,
            },
            propertyImages: {
              images: [
                {
                  caption: "Photo 14",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/51k/50889/137308745/50889_11670697_IMG_00_0000_max_476x317.jpeg",
                  url: "51k/50889/137308745/50889_11670697_IMG_00_0000.jpeg",
                },
                {
                  caption: "Photo 11",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/51k/50889/137308745/50889_11670697_IMG_01_0000_max_476x317.jpeg",
                  url: "51k/50889/137308745/50889_11670697_IMG_01_0000.jpeg",
                },
                {
                  caption: "Photo 7",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/51k/50889/137308745/50889_11670697_IMG_02_0000_max_476x317.jpeg",
                  url: "51k/50889/137308745/50889_11670697_IMG_02_0000.jpeg",
                },
                {
                  caption: "Photo 1",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/51k/50889/137308745/50889_11670697_IMG_03_0000_max_476x317.jpeg",
                  url: "51k/50889/137308745/50889_11670697_IMG_03_0000.jpeg",
                },
                {
                  caption: "Photo 2",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/51k/50889/137308745/50889_11670697_IMG_04_0000_max_476x317.jpeg",
                  url: "51k/50889/137308745/50889_11670697_IMG_04_0000.jpeg",
                },
                {
                  caption: "Photo 3",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/51k/50889/137308745/50889_11670697_IMG_05_0000_max_476x317.jpeg",
                  url: "51k/50889/137308745/50889_11670697_IMG_05_0000.jpeg",
                },
                {
                  caption: "Photo 12",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/51k/50889/137308745/50889_11670697_IMG_06_0000_max_476x317.jpeg",
                  url: "51k/50889/137308745/50889_11670697_IMG_06_0000.jpeg",
                },
                {
                  caption: "Photo 4",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/51k/50889/137308745/50889_11670697_IMG_07_0000_max_476x317.jpeg",
                  url: "51k/50889/137308745/50889_11670697_IMG_07_0000.jpeg",
                },
                {
                  caption: "Photo 13",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/51k/50889/137308745/50889_11670697_IMG_08_0000_max_476x317.jpeg",
                  url: "51k/50889/137308745/50889_11670697_IMG_08_0000.jpeg",
                },
              ],
              mainImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/51k/50889/137308745/50889_11670697_IMG_00_0000_max_476x317.jpeg",
              mainMapImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/51k/50889/137308745/50889_11670697_IMG_00_0000_max_296x197.jpeg",
            },
            propertySubType: "Semi-Detached",
            propertyTypeFullDescription:
              "3 bedroom semi-detached house for sale",
            propertyUrl: "/properties/137308745#/?channel=RES_BUY",
            residential: true,
            saved: false,
            showOnMap: true,
            staticMapUrl: null,
            students: false,
            summary:
              "CLOSE TO THE STATION WITH FANTASTIC POTENTIAL!! Brian Cox present to the market this fantastic three bedroom semi-detached house located close to Hayes and Harlington Station. The property benefits from ample off street parking, through lounge, good size rooms and large detached garage. The prope...",
            transactionType: "buy",
          },
          {
            addedOrReduced: "Added on 07/03/2023",
            auction: false,
            bathrooms: 2,
            bedrooms: 3,
            channel: "BUY",
            commercial: false,
            contactUrl:
              "/property-for-sale/contactBranch.html?propertyId=132328664",
            countryCode: "GB",
            customer: {
              branchDisplayName: "Move Inn Estates, Heston",
              branchId: 113317,
              branchLandingPageUrl:
                "/estate-agents/agent/Move-Inn-Estates/Heston-113317.html",
              branchName: "Heston",
              brandPlusLogoURI:
                "/114k/113317/branch_rmchoice_logo_113317_0007.jpeg",
              brandPlusLogoUrl:
                "https://media.rightmove.co.uk:443/dir/114k/113317/branch_rmchoice_logo_113317_0007_max_100x50.jpeg",
              brandTradingName: "Move Inn Estates",
              buildToRent: false,
              buildToRentBenefits: [],
              commercial: false,
              contactTelephone: "020 3835 3655",
              development: false,
              developmentContent: null,
              enhancedListing: false,
              showOnMap: true,
              showReducedProperties: true,
            },
            development: false,
            displayAddress: "Silverdale Gardens, Hayes UB3",
            displaySize: "1,272 sq. ft.",
            displayStatus: "",
            distance: null,
            enhancedListing: false,
            enquiredTimestamp: null,
            featuredProperty: false,
            feesApply: false,
            feesApplyText: null,
            firstVisibleDate: "2023-03-07T14:39:56Z",
            formattedBranchName: " by Move Inn Estates, Heston",
            formattedDistance: "",
            hasBrandPlus: true,
            heading: "",
            hidden: false,
            id: 132328664,
            isRecent: false,
            keywordMatchType: "no_keyword",
            keywords: [],
            listingUpdate: {
              listingUpdateDate: "2023-03-07T14:45:09Z",
              listingUpdateReason: "new",
            },
            location: {
              latitude: 51.506191,
              longitude: -0.412878,
            },
            lozengeModel: {
              matchingLozenges: [],
            },
            numberOfFloorplans: 1,
            numberOfImages: 13,
            numberOfVirtualTours: 0,
            onlineViewingsAvailable: false,
            premiumListing: true,
            price: {
              amount: 600000,
              currencyCode: "GBP",
              displayPrices: [
                {
                  displayPrice: "Â£600,000",
                  displayPriceQualifier: "Guide Price",
                },
              ],
              frequency: "not specified",
            },
            productLabel: {
              productLabelText: "Premium Listing",
              spotlightLabel: false,
            },
            propertyImages: {
              images: [
                {
                  caption: "1",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/132328664/113317_32169983_IMG_00_0000_max_476x317.jpeg",
                  url: "114k/113317/132328664/113317_32169983_IMG_00_0000.jpeg",
                },
                {
                  caption: "2",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/132328664/113317_32169983_IMG_01_0000_max_476x317.jpeg",
                  url: "114k/113317/132328664/113317_32169983_IMG_01_0000.jpeg",
                },
                {
                  caption: "3",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/132328664/113317_32169983_IMG_02_0000_max_476x317.jpeg",
                  url: "114k/113317/132328664/113317_32169983_IMG_02_0000.jpeg",
                },
                {
                  caption: "4",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/132328664/113317_32169983_IMG_03_0000_max_476x317.jpeg",
                  url: "114k/113317/132328664/113317_32169983_IMG_03_0000.jpeg",
                },
                {
                  caption: "5",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/132328664/113317_32169983_IMG_04_0000_max_476x317.jpeg",
                  url: "114k/113317/132328664/113317_32169983_IMG_04_0000.jpeg",
                },
                {
                  caption: "6",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/132328664/113317_32169983_IMG_05_0000_max_476x317.jpeg",
                  url: "114k/113317/132328664/113317_32169983_IMG_05_0000.jpeg",
                },
                {
                  caption: "7",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/132328664/113317_32169983_IMG_06_0000_max_476x317.jpeg",
                  url: "114k/113317/132328664/113317_32169983_IMG_06_0000.jpeg",
                },
                {
                  caption: "8",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/132328664/113317_32169983_IMG_07_0000_max_476x317.jpeg",
                  url: "114k/113317/132328664/113317_32169983_IMG_07_0000.jpeg",
                },
                {
                  caption: "9",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/132328664/113317_32169983_IMG_08_0000_max_476x317.jpeg",
                  url: "114k/113317/132328664/113317_32169983_IMG_08_0000.jpeg",
                },
                {
                  caption: "10",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/132328664/113317_32169983_IMG_09_0000_max_476x317.jpeg",
                  url: "114k/113317/132328664/113317_32169983_IMG_09_0000.jpeg",
                },
                {
                  caption: "11",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/132328664/113317_32169983_IMG_10_0000_max_476x317.jpeg",
                  url: "114k/113317/132328664/113317_32169983_IMG_10_0000.jpeg",
                },
                {
                  caption: "12",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/132328664/113317_32169983_IMG_11_0000_max_476x317.jpeg",
                  url: "114k/113317/132328664/113317_32169983_IMG_11_0000.jpeg",
                },
                {
                  caption: "13",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/132328664/113317_32169983_IMG_12_0000_max_476x317.jpeg",
                  url: "114k/113317/132328664/113317_32169983_IMG_12_0000.jpeg",
                },
              ],
              mainImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/132328664/113317_32169983_IMG_00_0000_max_476x317.jpeg",
              mainMapImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/132328664/113317_32169983_IMG_00_0000_max_296x197.jpeg",
            },
            propertySubType: "Semi-Detached",
            propertyTypeFullDescription:
              "3 bedroom semi-detached house for sale",
            propertyUrl: "/properties/132328664#/?channel=RES_BUY",
            residential: true,
            saved: false,
            showOnMap: true,
            staticMapUrl: null,
            students: false,
            summary:
              "Move Inn Estates bring to the market, this beautiful three-bedroom, semi-detached family home located in Hayes, close to excellent schools, transport links, and local amenities. The house provides bright and adaptable living accommodation arranged over two floors, there is potential for ...",
            transactionType: "buy",
          },
          {
            addedOrReduced: "Added on 23/05/2023",
            auction: false,
            bathrooms: 2,
            bedrooms: 4,
            channel: "BUY",
            commercial: false,
            contactUrl:
              "/property-for-sale/contactBranch.html?propertyId=135180140",
            countryCode: "GB",
            customer: {
              branchDisplayName: "Simple Estate Agents, Hayes",
              branchId: 238229,
              branchLandingPageUrl:
                "/estate-agents/agent/Simple-Estate-Agents/Hayes-238229.html",
              branchName: "Hayes",
              brandPlusLogoURI:
                "/239k/238229/branch_rmchoice_logo_238229_0000.jpeg",
              brandPlusLogoUrl:
                "https://media.rightmove.co.uk:443/dir/239k/238229/branch_rmchoice_logo_238229_0000_max_100x50.jpeg",
              brandTradingName: "Simple Estate Agents",
              buildToRent: false,
              buildToRentBenefits: [],
              commercial: false,
              contactTelephone: "020 3834 8492",
              development: false,
              developmentContent: null,
              enhancedListing: false,
              showOnMap: true,
              showReducedProperties: true,
            },
            development: false,
            displayAddress: "Botwell Common Road, Hayes, UB3",
            displaySize: "1,312 sq. ft.",
            displayStatus: "",
            distance: null,
            enhancedListing: false,
            enquiredTimestamp: null,
            featuredProperty: false,
            feesApply: false,
            feesApplyText: null,
            firstVisibleDate: "2023-05-23T16:59:31Z",
            formattedBranchName: " by Simple Estate Agents, Hayes",
            formattedDistance: "",
            hasBrandPlus: true,
            heading: "",
            hidden: false,
            id: 135180140,
            isRecent: false,
            keywordMatchType: "no_keyword",
            keywords: [],
            listingUpdate: {
              listingUpdateDate: "2023-05-23T17:05:05Z",
              listingUpdateReason: "new",
            },
            location: {
              latitude: 51.51371,
              longitude: -0.42873,
            },
            lozengeModel: {
              matchingLozenges: [],
            },
            numberOfFloorplans: 1,
            numberOfImages: 30,
            numberOfVirtualTours: 0,
            onlineViewingsAvailable: false,
            premiumListing: false,
            price: {
              amount: 600000,
              currencyCode: "GBP",
              displayPrices: [
                {
                  displayPrice: "Â£600,000",
                  displayPriceQualifier: "",
                },
              ],
              frequency: "not specified",
            },
            productLabel: {
              productLabelText: "",
              spotlightLabel: false,
            },
            propertyImages: {
              images: [
                {
                  caption: "Photo 2",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/135180140/238229_SIM_005187_IMG_00_0000_max_476x317.jpeg",
                  url: "239k/238229/135180140/238229_SIM_005187_IMG_00_0000.jpeg",
                },
                {
                  caption: "Photo 1",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/135180140/238229_SIM_005187_IMG_01_0000_max_476x317.jpeg",
                  url: "239k/238229/135180140/238229_SIM_005187_IMG_01_0000.jpeg",
                },
                {
                  caption: "Photo 3",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/135180140/238229_SIM_005187_IMG_02_0000_max_476x317.jpeg",
                  url: "239k/238229/135180140/238229_SIM_005187_IMG_02_0000.jpeg",
                },
                {
                  caption: "Photo 4",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/135180140/238229_SIM_005187_IMG_03_0000_max_476x317.jpeg",
                  url: "239k/238229/135180140/238229_SIM_005187_IMG_03_0000.jpeg",
                },
                {
                  caption: "Photo 5",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/135180140/238229_SIM_005187_IMG_04_0000_max_476x317.jpeg",
                  url: "239k/238229/135180140/238229_SIM_005187_IMG_04_0000.jpeg",
                },
                {
                  caption: "Photo 6",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/135180140/238229_SIM_005187_IMG_05_0000_max_476x317.jpeg",
                  url: "239k/238229/135180140/238229_SIM_005187_IMG_05_0000.jpeg",
                },
                {
                  caption: "Photo 7",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/135180140/238229_SIM_005187_IMG_06_0000_max_476x317.jpeg",
                  url: "239k/238229/135180140/238229_SIM_005187_IMG_06_0000.jpeg",
                },
                {
                  caption: "Photo 8",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/135180140/238229_SIM_005187_IMG_07_0000_max_476x317.jpeg",
                  url: "239k/238229/135180140/238229_SIM_005187_IMG_07_0000.jpeg",
                },
                {
                  caption: "Photo 9",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/135180140/238229_SIM_005187_IMG_08_0000_max_476x317.jpeg",
                  url: "239k/238229/135180140/238229_SIM_005187_IMG_08_0000.jpeg",
                },
                {
                  caption: "Photo 10",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/135180140/238229_SIM_005187_IMG_09_0000_max_476x317.jpeg",
                  url: "239k/238229/135180140/238229_SIM_005187_IMG_09_0000.jpeg",
                },
                {
                  caption: "Photo 11",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/135180140/238229_SIM_005187_IMG_10_0000_max_476x317.jpeg",
                  url: "239k/238229/135180140/238229_SIM_005187_IMG_10_0000.jpeg",
                },
                {
                  caption: "Photo 12",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/135180140/238229_SIM_005187_IMG_11_0000_max_476x317.jpeg",
                  url: "239k/238229/135180140/238229_SIM_005187_IMG_11_0000.jpeg",
                },
                {
                  caption: "Photo 13",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/135180140/238229_SIM_005187_IMG_12_0000_max_476x317.jpeg",
                  url: "239k/238229/135180140/238229_SIM_005187_IMG_12_0000.jpeg",
                },
                {
                  caption: "Photo 14",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/135180140/238229_SIM_005187_IMG_13_0000_max_476x317.jpeg",
                  url: "239k/238229/135180140/238229_SIM_005187_IMG_13_0000.jpeg",
                },
                {
                  caption: "Photo 15",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/135180140/238229_SIM_005187_IMG_14_0000_max_476x317.jpeg",
                  url: "239k/238229/135180140/238229_SIM_005187_IMG_14_0000.jpeg",
                },
                {
                  caption: "Photo 16",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/135180140/238229_SIM_005187_IMG_15_0000_max_476x317.jpeg",
                  url: "239k/238229/135180140/238229_SIM_005187_IMG_15_0000.jpeg",
                },
                {
                  caption: "Photo 17",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/135180140/238229_SIM_005187_IMG_16_0000_max_476x317.jpeg",
                  url: "239k/238229/135180140/238229_SIM_005187_IMG_16_0000.jpeg",
                },
                {
                  caption: "Photo 18",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/135180140/238229_SIM_005187_IMG_17_0000_max_476x317.jpeg",
                  url: "239k/238229/135180140/238229_SIM_005187_IMG_17_0000.jpeg",
                },
                {
                  caption: "Photo 19",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/135180140/238229_SIM_005187_IMG_18_0000_max_476x317.jpeg",
                  url: "239k/238229/135180140/238229_SIM_005187_IMG_18_0000.jpeg",
                },
                {
                  caption: "Photo 20",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/135180140/238229_SIM_005187_IMG_19_0000_max_476x317.jpeg",
                  url: "239k/238229/135180140/238229_SIM_005187_IMG_19_0000.jpeg",
                },
                {
                  caption: "Photo 21",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/135180140/238229_SIM_005187_IMG_20_0000_max_476x317.jpeg",
                  url: "239k/238229/135180140/238229_SIM_005187_IMG_20_0000.jpeg",
                },
                {
                  caption: "Photo 22",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/135180140/238229_SIM_005187_IMG_21_0000_max_476x317.jpeg",
                  url: "239k/238229/135180140/238229_SIM_005187_IMG_21_0000.jpeg",
                },
                {
                  caption: "Photo 23",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/135180140/238229_SIM_005187_IMG_22_0000_max_476x317.jpeg",
                  url: "239k/238229/135180140/238229_SIM_005187_IMG_22_0000.jpeg",
                },
                {
                  caption: "Photo 24",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/135180140/238229_SIM_005187_IMG_23_0000_max_476x317.jpeg",
                  url: "239k/238229/135180140/238229_SIM_005187_IMG_23_0000.jpeg",
                },
                {
                  caption: "Photo 25",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/135180140/238229_SIM_005187_IMG_24_0000_max_476x317.jpeg",
                  url: "239k/238229/135180140/238229_SIM_005187_IMG_24_0000.jpeg",
                },
                {
                  caption: "Photo 26",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/135180140/238229_SIM_005187_IMG_25_0000_max_476x317.jpeg",
                  url: "239k/238229/135180140/238229_SIM_005187_IMG_25_0000.jpeg",
                },
                {
                  caption: "Photo 27",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/135180140/238229_SIM_005187_IMG_26_0000_max_476x317.jpeg",
                  url: "239k/238229/135180140/238229_SIM_005187_IMG_26_0000.jpeg",
                },
                {
                  caption: "Photo 28",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/135180140/238229_SIM_005187_IMG_27_0000_max_476x317.jpeg",
                  url: "239k/238229/135180140/238229_SIM_005187_IMG_27_0000.jpeg",
                },
                {
                  caption: "Photo 29",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/135180140/238229_SIM_005187_IMG_28_0000_max_476x317.jpeg",
                  url: "239k/238229/135180140/238229_SIM_005187_IMG_28_0000.jpeg",
                },
                {
                  caption: "Photo 30",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/135180140/238229_SIM_005187_IMG_29_0000_max_476x317.jpeg",
                  url: "239k/238229/135180140/238229_SIM_005187_IMG_29_0000.jpeg",
                },
              ],
              mainImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/135180140/238229_SIM_005187_IMG_00_0000_max_476x317.jpeg",
              mainMapImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/239k/238229/135180140/238229_SIM_005187_IMG_00_0000_max_296x197.jpeg",
            },
            propertySubType: "Semi-Detached",
            propertyTypeFullDescription:
              "4 bedroom semi-detached house for sale",
            propertyUrl: "/properties/135180140#/?channel=RES_BUY",
            residential: true,
            saved: false,
            showOnMap: true,
            staticMapUrl: null,
            students: false,
            summary:
              "Simple Estate Agents present to the market this 4 bed extended semi-detached house with two reception rooms. The property benefits from off street parking, 2.5 bathroom/shower rooms, two kitchens, private rear garden and two entrances. The property is located close to Hayes town, close to bus sto...",
            transactionType: "buy",
          },
          {
            addedOrReduced: "Added on 07/07/2023",
            auction: false,
            bathrooms: 1,
            bedrooms: 3,
            channel: "BUY",
            commercial: false,
            contactUrl:
              "/property-for-sale/contactBranch.html?propertyId=137060759",
            countryCode: "GB",
            customer: {
              branchDisplayName: "Thompsons, Harlington, Hayes",
              branchId: 76601,
              branchLandingPageUrl:
                "/estate-agents/agent/Thompsons/Harlington-Hayes-76601.html",
              branchName: "Harlington, Hayes",
              brandPlusLogoURI: "/company/clogo_30302_0001.jpeg",
              brandPlusLogoUrl:
                "https://media.rightmove.co.uk:443/dir/company/clogo_30302_0001_max_100x50.jpeg",
              brandTradingName: "Thompsons",
              buildToRent: false,
              buildToRentBenefits: [],
              commercial: false,
              contactTelephone: "020 3879 0883",
              development: false,
              developmentContent: null,
              enhancedListing: false,
              showOnMap: true,
              showReducedProperties: true,
            },
            development: false,
            displayAddress: "Church Road, Hayes",
            displaySize: "",
            displayStatus: "",
            distance: null,
            enhancedListing: false,
            enquiredTimestamp: null,
            featuredProperty: false,
            feesApply: false,
            feesApplyText: null,
            firstVisibleDate: "2023-07-07T12:25:25Z",
            formattedBranchName: " by Thompsons, Harlington, Hayes",
            formattedDistance: "",
            hasBrandPlus: true,
            heading: "",
            hidden: false,
            id: 137060759,
            isRecent: false,
            keywordMatchType: "no_keyword",
            keywords: [],
            listingUpdate: {
              listingUpdateDate: "2023-07-07T12:31:03Z",
              listingUpdateReason: "new",
            },
            location: {
              latitude: 51.515507,
              longitude: -0.419591,
            },
            lozengeModel: {
              matchingLozenges: [],
            },
            numberOfFloorplans: 1,
            numberOfImages: 12,
            numberOfVirtualTours: 0,
            onlineViewingsAvailable: false,
            premiumListing: false,
            price: {
              amount: 600000,
              currencyCode: "GBP",
              displayPrices: [
                {
                  displayPrice: "Â£600,000",
                  displayPriceQualifier: "Guide Price",
                },
              ],
              frequency: "not specified",
            },
            productLabel: {
              productLabelText: "",
              spotlightLabel: false,
            },
            propertyImages: {
              images: [
                {
                  caption: "Photo 11",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/77k/76601/137060759/76601_11865591_IMG_00_0000_max_476x317.jpeg",
                  url: "77k/76601/137060759/76601_11865591_IMG_00_0000.jpeg",
                },
                {
                  caption: "Photo 3",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/77k/76601/137060759/76601_11865591_IMG_01_0000_max_476x317.jpeg",
                  url: "77k/76601/137060759/76601_11865591_IMG_01_0000.jpeg",
                },
                {
                  caption: "Photo 4",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/77k/76601/137060759/76601_11865591_IMG_02_0000_max_476x317.jpeg",
                  url: "77k/76601/137060759/76601_11865591_IMG_02_0000.jpeg",
                },
                {
                  caption: "Photo 2",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/77k/76601/137060759/76601_11865591_IMG_03_0000_max_476x317.jpeg",
                  url: "77k/76601/137060759/76601_11865591_IMG_03_0000.jpeg",
                },
                {
                  caption: "Photo 12",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/77k/76601/137060759/76601_11865591_IMG_04_0000_max_476x317.jpeg",
                  url: "77k/76601/137060759/76601_11865591_IMG_04_0000.jpeg",
                },
                {
                  caption: "Photo 10",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/77k/76601/137060759/76601_11865591_IMG_05_0000_max_476x317.jpeg",
                  url: "77k/76601/137060759/76601_11865591_IMG_05_0000.jpeg",
                },
                {
                  caption: "Photo 6",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/77k/76601/137060759/76601_11865591_IMG_06_0000_max_476x317.jpeg",
                  url: "77k/76601/137060759/76601_11865591_IMG_06_0000.jpeg",
                },
                {
                  caption: "Photo 5",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/77k/76601/137060759/76601_11865591_IMG_07_0000_max_476x317.jpeg",
                  url: "77k/76601/137060759/76601_11865591_IMG_07_0000.jpeg",
                },
                {
                  caption: "Photo 7",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/77k/76601/137060759/76601_11865591_IMG_08_0000_max_476x317.jpeg",
                  url: "77k/76601/137060759/76601_11865591_IMG_08_0000.jpeg",
                },
                {
                  caption: "Photo 8",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/77k/76601/137060759/76601_11865591_IMG_09_0000_max_476x317.jpeg",
                  url: "77k/76601/137060759/76601_11865591_IMG_09_0000.jpeg",
                },
                {
                  caption: "Photo 9",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/77k/76601/137060759/76601_11865591_IMG_10_0000_max_476x317.jpeg",
                  url: "77k/76601/137060759/76601_11865591_IMG_10_0000.jpeg",
                },
                {
                  caption: "Photo 1",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/77k/76601/137060759/76601_11865591_IMG_11_0000_max_476x317.jpeg",
                  url: "77k/76601/137060759/76601_11865591_IMG_11_0000.jpeg",
                },
              ],
              mainImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/77k/76601/137060759/76601_11865591_IMG_00_0000_max_476x317.jpeg",
              mainMapImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/77k/76601/137060759/76601_11865591_IMG_00_0000_max_296x197.jpeg",
            },
            propertySubType: "Semi-Detached",
            propertyTypeFullDescription:
              "3 bedroom semi-detached house for sale",
            propertyUrl: "/properties/137060759#/?channel=RES_BUY",
            residential: true,
            saved: false,
            showOnMap: true,
            staticMapUrl: null,
            students: false,
            summary:
              "THOMPSONS ESTATE AGENTS - HUGE SIDE SPACE WITH MASSIVE POTENTIAL!! We are pleased to have been given the opportunity to market this most sought after semi detached family home in Hayes.The property has we feel been well maintained by our client and offers on the ground floor two large reception&...",
            transactionType: "buy",
          },
          {
            addedOrReduced: "Reduced on 28/07/2023",
            auction: false,
            bathrooms: 3,
            bedrooms: 4,
            channel: "BUY",
            commercial: false,
            contactUrl:
              "/property-for-sale/contactBranch.html?propertyId=137024675",
            countryCode: "GB",
            customer: {
              branchDisplayName: "Move Inn Estates, Heston",
              branchId: 113317,
              branchLandingPageUrl:
                "/estate-agents/agent/Move-Inn-Estates/Heston-113317.html",
              branchName: "Heston",
              brandPlusLogoURI:
                "/114k/113317/branch_rmchoice_logo_113317_0007.jpeg",
              brandPlusLogoUrl:
                "https://media.rightmove.co.uk:443/dir/114k/113317/branch_rmchoice_logo_113317_0007_max_100x50.jpeg",
              brandTradingName: "Move Inn Estates",
              buildToRent: false,
              buildToRentBenefits: [],
              commercial: false,
              contactTelephone: "020 3835 3655",
              development: false,
              developmentContent: null,
              enhancedListing: false,
              showOnMap: true,
              showReducedProperties: true,
            },
            development: false,
            displayAddress: "North Hyde Road, Hayes UB3",
            displaySize: "",
            displayStatus: "",
            distance: null,
            enhancedListing: false,
            enquiredTimestamp: null,
            featuredProperty: false,
            feesApply: false,
            feesApplyText: null,
            firstVisibleDate: "2023-07-06T17:27:46Z",
            formattedBranchName: " by Move Inn Estates, Heston",
            formattedDistance: "",
            hasBrandPlus: true,
            heading: "",
            hidden: false,
            id: 137024675,
            isRecent: false,
            keywordMatchType: "no_keyword",
            keywords: [],
            listingUpdate: {
              listingUpdateDate: "2023-07-28T12:10:36Z",
              listingUpdateReason: "price_reduced",
            },
            location: {
              latitude: 51.498165,
              longitude: -0.413469,
            },
            lozengeModel: {
              matchingLozenges: [],
            },
            numberOfFloorplans: 1,
            numberOfImages: 12,
            numberOfVirtualTours: 0,
            onlineViewingsAvailable: false,
            premiumListing: false,
            price: {
              amount: 600000,
              currencyCode: "GBP",
              displayPrices: [
                {
                  displayPrice: "Â£600,000",
                  displayPriceQualifier: "Offers Over",
                },
              ],
              frequency: "not specified",
            },
            productLabel: {
              productLabelText: "",
              spotlightLabel: false,
            },
            propertyImages: {
              images: [
                {
                  caption: "1",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/137024675/113317_32446148_IMG_00_0000_max_476x317.jpeg",
                  url: "114k/113317/137024675/113317_32446148_IMG_00_0000.jpeg",
                },
                {
                  caption: "2",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/137024675/113317_32446148_IMG_01_0000_max_476x317.jpeg",
                  url: "114k/113317/137024675/113317_32446148_IMG_01_0000.jpeg",
                },
                {
                  caption: "3",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/137024675/113317_32446148_IMG_02_0000_max_476x317.jpeg",
                  url: "114k/113317/137024675/113317_32446148_IMG_02_0000.jpeg",
                },
                {
                  caption: "4",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/137024675/113317_32446148_IMG_03_0000_max_476x317.jpeg",
                  url: "114k/113317/137024675/113317_32446148_IMG_03_0000.jpeg",
                },
                {
                  caption: "5",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/137024675/113317_32446148_IMG_04_0000_max_476x317.jpeg",
                  url: "114k/113317/137024675/113317_32446148_IMG_04_0000.jpeg",
                },
                {
                  caption: "6",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/137024675/113317_32446148_IMG_05_0000_max_476x317.jpeg",
                  url: "114k/113317/137024675/113317_32446148_IMG_05_0000.jpeg",
                },
                {
                  caption: "7",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/137024675/113317_32446148_IMG_06_0000_max_476x317.jpeg",
                  url: "114k/113317/137024675/113317_32446148_IMG_06_0000.jpeg",
                },
                {
                  caption: "8",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/137024675/113317_32446148_IMG_07_0000_max_476x317.jpeg",
                  url: "114k/113317/137024675/113317_32446148_IMG_07_0000.jpeg",
                },
                {
                  caption: "9",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/137024675/113317_32446148_IMG_08_0000_max_476x317.jpeg",
                  url: "114k/113317/137024675/113317_32446148_IMG_08_0000.jpeg",
                },
                {
                  caption: "10",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/137024675/113317_32446148_IMG_09_0000_max_476x317.jpeg",
                  url: "114k/113317/137024675/113317_32446148_IMG_09_0000.jpeg",
                },
                {
                  caption: "11",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/137024675/113317_32446148_IMG_10_0000_max_476x317.jpeg",
                  url: "114k/113317/137024675/113317_32446148_IMG_10_0000.jpeg",
                },
                {
                  caption: "12",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/137024675/113317_32446148_IMG_11_0000_max_476x317.jpeg",
                  url: "114k/113317/137024675/113317_32446148_IMG_11_0000.jpeg",
                },
              ],
              mainImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/137024675/113317_32446148_IMG_00_0000_max_476x317.jpeg",
              mainMapImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/114k/113317/137024675/113317_32446148_IMG_00_0000_max_296x197.jpeg",
            },
            propertySubType: "Semi-Detached",
            propertyTypeFullDescription:
              "4 bedroom semi-detached house for sale",
            propertyUrl: "/properties/137024675#/?channel=RES_BUY",
            residential: true,
            saved: false,
            showOnMap: true,
            staticMapUrl: null,
            students: false,
            summary:
              "We are excited to present to you this exceptional extended four-bedroom semi-detached family home, now available on the market through Move Inn Estates. Nestled on the renowned North Hyde Road, this property offers not only a spacious living environment but also convenient access to a variety of ...",
            transactionType: "buy",
          },
          {
            addedOrReduced: "Added on 26/06/2023",
            auction: false,
            bathrooms: 2,
            bedrooms: 4,
            channel: "BUY",
            commercial: false,
            contactUrl:
              "/property-for-sale/contactBranch.html?propertyId=136559900",
            countryCode: "GB",
            customer: {
              branchDisplayName: "Andrews Residential, Uxbridge",
              branchId: 232898,
              branchLandingPageUrl:
                "/estate-agents/agent/Andrews-Residential/Uxbridge-232898.html",
              branchName: "Uxbridge",
              brandPlusLogoURI: "/brand/brand_rmchoice_logo_3344_0001.jpeg",
              brandPlusLogoUrl:
                "https://media.rightmove.co.uk:443/dir/brand/brand_rmchoice_logo_3344_0001_max_100x50.jpeg",
              brandTradingName: "Andrews Residential",
              buildToRent: false,
              buildToRentBenefits: [],
              commercial: false,
              contactTelephone: "01896 809203",
              development: false,
              developmentContent: null,
              enhancedListing: false,
              showOnMap: true,
              showReducedProperties: true,
            },
            development: false,
            displayAddress: "Waltham Avenue, Hayes",
            displaySize: "",
            displayStatus: "",
            distance: null,
            enhancedListing: false,
            enquiredTimestamp: null,
            featuredProperty: false,
            feesApply: false,
            feesApplyText: null,
            firstVisibleDate: "2023-06-26T11:12:46Z",
            formattedBranchName: " by Andrews Residential, Uxbridge",
            formattedDistance: "",
            hasBrandPlus: true,
            heading: "",
            hidden: false,
            id: 136559900,
            isRecent: false,
            keywordMatchType: "no_keyword",
            keywords: [],
            listingUpdate: {
              listingUpdateDate: "2023-06-26T11:18:30Z",
              listingUpdateReason: "new",
            },
            location: {
              latitude: 51.50125,
              longitude: -0.43853,
            },
            lozengeModel: {
              matchingLozenges: [],
            },
            numberOfFloorplans: 1,
            numberOfImages: 14,
            numberOfVirtualTours: 0,
            onlineViewingsAvailable: false,
            premiumListing: false,
            price: {
              amount: 600000,
              currencyCode: "GBP",
              displayPrices: [
                {
                  displayPrice: "Â£600,000",
                  displayPriceQualifier: "Offers in Excess of",
                },
              ],
              frequency: "not specified",
            },
            productLabel: {
              productLabelText: "",
              spotlightLabel: false,
            },
            propertyImages: {
              images: [
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/233k/232898/136559900/232898_101809018965_IMG_00_0000_max_476x317.jpeg",
                  url: "233k/232898/136559900/232898_101809018965_IMG_00_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/233k/232898/136559900/232898_101809018965_IMG_01_0000_max_476x317.jpeg",
                  url: "233k/232898/136559900/232898_101809018965_IMG_01_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/233k/232898/136559900/232898_101809018965_IMG_02_0000_max_476x317.jpeg",
                  url: "233k/232898/136559900/232898_101809018965_IMG_02_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/233k/232898/136559900/232898_101809018965_IMG_03_0000_max_476x317.jpeg",
                  url: "233k/232898/136559900/232898_101809018965_IMG_03_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/233k/232898/136559900/232898_101809018965_IMG_04_0000_max_476x317.jpeg",
                  url: "233k/232898/136559900/232898_101809018965_IMG_04_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/233k/232898/136559900/232898_101809018965_IMG_05_0000_max_476x317.jpeg",
                  url: "233k/232898/136559900/232898_101809018965_IMG_05_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/233k/232898/136559900/232898_101809018965_IMG_06_0000_max_476x317.jpeg",
                  url: "233k/232898/136559900/232898_101809018965_IMG_06_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/233k/232898/136559900/232898_101809018965_IMG_07_0000_max_476x317.jpeg",
                  url: "233k/232898/136559900/232898_101809018965_IMG_07_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/233k/232898/136559900/232898_101809018965_IMG_08_0000_max_476x317.jpeg",
                  url: "233k/232898/136559900/232898_101809018965_IMG_08_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/233k/232898/136559900/232898_101809018965_IMG_09_0000_max_476x317.jpeg",
                  url: "233k/232898/136559900/232898_101809018965_IMG_09_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/233k/232898/136559900/232898_101809018965_IMG_10_0000_max_476x317.jpeg",
                  url: "233k/232898/136559900/232898_101809018965_IMG_10_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/233k/232898/136559900/232898_101809018965_IMG_11_0000_max_476x317.jpeg",
                  url: "233k/232898/136559900/232898_101809018965_IMG_11_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/233k/232898/136559900/232898_101809018965_IMG_12_0000_max_476x317.jpeg",
                  url: "233k/232898/136559900/232898_101809018965_IMG_12_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/233k/232898/136559900/232898_101809018965_IMG_13_0000_max_476x317.jpeg",
                  url: "233k/232898/136559900/232898_101809018965_IMG_13_0000.jpeg",
                },
              ],
              mainImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/233k/232898/136559900/232898_101809018965_IMG_00_0000_max_476x317.jpeg",
              mainMapImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/233k/232898/136559900/232898_101809018965_IMG_00_0000_max_296x197.jpeg",
            },
            propertySubType: "End of Terrace",
            propertyTypeFullDescription:
              "4 bedroom end of terrace house for sale",
            propertyUrl: "/properties/136559900#/?channel=RES_BUY",
            residential: true,
            saved: false,
            showOnMap: true,
            staticMapUrl: null,
            students: false,
            summary:
              "Andrews Residential are delighted to offer to the market this spacious and extended four bedroom two bathroom end of terrace family home. Benefits include parking, large garden, and garage. Situated in a prime location close to Hayes town centre and a range of highly regarded schools. NO CHAIN ...",
            transactionType: "buy",
          },
          {
            addedOrReduced: "Reduced on 28/07/2023",
            auction: false,
            bathrooms: 2,
            bedrooms: 4,
            channel: "BUY",
            commercial: false,
            contactUrl:
              "/property-for-sale/contactBranch.html?propertyId=137139968",
            countryCode: "GB",
            customer: {
              branchDisplayName: "Oakwood Estates, West Drayton",
              branchId: 67323,
              branchLandingPageUrl:
                "/estate-agents/agent/Oakwood-Estates/West-Drayton-67323.html",
              branchName: "West Drayton",
              brandPlusLogoURI: "/company/clogo_rmchoice_32702_0002.jpeg",
              brandPlusLogoUrl:
                "https://media.rightmove.co.uk:443/dir/company/clogo_rmchoice_32702_0002_max_100x50.jpeg",
              brandTradingName: "Oakwood Estates",
              buildToRent: false,
              buildToRentBenefits: [],
              commercial: false,
              contactTelephone: "01895 548162",
              development: false,
              developmentContent: null,
              enhancedListing: false,
              showOnMap: true,
              showReducedProperties: true,
            },
            development: false,
            displayAddress: "North Hyde Road, Hayes, UB3",
            displaySize: "",
            displayStatus: "",
            distance: null,
            enhancedListing: false,
            enquiredTimestamp: null,
            featuredProperty: false,
            feesApply: false,
            feesApplyText: null,
            firstVisibleDate: "2023-07-10T11:36:13Z",
            formattedBranchName: " by Oakwood Estates, West Drayton",
            formattedDistance: "",
            hasBrandPlus: true,
            heading: "",
            hidden: false,
            id: 137139968,
            isRecent: false,
            keywordMatchType: "no_keyword",
            keywords: [],
            listingUpdate: {
              listingUpdateDate: "2023-07-28T12:12:27Z",
              listingUpdateReason: "price_reduced",
            },
            location: {
              latitude: 51.49817,
              longitude: -0.413572,
            },
            lozengeModel: {
              matchingLozenges: [
                {
                  priority: 6,
                  type: "ONLINE_VIEWINGS",
                },
              ],
            },
            numberOfFloorplans: 2,
            numberOfImages: 18,
            numberOfVirtualTours: 2,
            onlineViewingsAvailable: true,
            premiumListing: true,
            price: {
              amount: 600000,
              currencyCode: "GBP",
              displayPrices: [
                {
                  displayPrice: "Â£600,000",
                  displayPriceQualifier: "Guide Price",
                },
              ],
              frequency: "not specified",
            },
            productLabel: {
              productLabelText: "Close to Station",
              spotlightLabel: false,
            },
            propertyImages: {
              images: [
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/68k/67323/137139968/67323_26488708_IMG_00_0000_max_476x317.jpeg",
                  url: "68k/67323/137139968/67323_26488708_IMG_00_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/68k/67323/137139968/67323_26488708_IMG_01_0000_max_476x317.jpeg",
                  url: "68k/67323/137139968/67323_26488708_IMG_01_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/68k/67323/137139968/67323_26488708_IMG_02_0000_max_476x317.jpeg",
                  url: "68k/67323/137139968/67323_26488708_IMG_02_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/68k/67323/137139968/67323_26488708_IMG_03_0000_max_476x317.jpeg",
                  url: "68k/67323/137139968/67323_26488708_IMG_03_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/68k/67323/137139968/67323_26488708_IMG_04_0000_max_476x317.jpeg",
                  url: "68k/67323/137139968/67323_26488708_IMG_04_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/68k/67323/137139968/67323_26488708_IMG_05_0000_max_476x317.jpeg",
                  url: "68k/67323/137139968/67323_26488708_IMG_05_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/68k/67323/137139968/67323_26488708_IMG_06_0000_max_476x317.jpeg",
                  url: "68k/67323/137139968/67323_26488708_IMG_06_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/68k/67323/137139968/67323_26488708_IMG_07_0000_max_476x317.jpeg",
                  url: "68k/67323/137139968/67323_26488708_IMG_07_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/68k/67323/137139968/67323_26488708_IMG_08_0000_max_476x317.jpeg",
                  url: "68k/67323/137139968/67323_26488708_IMG_08_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/68k/67323/137139968/67323_26488708_IMG_09_0000_max_476x317.jpeg",
                  url: "68k/67323/137139968/67323_26488708_IMG_09_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/68k/67323/137139968/67323_26488708_IMG_10_0000_max_476x317.jpeg",
                  url: "68k/67323/137139968/67323_26488708_IMG_10_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/68k/67323/137139968/67323_26488708_IMG_11_0000_max_476x317.jpeg",
                  url: "68k/67323/137139968/67323_26488708_IMG_11_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/68k/67323/137139968/67323_26488708_IMG_12_0000_max_476x317.jpeg",
                  url: "68k/67323/137139968/67323_26488708_IMG_12_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/68k/67323/137139968/67323_26488708_IMG_13_0000_max_476x317.jpeg",
                  url: "68k/67323/137139968/67323_26488708_IMG_13_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/68k/67323/137139968/67323_26488708_IMG_14_0000_max_476x317.jpeg",
                  url: "68k/67323/137139968/67323_26488708_IMG_14_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/68k/67323/137139968/67323_26488708_IMG_15_0000_max_476x317.jpeg",
                  url: "68k/67323/137139968/67323_26488708_IMG_15_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/68k/67323/137139968/67323_26488708_IMG_16_0000_max_476x317.jpeg",
                  url: "68k/67323/137139968/67323_26488708_IMG_16_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/68k/67323/137139968/67323_26488708_IMG_17_0000_max_476x317.jpeg",
                  url: "68k/67323/137139968/67323_26488708_IMG_17_0000.jpeg",
                },
              ],
              mainImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/68k/67323/137139968/67323_26488708_IMG_00_0000_max_476x317.jpeg",
              mainMapImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/68k/67323/137139968/67323_26488708_IMG_00_0000_max_296x197.jpeg",
            },
            propertySubType: "Semi-Detached",
            propertyTypeFullDescription:
              "4 bedroom semi-detached house for sale",
            propertyUrl: "/properties/137139968#/?channel=RES_BUY",
            residential: true,
            saved: false,
            showOnMap: true,
            staticMapUrl: null,
            students: false,
            summary:
              "Oakwood Estates proudly presents this immaculate four-bedroom property located on the prestigious North Hyde Road. This charming home has been thoughtfully extended and boasts two spacious reception rooms, two modern bathrooms, and a contemporary open plan kitchen/dining area. Meticulously upd...",
            transactionType: "buy",
          },
          {
            addedOrReduced: "Added on 21/10/2022",
            auction: false,
            bathrooms: 0,
            bedrooms: 3,
            channel: "BUY",
            commercial: false,
            contactUrl:
              "/property-for-sale/contactBranch.html?propertyId=128284049",
            countryCode: "GB",
            customer: {
              branchDisplayName: "Express Estate Agency, Nationwide",
              branchId: 61544,
              branchLandingPageUrl:
                "/estate-agents/agent/Express-Estate-Agency/Nationwide-61544.html",
              branchName: "Nationwide",
              brandPlusLogoURI: "/company/clogo_rmchoice_24047_0001.jpeg",
              brandPlusLogoUrl:
                "https://media.rightmove.co.uk:443/dir/company/clogo_rmchoice_24047_0001_max_100x50.jpeg",
              brandTradingName: "Express Estate Agency",
              buildToRent: false,
              buildToRentBenefits: [],
              commercial: false,
              contactTelephone: "03330 165458",
              development: false,
              developmentContent: null,
              enhancedListing: false,
              showOnMap: true,
              showReducedProperties: true,
            },
            development: false,
            displayAddress: "Church Road, Hayes, UB3",
            displaySize: "",
            displayStatus: "",
            distance: null,
            enhancedListing: false,
            enquiredTimestamp: null,
            featuredProperty: false,
            feesApply: false,
            feesApplyText: null,
            firstVisibleDate: "2022-10-21T14:30:02Z",
            formattedBranchName: " by Express Estate Agency, Nationwide",
            formattedDistance: "",
            hasBrandPlus: true,
            heading: "",
            hidden: false,
            id: 128284049,
            isRecent: false,
            keywordMatchType: "no_keyword",
            keywords: [],
            listingUpdate: {
              listingUpdateDate: "2022-10-21T14:36:02Z",
              listingUpdateReason: "new",
            },
            location: {
              latitude: 51.511106,
              longitude: -0.420617,
            },
            lozengeModel: {
              matchingLozenges: [],
            },
            numberOfFloorplans: 0,
            numberOfImages: 15,
            numberOfVirtualTours: 0,
            onlineViewingsAvailable: false,
            premiumListing: false,
            price: {
              amount: 600000,
              currencyCode: "GBP",
              displayPrices: [
                {
                  displayPrice: "Â£600,000",
                  displayPriceQualifier: "Offers Over",
                },
              ],
              frequency: "not specified",
            },
            productLabel: {
              productLabelText: "",
              spotlightLabel: false,
            },
            propertyImages: {
              images: [
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/62k/61544/128284049/61544_25493881_IMG_00_0000_max_476x317.jpeg",
                  url: "62k/61544/128284049/61544_25493881_IMG_00_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/62k/61544/128284049/61544_25493881_IMG_01_0000_max_476x317.jpeg",
                  url: "62k/61544/128284049/61544_25493881_IMG_01_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/62k/61544/128284049/61544_25493881_IMG_02_0000_max_476x317.jpeg",
                  url: "62k/61544/128284049/61544_25493881_IMG_02_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/62k/61544/128284049/61544_25493881_IMG_03_0000_max_476x317.jpeg",
                  url: "62k/61544/128284049/61544_25493881_IMG_03_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/62k/61544/128284049/61544_25493881_IMG_04_0000_max_476x317.jpeg",
                  url: "62k/61544/128284049/61544_25493881_IMG_04_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/62k/61544/128284049/61544_25493881_IMG_05_0000_max_476x317.jpeg",
                  url: "62k/61544/128284049/61544_25493881_IMG_05_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/62k/61544/128284049/61544_25493881_IMG_06_0000_max_476x317.jpeg",
                  url: "62k/61544/128284049/61544_25493881_IMG_06_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/62k/61544/128284049/61544_25493881_IMG_07_0000_max_476x317.jpeg",
                  url: "62k/61544/128284049/61544_25493881_IMG_07_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/62k/61544/128284049/61544_25493881_IMG_08_0000_max_476x317.jpeg",
                  url: "62k/61544/128284049/61544_25493881_IMG_08_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/62k/61544/128284049/61544_25493881_IMG_09_0000_max_476x317.jpeg",
                  url: "62k/61544/128284049/61544_25493881_IMG_09_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/62k/61544/128284049/61544_25493881_IMG_10_0000_max_476x317.jpeg",
                  url: "62k/61544/128284049/61544_25493881_IMG_10_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/62k/61544/128284049/61544_25493881_IMG_11_0000_max_476x317.jpeg",
                  url: "62k/61544/128284049/61544_25493881_IMG_11_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/62k/61544/128284049/61544_25493881_IMG_12_0000_max_476x317.jpeg",
                  url: "62k/61544/128284049/61544_25493881_IMG_12_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/62k/61544/128284049/61544_25493881_IMG_13_0000_max_476x317.jpeg",
                  url: "62k/61544/128284049/61544_25493881_IMG_13_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/62k/61544/128284049/61544_25493881_IMG_14_0000_max_476x317.jpeg",
                  url: "62k/61544/128284049/61544_25493881_IMG_14_0000.jpeg",
                },
              ],
              mainImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/62k/61544/128284049/61544_25493881_IMG_00_0000_max_476x317.jpeg",
              mainMapImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/62k/61544/128284049/61544_25493881_IMG_00_0000_max_296x197.jpeg",
            },
            propertySubType: "Semi-Detached",
            propertyTypeFullDescription:
              "3 bedroom semi-detached house for sale",
            propertyUrl: "/properties/128284049#/?channel=RES_BUY",
            residential: true,
            saved: false,
            showOnMap: true,
            staticMapUrl: null,
            students: false,
            summary:
              "We are proud to present this Three Bedroom Semi Detached House â€“ all interest and OFFERS are INVITED.",
            transactionType: "buy",
          },
          {
            addedOrReduced: "Added on 26/12/2022",
            auction: false,
            bathrooms: 1,
            bedrooms: 3,
            channel: "BUY",
            commercial: false,
            contactUrl:
              "/property-for-sale/contactBranch.html?propertyId=134967563",
            countryCode: "GB",
            customer: {
              branchDisplayName: "Barnard Marcus, Feltham",
              branchId: 1903,
              branchLandingPageUrl:
                "/estate-agents/agent/Barnard-Marcus/Feltham-1903.html",
              branchName: "Feltham",
              brandPlusLogoURI: "/brand/brand_rmchoice_logo_282_0004.jpeg",
              brandPlusLogoUrl:
                "https://media.rightmove.co.uk:443/dir/brand/brand_rmchoice_logo_282_0004_max_100x50.jpeg",
              brandTradingName: "Barnard Marcus",
              buildToRent: false,
              buildToRentBenefits: [],
              commercial: false,
              contactTelephone: "020 3915 5904",
              development: false,
              developmentContent: null,
              enhancedListing: false,
              showOnMap: true,
              showReducedProperties: true,
            },
            development: false,
            displayAddress: "Central Avenue, Hayes",
            displaySize: "",
            displayStatus: "",
            distance: null,
            enhancedListing: false,
            enquiredTimestamp: null,
            featuredProperty: false,
            feesApply: false,
            feesApplyText: null,
            firstVisibleDate: "2023-05-18T16:47:03Z",
            formattedBranchName: " by Barnard Marcus, Feltham",
            formattedDistance: "",
            hasBrandPlus: true,
            heading: "",
            hidden: false,
            id: 134967563,
            isRecent: false,
            keywordMatchType: "no_keyword",
            keywords: [],
            listingUpdate: {
              listingUpdateDate: "2022-12-26T05:44:17Z",
              listingUpdateReason: "new",
            },
            location: {
              latitude: 51.51103,
              longitude: -0.4173,
            },
            lozengeModel: {
              matchingLozenges: [],
            },
            numberOfFloorplans: 1,
            numberOfImages: 9,
            numberOfVirtualTours: 0,
            onlineViewingsAvailable: false,
            premiumListing: true,
            price: {
              amount: 599950,
              currencyCode: "GBP",
              displayPrices: [
                {
                  displayPrice: "Â£599,950",
                  displayPriceQualifier: "",
                },
              ],
              frequency: "not specified",
            },
            productLabel: {
              productLabelText: "Garden",
              spotlightLabel: false,
            },
            propertyImages: {
              images: [
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/2k/1903/134967563/1903_HYS102756_IMG_00_0000_max_476x317.jpeg",
                  url: "2k/1903/134967563/1903_HYS102756_IMG_00_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/2k/1903/134967563/1903_HYS102756_IMG_01_0000_max_476x317.jpeg",
                  url: "2k/1903/134967563/1903_HYS102756_IMG_01_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/2k/1903/134967563/1903_HYS102756_IMG_02_0000_max_476x317.jpeg",
                  url: "2k/1903/134967563/1903_HYS102756_IMG_02_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/2k/1903/134967563/1903_HYS102756_IMG_03_0000_max_476x317.jpeg",
                  url: "2k/1903/134967563/1903_HYS102756_IMG_03_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/2k/1903/134967563/1903_HYS102756_IMG_04_0000_max_476x317.jpeg",
                  url: "2k/1903/134967563/1903_HYS102756_IMG_04_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/2k/1903/134967563/1903_HYS102756_IMG_05_0000_max_476x317.jpeg",
                  url: "2k/1903/134967563/1903_HYS102756_IMG_05_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/2k/1903/134967563/1903_HYS102756_IMG_06_0000_max_476x317.jpeg",
                  url: "2k/1903/134967563/1903_HYS102756_IMG_06_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/2k/1903/134967563/1903_HYS102756_IMG_07_0000_max_476x317.jpeg",
                  url: "2k/1903/134967563/1903_HYS102756_IMG_07_0000.jpeg",
                },
                {
                  caption: null,
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/2k/1903/134967563/1903_HYS102756_IMG_08_0000_max_476x317.jpeg",
                  url: "2k/1903/134967563/1903_HYS102756_IMG_08_0000.jpeg",
                },
              ],
              mainImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/2k/1903/134967563/1903_HYS102756_IMG_00_0000_max_476x317.jpeg",
              mainMapImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/2k/1903/134967563/1903_HYS102756_IMG_00_0000_max_296x197.jpeg",
            },
            propertySubType: "Semi-Detached",
            propertyTypeFullDescription:
              "3 bedroom semi-detached house for sale",
            propertyUrl: "/properties/134967563#/?channel=RES_BUY",
            residential: true,
            saved: false,
            showOnMap: true,
            staticMapUrl: null,
            students: false,
            summary:
              "Barnard Marcus are happy to welcome to the market this fantastic three bedroom semi-detached house situated on the well-known and much sought after Central Avenue in Hayes",
            transactionType: "buy",
          },
          {
            addedOrReduced: "Reduced on 19/07/2023",
            auction: false,
            bathrooms: 1,
            bedrooms: 3,
            channel: "BUY",
            commercial: false,
            contactUrl:
              "/property-for-sale/contactBranch.html?propertyId=136615769",
            countryCode: "GB",
            customer: {
              branchDisplayName: "Stones Property, Middlesex",
              branchId: 91151,
              branchLandingPageUrl:
                "/estate-agents/agent/Stones-Property/Middlesex-91151.html",
              branchName: "Middlesex",
              brandPlusLogoURI: "/company/clogo_rmchoice_34994_0000.png",
              brandPlusLogoUrl:
                "https://media.rightmove.co.uk:443/dir/company/clogo_rmchoice_34994_0000_max_100x50.png",
              brandTradingName: "Stones Property",
              buildToRent: false,
              buildToRentBenefits: [],
              commercial: false,
              contactTelephone: "020 3870 9380",
              development: false,
              developmentContent: null,
              enhancedListing: false,
              showOnMap: true,
              showReducedProperties: true,
            },
            development: false,
            displayAddress: "Seaton Road, Hayes, Greater London, UB3",
            displaySize: "",
            displayStatus: "",
            distance: null,
            enhancedListing: false,
            enquiredTimestamp: null,
            featuredProperty: false,
            feesApply: false,
            feesApplyText: null,
            firstVisibleDate: "2023-06-27T11:48:10Z",
            formattedBranchName: " by Stones Property, Middlesex",
            formattedDistance: "",
            hasBrandPlus: true,
            heading: "",
            hidden: false,
            id: 136615769,
            isRecent: false,
            keywordMatchType: "no_keyword",
            keywords: [],
            listingUpdate: {
              listingUpdateDate: "2023-07-19T18:19:54Z",
              listingUpdateReason: "price_reduced",
            },
            location: {
              latitude: 51.499523,
              longitude: -0.438052,
            },
            lozengeModel: {
              matchingLozenges: [],
            },
            numberOfFloorplans: 1,
            numberOfImages: 23,
            numberOfVirtualTours: 0,
            onlineViewingsAvailable: false,
            premiumListing: false,
            price: {
              amount: 585000,
              currencyCode: "GBP",
              displayPrices: [
                {
                  displayPrice: "Â£585,000",
                  displayPriceQualifier: "Offers in Region of",
                },
              ],
              frequency: "not specified",
            },
            productLabel: {
              productLabelText: "",
              spotlightLabel: false,
            },
            propertyImages: {
              images: [
                {
                  caption: "Front Aspect",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/92k/91151/136615769/91151_RHL230368_IMG_00_0000_max_476x317.jpeg",
                  url: "92k/91151/136615769/91151_RHL230368_IMG_00_0000.jpeg",
                },
                {
                  caption: "Garden &amp; Rear",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/92k/91151/136615769/91151_RHL230368_IMG_01_0000_max_476x317.jpeg",
                  url: "92k/91151/136615769/91151_RHL230368_IMG_01_0000.jpeg",
                },
                {
                  caption: "Lounge",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/92k/91151/136615769/91151_RHL230368_IMG_02_0000_max_476x317.jpeg",
                  url: "92k/91151/136615769/91151_RHL230368_IMG_02_0000.jpeg",
                },
                {
                  caption: "Dining Area",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/92k/91151/136615769/91151_RHL230368_IMG_03_0000_max_476x317.jpeg",
                  url: "92k/91151/136615769/91151_RHL230368_IMG_03_0000.jpeg",
                },
                {
                  caption: "Dining Area (2)",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/92k/91151/136615769/91151_RHL230368_IMG_04_0000_max_476x317.jpeg",
                  url: "92k/91151/136615769/91151_RHL230368_IMG_04_0000.jpeg",
                },
                {
                  caption: "Lounge",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/92k/91151/136615769/91151_RHL230368_IMG_05_0000_max_476x317.jpeg",
                  url: "92k/91151/136615769/91151_RHL230368_IMG_05_0000.jpeg",
                },
                {
                  caption: "Dining Room",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/92k/91151/136615769/91151_RHL230368_IMG_06_0000_max_476x317.jpeg",
                  url: "92k/91151/136615769/91151_RHL230368_IMG_06_0000.jpeg",
                },
                {
                  caption: "Bar Area",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/92k/91151/136615769/91151_RHL230368_IMG_07_0000_max_476x317.jpeg",
                  url: "92k/91151/136615769/91151_RHL230368_IMG_07_0000.jpeg",
                },
                {
                  caption: "Kitchen",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/92k/91151/136615769/91151_RHL230368_IMG_08_0000_max_476x317.jpeg",
                  url: "92k/91151/136615769/91151_RHL230368_IMG_08_0000.jpeg",
                },
                {
                  caption: "Kitchen (2)",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/92k/91151/136615769/91151_RHL230368_IMG_09_0000_max_476x317.jpeg",
                  url: "92k/91151/136615769/91151_RHL230368_IMG_09_0000.jpeg",
                },
                {
                  caption: "Utility Room",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/92k/91151/136615769/91151_RHL230368_IMG_10_0000_max_476x317.jpeg",
                  url: "92k/91151/136615769/91151_RHL230368_IMG_10_0000.jpeg",
                },
                {
                  caption: "Bedroom One",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/92k/91151/136615769/91151_RHL230368_IMG_11_0000_max_476x317.jpeg",
                  url: "92k/91151/136615769/91151_RHL230368_IMG_11_0000.jpeg",
                },
                {
                  caption: "Bedroom One (2)",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/92k/91151/136615769/91151_RHL230368_IMG_12_0000_max_476x317.jpeg",
                  url: "92k/91151/136615769/91151_RHL230368_IMG_12_0000.jpeg",
                },
                {
                  caption: "Bedroom Two",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/92k/91151/136615769/91151_RHL230368_IMG_13_0000_max_476x317.jpeg",
                  url: "92k/91151/136615769/91151_RHL230368_IMG_13_0000.jpeg",
                },
                {
                  caption: "Bedroom Two (2)",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/92k/91151/136615769/91151_RHL230368_IMG_14_0000_max_476x317.jpeg",
                  url: "92k/91151/136615769/91151_RHL230368_IMG_14_0000.jpeg",
                },
                {
                  caption: "Bathroom",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/92k/91151/136615769/91151_RHL230368_IMG_15_0000_max_476x317.jpeg",
                  url: "92k/91151/136615769/91151_RHL230368_IMG_15_0000.jpeg",
                },
                {
                  caption: "Garden &amp; Garage",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/92k/91151/136615769/91151_RHL230368_IMG_16_0000_max_476x317.jpeg",
                  url: "92k/91151/136615769/91151_RHL230368_IMG_16_0000.jpeg",
                },
                {
                  caption: "Patio",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/92k/91151/136615769/91151_RHL230368_IMG_17_0000_max_476x317.jpeg",
                  url: "92k/91151/136615769/91151_RHL230368_IMG_17_0000.jpeg",
                },
                {
                  caption: "Patio (2)",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/92k/91151/136615769/91151_RHL230368_IMG_18_0000_max_476x317.jpeg",
                  url: "92k/91151/136615769/91151_RHL230368_IMG_18_0000.jpeg",
                },
                {
                  caption: "Garden (2)",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/92k/91151/136615769/91151_RHL230368_IMG_19_0000_max_476x317.jpeg",
                  url: "92k/91151/136615769/91151_RHL230368_IMG_19_0000.jpeg",
                },
                {
                  caption: "Patio Close Up",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/92k/91151/136615769/91151_RHL230368_IMG_20_0000_max_476x317.jpeg",
                  url: "92k/91151/136615769/91151_RHL230368_IMG_20_0000.jpeg",
                },
                {
                  caption: "Garden",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/92k/91151/136615769/91151_RHL230368_IMG_21_0000_max_476x317.jpeg",
                  url: "92k/91151/136615769/91151_RHL230368_IMG_21_0000.jpeg",
                },
                {
                  caption: "Garden &amp; Rear Aspect",
                  srcUrl:
                    "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/92k/91151/136615769/91151_RHL230368_IMG_22_0000_max_476x317.jpeg",
                  url: "92k/91151/136615769/91151_RHL230368_IMG_22_0000.jpeg",
                },
              ],
              mainImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/92k/91151/136615769/91151_RHL230368_IMG_00_0000_max_476x317.jpeg",
              mainMapImageSrc:
                "https://media.rightmove.co.uk:443/dir/crop/10:9-16:9/92k/91151/136615769/91151_RHL230368_IMG_00_0000_max_296x197.jpeg",
            },
            propertySubType: "Semi-Detached",
            propertyTypeFullDescription:
              "3 bedroom semi-detached house for sale",
            propertyUrl: "/properties/136615769#/?channel=RES_BUY",
            residential: true,
            saved: false,
            showOnMap: true,
            staticMapUrl: null,
            students: false,
            summary:
              "Welcome to this stunning three-bedroom semi-detached family home in the desirable location of Hillingdon. Boasting an array of attractive features, this property offers a comfortable and convenient living experience for any family. Upon entering, you will be greeted by a spacious and i...",
            transactionType: "buy",
          },
        ],
      ];
      // const response = [1, 2, 3, 4];
      setResponse(response)
      console.log(response);
      navigateToSale();
    } catch (err) {
      console.error(err);
    }
  }

  async function HandleRent(event) {
    event.preventDefault();

    console.log("handling rent");

    const url = "https://api.openai.com/v1/chat/completions";
    event.preventDefault();
    console.log("postcode is ");
    console.log(state.postcode);

    const json = {
      url: "gpt-3.5-turbo",
    };
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      console.log("request is ");
      console.log(json);

      //create url with the postcode and Sale type

      const response = await axios.post(url, json, { headers: headers });
    } catch (err) {
      console.error(err);
    }
  }

  async function handleHistory(event) {
    event.preventDefault();
  }

  //        <p>{list}</p>
  const [response, setResponse] = useState({});

  
  return (
    <responseContext.Provider value={{ response, setResponse }}>
      <div className="App">
        <header className="App-header">
          <img src={star} className="App-logo" alt="star" />
          <p className="font">
            Sale or Rent? Type your postcode below to get started!
          </p>
          <textarea
            className="textbox"
            name="postcode"
            value={state.postcode}
            onChange={handleLocationChange}
            placeholder="Type postcode here"
          />
          <button
            className="button"
            value="sale"
            onClick={HandleSale}
            data-inline="true"
          >
            For Sale
          </button>
          <button
            className="button"
            value="rent"
            onClick={navigateToRent}
            data-inline="true"
          >
            To Rent
          </button>
          <Routes>
            <Route
              path="/sale/*"
              element={<SalePickFilters location={state.postcode} />}
            />
            <Route
              path="/rent/*"
              element={<RentPickFilters location={state.postcode} />}
            />
            <Route path="/browse" element={<NavigateToBrowse />} />
          </Routes>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <img className="lineDimensions" src="Line.png" alt="im1" />
          <p className="font">
            Confused about properties?<br></br>Ask our AI property expert.
          </p>
          <textarea
            className="textbox"
            name="question"
            value={state.question}
            onChange={handleChange}
            rows={5}
            placeholder="Type in what you would like to know..."
          />
          &nbsp;
          <button className="button" onClick={handleSubmit} data-inline="true">
            Ask away
          </button>
          &nbsp; &nbsp;
          {AIresponseData && !isLoading && (
            <ClipboardCopy copyText={AIresponseData} />
          )}
          {isLoading ? <LoadingSpinner /> : ""}
          <ul>{<HistoryList list={list} />}</ul>
          &nbsp; &nbsp;
        </header>
      </div>
    </responseContext.Provider>
  );
}

export default App;
