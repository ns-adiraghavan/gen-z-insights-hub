import { useSharedDatasets } from "./DatasetsContext";

export interface Datasets {
  recommendations: unknown[];
  meeshoPricing: unknown[];
  genzSignals: unknown[];
  shopsyGaps: unknown[];
  keywords: unknown[];
}

const EMPTY: Datasets = {
  recommendations: [],
  meeshoPricing: [],
  genzSignals: [],
  shopsyGaps: [],
  keywords: [],
};

export interface UseDatasetsResult {
  data: Datasets;
  loading: boolean;
  error: Error | null;
}

/**
 * Loads all 5 Shopsy POC datasets in parallel on mount.
 * loading stays true until every file resolves (success or failure).
 */
export function useDatasets(): UseDatasetsResult {
  const [data, setData] = useState<Datasets>(EMPTY);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const [
          recommendations,
          meeshoPricing,
          genzSignals,
          shopsyGaps,
          keywords,
        ] = await Promise.all([
          loadDataset("recommendations.json.gz"),
          loadDataset("meesho_pricing.json.gz"),
          loadDataset("genz_signals.json.gz"),
          loadDataset("shopsy_gaps.json.gz"),
          loadDataset("keywords.json.gz"),
        ]);

        if (cancelled) return;

        setData({
          recommendations,
          meeshoPricing,
          genzSignals,
          shopsyGaps,
          keywords,
        });
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

  return { data, loading, error };
}
