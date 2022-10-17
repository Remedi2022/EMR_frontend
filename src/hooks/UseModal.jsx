import './UseModal.css'
import React, { useEffect, useState } from 'react';
import Modal from '../components/Modal/Modal';
import Postcode from '../components/Modal/Postcode';

////////////////////////////////////////////////////////////////////////
// import React, { useEffect, useState } from 'react';
// import DaumPostcode from 'react-daum-postcode';

// function Postcode() {

//   const [address, setAddress] = useState(''); // 주소
//   const [addressDetail, setAddressDetail] = useState(''); // 상세주소

//   const [OpenPost, setOpenPost] = useState(false);

//   const onChangeOpenPost = () => {
//     setOpenPost(!OpenPost);
//   };

//   const onCompletePost = (data) => {
//     let fullAddr = data.address;
//     let extraAddr = '';

//     if (data.addressType === 'R') {
//       if (data.bname !== '') {
//         extraAddr += data.bname;
//       }
//       if (data.buildingName !== '') {
//         extraAddr += ( extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName );
//       }
//       fullAddr += ( extraAddr !== '' ? ` (${extraAddr})` : '' );
//     }

//     console.log(data)
//     setAddress(data.zonecode);
//     setAddressDetail(fullAddr);
//     setOpenPost(false);
//   };

//   const postCodeStyle = {
//     display: 'block',
//     position: 'relative',
//     top: '0%',
//     width: '400px',
//     height: '400px',
//     padding: '7px',
//   };

//   return (
//     <>
//         <button type='button' onClick={onChangeOpenPost}>우편번호 검색</button>
//         {OpenPost ? (
//             <DaumPostcode style={postCodeStyle} autoClose onComplete={onCompletePost} />
//             ) : null}
//     </>
//   );
// };

// export default SignUp;
////////////////////////////////////////////////////////////////////////


function UseModal() {
    // useState를 사용하여 open상태를 변경한다. (open일 때 true로 만들어 열리는 방식)
    const [modalOpen, setModalOpen] = useState(false);
    const [popup, setPopup] = useState(false);
    const [address, setAddress] = useState(''); // 주소

    const handleInput = (e) => {
        setAddress(e.target.value);
        // 아래 코드는 object Object 나와서 위 코드로 변경.
        // setAddress({
        // ...address,
        // [e.target.name]: e.target.value
        // })
    }


    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div>
            <button onClick={openModal}>신환 등록하기</button>
            {/* header 부분에 텍스트를 입력한다. */}
            <Modal open={modalOpen} close={closeModal} header="신규 환자 등록">
                {/* Modal.js <main> {props.children} </main>에 입력되는 내용. 리액트 함수형 모달 */}
                <div className="patientRegistration">
                    {/* <div className="title">
                        신환 등록
                    </div> */}
                    <div className="inputWrapper">
                        <div className="inputBoxName">
                            <div>이름</div>
                            <input id="hospitalContent"
                                type="text"
                                name="hospitalContent"
                                // placeholder="이름"
                                maxLength="8"
                                // pattern="[0-9]+"
                            />
                        </div>
                        <div className="inputBoxRRN">
                            <div>주민등록번호</div>
                            <input id="RRN1Content"
                                type="text"
                                name="RRN1Content"
                                // placeholder="주민등록번호"
                                maxLength="6"
                            />
                            <span>&nbsp;-&nbsp;</span>
                            <input id="RRN2Content"
                                type="text"
                                name="RRN2Content"
                                // placeholder="주민등록번호"
                                maxLength="7"
                            />
                        </div>
                        <div className="inputBoxContact">
                            <div>대표 연락처</div>
                            <input id="contact1Content"
                                type="text"
                                name="contact1Content"
                                // placeholder="대표 연락처"
                                maxLength="3"
                            />
                            <span>&nbsp;-&nbsp;</span>
                            <input id="contact2Content"
                                type="text"
                                name="contact2Content"
                                // placeholder="대표 연락처"
                                maxLength="4"
                            />
                            <span>&nbsp;-&nbsp;</span>
                            <input id="contact3Content"
                                type="text"
                                name="contact3Content"
                                // placeholder="대표 연락처"
                                maxLength="4"
                            />
                        </div>
                        <div className="inputBoxEmergencyContact">
                            <div>비상 연락처</div>
                            <input id="emergencyContact1Content"
                                type="text"
                                name="emergencyContact1Content"
                                // placeholder="비상 연락처"
                                maxLength="3"
                            />
                            <span>&nbsp;-&nbsp;</span>
                            <input id="emergencyContact2Content"
                                type="text"
                                name="emergencyContact2Content"
                                // placeholder="비상 연락처"
                                maxLength="4"
                            />
                            <span>&nbsp;-&nbsp;</span>
                            <input id="emergencyContact2Content"
                                type="text"
                                name="emergencyContact2Content"
                                // placeholder="비상 연락처"
                                maxLength="4"
                            />
                        </div>
                        <div className="inputBoxAddress">
                            <div>주소</div>
                            <button id="postcodeButton"
                                onClick={() =>{
                                setPopup(!popup)
                            }}
                            >주소 검색</button>
                            <input
                            // <input onClick={() => {
                            //     setPopup(!popup)
                            //     }}
                                id="addressContent"
                                type="text"
                                name="addressContent"
                                onChange={handleInput}
                                required = {true}
                                value={address}
                                placeholder="주소"
                                readOnly
                            />
                            <input
                                id="addressDetailContent"
                                type="text"
                                name="addressDetailContent"
                                placeholder="상세 주소"
                            />
                            {/* <div id="postcodeWrapper">
                            {
                                popup &&
                                    <Postcode address={address} setAddress={setAddress}></Postcode>
                            }
                            </div> */}
                        </div>
                    </div>
                    <div id="postcodeWrapper">
                        {
                            popup &&
                                <Postcode address={address} setAddress={setAddress}></Postcode>
                        }
                    </div>
                    <div className="termsWrapper">
                        <div>약관</div>
                        <div>
                            terms of use
                            terms and conditions
                            terms of use
                            terms and conditions
                            terms of use
                            terms and conditions
                        </div>
                    </div>
                    {/* <div className="buttonWrapperRegister">
                        <button className="Button">취소</button>
                        <button className="Button">완료</button>
                        <button className="Button">접수</button>
                    </div> */}
                </div>
            </Modal>
        </div>
    );
}

export default UseModal;
