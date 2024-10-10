import { Button } from "../ui/button";
import { Dialog, DialogOverlay, DialogContent, DialogTitle, DialogDescription, DialogClose } from "../ui/dialog";

const ConfirmationModal = ({ open, onOpenChange, text1, text2, btn1Text, btn2Text, btn1Handler, btn2Handler }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}> {/* Manage modal open state */}
      <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-sm" /> {/* Overlay for dimming background */}
      <DialogContent className="rounded-lg p-6 bg-white"> {/* Modal content styling */}
        <DialogTitle className="text-lg font-semibold">{text1}</DialogTitle> {/* Modal title */}
        <DialogDescription className="mt-2 mb-4">{text2}</DialogDescription> {/* Modal description */}
        
        <div className="flex justify-end gap-x-2">
          <Button onClick={btn2Handler} variant="outline"> {/* Cancel button */}
            {btn2Text}
          </Button>
          <Button onClick={btn1Handler}> {/* Logout button */}
            {btn1Text}
          </Button>
        </div>

        <DialogClose className="absolute right-4 top-4"> {/* Close button */}
          <span className="sr-only">{btn2Text}</span> {/* Screen reader only text */}
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationModal;
