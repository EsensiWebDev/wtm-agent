"use client";

import { ContactDetail } from "@/app/(protected)/cart/types";
import { Button } from "@/components/ui/button";
import { User } from "@/types/user";
import { Plus } from "lucide-react";
import React from "react";
import { SelectUserDialog } from "./dialog/select-user-dialog";
import { ContactDetailsTable } from "./table/contact-details-table";

interface ContactDetailsSectionProps {
  initialGuests?: ContactDetail[];
}

// Mock users data - in a real app, this would come from an API
const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    avatar: "/avatars/john.jpg",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1234567891",
    avatar: "/avatars/jane.jpg",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    phone: "+1234567892",
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    phone: "+1234567893",
  },
  {
    id: "5",
    name: "David Brown",
    email: "david.brown@example.com",
    phone: "+1234567894",
  },
];

export function ContactDetailsSection({
  initialGuests = [],
}: ContactDetailsSectionProps) {
  const [guests, setGuests] = React.useState<ContactDetail[]>(initialGuests);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleAddGuest = () => {
    setIsDialogOpen(true);
  };

  const handleUserSelect = (user: User) => {
    const newGuest: ContactDetail = {
      id: user.id,
      no: guests.length + 1,
      name: user.name,
    };
    setGuests([...guests, newGuest]);
    setIsDialogOpen(false);
  };

  const handleRemoveGuest = (id: string) => {
    const updatedGuests = guests.filter((guest) => guest.id !== id);
    // Reorder the numbers
    const reorderedGuests = updatedGuests.map((guest, index) => ({
      ...guest,
      no: index + 1,
    }));
    setGuests(reorderedGuests);
  };

  const handleUpdateGuest = (id: string, name: string) => {
    setGuests(
      guests.map((guest) => (guest.id === id ? { ...guest, name } : guest))
    );
  };

  // Get selected users based on current guests
  const selectedUsers = React.useMemo(() => {
    return mockUsers.filter((user) =>
      guests.some((guest) => guest.id === user.id)
    );
  }, [guests]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Contact Details</h2>
        <Button onClick={handleAddGuest} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Guest
        </Button>
      </div>

      {guests.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>No guests added yet.</p>
          <p className="text-sm">
            Click "Add Guest" to start adding contact details.
          </p>
        </div>
      ) : (
        <ContactDetailsTable
          data={guests}
          onRemoveGuest={handleRemoveGuest}
          onUpdateGuest={handleUpdateGuest}
        />
      )}

      <SelectUserDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onUserSelect={handleUserSelect}
        users={mockUsers}
        selectedUsers={selectedUsers}
      />
    </div>
  );
}
