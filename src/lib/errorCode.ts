function hasCode(value: unknown): value is { code: unknown } {
  return typeof value === "object" && value !== null && "code" in value;
}

export function getErrorCode(error: unknown): string {
  if (!hasCode(error) || typeof error.code !== "string") {
    return "";
  }

  return error.code;
}
