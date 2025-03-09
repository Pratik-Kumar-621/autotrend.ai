import React from "react";
import { ModalProps } from "../../adminTypes";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white text-black rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <IconButton onClick={onClose} className="">
            <CloseIcon />
          </IconButton>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
