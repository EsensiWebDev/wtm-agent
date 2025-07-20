import { ContactDetail } from "./types";

export async function getContactDetails(): Promise<ContactDetail[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Return dummy data
  return [
    {
      id: "guest-1",
      no: 1,
      name: "John Doe",
    },
    {
      id: "guest-2",
      no: 2,
      name: "Jane Smith",
    },
    {
      id: "guest-3",
      no: 3,
      name: "Mike Johnson",
    },
  ];
}

export async function saveContactDetails(
  guests: ContactDetail[]
): Promise<{ success: boolean; message: string }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Simulate saving data
  console.log("Saving contact details:", guests);

  return {
    success: true,
    message: "Contact details saved successfully",
  };
}
