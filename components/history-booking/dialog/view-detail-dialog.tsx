import { cancelBookingAction } from "@/app/(protected)/history-booking/action";
import { HistoryBooking } from "@/app/(protected)/history-booking/types";
import { ConfirmationDialog } from "@/components/confirmation-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  IconCancel,
  IconCloudUpload,
  IconFileDescription,
  IconReceipt,
} from "@tabler/icons-react";
import { Ellipsis } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import ViewInvoiceDialog from "./view-invoice-dialog";
import ViewReceiptDialog from "./view-receipt-dialog";

// Helper function to get invoice count for a booking
function getInvoiceCount(booking: HistoryBooking): number {
  // Generate invoice count based on booking ID to ensure consistency
  // This matches the logic in the invoice dialog
  const hash = booking.bookingId.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
  return Math.abs(hash % 3) + 1; // 1-3 invoices
}

interface ViewDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  booking: HistoryBooking | null;
  onViewInvoice?: (booking: HistoryBooking) => void;
  onViewReceipt?: (booking: HistoryBooking) => void;
}

const ViewDetailDialog: React.FC<ViewDetailDialogProps> = ({
  open,
  onOpenChange,
  booking,
  onViewInvoice,
  onViewReceipt,
}) => {
  const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false);
  const [receiptDialogOpen, setReceiptDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleViewInvoice = (booking: HistoryBooking) => {
    setInvoiceDialogOpen(true);
  };

  const handleViewReceipt = (booking: HistoryBooking) => {
    setReceiptDialogOpen(true);
  };

  const handleCancelClick = () => {
    setConfirmDialogOpen(true);
  };

  const handleCancelConfirm = async () => {
    if (!booking) return;

    setIsLoading(true);
    try {
      const result = await cancelBookingAction(booking.bookingId);

      if (result.success) {
        toast.success(result.message);
        setConfirmDialogOpen(false);
        onOpenChange(false); // Close the detail dialog
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelDialogClose = () => {
    setConfirmDialogOpen(false);
  };
  // Extended booking data for display (in real implementation, this would come from API)
  const getExtendedBookingData = (booking: HistoryBooking) => {
    return [
      {
        guestName: booking.guestName,
        picAgent: "Hecky",
        hotelName: "Ibis Hotel & Convention",
        hotelAdditional: "No Additional",
        subBookingId: "01292929",
        bookingStatus: booking.bookingStatus,
        paymentStatus: booking.paymentStatus,
        cancellationPeriod: "until 15 Feb 2025",
      },
      {
        guestName: "Eugenia Caroline",
        picAgent: "Hecky",
        hotelName: "Atria Hotel Bali",
        hotelAdditional: "+Ipax Breakfast",
        subBookingId: "01292929",
        bookingStatus: booking.bookingStatus,
        paymentStatus: booking.paymentStatus,
        cancellationPeriod: "until 15 Feb 2025",
      },
    ];
  };

  const bookingDetails = booking ? getExtendedBookingData(booking) : [];

  const getStatusBadge = (status: string, type: "booking" | "payment") => {
    if (type === "booking") {
      switch (status) {
        case "approved":
          return (
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
              Confirmed
            </Badge>
          );
        case "waiting":
          return (
            <Badge
              variant="outline"
              className="border-yellow-300 bg-yellow-100 text-yellow-800"
            >
              Waiting
            </Badge>
          );
        case "rejected":
          return <Badge variant="destructive">Rejected</Badge>;
        default:
          return <Badge variant="outline">{status}</Badge>;
      }
    } else {
      switch (status) {
        case "paid":
          return (
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
              Paid
            </Badge>
          );
        case "unpaid":
          return <Badge variant="destructive">Unpaid</Badge>;
        default:
          return <Badge variant="outline">{status}</Badge>;
      }
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-[95vw] overflow-hidden bg-white px-8 sm:max-w-[1060px]">
        <DialogHeader>
          <DialogTitle>Booking Details</DialogTitle>
        </DialogHeader>

        {booking ? (
          <div className="max-h-[calc(90vh-120px)] space-y-6 overflow-y-auto">
            <div className="overflow-x-auto">
              <Table className="min-w-full table-fixed">
                <TableHeader>
                  <TableRow className="!bg-white">
                    <TableHead className="w-[120px]">Guest Name</TableHead>
                    <TableHead className="w-[100px]">PIC Agent</TableHead>
                    <TableHead className="w-[200px]">Hotel Name</TableHead>
                    <TableHead className="w-[120px]">Sub-booking ID</TableHead>
                    <TableHead className="w-[120px]">Booking Status</TableHead>
                    <TableHead className="w-[120px]">Payment Status</TableHead>
                    <TableHead className="w-[150px]"></TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookingDetails.map((detail, index) => (
                    <TableRow
                      key={index}
                      className="[&:nth-child(odd)]:bg-white"
                    >
                      <TableCell className="font-medium">
                        <div>
                          <div>{detail.guestName}</div>
                        </div>
                      </TableCell>
                      <TableCell>{detail.picAgent}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{detail.hotelName}</div>
                          <div className="text-muted-foreground text-sm">
                            {detail.hotelAdditional}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{detail.subBookingId}</TableCell>
                      <TableCell>
                        {getStatusBadge(detail.bookingStatus, "booking")}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(detail.paymentStatus, "payment")}
                      </TableCell>
                      <TableCell>
                        <div className="text-xs">
                          <div className="text-right text-red-600">
                            Cancellation Period
                          </div>
                          <div className="text-right text-red-600">
                            {detail.cancellationPeriod}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-label="Open menu"
                              variant="ghost"
                              className="data-[state=open]:bg-muted flex size-8 p-0"
                            >
                              <Ellipsis className="size-4" aria-hidden="true" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem
                              onSelect={() => handleViewInvoice(booking)}
                            >
                              <IconFileDescription className="mr-2 h-4 w-4" />
                              View Invoice
                              {(() => {
                                const invoiceCount = getInvoiceCount(booking);
                                return invoiceCount > 1 ? (
                                  <Badge
                                    variant="secondary"
                                    className="ml-2 text-xs"
                                  >
                                    {invoiceCount}
                                  </Badge>
                                ) : null;
                              })()}
                            </DropdownMenuItem>
                            {detail.paymentStatus === "paid" ? (
                              <DropdownMenuItem
                                onSelect={() => handleViewReceipt(booking)}
                              >
                                <IconReceipt className="mr-2 h-4 w-4" /> View
                                Receipt
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem
                                onSelect={() => handleViewReceipt(booking)}
                              >
                                <IconCloudUpload className="mr-2 h-4 w-4" />
                                Upload Receipt
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              variant="destructive"
                              onSelect={handleCancelClick}
                            >
                              <IconCancel className="mr-2 h-4 w-4" />
                              Cancel Booking
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        ) : (
          <div className="text-muted-foreground py-8 text-center">
            No booking selected.
          </div>
        )}
      </DialogContent>

      {/* Invoice Dialog */}
      <ViewInvoiceDialog
        open={invoiceDialogOpen}
        onOpenChange={setInvoiceDialogOpen}
        booking={booking}
      />

      {/* Receipt Dialog */}
      <ViewReceiptDialog
        open={receiptDialogOpen}
        onOpenChange={setReceiptDialogOpen}
        booking={booking}
      />

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={confirmDialogOpen}
        onOpenChange={setConfirmDialogOpen}
        onConfirm={handleCancelConfirm}
        onCancel={handleCancelDialogClose}
        isLoading={isLoading}
        
        title={`Are you sure you want to cancel booking ${booking?.bookingId}?`}
        description={`This action cannot be undone and the booking will be permanently cancelled.`}
      />
    </Dialog>
  );
};

export default ViewDetailDialog;
