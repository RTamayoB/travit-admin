import React, { useEffect, useRef, useState } from "react";
import styles from "./stopformdialog.module.scss";
import { Typography } from "@/ui/components";
import StopForm from "../../forms/stopform";
import { Stop, StopState } from "@/app/lib/definitions";
import { LatLng } from "leaflet";
import ConfirmationDialog from "../confirmationdialog";

// Define the props type
interface StopFormDialogProps {
  isOpen: boolean;
  position: LatLng;
  stop?: Stop;
  state: StopState;
  title: string;
  submitButtonText: string;
  onLocateStop: () => void;
  onClose: () => void;
  onConfirm: (formData: FormData) => void;
}

const StopFormDialog: React.FC<StopFormDialogProps> = ({
  isOpen,
  position,
  stop,
  state,
  submitButtonText,
  title,
  onLocateStop,
  onClose,
  onConfirm,
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [showCancelDialog, setShowCancelDialog] = useState<boolean>(false);

  const handleOnCancelAction = () => {
    setShowCancelDialog(true);
  };

  const handleOnContinueAction = () => {
    setShowCancelDialog(false);
  };

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.showModal();
    } else if (modalRef.current) {
      modalRef.current.close();
    }
  }, [isOpen]);

  return (
    <div className={styles.dialog}>
      <Typography variant="h6" className="dialog__title">
        {title}
      </Typography>
      <hr />
      <StopForm
        stop={stop}
        position={position}
        state={state}
        submitButtonText={submitButtonText}
        onSubmit={onConfirm}
        onCancel={handleOnCancelAction}
        onLocateStop={onLocateStop}
      />
      {showCancelDialog && (
        <ConfirmationDialog
          isOpen={showCancelDialog}
          onClose={handleOnContinueAction}
          onConfirm={onClose}
          onCloseText={"Continuar con el formulario"}
          onConfirmText="Cancelar accion"
          title="¿Cancelar accion?"
          message={"La informacion se perdera"}
        />
      )}
    </div>
  );
};

export default StopFormDialog;
