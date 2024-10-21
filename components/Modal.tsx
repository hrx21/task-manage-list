// components/ReusableModal.tsx
import React, { ReactNode } from "react";
import styles from "../styles/modal.module.scss";

interface ReusableModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
}

const ReusableModal: React.FC<ReusableModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={`${styles.header} notosans-800`}>{title}</h2>
          <img
            onClick={onClose}
            className={styles.closeLogo}
            src="/assets/close.png"
            alt=""
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default ReusableModal;
