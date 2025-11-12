export type Cart = {
  detail: [
    {
      additional: [
        {
          name: string;
          price: number;
        },
      ];
      check_in_date: string;
      check_out_date: string;
      guest: string;
      hotel_name: string;
      hotel_rating: number;
      id: number;
      is_breakfast: true;
      price: number;
      promo: {
        benefit: string;
        code: string;
        discount_percent: number;
        fixed_price: number;
        type: string;
        upgraded_to_id: number;
      };
      room_type_name: string;
      total_additional_price: number;
      total_price: number;
    },
  ];
  grand_total: number;
  guest: string[];
  id: number;
};

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

export interface BookingDetail {
  id: string;
  hotelName: string;
  roomType: string;
  rating: number;
  imageSrc: string;
  checkIn: Date;
  checkOut: Date;
  checkInTime: string;
  checkOutTime: string;
  cancellationPeriod: Date;
  rooms: RoomDetail[];
  additionalServices: AdditionalService[];
  totalPrice: number;
}

export interface RoomDetail {
  id: string;
  name: string;
  quantity: number;
  price: number;
  includes: string[];
  features: string[];
}

export interface AdditionalService {
  id: string;
  name: string;
  price: number;
}
