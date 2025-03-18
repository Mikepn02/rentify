import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import CreateAgentForm from "../forms/CreateAgentForm";
import { DialogTitle } from "@radix-ui/react-dialog";

const CreateAgentModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full">
        <Button variant="ghost" className="w-full md:w-auto capitalize text bg-primary-light text-white hover:bg-primary-light hover:text-white">
          <Plus /> Create Agent
        </Button>
      </DialogTrigger>

      <DialogHeader>
        <DialogTitle>{""}</DialogTitle>
      </DialogHeader>
      <DialogContent className="border-2 border-primary-light sm:max-w-xl max-h-auto">
        
        <div className="max-h-[65vh] overflow-y-auto scrollbar-hide">
          <CreateAgentForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAgentModal;
