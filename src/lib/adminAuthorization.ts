const adminUids = new Set(
  (process.env.NEXT_PUBLIC_FIREBASE_ADMIN_UIDS ?? "")
    .split(",")
    .map((uid) => uid.trim())
    .filter(Boolean),
);

export function isAdminUser(
  user: { uid: string } | null | undefined,
): boolean {
  return Boolean(user && adminUids.has(user.uid));
}
