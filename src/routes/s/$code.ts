import { createFileRoute } from "@tanstack/react-router";

// Short-link redirect: /s/<code> -> 302 to the stored URL.
export const Route = createFileRoute("/s/$code")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const code = params.code?.trim().toLowerCase();
        if (!code) return new Response("Not found", { status: 404 });

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data, error } = await supabaseAdmin
          .from("short_links")
          .select("id, url, clicks")
          .eq("code", code)
          .maybeSingle();

        if (error || !data) return new Response("Not found", { status: 404 });

        // Best-effort click counting; never block the redirect on it.
        supabaseAdmin
          .from("short_links")
          .update({ clicks: (data.clicks ?? 0) + 1 })
          .eq("id", data.id)
          .then(() => {});

        return new Response(null, {
          status: 302,
          headers: { Location: data.url, "Cache-Control": "no-store" },
        });
      },
    },
  },
});
