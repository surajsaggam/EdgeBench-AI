"use client";

import { useState } from "react";

export default function CodeOutputPage() {
  const [showToast, setShowToast] = useState(false);

  // In a real app this would be derived from the highest scored DFS backend
  const bestBackend = "NPU";
  const acceleratorClass = bestBackend === "NPU" ? "NPUAccelerator" : "GPUAccelerator";
  const precision = bestBackend === "NPU" ? "INT8 Quantized" : "FP16";
  const targetName = bestBackend === "NPU" ? "ARM Mali-G710 MC10" : "Integrated GPU";

  const generatedCode = `
package com.edgebench.ai.runtime

import com.edgebench.core.ModelConfig
import com.edgebench.hardware.${acceleratorClass}

/**
 * Auto-generated model initialization block.
 * Target: ${targetName}
 * Precision: ${precision}
 */
class EdgeBenchInitializer {

    private val modelId = "eb-01-vision-core"
    
    fun initializeEngine() {
        val config = ModelConfig.Builder()
            .setModelPath("assets/models/\${modelId}.tflite")
            .setAccelerator(${acceleratorClass}.getDefault())
            .setQuantization(${bestBackend === "NPU" ? "true" : "false"})
            .setThreadCount(4)
            .build()

        // Allocate tensor memory ahead of time to prevent GC thrashing during inference
        try {
            val engine = InferenceEngine.create(config)
            engine.warmup(iterations = 10)
            Logger.i("EdgeBench", "Model loaded and warmed up successfully in \${engine.initTimeMs}ms")
        } catch (e: Exception) {
            Logger.e("EdgeBench", "Failed to initialize neural engine: \${e.message}")
        }
    }
}
`.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="flex-1 w-full max-w-container-max mx-auto relative flex flex-col gap-lg mt-lg">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-md mb-md">
        <div>
          <h2 className="text-3xl font-bold text-on-surface mb-unit">Generated Code Output</h2>
          <p className="text-base text-on-surface-variant max-w-2xl">
            Optimized Kotlin implementation for deploying EdgeBench-01 on target hardware architecture. Includes necessary quantization and memory management flags.
          </p>
        </div>
        <button
          onClick={handleCopy}
          className="hidden md:flex items-center gap-sm bg-primary-gradient text-white px-lg py-sm rounded-lg font-semibold transition-all hover:scale-[1.02] border border-white/20 shadow-glow"
        >
          <span className="material-symbols-outlined text-[18px]">content_copy</span>
          Copy Configuration
        </button>
      </div>

      <div className="bg-surface-container/80 backdrop-blur-xl border border-t-white/10 border-x-white/5 border-b-white/5 rounded-xl shadow-2xl overflow-hidden flex flex-col relative z-10 bg-gradient-to-br from-primary-container/10 to-secondary-container/5">
        <div className="flex items-center justify-between px-md py-sm bg-surface-container-lowest/50 border-b border-white/5">
          <div className="flex items-center gap-sm">
            <span className="material-symbols-outlined text-outline text-[16px]">integration_instructions</span>
            <span className="font-mono text-sm text-on-surface-variant">EdgeBenchInitializer.kt</span>
          </div>
          <div className="flex gap-xs">
            <div className="w-3 h-3 rounded-full bg-outline-variant/30 border border-white/10"></div>
            <div className="w-3 h-3 rounded-full bg-outline-variant/30 border border-white/10"></div>
            <div className="w-3 h-3 rounded-full bg-outline-variant/30 border border-white/10"></div>
          </div>
        </div>

        <div className="p-md md:p-lg overflow-x-auto">
          <pre className="font-mono text-sm leading-relaxed text-on-surface">
            <code>
              <span className="text-secondary">package</span> com.edgebench.ai.runtime{"\n\n"}
              <span className="text-secondary">import</span> com.edgebench.core.ModelConfig{"\n"}
              <span className="text-secondary">import</span> com.edgebench.hardware.{acceleratorClass}{"\n\n"}
              <span className="text-outline">
                {`/**\n * Auto-generated model initialization block.\n * Target: ${targetName}\n * Precision: ${precision}\n */`}
              </span>{"\n"}
              <span className="text-secondary">class</span> <span className="text-primary">EdgeBenchInitializer</span> {"{\n\n"}
              {"    "}<span className="text-secondary">private val</span> modelId <span className="text-on-surface-variant">=</span> <span className="text-tertiary">"eb-01-vision-core"</span>{"\n    \n"}
              {"    "}<span className="text-secondary">fun</span> <span className="text-primary">initializeEngine</span>() {"{\n"}
              {"        "}<span className="text-secondary">val</span> config <span className="text-on-surface-variant">=</span> ModelConfig.<span className="text-primary">Builder</span>(){"\n"}
              {"            "}.<span className="text-primary">setModelPath</span>(<span className="text-tertiary">"assets/models/\${modelId}.tflite"</span>){"\n"}
              {"            "}.<span className="text-primary">setAccelerator</span>({acceleratorClass}.<span className="text-primary">getDefault</span>()){"\n"}
              {"            "}.<span className="text-primary">setQuantization</span>(<span className="text-secondary">{bestBackend === "NPU" ? "true" : "false"}</span>){"\n"}
              {"            "}.<span className="text-primary">setThreadCount</span>(<span className="text-tertiary">4</span>){"\n"}
              {"            "}.<span className="text-primary">build</span>(){"\n\n"}
              {"        "}<span className="text-outline">// Allocate tensor memory ahead of time to prevent GC thrashing during inference</span>{"\n"}
              {"        "}<span className="text-secondary">try</span> {"{\n"}
              {"            "}<span className="text-secondary">val</span> engine <span className="text-on-surface-variant">=</span> InferenceEngine.<span className="text-primary">create</span>(config){"\n"}
              {"            "}engine.<span className="text-primary">warmup</span>(iterations <span className="text-on-surface-variant">=</span> <span className="text-tertiary">10</span>){"\n"}
              {"            "}Logger.<span className="text-primary">i</span>(<span className="text-tertiary">"EdgeBench"</span>, <span className="text-tertiary">"Model loaded and warmed up successfully in \${engine.initTimeMs}ms"</span>){"\n"}
              {"        "} {"}"} <span className="text-secondary">catch</span> (e: Exception) {"{\n"}
              {"            "}Logger.<span className="text-primary">e</span>(<span className="text-tertiary">"EdgeBench"</span>, <span className="text-tertiary">"Failed to initialize neural engine: \${e.message}"</span>){"\n"}
              {"        "} {"}\n    }\n}"}
            </code>
          </pre>
        </div>

        <div className="md:hidden p-md border-t border-white/5 bg-surface-container-lowest/30 flex justify-end">
          <button
            onClick={handleCopy}
            className="flex items-center gap-sm bg-primary-gradient text-white px-md py-sm rounded-lg font-semibold transition-all active:scale-95 border border-white/20 shadow-glow"
          >
            <span className="material-symbols-outlined text-[18px]">content_copy</span>
            Copy
          </button>
        </div>
      </div>

      <div
        className={`fixed bottom-[100px] md:bottom-lg left-1/2 transform -translate-x-1/2 bg-inverse-on-surface text-inverse-surface px-lg py-sm rounded-full shadow-2xl flex items-center gap-sm text-base font-semibold border border-white/10 transition-all duration-300 pointer-events-none z-[70] ${
          showToast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <span className="material-symbols-outlined text-primary">check_circle</span>
        Code Copied to Clipboard
      </div>
    </div>
  );
}
