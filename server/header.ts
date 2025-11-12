"use server";

import { apiCall } from "@/lib/api";
import { delay } from "@/lib/utils";
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

export async function fetchCart(): Promise<ApiResponse<Cart>> {
  await delay(300);

  return {
    data: {
      detail: [
        {
          additional: [
            {
              name: "Dinner",
              price: 20000,
            },
          ],
          check_in_date: "2023-04-01",
          check_out_date: "2023-04-02",
          guest: "John Doe",
          hotel_name: "Grand Hotel",
          hotel_rating: 5,
          id: 123,
          is_breakfast: true,
          price: 200000,
          promo: {
            benefit: "Free Upgrade",
            code: "UPGRADE",
            discount_percent: 10,
            fixed_price: 0,
            type: "discount",
            upgraded_to_id: 0,
          },
          room_type_name: "Standard Room",
          total_additional_price: 20000,
          total_price: 200000,
        },
      ],
      grand_total: 220000,
      guest: ["John Doe"],
      id: 1,
    },
    message: "string",
    pagination: {
      limit: 0,
      page: 0,
      total: 0,
      total_pages: 0,
    },
    status: 200,
  };

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
