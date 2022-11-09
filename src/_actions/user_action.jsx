import axios from "axios";

import {
  SIGNIN_USER,
  SIGNUP_USER,
  REGISTER_PATIENT,
  RECEPTION,
  PAYMENT,
} from "./types";

export function signinUser(dataToSubmit) {
  const request = axios
    .post("http://3.35.231.145:8080/api/auth/signin", dataToSubmit)
    // .then( response => console.log('AXIOS:', response) ) // 아래 .then과 둘 다 하면 에러 남
    .then((response) => response.data);

  return {
    type: SIGNIN_USER,
    payload: request,
  };
}

export async function signupUser(dataToSubmit) {
  const request = await axios
    .post("http://3.35.231.145:8080/api/auth/signup", dataToSubmit)
    // .then( response => console.log('AXIOS:', response) )
    .then((response) => response.data);
  // console.log(request)
  //request를 reducer에 넘겨줌
  return {
    type: SIGNUP_USER,
    payload: request,
  };
}

// 신환 등록
export async function registerPatient(dataToSubmit) {
  const request = await axios
    .post("http://3.35.231.145:8080/api/patient/register", dataToSubmit)
    // .then((response) => console.log("AXIOS:", response));
    .then((response) => response.data);

  //request를 reducer에 넘겨줌
  return {
    type: REGISTER_PATIENT,
    payload: request,
  };
}

// 환자 접수
export async function reception(dataToSubmit) {
  const request = await axios
    .post("http://3.35.231.145:8080/api/visit/register", dataToSubmit)
    // .then((response) => console.log("AXIOS:", response));
    .then((response) => response.data);

  //request를 reducer에 넘겨줌
  return {
    type: RECEPTION,
    payload: request,
  };
}

export async function payment(dataToSubmit) {
  // console.log("dataToSubmit", dataToSubmit);
  const request = await axios
    .post("http://3.35.231.145:8080/api/payment/register", dataToSubmit)
    // .then( response => console.log('AXIOS:', response) )
    .then((response) => response.data);

  //request를 reducer에 넘겨줌
  return {
    type: PAYMENT,
    payload: request,
  };
}
