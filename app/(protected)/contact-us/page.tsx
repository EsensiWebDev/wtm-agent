import ContactUsForm from "@/components/contact-us/contact-us-form";
import { fetchUserAccount, fetchUserBookings } from "./fetch";

const ContactUsPage = async () => {
  // Fetch user account data and booking options in parallel
  const [userAccount, bookingOptions] = await Promise.all([
    fetchUserAccount(),
    fetchUserBookings(),
  ]);

  return (
    <div>
      <ContactUsForm
        userAccount={userAccount}
        bookingOptions={bookingOptions}
      />
    </div>
  );
};

export default ContactUsPage;
