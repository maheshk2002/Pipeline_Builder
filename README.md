# ⚡ VectorShift Pipeline Builder

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![Zustand](https://img.shields.io/badge/Zustand-4A3333?style=for-the-badge&logo=bear)

A production-ready, full-stack visual programming interface designed for constructing and executing complex data workflows, API integrations, and Large Language Model (LLM) pipelines. 

This application decouples the visual interface from the domain logic through a centralized theming engine and custom Node Registry. This architectural decision ensures the system can scale to hundreds of custom node types without layout fracturing or CSS conflicts.

---

## 🏗️ System Architecture

The application is split into two distinct, highly optimized environments:

### 1. Frontend Engine (React + Zustand + React Flow)
* **Zero Prop-Drilling:** Global canvas state is managed entirely via Zustand. This ensures sub-millisecond edge rendering and real-time graph validation without forcing the outer UI shell to re-render.
* **Dynamic DOM Manipulation:** The custom `Text Prompt` node features an internal Regex parser that actively calculates DOM scroll width and height. It auto-resizes the component and dynamically spawns connection magnets in real-time based on `{{variable}}` declarations, avoiding rigid CSS constraints.
* **Custom Interaction Layer:** Bypassed default React Flow mechanics to engineer a custom `PipelineEdge` component with wide hit-areas and a 120ms debounce for reliable, flicker-free connection deletion. Includes a custom SVG minimap that actively tracks and renders glowing connection paths.

### 2. Backend Engine (Python + FastAPI)
* **Mathematical Graph Validation:** The backend endpoint (`/pipelines/parse`) receives the serialized graph state and executes structural validation.
* **DAG Enforcement:** The API analyzes the node-edge payload for cyclical dependencies, ensuring the pipeline forms a valid Directed Acyclic Graph (DAG) before execution is permitted. It returns structured statistical data back to the frontend's toast notification system.

---

## 💡 Real-World Showcase: Concession Abuse Investigation

To demonstrate the extensibility of the custom node architecture, this system was built to handle complex, enterprise-level operations, such as automating investigations into e-commerce delivery fraud.

**The Example Workflow:**
1. **Ingestion & Cleaning:** Ingests raw delivery logs (`Input Node`) and deduplicates the records (`Data Filter Node`).
2. **Enrichment:** Fetches actual driver GPS telemetry for disputed orders (`API Request Node`).
3. **Dynamic Prompting:** Passes the structured data through the dynamically resizing Regex parser (`Text Prompt Node`). 
4. **AI Processing:** The `LLM Node` evaluates the telemetry against the customer claim to detect refund fraud probability.
5. **Branching & Routing:** High-risk anomaly clusters are routed to a visualization UI (`Dashboard Node`), while legitimate claims are routed to standard batch processing (`Output Node`) via branching logic (`Condition Node`).

---

## 💻 Local Installation & Setup

This project requires both the Python backend and React frontend to be running concurrently.

### 1. Start the Backend API
The backend requires FastAPI and must be hosted on `localhost:8000`.

```bash
cd backend
pip install fastapi uvicorn python-multipart
python -m uvicorn main:app --reload
```

### 2. Start the Frontend Client
Open a new terminal window to spin up the React application.

```bash
cd frontend
npm install
npm start
```
The application will automatically launch in your browser at `http://localhost:3000`.

---

## 🛠️ Technical Stack & Tooling

| Category | Technologies Used |
| :--- | :--- |
| **Core Frameworks** | React 18, Python 3.10+, FastAPI |
| **State Management** | Zustand (Global), React Hooks (Local) |
| **Canvas Engine** | React Flow (Customized nodes, edges, and SVG minimap) |
| **Styling** | Centralized CSS Modules, Custom Theming Engine |
| **Development** | Cursor IDE, Git |

---

## 👨‍💻 About the Author

**Mahesh Katula** *Data Analyst & Journalist | Navi Mumbai, India*

Engineered with a focus on solving complex logistical and operational challenges through clean, scalable system design.

* [LinkedIn Profile](https://www.linkedin.com/in/mahesh-katula-mk777/)
