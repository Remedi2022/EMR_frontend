import React, {useState}  from 'react';
// import moment from 'moment';
import 'moment/locale/ko';
import { useInterval } from 'react-use';


export default function Clock(){
const [timer, setTimer] = useState("0000-00-00 00:00");

const currentTimer=()=>{
    const date = new Date();
    const year = String(date.getFullYear());
    const month = String(date.getMonth()).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    setTimer(`${year}-${month}-${day} ${hours}:${minutes}`)
}

const startTimer=()=>{
    setInterval(currentTimer, 50)
}
startTimer()

  return(
    <>{timer}</>
  )
}
