export const googleCloudConfig = {
  projectId: 'perfume-marketplace-analyzer',
  clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: 'http://localhost:3000/api/auth/callback',
};

export const riscConfig = {
  receiverEndpoint: 'http://localhost:3000/api/risc/events',
  eventsRequested: [
    'https://schemas.openid.net/secevent/risc/event-type/account-disabled',
    'https://schemas.openid.net/secevent/risc/event-type/account-enabled',
    'https://schemas.openid.net/secevent/risc/event-type/sessions-revoked',
    'https://schemas.openid.net/secevent/risc/event-type/account-purged',
    'https://schemas.openid.net/secevent/risc/event-type/password-changed',
    'https://schemas.openid.net/secevent/risc/event-type/account-credential-change-required',
  ],
};

