// DeleteModal.tsx
import React from "react";
import styles from "@/styles/delmodal.module.scss";
import ReusableModal from "../components/Modal";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;
  return (
    <ReusableModal
      isOpen={isOpen}
      onClose={onClose}
      title="Are you sure you want to delete this task?"
    >
      <div className={styles.buttonGroup}>
        <button className={styles.confirmButton} onClick={onConfirm}>
          Yes
        </button>
        <button className={styles.cancelButton} onClick={onClose}>
          No
        </button>
      </div>
    </ReusableModal>
  );
};

export default DeleteModal;
