import ContactUsForm from "@/components/contact-us/contact-us-form";
import { fetchUserAccount, fetchUserBookings } from "./fetch";

const ContactUsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ bookingId?: string }>;
}) => {
  // Fetch user account data and booking options in parallel
  const [userAccount, bookingOptions] = await Promise.all([
    fetchUserAccount(),
    fetchUserBookings(),
  ]);

  // Get bookingId from search params
  const params = await searchParams;
  const urlBookingId = params.bookingId;

  // Check if the booking ID exists in the booking options
  const initialBookingId =
    urlBookingId &&
    bookingOptions.some((booking) => booking.value === urlBookingId)
      ? urlBookingId
      : undefined;

  return (
    <div>
      <ContactUsForm
        userAccount={userAccount}
        bookingOptions={bookingOptions}
        initialBookingId={initialBookingId}
      />
    </div>
  );
};

export default ContactUsPage;
