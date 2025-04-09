import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil, Edit } from "lucide-react";
import { useState } from "react";
import PropertyForm from "../forms/PropertyForm";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Property } from "@/@types/types";

type PropertyModalProps = {
  action: "create" | "update";
  property?: Property;
  onSuccess?: () => void;
};

const PropertyModal = ({ action, property, onSuccess }: PropertyModalProps) => {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
    if (onSuccess) onSuccess();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full">
        {action === "create" ? (
          <Button
            variant="ghost"
            className="w-full md:w-auto capitalize text bg-primary-light text-white hover:bg-primary-light hover:text-white"
          >
            <Plus className="mr-2" /> Create Property
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-100"
          >
            <Edit className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogHeader>
        
      </DialogHeader>
      <DialogContent className="border-2 border-primary-light sm:max-w-xl max-h-auto">
        <div className="max-h-[65vh] overflow-y-auto scrollbar-hide">
          <PropertyForm 
            action={action} 
            property={property} 
            onSuccess={handleSuccess} 
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyModal;