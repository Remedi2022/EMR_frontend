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
            <button onClick={openModal}>신규 환자</button>
            {/* header 부분에 텍스트를 입력한다. */}
            <Modal open={modalOpen} close={closeModal} header="신규 환자 등록">
                {/* Modal.js <main> {props.children} </main>에 입력되는 내용. 리액트 함수형 모달 */}
                <div className="patientRegistration">
                    <div className="title">
                        {/* 신환 등록 */}
                    </div>
                    <div className="inputWrapper">
                        <div className="inputBoxName">
                            <div>이름</div>
                            <input id="hospitalContent"
                                type="text"
                                name="hospitalContent"
                                placeholder="이름"
                                maxLength="8"
                                // pattern="[0-9]+"
                            />
                        </div>
                        <div className="inputBoxRRN">
                            <div>주민등록번호</div>
                            <input id="licenseContent"
                                type="text"
                                name="llicenseContent"
                                placeholder="주민등록번호"
                            />
                        </div>
                        <div className="inputBoxFirstContact">
                            <div>대표 연락처</div>
                            <input id="doctorContent"
                                type="text"
                                name="doctorContent"
                                placeholder="대표 연락처"
                            />
                        </div>
                        <div className="inputBoxSecondContact">
                            <div>비상 연락처</div>
                            <input id="doctorContent"
                                type="text"
                                name="doctorContent"
                                placeholder="비상 연락처"
                            />
                        </div>
                        <div className="inputBoxAddress">
                            <div>주소</div>
                            <input id="doctorContent"
                                type="text"
                                name="doctorContent"
                                placeholder="주소"
                            />
                        </div>

                        <div>약관</div>

                        <div className="buttonWrapperRegister">
                            <button className="Button">취소</button>
                            <button className="Button">완료</button>
                            <button className="Button">접수</button>
                        </div>
                        
                    </div>
                </div>
            </Modal>
        </React.Fragment>
    );
}

export default UseModal;
