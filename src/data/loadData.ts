import pako from "pako";

/**
 * Loads a gzip-compressed JSON array from /data/{filename}.
 * Uses pako for decompression (reliable across all browsers).
 */
export async function loadDataset<T = unknown>(filename: string): Promise<T[]> {
  try {
    const response = await fetch(`/data/${filename}`);
    if (!response.ok) {
      console.error(
        `[loadDataset] Failed to fetch /data/${filename}: ${response.status} ${response.statusText}`,
      );
      return [];
    }

    const buffer = await response.arrayBuffer();
    const decompressed = pako.inflate(new Uint8Array(buffer), { to: "string" });
    const parsed = JSON.parse(decompressed) as T[];

    if (!Array.isArray(parsed)) {
      console.error(
        `[loadDataset] Expected array from /data/${filename}, got ${typeof parsed}`,
      );
      return [];
    }

    console.log(`[loadDataset] ${filename}: ${parsed.length} records`);
    return parsed;
  } catch (error) {
    console.error(`[loadDataset] Error loading /data/${filename}:`, error);
    return [];
  }
}
