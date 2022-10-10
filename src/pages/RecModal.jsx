import './RecModal.css';

function ModalBasic({ setModalOpen, id, title, content, writer }) {
    // 모달 끄기 
    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className="modal">
            <button className="bTN" onClick={closeModal}>
                X
            </button>
            <p>모달창입니다.</p>
        </div>
    );
}
export default ModalBasic;
