import "./MDRegistration.css";
import React, { useEffect, useState } from "react";
import ModalSmall from "../../components/Modal/ModalSmall";
import { registerMD } from "../../_actions/user_action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function MDRegistration() {
  // useState를 사용하여 open상태를 변경한다. (open일 때 true로 만들어 열리는 방식)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const [MDName, setMDName] = useState("");
  const [volume, setVolume] = useState("");
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState("");
  const [company, setCompany] = useState("");
  const [KCD, setKCD] = useState("");
  
  const onSetMDName = (e) => {
    setMDName(e.target.value);
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
  const onSetKCD = (e) => {
    setKCD(e.target.value);
  };

  const resetModal = () => {
    setMDName("");
    setVolume("");
    setUnit("");
    setPrice("");
    setCompany("");
    setKCD("");
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("MDNAME ", MDName);

    if (!MDName) {
      return alert("제품명을 입력하세요.");
    } else if (!volume || !unit) {
      return alert("용량을 입력하세요.");
    } else if (!company) {
      return alert("회사명을 입력하세요.");
    } else if (!price) {
      return alert("가격을 입력하세요.");
    } else if (!KCD) {
      return alert("관련 질병분류기호를 입력하세요.");
    }

    let body = {
      name : MDName,
      volume : volume,
      unit : unit,
      price : price,
      company : company,
      kcd : KCD,
    };

    dispatch(registerMD(body)).then((response) => {
      console.log("DISPATCH: ", response);
      if (response.payload.success) {
        console.log(response.payload.message);
        alert("MD 제품이 등록되었습니다.");
        resetModal();
        navigate("/examination", { replace: true });
        //환자 등록 성공 메세지
      } else {
        console.log(response);
        alert("MD 제품 등록에 실패하였습니다.");
      }
    });
  };

  return (
    <div>
      <button className="homeMenuItemButton" onClick={openModal}>
        MD 등록하기
      </button>
      {/* header 부분에 텍스트를 입력한다. */}
      <ModalSmall
        open={modalOpen}
        close={closeModal}
        reset={resetModal}
        header="Medical Device 제품 등록"
      >
        {/* Modal.js <main> {props.children} </main>에 입력되는 내용. 리액트 함수형 모달 */}
        <form>
          <div className="inputWrapper">
            <div className="inputBoxMDName">
              <div>제품명</div>
              <input
                id="MDNameContent"
                type="text"
                name="MDNameContent"
                // placeholder="이름"
                value={MDName}
                onChange={onSetMDName}
                autoComplete="off"
              />
            </div>
            <div className="inputBoxVolumeUnit">
              <div>용량</div>
              <input
                id="VolumeContent"
                type="text"
                name="VolumeContent"
                placeholder="ex) 120"
                value={volume}
                onChange={onSetVolume}
                autoComplete="off"
              />
              <span>&nbsp;&nbsp;&nbsp;</span>
              <input
                id="UnitContent"
                type="text"
                name="UnitContent"
                placeholder="ex) g"
                value={unit}
                onChange={onSetUnit}
                autoComplete="off"
              />
            </div>
            <div className="inputBoxCompany">
              <div>회사명</div>
              <input
                id="CompanyContent"
                type="text"
                name="CompanyContent"
                // placeholder="대표 연락처"
                value={company}
                onChange={onSetCompany}
                autoComplete="off"
              />
            </div>
            <div className="inputBoxPrice">
              <div>가격</div>
              <input
                id="PriceContent"
                type="text"
                name="PriceContent"
                // placeholder="비상 연락처"
                value={price}
                onChange={onSetPrice}
                autoComplete="off"
              />
              <span>&nbsp;원</span>
            </div>
            <div className="inputBoxKCD">
              <div>관련 질병분류기호(KCD)</div>
              <input
                id="KCDContent"
                type="text"
                name="KCDContent"
                placeholder="띄어쓰기로 구분"
                value={KCD}
                onChange={onSetKCD}
                autoComplete="off"
              />
            </div>
          </div>

          <div className="MDRegisterButtonWrapper">
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
      </ModalSmall>
    </div>
  );
}

export default MDRegistration;
