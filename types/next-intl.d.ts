import type { AbstractIntlMessages } from 'next-intl';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_DEFAULT_LOCALE: string;
      NEXT_PUBLIC_AVAILABLE_LOCALES: string;
    }
  }
}

declare module 'next-intl' {
  export type Messages = AbstractIntlMessages;
}

