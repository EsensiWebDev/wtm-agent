import { HistoryBooking } from "@/app/(protected)/history-booking/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

interface ViewReceiptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  booking: HistoryBooking | null;
}

const ViewReceiptDialog: React.FC<ViewReceiptDialogProps> = ({
  open,
  onOpenChange,
  booking,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Receipt</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          {booking ? (
            <>
              <div>
                <strong>Booking ID:</strong> {booking.booking_id}
              </div>
              <div>
                <strong>Guest Name:</strong> {booking.guest_name}
              </div>
              <div>
                <strong>Status:</strong> {booking.payment_status}
              </div>
              <div>
                <strong>Payment:</strong> {booking.payment_status}
              </div>
              <div className="mt-4">(Receipt details go here...)</div>
            </>
          ) : (
            <div>No booking selected.</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewReceiptDialog;
