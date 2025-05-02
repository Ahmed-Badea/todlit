import getBrowserFingerprint from 'get-browser-fingerprint';
import ls from 'localstorage-slim';
import CryptoJS from 'crypto-js';
import { environment } from '../environments/environment';

let fingerprint: any;
ls.config.encrypt = true;
try {
  fingerprint = getBrowserFingerprint();
  if (fingerprint) {
    ls.config.secret = fingerprint;
  } else {
    ls.config.secret = environment.LS_SECRET;
  }
} catch (err) {
  ls.config.secret = environment.LS_SECRET;
}

const CRYPTO_SECRET = `${environment.CRYPTO_SECRET}${fingerprint}`;

export const getFromLocalStorage = (key: string) => {
  let value = null;

  try {
    if (environment.ENV_MODE === "development") {
      value = JSON.parse(localStorage.getItem(key) || "null");
    } else {
      value = JSON.parse(ls.get(String(CryptoJS.HmacSHA1(key, CRYPTO_SECRET))) || "null");
    }
  } catch (error) {
    value = null;
  }

  return value;
}

export const addToLocalStorage = (key: string, value: any) => {
  if (environment.ENV_MODE === "development") {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    ls.set(String(CryptoJS.HmacSHA1(key, CRYPTO_SECRET)), JSON.stringify(value));
  }
}

export const deleteFromLocalStorage = (key: string) => {
  if (environment.ENV_MODE === "development") {
    localStorage.removeItem(key);
  } else {
    const value = ls.remove(CryptoJS.HmacSHA1(key, CRYPTO_SECRET) as any);
    return value;
  }
}