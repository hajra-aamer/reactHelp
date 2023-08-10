import React, { useState } from "react";
import axios from "axios";
import ClipboardCopy from "../ClipboardCopy.js";
import LoadingSpinner from "../LoadingSpinner.js";
import HistoryList from "../History.js";
import SalePickFilters from "./SalePickFilters.js";
import RentPickFilters from "./RentPickFilters.js";
import NavigateToBrowse from "./NavigateToBrowse.js";
import { Routes, Route, useNavigate } from "react-router-dom";
import star from "../star.png";
import "../styling/App.css";
import { responseContext } from "../context/responseContext.js";
import { postcodeContext } from "./../context/postcodeContext";
import Postcode from "../components/Postcode.jsx";

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
      setResponse(response);
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
  const [postcode, setPostcode] = useState('');

  return (
    <responseContext.Provider value={{ response, setResponse }}>
      <postcodeContext.Provider value={{ postcode, setPostcode }}>
        <div className="App">
          <header className="App-header">
            <img src={star} className="App-logo" alt="star" />
            <p className="font">
              Sale or Rent? Type your postcode below to get started!
            </p>
            <Postcode />
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
                element={<SalePickFilters location={postcode} />}
              />
              <Route
                path="/rent/*"
                element={<RentPickFilters location={postcode} />}
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
            <button
              className="button"
              onClick={handleSubmit}
              data-inline="true"
            >
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
      </postcodeContext.Provider>
    </responseContext.Provider>
  );
}

export default App;
