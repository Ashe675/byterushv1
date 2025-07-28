import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

interface ModalProps {
  isOpen: boolean;
  close: () => void;
  title?: string;
  children?: React.ReactNode;
}

export const Modal = ({ isOpen, close, children, title }: ModalProps) => {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 bg-black/50  ">
          <DialogPanel
            transition
            className="w-full max-w-2xl rounded-xl bg-white/90 p-6 backdrop-blur-2xl duration-200 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            {title && (
              <DialogTitle as="h3" className="text-base/7 font-medium ">
                {title}
              </DialogTitle>
            )}
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
