import './UseModal.css'
import React, { useState } from 'react';
import Modal from '../components/Modal/Modal';

function UseModal() {
    // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <React.Fragment>
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
                            <input id="AddressContent"
                                type="text"
                                name="AddressContent"
                                // placeholder="주소"
                            />
                        </div>
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
        </React.Fragment>
    );
}

export default UseModal;
