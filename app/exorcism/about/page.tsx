"use client";

import About from "@/Components/Exorcism/ShamanSection/ShamanSection";
import ContactModal from "@/Components/Modal/ContactModal";
import { useState } from "react";

export default function Page() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <div>
      <About />
      <ContactModal isOpen={isOpenModal} onClose={handleModal} />
      <button
        style={{
          display: "block",
          margin: "20px auto",
          padding: "12px 24px",
          fontSize: "25px",
          color: "white",
          backgroundColor: "#7b2cbf",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
        onClick={handleModal}
      >
        Замовити ритуал
      </button>
    </div>
  );
}
