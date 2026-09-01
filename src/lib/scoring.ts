export interface ScoringMetrics {
  latency: number;
  jitter: number;
  // Placeholders that would normally come from hardware sensors or model introspection
  thermal?: number;
  compatibility?: number;
  memory?: number;
}

/**
 * Computes the Device Fit Score (DFS) for a given backend's metrics.
 * DFS = 0.35*Latency + 0.25*Thermal + 0.20*Compatibility + 0.12*Jitter + 0.08*Memory
 * 
 * We normalize these to a 0-100 scale where 100 is best.
 * For Latency and Jitter: lower is better. We'll invert them using a reasonable baseline (e.g., 100ms max = 0 score).
 */
export function computeDFS(metrics: ScoringMetrics): number {
  // Normalize latency: assume 100ms is score 0, 0ms is score 100
  const normLatency = Math.max(0, 100 - metrics.latency);
  
  // Normalize jitter: assume 20ms is score 0, 0ms is score 100
  const normJitter = Math.max(0, 100 - (metrics.jitter * 5));

  // Placeholder logic for missing metrics
  const normThermal = metrics.thermal ?? 85; // Solid thermal profile
  const normCompatibility = metrics.compatibility ?? 90; // High compatibility by default
  const normMemory = metrics.memory ?? 80; // Good memory usage

  const dfs = (
    0.35 * normLatency +
    0.25 * normThermal +
    0.20 * normCompatibility +
    0.12 * normJitter +
    0.08 * normMemory
  );

  return Math.min(100, Math.max(0, Math.round(dfs)));
}
