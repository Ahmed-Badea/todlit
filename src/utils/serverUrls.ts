const hostName = window.location.hostname;

export const getServerUrl = () => {
  if(hostName === "localhost"){
    return "http://3.82.114.207";
  }else{
    return hostName;
  }
};