import { SITE_URL, siteConfig } from "@/lib/siteConfig";
import { servicesData } from "@/data/servicesData";

const serverName = "com.rourtech/public-info";
const serverVersion = "0.1.0";
const protocolVersion = "2025-11-25";
const maxRequestBytes = 8 * 1024;
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "Accept, Content-Type, MCP-Protocol-Version, MCP-Session-Id, Last-Event-ID",
  "Access-Control-Expose-Headers": "MCP-Protocol-Version, MCP-Session-Id",
};

type JsonRpcRequest = {
  jsonrpc: "2.0";
  id?: string | number | null;
  method?: string;
  params?: Record<string, unknown>;
};

const tools = [
  {
    name: "list_services",
    title: "List RouR Tech services",
    description: "List the public digital services offered by RouR Tech.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
  },
  {
    name: "get_contact_info",
    title: "Get RouR Tech contact information",
    description: "Get the public email, phone, and location for RouR Tech.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
  },
];

function jsonRpcError(
  id: JsonRpcRequest["id"],
  code: number,
  message: string,
  status = 200,
) {
  return Response.json(
    { jsonrpc: "2.0", id: id ?? null, error: { code, message } },
    {
      status,
      headers: {
        ...corsHeaders,
        "Cache-Control": "no-store",
        "MCP-Protocol-Version": protocolVersion,
      },
    },
  );
}

function jsonRpcSuccess(id: JsonRpcRequest["id"], result: unknown) {
  return Response.json(
    { jsonrpc: "2.0", id, result },
    {
      headers: {
        ...corsHeaders,
        "Cache-Control": "no-store",
        "MCP-Protocol-Version": protocolVersion,
      },
    },
  );
}

function emptyNotificationResponse() {
  return new Response(null, {
    status: 202,
    headers: { ...corsHeaders, "Cache-Control": "no-store" },
  });
}

export async function GET() {
  return new Response(null, {
    status: 405,
    headers: {
      ...corsHeaders,
      Allow: "POST, OPTIONS",
      "Cache-Control": "no-store",
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

export async function POST(request: Request) {
  const textResponse = (message: string, status: number) =>
    new Response(message, {
      status,
      headers: {
        ...corsHeaders,
        "Cache-Control": "no-store",
      },
    });

  const contentType = (request.headers.get("content-type") ?? "")
    .split(";")[0]
    .trim()
    .toLowerCase();
  if (contentType !== "application/json") {
    return textResponse("Content-Type must be application/json", 415);
  }

  const accept = (request.headers.get("accept") ?? "")
    .split(",")
    .map((type) => type.split(";")[0].trim().toLowerCase());
  if (!accept.includes("application/json") || !accept.includes("text/event-stream")) {
    return textResponse(
      "Accept must include application/json and text/event-stream",
      406,
    );
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > maxRequestBytes) {
    return textResponse("Request body is too large", 413);
  }

  const body = await request.text();
  if (new TextEncoder().encode(body).byteLength > maxRequestBytes) {
    return textResponse("Request body is too large", 413);
  }

  let message: unknown;
  try {
    message = JSON.parse(body);
  } catch {
    return jsonRpcError(null, -32700, "Parse error", 400);
  }

  if (
    !message ||
    typeof message !== "object" ||
    Array.isArray(message) ||
    (message as JsonRpcRequest).jsonrpc !== "2.0" ||
    typeof (message as JsonRpcRequest).method !== "string"
  ) {
    return jsonRpcError(null, -32600, "Invalid Request", 400);
  }

  const rpc = message as JsonRpcRequest;
  const hasId = Object.prototype.hasOwnProperty.call(rpc, "id");
  if (
    hasId &&
    typeof rpc.id !== "string" &&
    typeof rpc.id !== "number" &&
    rpc.id !== null
  ) {
    return jsonRpcError(null, -32600, "Invalid Request", 400);
  }

  const isNotification = !hasId;
  const method = rpc.method ?? "";

  if (
    method !== "initialize" &&
    request.headers.get("mcp-protocol-version") !== protocolVersion
  ) {
    return textResponse("Unsupported or missing MCP-Protocol-Version", 400);
  }

  if (isNotification) {
    if (method.startsWith("notifications/")) {
      return emptyNotificationResponse();
    }
    return jsonRpcError(null, -32600, "Invalid Request", 400);
  }

  if (method === "initialize") {
    const params = rpc.params;
    if (
      !params ||
      typeof params.protocolVersion !== "string" ||
      !params.capabilities ||
      typeof params.capabilities !== "object" ||
      Array.isArray(params.capabilities) ||
      !params.clientInfo ||
      typeof params.clientInfo !== "object" ||
      Array.isArray(params.clientInfo)
    ) {
      return jsonRpcError(rpc.id, -32602, "Invalid initialize parameters");
    }

    return jsonRpcSuccess(rpc.id, {
      protocolVersion,
      capabilities: { tools: { listChanged: false } },
      serverInfo: { name: serverName, version: serverVersion },
    });
  }

  if (method === "ping") {
    return jsonRpcSuccess(rpc.id, {});
  }

  if (method === "tools/list") {
    return jsonRpcSuccess(rpc.id, { tools });
  }

  if (method === "tools/call") {
    const params = rpc.params;
    if (!params || typeof params.name !== "string") {
      return jsonRpcError(rpc.id, -32602, "Invalid tools/call parameters");
    }

    const argumentsValue = params.arguments;
    if (
      argumentsValue !== undefined &&
      (!argumentsValue ||
        typeof argumentsValue !== "object" ||
        Array.isArray(argumentsValue) ||
        Object.keys(argumentsValue).length > 0)
    ) {
      return jsonRpcError(
        rpc.id,
        -32602,
        "This tool accepts no arguments",
      );
    }

    let text: string;
    if (params.name === "list_services") {
      text = servicesData
        .map(
          (service) =>
            `- ${service.title}: ${service.shortDescription} (${new URL(
              `/services/${service.slug || service.id}/`,
              SITE_URL,
            )})`,
        )
        .join("\n");
    } else if (params.name === "get_contact_info") {
      text = [
        `Email: ${siteConfig.contact.email}`,
        `Phone: ${siteConfig.contact.displayPhone}`,
        `Location: ${siteConfig.contact.address}`,
      ].join("\n");
    } else {
      return jsonRpcError(rpc.id, -32602, "Unknown tool");
    }

    return jsonRpcSuccess(rpc.id, {
      content: [{ type: "text", text }],
      isError: false,
    });
  }

  return jsonRpcError(rpc.id, -32601, "Method not found");
}
