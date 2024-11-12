// Toast.tsx
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastDescription,
  ToastTitle,
} from "@radix-ui/react-toast";
import { X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";

interface ToastComponentProps {
  title: string;
  description: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const ToastComponent: React.FC<ToastComponentProps> = ({
  title,
  description,
  isOpen,
  setIsOpen,
}) => (
  <ToastProvider>
    <Toast
      open={isOpen}
      onOpenChange={setIsOpen}
      className="bg-primary text-white rounded-lg p-4 shadow-lg relative "
    >
      <ToastTitle className="font-bold mb-4">{title}</ToastTitle>
      <ToastDescription>{description}</ToastDescription>
      <Button
        variant="ghost"
        className="absolute top-1 right-2"
        onClick={() => setIsOpen(false)}
      >
        <X />
      </Button>
    </Toast>

    <ToastViewport className="fixed right-6 top-20 flex justify-center items-center" />
  </ToastProvider>
);
