const hostName = window.location.hostname;

export const getServerUrl = () => {
  if(hostName === "localhost"){
    return "https://todlit.com";
  }else{
    return hostName;
  }
};