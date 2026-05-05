import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { loadDataset } from "./loadData";
import type { Datasets, UseDatasetsResult } from "./useDatasets";

const EMPTY: Datasets = {
  recommendations: [],
  meeshoPricing: [],
  genzSignals: [],
  shopsyGaps: [],
  keywords: [],
};

const DatasetsContext = createContext<UseDatasetsResult | null>(null);

export function DatasetsProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Datasets>(EMPTY);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [recommendations, meeshoPricing, genzSignals, shopsyGaps, keywords] =
          await Promise.all([
            loadDataset("recommendations.json.gz"),
            loadDataset("meesho_pricing.json.gz"),
            loadDataset("genz_signals.json.gz"),
            loadDataset("shopsy_gaps.json.gz"),
            loadDataset("keywords.json.gz"),
          ]);
        if (cancelled) return;
        setData({ recommendations, meeshoPricing, genzSignals, shopsyGaps, keywords });
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(() => ({ data, loading, error }), [data, loading, error]);
  return <DatasetsContext.Provider value={value}>{children}</DatasetsContext.Provider>;
}

export function useSharedDatasets(): UseDatasetsResult {
  const ctx = useContext(DatasetsContext);
  if (ctx) return ctx;
  // Fallback: behaves like before if provider missing.
  return { data: EMPTY, loading: true, error: null };
}
