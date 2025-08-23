"use client";

import { useApiQuery } from "@/src/hooks/useApiQuery";
import { SingleServiceResponse } from "../../types/service";
 
export function useService(serviceId: string, locale: string) {
  return useApiQuery<SingleServiceResponse>({
    key: ["service", serviceId, locale],
    endpoint: `services/${serviceId}`,
    enabled: !!serviceId,
  });
}
