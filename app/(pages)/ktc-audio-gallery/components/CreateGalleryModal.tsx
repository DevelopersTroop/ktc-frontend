import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddGalleryForm from "./AddGalleryForm";

export const CreateGalleryModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[70vh] overflow-y-scroll w-full  max-w-5xl">
        <DialogHeader>
          <DialogTitle>Submit your gallery</DialogTitle>
        </DialogHeader>
        <AddGalleryForm />
      </DialogContent>
    </Dialog>
  );
};
