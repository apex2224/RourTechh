import { SITE_URL, siteConfig } from "@/lib/siteConfig";

const serverName = "com.rourtech/public-info";
const serverVersion = "0.1.0";
const protocolVersion = "2025-11-25";
const etag = `"rourtech-server-card-${serverVersion}"`;
const card = {
  $schema:
    "https://static.modelcontextprotocol.io/schemas/v1/server-card.schema.json",
  name: serverName,
  version: serverVersion,
  description:
    "Provides public information about RouR Tech services and contact details.",
  title: "RouR Tech Public Information",
  websiteUrl: SITE_URL,
  remotes: [
    {
      type: "streamable-http",
      url: new URL("/mcp/", SITE_URL).toString(),
      supportedProtocolVersions: [protocolVersion],
    },
  ],
  capabilities: {
    tools: {
      listChanged: false,
    },
  },
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, If-None-Match",
  "Access-Control-Expose-Headers": "ETag",
};

export async function GET(request: Request) {
  const headers = new Headers({
    ...corsHeaders,
    "Cache-Control": "public, max-age=3600",
    "Content-Type": "application/mcp-server-card+json; charset=utf-8",
    ETag: etag,
  });

  if (request.headers.get("if-none-match") === etag) {
    return new Response(null, { status: 304, headers });
  }

  return Response.json(card, { headers });
}

export async function HEAD() {
  return new Response(null, {
    headers: {
      ...corsHeaders,
      "Cache-Control": "public, max-age=3600",
      "Content-Type": "application/mcp-server-card+json; charset=utf-8",
      ETag: etag,
    },
  });
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      ...corsHeaders,
      "Access-Control-Max-Age": "86400",
    },
  });
}
