"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type BenchmarkStatus = "idle" | "running" | "complete";

export interface BenchmarkMetrics {
  npu: { latency: number; jitter: number };
  gpu: { latency: number; jitter: number };
  cpu: { latency: number; jitter: number };
}

interface BenchmarkContextType {
  selectedModelName: string | null;
  setSelectedModelName: (name: string | null) => void;
  benchmarkStatus: BenchmarkStatus;
  setBenchmarkStatus: (status: BenchmarkStatus) => void;
  benchmarkMetrics: BenchmarkMetrics | null;
  setBenchmarkMetrics: (metrics: BenchmarkMetrics | null) => void;
}

const BenchmarkContext = createContext<BenchmarkContextType | undefined>(undefined);

export function BenchmarkProvider({ children }: { children: ReactNode }) {
  const [selectedModelName, setSelectedModelName] = useState<string | null>(null);
  const [benchmarkStatus, setBenchmarkStatus] = useState<BenchmarkStatus>("idle");
  const [benchmarkMetrics, setBenchmarkMetrics] = useState<BenchmarkMetrics | null>(null);

  return (
    <BenchmarkContext.Provider
      value={{
        selectedModelName,
        setSelectedModelName,
        benchmarkStatus,
        setBenchmarkStatus,
        benchmarkMetrics,
        setBenchmarkMetrics,
      }}
    >
      {children}
    </BenchmarkContext.Provider>
  );
}

export function useBenchmark() {
  const context = useContext(BenchmarkContext);
  if (context === undefined) {
    throw new Error("useBenchmark must be used within a BenchmarkProvider");
  }
  return context;
}
