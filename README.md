# ⚡ VectorShift Pipeline Builder

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![Zustand](https://img.shields.io/badge/Zustand-4A3333?style=for-the-badge&logo=bear)

A production-ready, full-stack visual programming interface designed for constructing and executing complex data workflows, API integrations, and Large Language Model (LLM) pipelines. 

This application decouples the visual interface from the domain logic through a centralized theming engine and node registry, allowing the system to scale to hundreds of node types without layout fracturing.

## 🏗️ System Architecture

The application is split into two distinct, highly optimized environments:

### 1. Frontend (React + Zustand + React Flow)
* **Zero Prop-Drilling:** Global canvas state is managed entirely via Zustand, ensuring sub-millisecond edge rendering and real-time validation without re-rendering the outer component shell.
* **Dynamic DOM Manipulation:** The custom `Text Prompt` node features an internal Regex parser that actively calculates DOM scroll width and height. It auto-resizes the component and dynamically spawns connection magnets in real-time based on `{{variable}}` declarations, all without breaking CSS grid constraints.
* **Custom Interaction Layer:** Bypassed default React Flow mechanics to engineer a custom `PipelineEdge` component with wide hit-areas and a 120ms debounce for reliable, flicker-free connection deletion. Includes a custom-built SVG minimap that tracks glowing connection paths.

### 2. Backend (Python + FastAPI)
* **Graph Validation:** The backend endpoint (`/pipelines/parse`) receives the serialized graph state and executes mathematical validation.
* **DAG Enforcement:** It analyzes the payload for cyclical dependencies, ensuring the pipeline forms a valid Directed Acyclic Graph (DAG) before execution is permitted, returning structured statistical data to the frontend toast notification system.

---

## 💡 Real-World Use Case: Automated Concession Abuse Investigation

To demonstrate the extensibility of the custom node architecture, this system was engineered to handle complex operations like automated customer investigations. 

**The Workflow:**
1. **Ingestion & Cleaning:** The flow ingests raw delivery logs (`Input Node`) and deduplicates the records (`Data Filter Node`).
2. **Enrichment:** It fetches driver GPS telemetry for disputed orders (`API Request Node`).
3. **Dynamic Prompting:** The structured variables are passed through the dynamically resizing Regex parser (`Text Prompt Node`). 
4. **AI Processing:** The `LLM Node` evaluates the telemetry against the customer claim to detect refund fraud.
5. **Branching & Visualization:** High-risk clusters are routed to a visualization UI (`Dashboard Node`), while legitimate claims are routed to standard processing (`Output Node`) via branching logic (`Condition Node`).

---

## 💻 Local Installation & Setup

This project requires both the Python backend and React frontend to be running concurrently.

### Start the Backend API
The backend runs on FastAPI and must be hosted on `localhost:8000`.

```bash
cd backend
pip install fastapi uvicorn python-multipart
python -m uvicorn main:app --reload
