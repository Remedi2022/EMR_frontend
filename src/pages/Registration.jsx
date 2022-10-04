import './Registration.css'
import LeftNav from "../components/LeftNav/LeftNav"
import TopBar from "../components/TopBar/TopBar"
import PatientList from "../components/PatientList/PatientList"


function Content() {
    return (
        <div className="content">
            <div className="patientRegistration">
                <div className="title">
                    신규 환자 등록
                </div>
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

            </div>
        </div>
    )
}

export default function Administration() {
    return (
        <div className="Administration">
            <div className="container">
                <LeftNav />
                <div className='topbarContainer'>
                    <TopBar />
                    <div className='patientlistContainer'>
                        <PatientList/>
                        <Content />
                    </div>
                </div>
            </div>
        </div>
    )
}
