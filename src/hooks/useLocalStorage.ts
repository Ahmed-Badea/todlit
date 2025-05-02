import getBrowserFingerprint from 'get-browser-fingerprint';
import ls from 'localstorage-slim';
import CryptoJS from 'crypto-js';
import { environment } from './../environments/environment';

import { useState, useEffect } from "react";

let fingerprint: any;
ls.config.encrypt = true;
try {
    fingerprint = getBrowserFingerprint();
    if(fingerprint){
        ls.config.secret = fingerprint;
    }else{
        ls.config.secret = environment['LS_SECRET'];
    }
}catch(err) {
    ls.config.secret = environment['LS_SECRET'];
}


const useLocalStorage = (key: string, defaultValue: any) => {
  const [value, setValue] = useState(() => {
    let currentValue;
    try {
        if(environment['ENV_MODE'] === "development"){
            currentValue = JSON.parse(localStorage.getItem(key) || String(defaultValue));
        }else{
            currentValue = JSON.parse(ls.get( String(CryptoJS.HmacSHA1(key, environment['CRYPTO_SECRET'] + fingerprint)) ) || String(defaultValue));
        }
    } catch (error) {
      currentValue = defaultValue;
    }

    return currentValue;
  });

  useEffect(() => {
    if(environment['ENV_MODE'] === "development"){
        localStorage.setItem(key, JSON.stringify(value));
    }else{
        ls.set( String(CryptoJS.HmacSHA1(key, environment['CRYPTO_SECRET'] + fingerprint)) , JSON.stringify(value));
    }
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;