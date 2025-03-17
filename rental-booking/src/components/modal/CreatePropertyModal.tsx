import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import PropertyForm from "../forms/PropertyForm";

const CreatePropertyModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="ghost" className="capitalize text bg-primary-light text-white hover:bg-primary-light hover:text-white">
          <Plus /> Create Property
        </Button>
      </DialogTrigger>
      <DialogContent className="border-2 border-primary-light sm:max-w-xl max-h-auto">
        
        <div className="max-h-[65vh] overflow-y-auto scrollbar-hide">
          <PropertyForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePropertyModal;
