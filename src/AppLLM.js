import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import ClipboardCopy from './ClipboardCopy.js'
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';


import logo from './logo.svg';
import star from './star.png'
import './styling/App.css';

axios.defaults.xsrfCookieName = 'CSRF-TOKEN';
axios.defaults.xsrfHeaderName = 'X-CSRF-Token';

function App() {
const { register, formState } = useForm();
    let [responseData, setResponseData] = React.useState('')
    const [state, setState] = useState({
      question: ""
    });
    const initialList = [];
    const [list, setList] = React.useState(initialList);
    const handleChange = (e) => {
        const value = e.target.value;
        setState({
          ...state,
          [e.target.name]: value
        });
      };

    const url = 'https://api.openai.com/v1/chat/completions'

    async function handleSubmit(event) {
      event.preventDefault()

      console.log('question asked is ')
      console.log(state.question)

      list.push(state.question)

      console.log('list is')
      console.log(list)

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
            const response = await axios.post(url, json, {headers: headers})
            const responseMessage = response.data.choices[0].message.content;
//            if(responseMessage.charAt(0) == 'I') {
                setResponseData(responseMessage)
//            } else {
//                const toLowerCase= responseMessage.charAt(0).toLowerCase() + responseMessage.slice(1)
//                setResponseData(toLowerCase)
//            }
            list.push(responseMessage);
            console.log('list is')
                  console.log(list)
          } catch (err) {
            console.error(err);
          }
    }

    async function handleHistory(event) {
          event.preventDefault()

        }


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
         <button className="button" onClick={handleSubmit}>Ask away</button>
         {responseData && <p>{responseData}</p>}
         &nbsp;
         &nbsp;
       </header>
       </div>
     );
}

export default App;
