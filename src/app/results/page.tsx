"use client";

import { computeDFS } from "@/lib/scoring";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ResultsPage() {
  const router = useRouter();
  
  // Simulate fetching data from the benchmark run
  // In a real app this would be in Context or Zustand
  const [metrics, setMetrics] = useState({
    npu: { latency: 28.7, jitter: 1.2 },
    gpu: { latency: 14.2, jitter: 2.1 },
    cpu: { latency: 34.5, jitter: 4.5 },
  });

  const [openDetail, setOpenDetail] = useState<string | null>("npu");
  
  // Compute best DFS
  const npuDFS = computeDFS(metrics.npu);
  const gpuDFS = computeDFS(metrics.gpu);
  const cpuDFS = computeDFS(metrics.cpu);
  
  const bestDFS = Math.max(npuDFS, gpuDFS, cpuDFS);
  
  const getDashOffset = (score: number) => {
    return 283 - (283 * score) / 100;
  };

  return (
    <div className="flex-grow max-w-container-max mx-auto w-full z-10 relative flex flex-col gap-xl">
      <section className="flex flex-col items-center justify-center pt-lg pb-md">
        <div className="relative w-72 h-72 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" fill="none" r="45" stroke="rgba(255,255,255,0.05)" strokeDasharray="283" strokeDashoffset="0" strokeWidth="4"></circle>
            <circle 
              className="transition-all duration-1000 ease-out" 
              cx="50" cy="50" fill="none" r="45" stroke="url(#score-gradient)" 
              strokeDasharray="283" strokeDashoffset={getDashOffset(bestDFS)} 
              strokeLinecap="round" strokeWidth="4"
            ></circle>
            <defs>
              <linearGradient id="score-gradient" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop offset="0%" stopColor="#adc6ff"></stop>
                <stop offset="100%" stopColor="#d0bcff"></stop>
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="font-mono text-xs text-on-surface-variant uppercase tracking-widest mb-unit opacity-80">Device Fit Score</span>
            <span className="text-[48px] bg-primary-gradient bg-clip-text text-transparent font-bold tabular-nums">
              {bestDFS}
            </span>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-md">
        {/* NPU */}
        <details className="glass-card p-0 group" open={openDetail === "npu"} onClick={(e) => { e.preventDefault(); setOpenDetail("npu"); }}>
          <summary className="cursor-pointer p-md border-b border-white/5 flex items-center justify-between hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-sm">
              <span className="material-symbols-outlined text-primary">memory</span>
              <span className="text-lg font-semibold">NPU Co-processor</span>
            </div>
            <div className="flex items-center gap-sm">
              <span className="font-mono text-xs px-2 py-1 rounded bg-secondary/20 text-secondary border border-secondary/20 uppercase">Primary</span>
              <span className="material-symbols-outlined text-on-surface-variant opacity-60 group-open:rotate-180 transition-transform">expand_more</span>
            </div>
          </summary>
          {openDetail === "npu" && (
            <div className="p-md flex flex-col gap-sm animate-in slide-in-from-top-2 duration-300">
              <div className="flex justify-between items-center py-xs border-b border-white/5">
                <span className="font-mono text-sm text-on-surface-variant">Throughput</span>
                <span className="font-mono text-sm text-on-surface">{(1000 / metrics.npu.latency).toFixed(1)} FPS</span>
              </div>
              <div className="flex justify-between items-center py-xs border-b border-white/5">
                <span className="font-mono text-sm text-on-surface-variant">Latency (p99)</span>
                <span className="font-mono text-sm text-on-surface">{metrics.npu.latency} ms</span>
              </div>
              <div className="flex justify-between items-center py-xs border-b border-white/5">
                <span className="font-mono text-sm text-on-surface-variant">Power Draw</span>
                <span className="font-mono text-sm text-on-surface">2.1 W</span>
              </div>
              <div className="flex justify-between items-center py-xs border-b border-white/5">
                <span className="font-mono text-sm text-on-surface-variant">Jitter</span>
                <span className="font-mono text-sm text-on-surface">{metrics.npu.jitter} ms</span>
              </div>
              <div className="flex justify-between items-center py-xs">
                <span className="font-mono text-sm text-on-surface-variant">Precision</span>
                <span className="font-mono text-sm text-on-surface">INT8 Quantized</span>
              </div>
            </div>
          )}
        </details>

        {/* GPU */}
        <details className="glass-card p-0 group" open={openDetail === "gpu"} onClick={(e) => { e.preventDefault(); setOpenDetail("gpu"); }}>
          <summary className="cursor-pointer p-md border-b border-white/5 flex items-center justify-between hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-sm">
              <span className="material-symbols-outlined text-on-surface">developer_board</span>
              <span className="text-lg font-semibold">Integrated GPU</span>
            </div>
            <div className="flex items-center gap-sm">
              <span className="font-mono text-xs px-2 py-1 rounded bg-surface-bright text-on-surface border border-white/10 uppercase">Standby</span>
              <span className="material-symbols-outlined text-on-surface-variant opacity-60 group-open:rotate-180 transition-transform">expand_more</span>
            </div>
          </summary>
          {openDetail === "gpu" && (
            <div className="p-md flex flex-col gap-sm animate-in slide-in-from-top-2 duration-300">
              <div className="flex justify-between items-center py-xs border-b border-white/5">
                <span className="font-mono text-sm text-on-surface-variant">Throughput</span>
                <span className="font-mono text-sm text-on-surface">{(1000 / metrics.gpu.latency).toFixed(1)} FPS</span>
              </div>
              <div className="flex justify-between items-center py-xs border-b border-white/5">
                <span className="font-mono text-sm text-on-surface-variant">Latency (p99)</span>
                <span className="font-mono text-sm text-on-surface">{metrics.gpu.latency} ms</span>
              </div>
              <div className="flex justify-between items-center py-xs border-b border-white/5">
                <span className="font-mono text-sm text-on-surface-variant">Jitter</span>
                <span className="font-mono text-sm text-on-surface">{metrics.gpu.jitter} ms</span>
              </div>
              <div className="flex justify-between items-center py-xs">
                <span className="font-mono text-sm text-on-surface-variant">Precision</span>
                <span className="font-mono text-sm text-on-surface">FP16</span>
              </div>
            </div>
          )}
        </details>

        {/* CPU */}
        <details className="glass-card p-0 group" open={openDetail === "cpu"} onClick={(e) => { e.preventDefault(); setOpenDetail("cpu"); }}>
          <summary className="cursor-pointer p-md border-b border-white/5 flex items-center justify-between hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-sm">
              <span className="material-symbols-outlined text-on-surface">developer_mode</span>
              <span className="text-lg font-semibold">Host CPU</span>
            </div>
            <div className="flex items-center gap-sm">
              <span className="font-mono text-xs px-2 py-1 rounded bg-error-container/30 text-error border border-error/20 uppercase">Fallback</span>
              <span className="material-symbols-outlined text-on-surface-variant opacity-60 group-open:rotate-180 transition-transform">expand_more</span>
            </div>
          </summary>
          {openDetail === "cpu" && (
            <div className="p-md flex flex-col gap-sm animate-in slide-in-from-top-2 duration-300">
              <div className="flex justify-between items-center py-xs border-b border-white/5">
                <span className="font-mono text-sm text-on-surface-variant">Active Threads</span>
                <span className="font-mono text-sm text-on-surface">4 / 8</span>
              </div>
              <div className="flex justify-between items-center py-xs border-b border-white/5">
                <span className="font-mono text-sm text-on-surface-variant">Usage</span>
                <span className="font-mono text-sm text-on-surface">12%</span>
              </div>
              <div className="flex justify-between items-center py-xs border-b border-white/5">
                <span className="font-mono text-sm text-on-surface-variant">Latency (p99)</span>
                <span className="font-mono text-sm text-on-surface">{metrics.cpu.latency} ms</span>
              </div>
              <div className="flex justify-between items-center py-xs">
                <span className="font-mono text-sm text-on-surface-variant">Fallback OPs</span>
                <span className="font-mono text-sm text-error">1 Detected</span>
              </div>
            </div>
          )}
        </details>
      </section>

      {/* Operator Fallback Alert */}
      <section className="mt-auto pt-lg">
        <div className="bg-error-container/10 border border-error/30 backdrop-blur-xl rounded-xl p-md flex gap-md items-start shadow-[inset_0_0_20px_rgba(147,0,10,0.2)]">
          <span className="material-symbols-outlined text-error mt-unit" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
          <div className="flex flex-col gap-xs">
            <span className="text-lg font-semibold text-error">Operator Fallback Detected</span>
            <span className="font-mono text-sm text-on-surface-variant">
              Conv2D layer fell back to CPU. This indicates missing hardware support for the specific kernel configuration (stride=3) on the target NPU.
            </span>
          </div>
        </div>
      </section>
      
      <div className="flex justify-center mt-lg pb-xl">
        <button 
          onClick={() => router.push("/code")}
          className="px-lg py-sm rounded-lg bg-primary text-on-primary hover:opacity-90 transition-opacity font-mono text-sm font-bold shadow-glow">
          GENERATE DELEGATE CODE
        </button>
      </div>
    </div>
  );
}
