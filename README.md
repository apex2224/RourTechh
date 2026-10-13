This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## CMS and Firestore access

The Firestore database in project `ourtech-f58d4` has the database ID `default`.
This is a named database and is distinct from Firestore's reserved `(default)`
database. The client and Firebase CLI configuration target the named `default`
database.

Set `NEXT_PUBLIC_FIREBASE_ADMIN_UIDS` to the comma-separated authorized Firebase
Authentication UIDs in `.env.local` and add the same UIDs to the Firestore
`isAdmin()` rule in `firestore.rules`. UIDs are identifiers, not credentials;
Firestore Security Rules enforce access independently of the client-side check.
Configure the same variable in the production environment.

Deploy the rules to the same Firebase project configured by
`NEXT_PUBLIC_FIREBASE_PROJECT_ID` (the CLI has no active project configured in
this workspace):

```bash
firebase deploy --only firestore --project ourtech-f58d4
```

The CMS is available at `/admin`. Email/Password and Google sign-in are both
restricted to the configured UID.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
