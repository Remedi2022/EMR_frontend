import './Register.css';


export default function Register(){
    return(
        <div className="registerHome">
        {/* <div className="registerContainer"> */}
            <div className="registerContentBox">
                <div className="registerContent">
                    <span className="remedi"> REMEDI </span>

                    <div className="inputWrapper">
                        <div className="inputBoxHospital">
                            <input id="hospitalContent"
                                type="text"
                                name="hospitalContent"
                                placeholder="요양기관번호"
                                maxLength="8"
                                // pattern="[0-9]+"
                                
                            />
                        </div>
                        
                        <div className="inputBoxLicense">
                            <input id="licenseContent"
                                type="text"
                                name="llicenseContent"
                                placeholder="면허 번호"
                            />
                        </div>

                        <div className="inputBoxDoctor">
                            <input id="doctorContent"
                                type="text"
                                name="doctorContent"
                                placeholder="의사 이름"
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

                    <div className="buttonWrapperRegister">
                        <button className="Button">회원가입</button>
                    </div>
                

                </div>
            </div>
        </div>
    )
}