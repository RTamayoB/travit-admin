import React, { useEffect, useRef } from "react";
import "./confirmationdialog.scss";
import { Button } from "@/shared";
import { Typography } from "@/ui/components";

// Define the props type
interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message?: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = (
  { isOpen, onClose, onConfirm, message, title },
) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.showModal();
    } else if (modalRef.current) {
      modalRef.current.close();
    }
  }, [isOpen]);

  return (
    <dialog ref={modalRef} className="dialog">
      <Typography variant="h6" className="dialog__title">
        {title}
      </Typography>
      <hr />
      <Typography variant="bodyMedium" className="dialog__message">
        {message || "Are you sure you want to proceed?"}
      </Typography>
      <hr />
      <div className="dialog__dialog_actions">
        <button onClick={onClose}>Cancelar</button>
        <Button onClick={onConfirm}>Aceptar</Button>
      </div>
    </dialog>
  );
};

export default ConfirmationDialog;
