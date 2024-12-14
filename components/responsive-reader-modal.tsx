import React, { ReactElement, useState } from "react";
import { useMedia } from "react-use";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { X, Maximize2, Minimize2, Settings } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useToolBarModal } from "@/hooks/use-tool-bar-modal";

interface ResponsiveModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export default function ResponsiveReaderModal({
  open,
  onOpenChange,
  children,
}: ResponsiveModalProps): ReactElement {
  const isDesktop = useMedia("(min-width: 1024px)", true);
  const { open: openToolBar } = useToolBarModal();
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
          className={`fixed p-0 border-none overflow-hidden ${
            isMaximized
              ? "w-screen h-screen max-w-none max-h-none inset-0 z-50"
              : "w-[400px] h-[667px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          }`}
          style={{
            position: isMaximized ? "fixed" : "absolute",
            top: isMaximized ? 0 : "50%",
            left: isMaximized ? 0 : "50%",
            transform: isMaximized ? "none" : "translate(-50%, -50%)",
          }}
        >
          <div className="absolute top-2 right-2 z-10 flex gap-2">
            <Button variant="ghost" onClick={openToolBar}>
              <Settings className="size-4" />
            </Button>

            <Button onClick={handleMaximizeToggle} variant="ghost" size="icon">
              {isMaximized ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
            <Button
              onClick={() => onOpenChange(false)}
              variant="ghost"
              size="icon"
              className="text-red-500 hover:text-red-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div
            className={`${isMaximized ? "h-screen" : "h-full"} overflow-hidden`}
          >
            {children}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[85vh] p-0 overflow-hidden">
        <div className="absolute top-2 right-2 z-10">
          <Button
            onClick={() => onOpenChange(false)}
            variant="ghost"
            size="icon"
            className="text-red-500 hover:text-red-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="h-full overflow-y-auto pt-10">{children}</div>
      </DrawerContent>
    </Drawer>
  );
}
