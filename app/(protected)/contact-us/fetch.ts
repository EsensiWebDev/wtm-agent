import { BookingOption, UserAccountData } from "./types";

export async function fetchUserAccount(): Promise<UserAccountData> {
  // Simulate fetching user account data
  // In a real application, this would fetch from your authentication system/database
  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    id: "user_123",
    name: "John Doe",
    email: "john.doe@example.com",
  };
}

export async function fetchUserBookings(): Promise<BookingOption[]> {
  // Simulate fetching user's booking history
  // In a real application, this would fetch from your booking database
  await new Promise((resolve) => setTimeout(resolve, 200));

  return [
    {
      value: "BK001",
      label: "Hotel Bali Paradise - Booking #BK001",
      subBookings: [
        { value: "SUB001", label: "Deluxe Room - Check-in: 2024-01-15" },
        { value: "SUB002", label: "Spa Package - Date: 2024-01-16" },
        { value: "SUB003", label: "Airport Transfer - Date: 2024-01-15" },
      ],
    },
    {
      value: "BK002",
      label: "Hotel Jakarta Grand - Booking #BK002",
      subBookings: [
        { value: "SUB004", label: "Executive Suite - Check-in: 2024-02-10" },
        { value: "SUB005", label: "Conference Room - Date: 2024-02-11" },
      ],
    },
    {
      value: "BK003",
      label: "Hotel Yogyakarta Heritage - Booking #BK003",
      subBookings: [
        { value: "SUB006", label: "Standard Room - Check-in: 2024-03-05" },
        { value: "SUB007", label: "City Tour Package - Date: 2024-03-06" },
        { value: "SUB008", label: "Cultural Workshop - Date: 2024-03-07" },
        { value: "SUB009", label: "Return Transfer - Date: 2024-03-08" },
      ],
    },
    {
      value: "BK004",
      label: "Hotel Bandung Hills - Booking #BK004",
      subBookings: [
        { value: "SUB010", label: "Mountain View Room - Check-in: 2024-04-20" },
        { value: "SUB011", label: "Hiking Tour - Date: 2024-04-21" },
      ],
    },
  ];
}
