"use server";

export async function cancelBookingAction(
  bookingId: string,
): Promise<{ success: boolean; message: string }> {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Dummy implementation - in real app, this would make API call
    console.log(`Cancelling booking: ${bookingId}`);

    // Simulate random success/failure for demonstration
    const isSuccess = Math.random() > 0.1; // 90% success rate

    if (isSuccess) {
      return {
        success: true,
        message: `Booking ${bookingId} has been successfully cancelled.`,
      };
    } else {
      return {
        success: false,
        message: "Failed to cancel booking. Please try again.",
      };
    }
  } catch (error) {
    console.error("Cancel booking error:", error);
    return {
      success: false,
      message: "An unexpected error occurred while cancelling the booking.",
    };
  }
}
