import { getCountryFromDomain } from './getCountryFromDomain';
import { COUNTRIES } from './formValidations';

const FOREIGN_COUNTRIES = Object.values(COUNTRIES).map((country) => country !== COUNTRIES.EGY && country);

const country = getCountryFromDomain();

export const isForeignCountry = () => {
  return FOREIGN_COUNTRIES.includes(country);
}