import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

import logo from './logo.svg';
import star from './star.png'
import './App.css';

axios.defaults.xsrfCookieName = 'CSRF-TOKEN';
axios.defaults.xsrfHeaderName = 'X-CSRF-Token';

function ClipboardCopy({ copyText }) {
  const [isCopied, setIsCopied] = useState(false);

  async function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }

  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(copyText)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <button className="button" onClick={handleCopyClick} data-inline="true">
        <span>{isCopied ? 'Copied!' : 'Copy Response'}</span>
      </button>
    </div>
  );
}

export default ClipboardCopy;
