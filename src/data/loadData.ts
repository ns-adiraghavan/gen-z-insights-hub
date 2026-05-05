import pako from "pako";

/**
 * Loads a JSON array from /data/{filename}.
 *
 * Files are stored as .json.gz, but some hosts (including the dev server)
 * transparently decompress gzip responses. We handle both cases:
 *   1. Try to parse the body as plain JSON text first.
 *   2. If that fails, treat the body as raw gzip bytes and inflate with pako.
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
    const bytes = new Uint8Array(buffer);

    let parsed: unknown;

    // gzip magic number: 0x1f 0x8b
    const isGzip = bytes.length >= 2 && bytes[0] === 0x1f && bytes[1] === 0x8b;

    if (isGzip) {
      const text = pako.ungzip(bytes, { to: "string" });
      parsed = JSON.parse(text);
    } else {
      const text = new TextDecoder().decode(bytes);
      parsed = JSON.parse(text);
    }

    if (!Array.isArray(parsed)) {
      console.error(
        `[loadDataset] Expected array from /data/${filename}, got ${typeof parsed}`,
      );
      return [];
    }

    console.log(`[loadDataset] ${filename}: ${parsed.length} records`);
    return parsed as T[];
  } catch (error) {
    console.error(`[loadDataset] Error loading /data/${filename}:`, error);
    return [];
  }
}
