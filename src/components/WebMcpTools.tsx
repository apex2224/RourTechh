"use client";

import { useEffect } from "react";
import { absoluteSiteUrl, siteConfig } from "@/lib/siteConfig";
import { servicesData } from "@/data/servicesData";

interface WebMcpTool {
  name: string;
  description: string;
  inputSchema: {
    type: "object";
    properties: Record<string, never>;
    additionalProperties: false;
  };
  annotations: {
    readOnlyHint: true;
  };
  execute: (
    input: Record<string, unknown>,
    options: { signal: AbortSignal },
  ) => unknown | Promise<unknown>;
}

interface WebMcpModelContext {
  registerTool(
    tool: WebMcpTool,
    options?: { signal?: AbortSignal },
  ): void | Promise<void>;
  unregisterTool?: (name: string) => void | Promise<void>;
}

interface NavigatorWithModelContext extends Navigator {
  modelContext?: WebMcpModelContext;
}

interface DocumentWithModelContext extends Document {
  modelContext?: WebMcpModelContext;
}

const publicTools: WebMcpTool[] = [
  {
    name: "rourtech.list_services",
    description:
      "Returns RouR Tech's publicly listed services, brief descriptions, and service-page URLs.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true },
    execute: () => ({
      services: servicesData.map((service) => ({
        name: service.title,
        description: service.shortDescription,
        url: absoluteSiteUrl(`/services/${service.slug || service.id}`),
      })),
    }),
  },
  {
    name: "rourtech.get_public_contact_details",
    description:
      "Returns RouR Tech's publicly listed business email, telephone, WhatsApp link, location, and website URL.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true },
    execute: () => ({
      email: siteConfig.contact.email,
      phone: siteConfig.contact.displayPhone,
      whatsappUrl: siteConfig.contact.whatsapp,
      location: siteConfig.contact.address,
      websiteUrl: siteConfig.url,
    }),
  },
];

export default function WebMcpTools() {
  useEffect(() => {
    const modelContext =
      (document as DocumentWithModelContext).modelContext ??
      (navigator as NavigatorWithModelContext).modelContext;

    if (!modelContext || typeof modelContext.registerTool !== "function") {
      return;
    }

    const controller = new AbortController();

    for (const tool of publicTools) {
      try {
        void Promise.resolve(
          modelContext.registerTool(tool, { signal: controller.signal }),
        ).catch((error: unknown) => {
          console.error(`WebMCP tool registration failed (${tool.name}):`, error);
        });
      } catch (error) {
        console.error(`WebMCP tool registration failed (${tool.name}):`, error);
      }
    }

    return () => {
      controller.abort();

      if (typeof modelContext.unregisterTool === "function") {
        for (const tool of publicTools) {
          try {
            void Promise.resolve(
              modelContext.unregisterTool(tool.name),
            ).catch((error: unknown) => {
              console.error(`WebMCP tool cleanup failed (${tool.name}):`, error);
            });
          } catch (error) {
            console.error(`WebMCP tool cleanup failed (${tool.name}):`, error);
          }
        }
      }
    };
  }, []);

  return null;
}
