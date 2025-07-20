import { ContactDetailsSection } from "@/components/cart/contact-details-section";
import { getContactDetails } from "./fetch";

const CartPage = async () => {
  // Fetch contact details data
  const initialGuests = await getContactDetails();

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="grid gap-6">
        <ContactDetailsSection initialGuests={initialGuests} />
      </div>
    </div>
  );
};

export default CartPage;
