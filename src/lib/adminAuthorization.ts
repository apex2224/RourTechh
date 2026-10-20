export function isAdminUser(
  user: { uid: string } | null | undefined,
): boolean {
  // Firestore Security Rules are the authoritative admin check. Keeping the
  // allowlist out of the browser bundle prevents publishing it as client config.
  return Boolean(user);
}
