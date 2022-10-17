import './Login.css'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../_actions/user_action'
import { useNavigate } from 'react-router-dom'


export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value)
    }
    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value)
    }
    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log('EMAIL:', email)
        console.log('PW:', password)
        if (!email) {
            return alert("email을 입력하세요.");
        }
        else if (!password) {
            return alert("비밀번호를 입력하세요.");
        }

        let body = {
            email: email,
            password: password
        }

        // dispatch(loginUser(body))
        dispatch(loginUser(body))
            .then(response => {
                console.log('DISPATCH:', response)
                if(response.payload.success) {
                    navigate('/');
            }   else {
                    alert('Error')
            }
        })
    }

    return(
        <div className="loginHome">
        {/* <div className="loginContainer"> */}
            <div className="loginContentBox">
                <div className="loginContent">
                    <span className="remedi"> REMEDi </span>
                    <form onSubmit={onSubmitHandler}>
                        <div className="inputWrapper">
                            <div className="inputBoxEmail">
                                <input id="emailContent"
                                    type="email"
                                    name="emailContent"
                                    placeholder="email"
                                    value={ email }
                                    onChange={ onEmailHandler }
                                />
                                {/* <img className='userLogin' src={ process.env.PUBLIC_URL + '/icons/userlogin.png' } /> */}
                            </div>
                            <div className="inputBoxPW">
                                <input id="pwContent"
                                    type="password"
                                    name="pwContent"
                                    placeholder="password"
                                    value={ password }
                                    onChange={ onPasswordHandler }
                                />
                            </div>
                        </div>  

                        <div className="option">
                            <input type="checkbox" id="id"/><label htmlFor="id"></label>
                            <label htmlFor="id" className="saveID">ID 저장 </label>  
                            <label className="forgetPW"> 비밀번호를 잊으셨나요?</label>
                        </div>

                        <div className="buttonWrapper">
                            <button className="Button">로그인</button>
                        </div>
                    </form>
                    <button className="Button">회원가입</button>
                

                </div>
            </div>
        {/* </div> */}
        </div>
    )
}