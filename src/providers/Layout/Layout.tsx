"use client";
import { ReactNode, useState } from "react";

import Footer from "@/src/components/Footer/Footer";
import Navbar from "@/src/components/Navbar/Navbar";
import { ToastProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HeroUi from "./HeroUi";

type Props = {
  children: ReactNode;
};
export default function Layout({ children }: Props) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  }));
  return (
    <QueryClientProvider client={queryClient}>
      <HeroUi>
        {/* <div className="  bg-[#f7f6fa] "> */}
          <Navbar />
         {/* </div> */}

        <div className="min-h-[calc(100vh-8rem)]">{children}</div>
        <ToastProvider />
        <Footer />
      </HeroUi>
    </QueryClientProvider>

  );
}
