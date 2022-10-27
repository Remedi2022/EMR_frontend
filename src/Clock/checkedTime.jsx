import React, {useState}  from 'react';
import moment from 'moment';
import 'moment/locale/ko';
// import { useInterval } from 'react-use';

// 조회한 시각을 띄웁니다.
export default function Clock(){

const Time = moment().format('YYYY-MM-DD HH:mm');

  return(
    <>{Time}</>
  )
}
