import './SignUp.css';


export default function SignUp(){
    return(
        <div className="signUpHome">
        {/* <div className="signUpContainer"> */}
            <div className="signUpContentBox">
                <div className="signUpContent">
                    <span className="remedi"> REMEDi </span>
                    <div className="inputWrapper">
                        <div className="inputBoxHospital">
                            <input id="hospitalContent"
                                type="text"
                                name="hospitalContent"
                                placeholder="요양기관번호"
                                maxLength="8"
                            />
                        </div>
                        <div className="inputBoxLicense">
                            <input id="licenseContent"
                                type="text"
                                name="llicenseContent"
                                placeholder="면허 번호"
                            />
                        </div>
                        <div className="inputBoxID">
                            <input id="idContent"
                                type="text"
                                name="idContent"
                                placeholder="id"
                            />
                        </div>                   
                        <div className="inputBoxPW">
                            <input id="pwContent"
                                type="password"
                                name="pwContent"
                                placeholder="password"
                            />
                        </div>
                    </div>  
                    <div className="buttonWrapperSignUp">
                        <button className="Button">회원가입</button>
                    </div>
                

                </div>
            </div>
        </div>
    )
}