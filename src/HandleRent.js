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




async function HandleRent(event) {
              event.preventDefault()

               console.log('handling rent')

              let [responseData, setResponseData] = React.useState('')
                  const [state, setState] = useState({
                    postcode: ""
                  });
                  const handleChange = (e) => {
                      const value = e.target.value;
                      setState({
                        ...state,
                        [e.target.name]: value
                      });
                    };

                  const url = 'https://api.openai.com/v1/chat/completions'
                  event.preventDefault()
                        console.log('postcode is ')
                        console.log(state.postcode)

                        const json = {
                          "url": "gpt-3.5-turbo"
                        }
                        const headers = {
                          'Content-Type': 'application/json'
                        }

                        try {
                            console.log('request is ' )
                            console.log(json)

                            //create url with the postcode and Sale type

                            const response = await axios.post(url, json, {headers: headers})

                            } catch (err) {
                              console.error(err);
                            }
                      }

//              const url = 'http://localhost:8080/http://127.0.0.1:5000/properties'
//    //          const url = 'http://localhost:8080/http://google.com'
//
//               const headers = {
//                      Accept: "application/json",
//                      'Access-Control-Allow-Origin' : '*',
//                      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
//                      "Content-Type": "application/json",
//                      "Access-Control-Allow-Credentials": true,
//                  };
//
//              try {
//
//    //          console.time('first fetch')
//    //                    await fetch(url)
//    //                    console.timeEnd('first fetch')
//
//
//    //          let response = () => {
//    //                        return new Promise(function(resolve, reject) {
//    //                          fetch(url).then(response => {
//    //                            resolve(response);
//    //                          });
//    //                        });
//    //           };
//    //
//    //            let responseData = await response();
//    //            console.log(responseData);
//    //
//    ////              console.log('getting the browsing data ' )
//                    const response = await axios.get(url, { headers })
//    //    //            const responseMessage = response.data.choices[0].message.content;
//                    console.log('response i get is')
//                          console.log(response)
//                  } catch (err) {
//                    console.error(err);
//                  }

export default HandleRent;
