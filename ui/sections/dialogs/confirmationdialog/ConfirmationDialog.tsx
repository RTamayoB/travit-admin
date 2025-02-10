import React, { useEffect, useRef } from "react";
import "./confirmationdialog.scss";
import { Button, Typography } from "@/ui/components";

// Define the props type
interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onCloseText?: string;
  onConfirmText?: string;
  title: string;
  message?: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = (
  {
    isOpen,
    onClose,
    onConfirm,
    onCloseText = "Cancelar",
    onConfirmText = "Confirmar",
    message,
    title,
  },
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
        <Button onClick={onClose} label={onCloseText} primary={false} />
        <Button onClick={onConfirm} label={onConfirmText} />
      </div>
    </dialog>
  );
};

export default ConfirmationDialog;
