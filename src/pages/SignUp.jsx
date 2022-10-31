import './SignUp.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signupUser } from '../_actions/user_action';
import { useNavigate } from 'react-router-dom';


export default function SignUp(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [hospitalName, setHospitalName] = useState("")
    const [hospitalCode, setHospitalCode] = useState("")
    const [name, setName] = useState("")
    const [license, setLicense] = useState("")
    const [businessRegistrationNum, setbusinessRegistrationNum] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onNameHandler = (e) => {
        setName(e.currentTarget.value)
    }
    const onLicenseHandler = (e) => {
        setLicense(e.currentTarget.value)
    }
    const onHospitalNameHandler = (e) => {
        setHospitalName(e.currentTarget.value)
    }
    const onHospitalCodeHandler = (e) => {
        setHospitalCode(e.currentTarget.value)
    }
    const onBusinessRegistrationNumlHandler = (e) => {
        setbusinessRegistrationNum(e.currentTarget.value)
    }
    const onEmailHandler = (e) => {
        setEmail(e.currentTarget.value)
    }
    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value)
    }
    const onSubmitHandler = (e) => {
        e.preventDefault();
        // console.log('NAME:', name)
        // console.log('LICENSE', license)
        // console.log('HOSPITALNAME', hospitalName)
        // console.log('HOSPITALCODE', hospitalCode)
        // console.log('BUSINNESSREGISTRATIONNUM',businessRegistrationNum)
        // console.log('EMAIL:', email)
        // console.log('PW:', password)
        // if(password !== confirmPassword) {
        //     return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
        // }
        if (!name) {
            return alert("의료진 이름을 입력하세요.");
        }
        else if (!license) {
            return alert("면허번호를 입력하세요.");
        }
        else if (!hospitalName) {
            return alert("요양기관이름을 입력하세요.");
        }
        else if (!hospitalCode) {
            return alert("요양기관번호를 입력하세요.");
        }
        else if (!businessRegistrationNum) {
            return alert("사업자 등록번호를 입력하세요.");
        }
        else if (!email) {
            return alert("이메일을 입력하세요.");
        }
        else if (!password) {
            return alert("비밀번호를 입력하세요.");
        }

        let body = {
            name: name,
            license: license,
            hospital_name: hospitalName,
            hospital_code: hospitalCode,
            business_registration_number: businessRegistrationNum,
            email: email,
            password: password
        }

        // Axios.post('http://3.35.231.145:8080/api/auth/signup', body)
        // 대신 dispatch 이용해서 signupUser라는 action 날리기
        // dispatch(loginUser(body))
        dispatch(signupUser(body))
            .then(response => {
                // console.log('DISPATCH:', response)
                if(response.payload.data.success) {
                    navigate('/login');
            }   else {
                    alert('Failed to signup.')
            }
        })
    }

    return(
        <div className="signUpHome">
        {/* <div className="signUpContainer"> */}
            <div className="signUpContentBox">
                <div className="signUpContent">
                    <span className="remedi"> REMEDi </span>
                    <form onSubmit={ onSubmitHandler }>
                        <div className="inputWrapper">
                            <div className="inputBoxName">
                                <input id="nameContent"
                                    type="text"
                                    name="nameContent"
                                    placeholder="의료진 이름"
                                    value={ name }
                                    onChange={ onNameHandler }
                                />
                            </div>
                            <div className="inputBoxLicense">
                                <input id="licenseContent"
                                    type="text"
                                    name="licenseContent"
                                    placeholder="면허 번호"
                                    value={ license }
                                    onChange={ onLicenseHandler }
                                />
                            </div>
                            <div className="inputBoxHospitalName">
                                <input id="hospitalNameContent"
                                    type="text"
                                    name="hospitalNameContent"
                                    placeholder="요양기관 이름"
                                    value={ hospitalName }
                                    onChange={ onHospitalNameHandler }
                                />
                            </div>
                            <div className="inputBoxHospital">
                                <input id="hospitalContent"
                                    type="text"
                                    name="hospitalContent"
                                    placeholder="요양기관 번호"
                                    maxLength="8"
                                    value={ hospitalCode }
                                    onChange={ onHospitalCodeHandler }
                                />
                            </div>
                            <div className="inputBoxHospital">
                                <input id="businesseRegistrationNumContent"
                                    type="text"
                                    name="businesseRegistrationNumContent"
                                    placeholder="사업자 등록번호"
                                    maxLength="10"
                                    value={ businessRegistrationNum }
                                    onChange={ onBusinessRegistrationNumlHandler }
                                />
                            </div>
                           
                            <div className="inputBoxE">
                                <input id="emailContent"
                                    type="email"
                                    name="emailContent"
                                    placeholder="이메일"
                                    value={ email }
                                    onChange={ onEmailHandler }
                                />
                            </div>                   
                            <div className="inputBoxPassword">
                                <input id="passwordContent"
                                    type="password"
                                    name="passwordContent"
                                    placeholder="비밀번호"
                                    value={ password }
                                    onChange={ onPasswordHandler }
                                />
                            </div>
                        </div>
                    <div className="buttonWrapperSignUp">
                        <button className="loginButton">회원가입</button>
                    </div>
                    </form> 
                </div>
            </div>
        </div>
    )
}