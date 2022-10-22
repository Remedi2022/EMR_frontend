import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Modal.css';

const Modal = (props) => {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open, close, reset, header } = props;

    return (
    // 모달이 열릴 때 openModal 클래스가 생성된다.
        <div className={open ? 'openModal modal' : 'modal'}>
            {open ? (
                <section>
                    <header>
                        {header}
                        <button className="close" onClick={ ()=>{close(); reset()} }>
                            &times;
                        </button>
                    </header>
                    <main>{props.children}</main>
                    {/* <footer>
                        <button className="close" onClick={close}>
                            close
                        </button>
                        <div className="buttonWrapperRegister">
                            <button className="Button" id="withdraw" onClick={close}>취소</button>
                            <div>
                                <button className="Button" type="submit" onSubmit={ onSubmitHandler }>완료</button>
                                <button className="Button" onClick={ () => navigate('/reception') }>접수</button>
                            </div>
                        </div>
                    </footer> */}
                </section>
            ) : null}
        </div>
    );
};

export default Modal;
