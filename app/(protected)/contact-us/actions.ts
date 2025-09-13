"use server";

import { ContactUsResponse, ContactUsSchema, contactUsSchema } from "./types";

export async function submitContactUs(
  formData: ContactUsSchema,
): Promise<ContactUsResponse> {
  try {
    // Validate the form data
    const validatedData = contactUsSchema.parse(formData);

    // Simulate server processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generate a mock ticket ID
    const ticketId = `TICKET-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // In a real application, you would:
    // 1. Save the contact form data to a database
    // 2. Send an email to the support team
    // 3. Send a confirmation email to the user
    // 4. Create a support ticket in your ticketing system

    console.log("Contact Us Form Submitted:", {
      ...validatedData,
      ticketId,
      timestamp: new Date().toISOString(),
    });

    return {
      success: true,
      message: `Your inquiry has been submitted successfully. Ticket ID: ${ticketId}. We'll get back to you within 24 hours.`,
      ticketId,
    };
  } catch (error) {
    console.error("Error submitting contact form:", error);

    if (error instanceof Error) {
      return {
        success: false,
        message:
          error.message || "Failed to submit your inquiry. Please try again.",
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}
