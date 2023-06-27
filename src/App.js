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
            const responseMessage = response.data.choices[0].message.content;
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
