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
  return useSharedDatasets();
}
