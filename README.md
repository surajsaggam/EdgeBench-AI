# EdgeBench AI Diagnostics 🚀

EdgeBench AI is a comprehensive diagnostic and benchmarking platform designed to test, analyze, and optimize AI models for deployment on edge hardware. 

Deploying Machine Learning models to edge devices (like smartphones, IoT hardware, and embedded systems) is notoriously difficult due to hardware fragmentation. Developers often struggle to predict whether a specific model will leverage a device's dedicated Neural Processing Unit (NPU), fall back to the GPU, or worse, execute entirely on the host CPU, causing massive battery drain and thermal throttling.

EdgeBench AI solves this by simulating the edge inference pipeline in the browser. It ingests a model, runs real-time telemetry across different simulated hardware backends, computes a unified performance score, and generates the exact integration code needed to run the model optimally on the target device.

## 🎯 What it Does

1. **Model Ingestion**: Accepts `.tflite` (TensorFlow Lite) or `.onnx` (Open Neural Network Exchange) model files via a drag-and-drop interface. 
2. **Live Benchmarking**: Simulates hardware execution by running a 10-pass warm-up followed by a 30-pass measured execution phase. It maps these passes to actual browser APIs to get real timing:
   - **Host CPU** workloads are simulated using WebAssembly (WASM).
   - **Integrated GPU** workloads are executed via WebGL tensor operations.
   - **NPU Co-processor** metrics are projected dynamically since browsers cannot directly access native Neural Processing Units.
3. **Diagnostic Analysis**: Calculates a **Device Fit Score (DFS)** based on latency, thermal limits, hardware compatibility, jitter, and memory footprint. It also detects "Operator Fallbacks" (e.g., if a specific Convolutional layer is unsupported by the NPU and falls back to CPU).
4. **Code Generation**: Once the optimal hardware target is identified, it generates ready-to-copy, production-grade Kotlin delegate code for immediate use in Android/Edge application codebases.

## ⚙️ How it Works

The application operates on a 4-step pipeline mapping directly to the application routes:

1. **`/` (Upload)**: A React `Context` is initialized. When a file is dropped, the File API reads the file metadata, registers the `selectedModelName` in the global context, and routes the user to the benchmarking suite.
2. **`/benchmark` (Live Telemetry)**: The application leverages `@tensorflow/tfjs` and `onnxruntime-web` to execute real math operations. It calculates average latency, updates the UI at 60fps using CSS SVG dash-offsets, and pushes the finalized metrics object to the global Context.
3. **`/results` (Analysis)**: The pipeline reads the completed metrics from the Context and runs the scoring heuristic: `DFS = 0.35*Latency + 0.25*Thermal + 0.20*Compatibility + 0.12*Jitter + 0.08*Memory`. The user explores detailed throughput and power estimations via expandable glass-panel UI cards.
4. **`/code` (Output)**: The system extracts the top-scoring backend and dynamically injects the model name, accelerator class, and precision constraints into a pre-formatted Kotlin template. A graceful fallback clipboard API (`document.execCommand`) ensures the user can copy the code even over unsecure local network IP connections.

## 🎨 Design & UI/UX

The design of EdgeBench AI is heavily inspired by modern developer tools and cyberpunk aesthetics, focusing on a "dark mode by default" premium experience.

- **Theme**: "Zenith Command" dark mode aesthetic, utilizing deep navy blues, purples, and vibrant neon accents.
- **Glassmorphism**: Heavy use of `backdrop-blur` and translucent borders to create depth between the data panels and the underlying geometric circuit grid background.
- **Typography**: 
  - `Geist Sans` for clean, highly readable application chrome and headers.
  - `JetBrains Mono` for all tabular data, telemetry readouts, and code blocks to emphasize the technical, terminal-like nature of the tool.
- **Micro-animations**: SVGs are heavily animated using Tailwind `animate-spin`, `animate-pulse`, and CSS transitions to make the telemetry feel "alive" during the benchmarking phase. 

## 🛠️ Tech Stack

EdgeBench AI is built using a modern, fully typed frontend stack:

* **Framework**: [Next.js 14](https://nextjs.org/) (React framework using the App Router for fast, client-side navigation).
* **Language**: [TypeScript](https://www.typescriptlang.org/) for robust typing of the benchmarking states and metrics.
* **Styling**: [Tailwind CSS](https://tailwindcss.com/) with a highly customized `tailwind.config.ts` implementing the specific design tokens (colors, spacing, typography).
* **State Management**: React Context API (`BenchmarkContext.tsx`) for a lightweight, prop-drilling-free way to pass benchmark data across routes.
* **ML Inference Simulation**: 
  * [`@tensorflow/tfjs`](https://www.tensorflow.org/js) (WebGL backend) to simulate GPU tensor operations.
  * [`onnxruntime-web`](https://onnxruntime.ai/docs/api/js/index.html) (WASM execution context) to simulate host CPU workloads.
* **Icons**: Google Material Symbols Outlined.

## 🚀 Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the Next.js development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000` (or your local IP `http://x.x.x.x:3000`) in your browser to view the application.

## ☁️ Deployment

The project contains a `vercel.json` configuration file, making it ready for one-click, zero-config deployment to [Vercel](https://vercel.com). Simply connect the repository to a Vercel project and it will automatically detect the Next.js framework, build the production bundle, and serve it via their edge network.
