import "./MDModal.css";
import React, {useState } from "react";
import Modal from "../components/Modal/Modal";
// import Postcode from "../components/Modal/Postcode";
import { registerPatient } from "../_actions/user_action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function MDModal() {
    // useState를 사용하여 open상태를 변경한다. (open일 때 true로 만들어 열리는 방식)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState(false);
    // const [popup, setPopup] = useState(false);

    const [name, setName] = useState("");
    const [volume, setVolume] = useState("");
    const [unit, setUnit] = useState("");
    const [price, setPrice] = useState("");
    const [company, setCompany] = useState("");
    const [kcd, setKcd] = useState("");

    const openModal = () => {
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
        window.location.reload();
    };

    const onSetName = (e) => {
        setName(e.target.value);
    };
    const onSetVolume = (e) => {
        setVolume(e.target.value);
    };
    const onSetUnit = (e) => {
        setUnit(e.target.value);
    };
    const onSetPrice = (e) => {
        setPrice(e.target.value);
    };
    const onSetCompany = (e) => {
        setCompany(e.target.value);
    };
     const onSetKcd = (e) => {
       setKcd(e.target.value);
     };
    

        const resetModal = () => {
            setName("");
            setVolume("");
            setUnit("");
            setPrice("");
            setCompany("");
            setKcd("");
        };


        const onSubmitHandler = (e) => {
            e.preventDefault();
            console.log("Name", name);
            console.log("Volume:", volume);
            console.log("Unit", unit);
            console.log("Price:", price);
            console.log("Company:", company);
            console.log("Kcd:", kcd);

            if (!name) {
                return alert("제품 이름를 입력하세요.");
            } else if (!volume) {
                return alert("용량을 입력하세요.");
            } else if (!unit) {
                return alert("단위를 입력하세요.");
            } else if (!price) {
                return alert("가격을 입력하세요.");
            } else if (!company) {
                return alert("제조사를 입력하세요.");
            } else if (!kcd) {
                return alert("질병코드를 입력하세요.");
            }

            let body = {
                name,
                volume,
                unit,
                price,
                company,
                kcd
            };

            dispatch(registerPatient(body)).then((response) => {
                console.log("DISPATCH:", response);
                if (response.payload.success) {
                    console.log(response.payload.message);
                    alert("MD가 등록되었습니다.");
                    resetModal();
                    //환자 등록 성공 메세지
                } else {
                    alert("MD 등록에 실패하였습니다.");
                }
            });
        };

        return (
          <div>
            <button className="homeMenuItemButton" onClick={openModal}>
              MD 관리하기
            </button>
            {/* header 부분에 텍스트를 입력한다. */}
            <Modal
              open={modalOpen}
              close={closeModal}
              reset={resetModal}
              header="MD 등록 및 관리"
            >
              {/* Modal.js <main> {props.children} </main>에 입력되는 내용. 리액트 함수형 모달 */}
              {/* <div className = "registerContainer"> */}
              <form>
                <div className="patientRegistration">
                  <div className="inputWrapper">
                    <div className="inputBoxMDName">
                      <div>이름</div>
                      <input
                        id="NameContent"
                        type="text"
                        name="NameContent"
                        value={name}
                        onChange={onSetName}
                      />
                    </div>
                    <div className="inputBoxVolume">
                      <div>용량 및 단위</div>
                      <input
                        id="VolumeContent"
                        type="number"
                        name="VolumeContent"
                        // placeholder="용량"
                        maxLength="6"
                        value={volume}
                        onChange={onSetVolume}
                      />
                      <span>&nbsp;-&nbsp;</span>
                      <input
                        id="UnitContent"
                        type="text"
                        name="UnitContent"
                        maxLength="7"
                        value={unit}
                        onChange={onSetUnit}
                      />
                    </div>
                    <div className="inputBoxPrice">
                      <div>가격</div>
                      <input
                        id="PriceContent"
                        type="number"
                        name="PriceContent"
                        value={price}
                        onChange={onSetPrice}
                      />
                    </div>

                    <div className="inputBoxCompany">
                      <div>제조사</div>
                      <input
                        id="CompanyContent"
                        type="text"
                        name="CompanyContent"
                        // placeholder="이름"
                        value={company}
                        onChange={onSetCompany}
                      />
                    </div>

                    <div className="inputBoxPName">
                      <div>Kcd</div>
                      <input
                        id="KcdContent"
                        type="text"
                        name="KcddContent"
                        // placeholder="이름"
                        value={kcd}
                        onChange={onSetKcd}
                      />
                    </div>
                  </div>

                  <div className="termsWrapper">
                    <div> 등록된 MD 한눈에 보기</div>
                    <div>
                      terms of use terms and conditions terms of use terms and
                      conditions terms of use terms and conditions
                    </div>
                  </div>
                  {/* <div className="buttonWrapperRegister">
                            <button className="Button">취소</button>
                            <button className="Button">완료</button>
                            <button className="Button">접수</button>
                            </div> */}
                </div>

                <div className="registerButtonWrapper">
                  <button id="withdraw" onClick={closeModal}>
                    취소
                  </button>
                  <div>
                    {/* type="submit" onSubmit={onSubmitHandler}로 하면 새로고침 돼서 아래처럼 바꿈 */}
                    <button onClick={onSubmitHandler}>등록</button>
                    {/* 아래처럼 하면 신환등록하기 누르면 바로 reception으로 감;;;; 하... */}
                    {/* <button type="button" onClick={ navigate('/reception') }>등록 및 접수</button> */}
                    {/* <button className="Button" type="button" onClick={ () => {onSubmitHandler(); navigate('/administration')} }>등록 및 접수</button> */}
                  </div>
                </div>
              </form>
              {/* </div> */}
            </Modal>
          </div>
        );
    }

export default MDModal;
