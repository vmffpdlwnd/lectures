import { useState } from "react";
import Modal from "./Modal";

export default function CardComponent({
  title,
  price,
  discount,
  image,
  description,
}) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="card" onClick={() => setModalOpen(true)}>
        <img src={image} alt={title} />
        <h3>{title}</h3>
        <p>{description}</p>
        <p>
          {price} {discount && `(${discount})`}
        </p>
      </div>

      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <img src={image} alt={title} style={{ width: "100%" }} />
          <h2>{title}</h2>
          <p>{description}</p>
          <p>
            {price} {discount && `(${discount})`}
          </p>
        </Modal>
      )}
    </>
  );
}
