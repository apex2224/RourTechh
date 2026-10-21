const ADMIN_USER_IDS = new Set([
  "b5qLyjwsiFXmTPCX2emWwefnKIv1",
  "LGrIo74UYDMCldaDEQuDutWIZhn1",
]);

export function isAdminUser(
  user: { uid: string } | null | undefined,
): boolean {
  return user != null && ADMIN_USER_IDS.has(user.uid);
}
