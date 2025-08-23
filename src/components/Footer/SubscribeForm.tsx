"use client";

import React, { useState } from "react";
import { showToast } from "@/src/hooks/showToast";
import { Button, Input } from "@heroui/react";

const STRAPI_SUBSCRIBERS_ENDPOINT = "https://prepared-surprise-7a86930000.strapiapp.com/api/subscribers";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(STRAPI_SUBSCRIBERS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: { email } }),
      });

      if (response.ok) {
        showToast("success", "Successfully subscribed!");
        setEmail("");
      } else {
        const errorData = await response.json();
        showToast(errorData.error?.message || "Subscription failed. Please try again.", "danger");
      }
    } catch (error) {
      console.error("Subscribe error:", error);
      showToast("danger", "An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row w-full sm:w-auto">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="  rounded-l-md  text-gray-800 focus:outline-none focus:ring-2 h-12 focus:ring-gray-400 w-full sm:w-auto"
      />
      <Button
        type="submit"
        disabled={isSubmitting}
        className="py-2 px-4 rounded-r-md bg-gray-800 hover:bg-gray-700 transition-colors text-white font-semibold flex items-center justify-center w-full sm:w-auto mt-2 sm:mt-0"
      >
        {isSubmitting ? "Subscribing..." : "Subscribe"}
      </Button>
    </form>
  );
}
