export interface ContactDetail {
  id: string;
  no: number;
  name: string;
}

export interface ContactDetailsTableProps {
  data: ContactDetail[];
  onRemoveGuest: (id: string) => void;
  onUpdateGuest: (id: string, name: string) => void;
}
