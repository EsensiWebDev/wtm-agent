"use server";

import { apiCall } from "@/lib/api";
import { ApiResponse } from "@/types";

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

export async function fetchCart(): Promise<ApiResponse<Cart>> {
  const url = `/bookings/cart`;
  const apiResponse = await apiCall<Cart>(url);

  return apiResponse;
}

export type Notification = {
  id: number;
  is_read: boolean;
  message: string;
  read_at: string;
  redirect_url: string;
  title: string;
  user_id: number;
};

export async function fetchNotifications(): Promise<
  ApiResponse<Notification[]>
> {
  const url = `/notifications`;
  const apiResponse = await apiCall<Notification[]>(url);

  return apiResponse;
}
