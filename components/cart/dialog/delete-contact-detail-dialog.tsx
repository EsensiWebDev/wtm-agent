"use client";

import { ContactDetail } from "@/app/(protected)/cart/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeleteContactDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contactDetail: ContactDetail | null;
  onRemoveGuest: (id: string) => void;
  showTrigger?: boolean;
  onSuccess?: () => void;
}

export function DeleteContactDetailDialog({
  open,
  onOpenChange,
  contactDetail,
  onRemoveGuest,
  showTrigger = true,
  onSuccess,
}: DeleteContactDetailDialogProps) {
  const handleDelete = () => {
    if (contactDetail) {
      onRemoveGuest(contactDetail.id);
      onOpenChange(false);
      onSuccess?.();
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Guest</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-semibold">{contactDetail?.name}</span>? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
