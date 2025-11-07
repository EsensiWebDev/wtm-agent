"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";

const LogoutPage = () => {
  useEffect(() => {
    // Redirect to login page after short delay
    const timer = setTimeout(async () => {
      await signOut({ callbackUrl: "/login" });
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-lg text-gray-600">Logging out...</p>
    </div>
  );
};

export default LogoutPage;
