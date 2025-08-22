import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from '../constant';
import { useLocale } from 'next-intl';

type ApiQueryProps<TResponse> = {
  key: unknown[];
  endpoint: any;
  config?: UseQueryOptions<TResponse>;
  enabled?: boolean;
};

export function useApiQuery<TResponse = any>({
  key,
  endpoint,
  config,
  enabled=true,
}: ApiQueryProps<TResponse>) {
  const locale = useLocale();
  const isQueryEnabled = !!endpoint && enabled;
   const fullUrl = `${API_URL}${endpoint}?locale=${locale}&populate=*`;

  return useQuery<TResponse>({
    queryKey: key,
    
    staleTime: 1000 * 60 * 2,
    enabled: isQueryEnabled,
     retry: 1, 
    queryFn: async () => {
      const { data } = await axios.get<TResponse>(fullUrl);
      return data;
    },
    ...config,
  });
}
