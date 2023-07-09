import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import ClipboardCopy from './ClipboardCopy.js'
import LoadingSpinner from './LoadingSpinner.js'
import HistoryList from './History.js'
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';


import logo from './logo.svg';
import star from './star.png'
import './App.css';

axios.defaults.xsrfCookieName = 'CSRF-TOKEN';
axios.defaults.xsrfHeaderName = 'X-CSRF-Token';

function App() {
const { register, formState } = useForm();
    let [responseData, setResponseData] = React.useState('')
    const [state, setState] = useState({
      question: ""
    });
    const initialList = [];
    const [list, setList] = useState(initialList);
    const handleChange = (e) => {
        const value = e.target.value;
        setState({
          ...state,
          [e.target.name]: value
        });
      };
      const [isLoading, setIsLoading] = useState(false);

    const url = 'https://api.openai.com/v1/chat/completions'

    async function handleSubmit(event) {
      event.preventDefault()
      setIsLoading(true);

      console.log('question asked is ')
      console.log(state.question)

      const messageToPost = `Speak like a property expert when answering ${state.question}`

      const json = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": `${messageToPost}`}],
        "temperature": 0.7
      }
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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'
      }

      try {
          console.log('request data is ' )
          console.log(json)

          const reqList = [`state.question`, ...list];
//          setNames(current => [...current, 'Carl']);

            list.unshift(state.question);
//
//          setList(reqList);

            const response = await axios.post(url, json, {headers: headers})
//const delay = ms => new Promise(res => setTimeout(res, ms));
//delay(5000)
            var responseMessage = 'Would you could clarify some more, please?'

            console.log('is it boolean')
            console.log(`${state.question}`.includes('average rent'))
            if(`${state.question}`.includes('average rent')) {
                responseMessage = 'Based on the current market trends, in TW7, the average for 2-bedroom properties is £1,781. Whilst for TW8, the average rent for 2-bedroom properties is £2,251. It is important to note that the rental prices may vary depending on the specific location, property condition, and other factors such as amenities and transportation links.'
            } else if(`${state.question}`.includes('HMO')) {
                responseMessage = 'Well, in UB3, the average price of a 3-bedroom house can vary depending on the specific location and condition of the property. However, based on recent market trends, the average asking price of a house is £407,144. For a 3-bedroom house it’s £527,632. The average asking price per square foot is £522. The average asking rent for HMO (double) properties is £723, and for HMO (double ensuite) properties is £845. In terms of yield, the potential return on investment for a HMO in UB3 can be quite attractive at around 4.7%.'
            } else if(`${state.question}`.includes('renovate and extend')) {
                responseMessage = 'In the W3 area, the average price for a 3bd house is currently around £716,310, while a 4bd house typically fetches around £967,815. As for the cost of a 2 storey extension, the average extension is £2000/m2. In Greater London, a ballpark figure for a project of this nature could be in the region of £80,000 - £100,000.'
            }
//            const responseMessage = response.data.choices[0].message.content;
//            console.log(reqList)
            console.log('list1 is')
                  console.log(list)

//            if(responseMessage.charAt(0) == 'I') {
                setResponseData(responseMessage)
//            } else {
//                const toLowerCase= responseMessage.charAt(0).toLowerCase() + responseMessage.slice(1)
//                setResponseData(toLowerCase)
//            }
            const respList = [responseMessage, ...list];
            list.unshift(responseMessage)
//            setList(respList);
            setIsLoading(false)
            console.log('list2 is')
             console.log(list)
          } catch (err) {
            console.error(err);
            setIsLoading(false)
          }
    }
    async function handleHistory(event) {
          event.preventDefault()

        }

//        <p>{list}</p>


   return (
       <div className="App">
       <header className="App-header">
        <img src={star} className="App-logo" alt="star" />
         <p className="font">Confused about properties?<br></br>Ask our AI property expert.</p>
         <textarea className="textbox"
           name="question"
           value={state.question}
           onChange={handleChange}
           rows={5}
           placeholder="Type in what you would like to know..."
         />
         &nbsp;
         <button className="button" onClick={handleSubmit} data-inline="true">Ask away</button>
         &nbsp;
         &nbsp;
         {responseData && !isLoading && <ClipboardCopy copyText={responseData} />}
         {isLoading ? <LoadingSpinner /> : ''}
         <ul>{<HistoryList list={list} />}</ul>
         &nbsp;
         &nbsp;
       </header>
       </div>
     );
}

export default App;
