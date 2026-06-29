import json
from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# FIXED: Enable CORS so the React frontend can actually talk to this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

# FIXED: Changed to @app.post since we are submitting data
@app.post('/pipelines/parse')
def parse_pipeline(pipeline: str = Form(...)):
    # 1. Parse the incoming JSON string into a Python dictionary
    try:
        pipeline_data = json.loads(pipeline)
    except json.JSONDecodeError:
        return {"error": "Invalid JSON format"}
        
    # Extract nodes and edges. Default to empty lists if they don't exist.
    nodes = pipeline_data.get('nodes', [])
    edges = pipeline_data.get('edges', [])
    
    num_nodes = len(nodes)
    num_edges = len(edges)
    
    # 2. Build an Adjacency List for the Graph
    # This maps every node to a list of nodes it directly points to.
    adjacency_list = {node['id']: [] for node in nodes}
    for edge in edges:
        source = edge.get('source')
        target = edge.get('target')
        if source in adjacency_list:
            adjacency_list[source].append(target)
            
    # 3. Directed Acyclic Graph (DAG) Validation Algorithm
    # We use a Depth-First Search (DFS) with 3 states:
    # 0 = Unvisited
    # 1 = Visiting (Currently in our path)
    # 2 = Visited (Fully explored, safe)
    visit_state = {node['id']: 0 for node in nodes}
    
    def has_cycle(node_id):
        if visit_state[node_id] == 1:
            return True # Cycle detected: We looped back to a node currently in our path
        if visit_state[node_id] == 2:
            return False # Node is already verified as safe
            
        # Mark current node as 'Visiting'
        visit_state[node_id] = 1
        
        # Recursively check all connected downstream nodes
        for neighbor in adjacency_list.get(node_id, []):
            if has_cycle(neighbor):
                return True
                
        # Mark node as fully 'Visited' and safe
        visit_state[node_id] = 2
        return False

    # 4. Execute the Cycle Check
    is_dag = True
    for node in nodes:
        if visit_state[node['id']] == 0:
            if has_cycle(node['id']):
                is_dag = False
                break # If even one cycle is found, it's not a DAG. Stop checking.

    # 5. Return the exact JSON structure VectorShift requested
    return {
        'num_nodes': num_nodes, 
        'num_edges': num_edges, 
        'is_dag': is_dag
    }
