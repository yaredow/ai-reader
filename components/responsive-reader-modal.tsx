import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { type ReactElement } from "react";
import { useMedia } from "react-use";
import { useState } from "react";

import { Drawer, DrawerContent } from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Maximize2, Minimize2, X } from "lucide-react";
import { Button } from "./ui/button";

type ResponsiveModalProps = {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ResponsiveReaderModal({
  open,
  onOpenChange,
  children,
}: ResponsiveModalProps): ReactElement {
  const isDesktop = useMedia("(min-width: 1024px)", true);
  const [isMaximized, setIsMaximized] = useState(false);

  const handleMaximizeToggle = () => setIsMaximized((prev) => !prev);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle>Reader</DialogTitle>
          </DialogHeader>
        </VisuallyHidden>
        <DialogContent
          className={`p-0 border-none overflow-y-auto ${
            isMaximized
              ? "w-screen h-screen max-w-none max-h-none"
              : "w-[375px] h-[667px] max-w-none max-h-none" // Smartphone-like size
          }`}
        >
          <div className="flex justify-end px-4 py-2">
            <Button onClick={handleMaximizeToggle} variant="link">
              {isMaximized ? (
                <Minimize2 className="size-3 mr-2" />
              ) : (
                <Maximize2 className="size-3 mr-2" />
              )}
            </Button>
          </div>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="w-full h-screen p-0 overflow-y-auto">
        <div className="flex justify-end p-2">
          <Button
            onClick={() => onOpenChange(false)}
            className="bg-red-200 ml-2 rounded px-3 py-1 text-sm"
          >
            <X className="size-4" />
          </Button>
        </div>
        {children}
      </DrawerContent>
    </Drawer>
  );
}
