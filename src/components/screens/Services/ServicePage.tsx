"use client";

import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import { useService } from "./hooks/useService";
import ServiceLoader from "./components/ServiceLoader";
import ServiceError from "./components/ServiceError";
import ServiceNotFound from "./components/ServiceNotFound";
import ServiceDetails from "./ServiceDetails";

export default function ServicePage() {
  const params = useParams();
  const locale = useLocale();
  const serviceId = params.id as string;

  const { data, isLoading, error } = useService(serviceId, locale);
  const service = data?.data;

  if (isLoading) return <ServiceLoader />;
  if (error) return <ServiceError />;
  if (!service) return <ServiceNotFound />;

  return <ServiceDetails service={service} />;
}
