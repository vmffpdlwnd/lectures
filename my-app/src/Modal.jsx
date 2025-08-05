import "./Modal.css";

export default function Modal({ onClose, children }) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
}
