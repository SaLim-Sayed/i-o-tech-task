import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => ({
  // Path to your messages
  messages: (await import(`@/public/messages/${locale}.json`)).default
}));
