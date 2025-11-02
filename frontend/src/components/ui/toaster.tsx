import * as React from "react";
import { useToast } from "@/hooks/use-toast";

export function Toaster() {
  const { toasts, dismiss } = useToast();
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="rounded-xl border border-border bg-card px-4 py-3 shadow-soft min-w-[240px] max-w-xs"
          role="status"
        >
          {t.title && <div className="font-semibold text-foreground mb-1">{t.title}</div>}
          {t.description && (
            <div className="text-sm text-muted-foreground">{t.description}</div>
          )}
          <button
            className="mt-2 text-sm text-primary"
            onClick={() => dismiss(t.id)}
            aria-label="Dismiss"
          >
            Dismiss
          </button>
        </div>
      ))}
    </div>
  );
}
