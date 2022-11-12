import "./Registration.css";
import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import Postcode from "../../components/Modal/Postcode";
import { registerPatient } from "../../_actions/user_action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Registration() {
  // useState를 사용하여 open상태를 변경한다. (open일 때 true로 만들어 열리는 방식)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [popup, setPopup] = useState(false);

  const [pName, setPName] = useState("");
  // const [RRN, setRRN] = useState("")
  const [RRN1, setRRN1] = useState("");
  const [RRN2, setRRN2] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [phone3, setPhone3] = useState("");
  const [ePhone1, setEPhone1] = useState("");
  const [ePhone2, setEPhone2] = useState("");
  const [ePhone3, setEPhone3] = useState("");
  const [address, setAddress] = useState(""); // 주소
  const [addressDetail, setAddressDetail] = useState("");

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    window.location.reload();
  };

  const onSetPName = (e) => {
    setPName(e.target.value);
  };
  const onSetRRN1 = (e) => {
    setRRN1(e.target.value);
  };
  const onSetRRN2 = (e) => {
    setRRN2(e.target.value);
  };
  // const onSetPhone = (e) => {
  //     setPhone(e.target.value);
  // }
  const onSetPhone1 = (e) => {
    setPhone1(e.target.value);
  };
  const onSetPhone2 = (e) => {
    setPhone2(e.target.value);
  };
  const onSetPhone3 = (e) => {
    setPhone3(e.target.value);
  };
  const onSetEPhone1 = (e) => {
    setEPhone1(e.target.value);
  };
  const onSetEPhone2 = (e) => {
    setEPhone2(e.target.value);
  };
  const onSetEPhone3 = (e) => {
    setEPhone3(e.target.value);
  };
  const onSetAddress = (e) => {
    setAddress(e.target.value);
    // 아래 코드는 object Object 나와서 위 코드로 변경.
    // setAddress({
    // ...address,
    // [e.target.name]: e.target.value
    // })
  };
  const onSetAddressDetail = (e) => {
    setAddressDetail(e.target.value);
  };

  const resetModal = () => {
    setPName("");
    setRRN1("");
    setRRN2("");
    setPhone1("");
    setPhone2("");
    setPhone3("");
    setEPhone1("");
    setEPhone2("");
    setEPhone3("");
    setAddress("");
    setAddressDetail("");
  };

  let RRN = RRN1 + "-" + RRN2;
  let phone = phone1 + "-" + phone2 + "-" + phone3;
  let ePhone = ePhone1 + "-" + ePhone2 + "-" + ePhone3;
  let fulladdress = address + " " + addressDetail;

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // console.log("PNAME", pName);
    // console.log("RRN:", RRN);
    // console.log("PHONE", phone);
    // console.log("EPHONE:", ePhone);
    // console.log("ADDRESS:", fulladdress);

    if (!pName) {
      return alert("이름를 입력하세요.");
    } else if (!RRN1 || !RRN2) {
      return alert("주민등록번호를 입력하세요.");
    } else if (!phone1 || !phone2 || !phone3) {
      return alert("연락처를 입력하세요.");
    } else if (!ePhone1 || !ePhone2 || !ePhone3) {
      return alert("비상 연락처를 입력하세요.");
    } else if (!address) {
      return alert("주소를 검색하세요.");
    }

    let body = {
      name: pName,
      // gender : ,
      rrn: RRN,
      phone: phone,
      first_responder: ePhone,
      address: fulladdress,
    };

    dispatch(registerPatient(body)).then((response) => {
      // console.log("DISPATCH:", response);
      if (response.payload.success) {
        // console.log(response.payload.message);
        alert("환자가 등록되었습니다.");
        resetModal();
        navigate("/administration", { replace: true });
        //환자 등록 성공 메세지
      } else {
        alert("환자 등록에 실패하였습니다.");
      }
    });
  };

  return (
    <div>
      <button className="homeMenuItemButton" onClick={openModal}>
        신환 등록하기
      </button>
      {/* header 부분에 텍스트를 입력한다. */}
      <Modal
        open={modalOpen}
        close={closeModal}
        reset={resetModal}
        header="신규 환자 등록"
      >
        {/* Modal.js <main> {props.children} </main>에 입력되는 내용. 리액트 함수형 모달 */}
        {/* <div className = "registerContainer"> */}
        <form>
          <div className="patientRegistration">
            {/* <div className="title">
                            신환 등록
                        </div> */}
            <div className="inputWrapper">
              <div className="inputBoxPName">
                <div>이름</div>
                <input
                  id="pNameContent"
                  type="text"
                  name="pNameContent"
                  // placeholder="이름"
                  maxLength="8"
                  // pattern="[0-9]+"
                  value={pName}
                  onChange={onSetPName}
                />
              </div>
              <div className="inputBoxRRN">
                <div>주민등록번호</div>
                <input
                  id="RRNContent1"
                  type="text"
                  name="RRNContent1"
                  // placeholder="주민등록번호"
                  maxLength="6"
                  value={RRN1}
                  onChange={onSetRRN1}
                />
                <span>&nbsp;-&nbsp;</span>
                <input
                  id="RRNContent2"
                  type="text"
                  name="RRNContent2"
                  // placeholder="주민등록번호"
                  maxLength="7"
                  value={RRN2}
                  onChange={onSetRRN2}
                />
              </div>
              <div className="inputBoxPhone">
                <div>대표 연락처</div>
                <input
                  id="phoneContent1"
                  type="text"
                  name="phoneContent1"
                  // placeholder="대표 연락처"
                  maxLength="3"
                  value={phone1}
                  onChange={onSetPhone1}
                />
                <span>&nbsp;-&nbsp;</span>
                <input
                  id="phoneContent2"
                  type="text"
                  name="phoneContent2"
                  // placeholder="대표 연락처"
                  maxLength="4"
                  value={phone2}
                  onChange={onSetPhone2}
                />
                <span>&nbsp;-&nbsp;</span>
                <input
                  id="phoneContent3"
                  type="text"
                  name="phoneContent3"
                  // placeholder="대표 연락처"
                  maxLength="4"
                  value={phone3}
                  onChange={onSetPhone3}
                />
              </div>
              <div className="inputBoxEmergencyPhone">
                <div>비상 연락처</div>
                <input
                  id="emergencyPhoneContent1"
                  type="text"
                  name="emergencyPhoneContent1"
                  // placeholder="비상 연락처"
                  maxLength="3"
                  value={ePhone1}
                  onChange={onSetEPhone1}
                />
                <span>&nbsp;-&nbsp;</span>
                <input
                  id="emergencyPhoneContent2"
                  type="text"
                  name="emergencyPhoneContent2"
                  // placeholder="비상 연락처"
                  maxLength="4"
                  value={ePhone2}
                  onChange={onSetEPhone2}
                />
                <span>&nbsp;-&nbsp;</span>
                <input
                  id="emergencyPhoneContent3"
                  type="text"
                  name="emergencyPhoneContent3"
                  // placeholder="비상 연락처"
                  maxLength="4"
                  value={ePhone3}
                  onChange={onSetEPhone3}
                />
              </div>
              <div className="inputBoxAddress">
                <div>주소</div>
                <button
                  id="postcodeButton"
                  type="button"
                  onClick={() => {
                    setPopup(!popup);
                  }}
                >
                  주소 검색
                </button>
                <input
                  id="addressContent"
                  type="text"
                  name="addressContent"
                  onChange={onSetAddress}
                  required={true}
                  value={address}
                  placeholder="주소"
                  readOnly
                />
                <input
                  id="addressDetailContent"
                  type="text"
                  name="addressDetailContent"
                  placeholder="상세 주소"
                  value={addressDetail}
                  onChange={onSetAddressDetail}
                />
              </div>
            </div>
            {/* <div id="postcodeWrapper">
                            {
                                popup &&
                                    <Postcode address={address} setAddress={setAddress}></Postcode>
                            }
                        </div> */}
            <div className="termsWrapper">
              <div>약관</div>
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
            <div className="postcodeWrapper">
              {popup && (
                <Postcode address={address} setAddress={setAddress}></Postcode>
              )}
            </div>
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

export default Registration;
