import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function acceptsMarkdown(acceptHeader: string | null): boolean {
  if (!acceptHeader) {
    return false;
  }

  return acceptHeader.split(",").some((mediaRange) => {
    const [mediaType, ...parameters] = mediaRange.split(";");

    if (mediaType.trim().toLowerCase() !== "text/markdown") {
      return false;
    }

    const qualityParameter = parameters.find((parameter) =>
      parameter.trim().toLowerCase().startsWith("q="),
    );

    if (!qualityParameter) {
      return true;
    }

    const quality = Number(qualityParameter.trim().slice(2));
    return Number.isFinite(quality) && quality > 0 && quality <= 1;
  });
}

export function proxy(request: NextRequest) {
  const response =
    (request.method === "GET" || request.method === "HEAD") &&
    request.nextUrl.pathname === "/" &&
    acceptsMarkdown(request.headers.get("accept"))
    ? NextResponse.rewrite(new URL("/home-markdown/", request.url))
    : NextResponse.next();

  response.headers.set("Vary", "Accept");
  return response;
}

export const config = {
  matcher: "/",
};
