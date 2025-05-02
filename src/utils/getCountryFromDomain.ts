export const getCountryFromDomain = () => {
  const domain = window.location.hostname;

  switch (domain) {
    case "ksa.dashboard.paymob.com":
      return "SAU";
    case "uae.dashboard.paymob.com":
      return "ARE";
    case "pk.dashboard.paymob.com":
      return "PAK";
    case "om.dashboard.paymob.com":
      return "OMN";
    case "eg.dashboard.paymob.com":
      return "EGY";
    case "alpha.dashboard.paymob.com":
      return "EGY";
    default:
      return "EGY";
  }
}