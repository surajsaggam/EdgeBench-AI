"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useBenchmark } from "@/context/BenchmarkContext";

export default function ModelUploadPage() {
  const [isDragging, setIsDragging] = useState(false);
  const router = useRouter();
  const { setSelectedModelName, setBenchmarkStatus } = useBenchmark();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleFile = (file: File) => {
    setSelectedModelName(file.name);
    setBenchmarkStatus("idle");
    router.push("/benchmark");
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [router, setSelectedModelName, setBenchmarkStatus]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-lg mt-xl">
      <section className="glass-card p-md flex flex-col gap-md">
        <div className="flex justify-between items-center pb-sm border-b border-white/5">
          <h2 className="text-2xl font-semibold text-on-surface flex items-center gap-sm">
            <span className="material-symbols-outlined text-primary">data_object</span>
            Model Ingestion
          </h2>
          <span className="px-sm py-xs rounded bg-surface-container-high text-outline font-mono text-xs border border-white/5">
            READY
          </span>
        </div>

        <div
          className={`upload-zone border-2 border-dashed rounded-lg p-xl flex flex-col items-center justify-center min-h-[300px] cursor-pointer relative overflow-hidden group transition-all duration-300 ${
            isDragging
              ? "border-primary bg-primary-container/5 shadow-[inset_0_0_20px_rgba(173,198,255,0.1)]"
              : "border-outline-variant"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept=".tflite,.onnx" 
            onChange={handleFileInput} 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-container/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <span
            className="material-symbols-outlined text-[64px] text-primary mb-md upload-icon"
            style={{ fontVariationSettings: "'FILL' 0, 'wght' 200" }}
          >
            cloud_upload
          </span>
          <h3 className="text-lg font-semibold text-on-surface mb-xs">
            Drop .tflite or .onnx models here
          </h3>
          <p className="text-sm text-on-surface-variant text-center max-w-sm mb-lg">
            Files will be automatically parsed and queued for edge hardware compilation. Or click to browse.
          </p>
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            className="px-lg py-sm rounded-lg bg-primary-gradient text-white font-mono text-sm hover:shadow-glow transition-all">
            BROWSE FILES
          </button>
        </div>
      </section>

      <section className="glass-card p-md flex flex-col gap-sm">
        <h3 className="font-mono text-xs text-outline uppercase tracking-widest pb-xs border-b border-white/5 mb-sm">
          Recent Models
        </h3>
        <div className="flex flex-col gap-unit">
          <div className="flex items-center justify-between p-sm rounded bg-surface-container-high/50 border border-transparent hover:border-white/5 hover:bg-surface-container-high transition-colors group">
            <div className="flex items-center gap-md">
              <div className="w-10 h-10 rounded flex items-center justify-center bg-surface-container-lowest border border-white/10">
                <span className="material-symbols-outlined text-secondary">description</span>
              </div>
              <div>
                <p className="font-mono text-sm text-on-surface">resnet_v2.tflite</p>
                <div className="flex items-center gap-sm mt-xs">
                  <span className="font-mono text-xs text-on-surface-variant opacity-60">24.5 MB</span>
                  <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                  <span className="font-mono text-xs text-[#86efac] bg-[#064e3b]/50 px-unit py-[2px] rounded border border-[#064e3b]">
                    COMPILED
                  </span>
                </div>
              </div>
            </div>
            <button className="opacity-0 group-hover:opacity-100 text-outline hover:text-primary p-unit rounded transition-all">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>

          <div className="flex items-center justify-between p-sm rounded bg-surface-container-high/50 border border-transparent hover:border-white/5 hover:bg-surface-container-high transition-colors group">
            <div className="flex items-center gap-md">
              <div className="w-10 h-10 rounded flex items-center justify-center bg-surface-container-lowest border border-white/10">
                <span className="material-symbols-outlined text-secondary">description</span>
              </div>
              <div>
                <p className="font-mono text-sm text-on-surface">mobilenet_ssd.onnx</p>
                <div className="flex items-center gap-sm mt-xs">
                  <span className="font-mono text-xs text-on-surface-variant opacity-60">18.2 MB</span>
                  <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                  <span className="font-mono text-xs text-[#93c5fd] bg-[#1e3a8a]/50 px-unit py-[2px] rounded border border-[#1e3a8a]">
                    QUEUED
                  </span>
                </div>
              </div>
            </div>
            <button className="opacity-0 group-hover:opacity-100 text-outline hover:text-primary p-unit rounded transition-all">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
