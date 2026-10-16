import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Copy, Link2, ExternalLink, MousePointerClick } from "lucide-react";
import { toast } from "sonner";
import { createShortLink, listShortLinks } from "@/lib/short-links.functions";

export const Route = createFileRoute("/shorten")({
  head: () => ({
    meta: [
      { title: "اختصار الروابط — Al-Azab Kit" },
      { name: "description", content: "أداة اختصار الروابط الخاصة بمؤسسة العزب: حوّل أي رابط طويل إلى رابط قصير بصيغة kit.alazab.com/الرمز." },
      { property: "og:title", content: "اختصار الروابط — Al-Azab Kit" },
      { property: "og:description", content: "حوّل أي رابط طويل إلى رابط قصير بصيغة kit.alazab.com/الرمز." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ShortenPage,
});

const SHORT_BASE = "https://kit.alazab.com";

function ShortenPage() {
  const queryClient = useQueryClient();
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");

  const linksQuery = useQuery({
    queryKey: ["short-links"],
    queryFn: () => listShortLinks(),
  });

  const createMutation = useMutation({
    mutationFn: (input: { url: string; code?: string }) => createShortLink({ data: input }),
    onSuccess: (row) => {
      toast.success(`تم إنشاء الرابط: ${SHORT_BASE}/s/${row.code}`);
      setUrl("");
      setCode("");
      queryClient.invalidateQueries({ queryKey: ["short-links"] });
    },
    onError: (err) => {
      toast.error(err instanceof Error ? err.message : "حدث خطأ غير متوقع");
    },
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) return;
    const withProto = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    createMutation.mutate({ url: withProto, code: code.trim() || undefined });
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => toast.success("تم النسخ"));
  };

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border-subtle">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
          <Link to="/" className="font-mono text-xs uppercase tracking-[0.2em]">
            Al-Azab Kit
          </Link>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            // اختصار الروابط
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="font-display text-4xl sm:text-5xl">اختصار الروابط</h1>
        <p className="mt-3 max-w-xl text-sm text-muted-foreground">
          أدخل الرابط الطويل ونص الاختصار، وسيكون الناتج بصيغة{" "}
          <span dir="ltr" className="font-mono text-foreground">{SHORT_BASE}/s/الرمز</span>
        </p>

        <form
          onSubmit={submit}
          className="mt-8 rounded-xl border border-border-subtle bg-card p-5 shadow-sm"
        >
          <label className="block font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            الرابط الطويل
          </label>
          <input
            dir="ltr"
            type="text"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/very/long/url..."
            className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2.5 font-mono text-sm outline-none focus:border-ring"
          />

          <label className="mt-5 block font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            نص الاختصار (اختياري — يُولَّد تلقائياً إن تُرك فارغاً)
          </label>
          <div className="mt-2 flex items-center gap-2" dir="ltr">
            <span className="shrink-0 font-mono text-sm text-muted-foreground">{SHORT_BASE}/s/</span>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="apk03"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 font-mono text-sm outline-none focus:border-ring"
            />
          </div>

          <button
            type="submit"
            disabled={createMutation.isPending}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 font-mono text-xs uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            <Link2 className="h-4 w-4" strokeWidth={1.5} />
            {createMutation.isPending ? "جارٍ الإنشاء..." : "اختصر الرابط"}
          </button>
        </form>

        <section className="mt-12">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
            // الروابط المنشأة
          </h2>
          <div className="mt-4 divide-y divide-border-subtle rounded-xl border border-border-subtle bg-card">
            {(linksQuery.data ?? []).length === 0 && (
              <p className="px-5 py-8 text-center text-sm text-muted-foreground">
                لا توجد روابط بعد — أنشئ أول رابط مختصر بالأعلى.
              </p>
            )}
            {(linksQuery.data ?? []).map((link) => {
              const shortUrl = `${SHORT_BASE}/s/${link.code}`;
              return (
                <div key={link.id} className="flex items-center gap-4 px-5 py-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2" dir="ltr">
                      <a
                        href={shortUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="truncate font-mono text-sm font-bold text-foreground hover:underline"
                      >
                        {shortUrl}
                      </a>
                      <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground" strokeWidth={1.5} />
                    </div>
                    <p dir="ltr" className="mt-1 truncate font-mono text-xs text-muted-foreground">
                      {link.url}
                    </p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-xs text-muted-foreground">
                    <MousePointerClick className="h-3.5 w-3.5" strokeWidth={1.5} />
                    {link.clicks}
                  </span>
                  <button
                    onClick={() => copy(shortUrl)}
                    className="shrink-0 rounded-full border border-border-subtle p-2 transition-colors hover:bg-muted"
                    aria-label="نسخ الرابط"
                  >
                    <Copy className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
