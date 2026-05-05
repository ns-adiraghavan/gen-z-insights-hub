/**
 * Loads a gzip-compressed JSON array from the public /data folder.
 *
 * Files are stored as `public/data/{filename}` with Content-Type
 * application/json and a .json.gz extension. We stream the response body
 * through the browser's native DecompressionStream('gzip'), then parse the
 * resulting text as JSON.
 *
 * On any failure (network, decompression, parse) we log and return [].
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

    if (!response.body) {
      console.error(`[loadDataset] No response body for /data/${filename}`);
      return [];
    }

    if (typeof DecompressionStream === "undefined") {
      console.error(
        "[loadDataset] DecompressionStream is not supported in this environment",
      );
      return [];
    }

    const ds = new DecompressionStream("gzip");
    const decompressedStream = response.body.pipeThrough(ds);
    const text = await new Response(decompressedStream).text();

    const parsed = JSON.parse(text) as T[];
    if (!Array.isArray(parsed)) {
      console.error(
        `[loadDataset] Expected array from /data/${filename}, got ${typeof parsed}`,
      );
      return [];
    }
    return parsed;
  } catch (error) {
    console.error(`[loadDataset] Error loading /data/${filename}:`, error);
    return [];
  }
}
