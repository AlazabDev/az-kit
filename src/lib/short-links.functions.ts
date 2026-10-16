import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const CODE_RE = /^[a-zA-Z0-9][a-zA-Z0-9-_]{1,31}$/;

function randomCode(len = 5): string {
  const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
  let out = "";
  const bytes = crypto.getRandomValues(new Uint8Array(len));
  for (const b of bytes) out += alphabet[b % alphabet.length];
  return out;
}

export const createShortLink = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      url: z.string().url(),
      code: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    let code = data.code?.trim().toLowerCase() ?? "";
    if (code && !CODE_RE.test(code)) {
      throw new Error("الرمز يجب أن يكون حروفاً إنجليزية أو أرقاماً (2-32 خانة)");
    }

    // Auto-generate until free (max a few tries)
    if (!code) {
      for (let i = 0; i < 5; i++) {
        const candidate = randomCode();
        const { data: existing } = await supabase
          .from("short_links")
          .select("id")
          .eq("code", candidate)
          .maybeSingle();
        if (!existing) {
          code = candidate;
          break;
        }
      }
      if (!code) throw new Error("تعذّر توليد رمز فارغ، حاول مجدداً");
    } else {
      const { data: existing } = await supabase
        .from("short_links")
        .select("id")
        .eq("code", code)
        .maybeSingle();
      if (existing) throw new Error("هذا الرمز مستخدم — اختر رمزاً آخر");
    }

    const { data: row, error } = await supabase
      .from("short_links")
      .insert({ code, url: data.url })
      .select("id, code, url, clicks, created_at")
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const listShortLinks = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabase
    .from("short_links")
    .select("id, code, url, clicks, created_at")
    .order("created_at", { ascending: false })
    .limit(100);
  if (error) throw new Error(error.message);
  return data ?? [];
});
