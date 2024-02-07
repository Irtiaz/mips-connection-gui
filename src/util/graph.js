import connectionString from './connectionString';

export function getGraphFromConnectionString() {
  const graph = {};

  const lines = connectionString.split('\n');
  for (const line of lines) {
    const [component1, pin1, component2, pin2] = line.split(' ');

    if (!graph[component1]) graph[component1] = {};
    if (!graph[component2]) graph[component2] = {};
    if (!graph[component1][pin1]) graph[component1][pin1] = [];
    if (!graph[component2][pin2]) graph[component2][pin2] = [];

    graph[component1][pin1].push({ component: component2, pin: pin2 });
    graph[component2][pin2].push({ component: component1, pin: pin1 });
  }

  return graph;
}

export function getConnectionsFrom(graph, component, pin) {
  const visited = {};
  for (let component in graph) {
    if (!visited[component]) visited[component] = [];
    for (let pin in graph[component]) {
      visited[component][pin] = false;
    }
  }
  return getConnectionsFromRecursive(graph, component, pin, visited);
}

function getConnectionsFromRecursive(graph, component, pin, visited) {
  visited[component][pin] = true;
  const neighbors = graph[component][pin];

  let connectedPins = [];
  for (const neighbor of neighbors) {
    if (!visited[neighbor.component][neighbor.pin]) {
      connectedPins.push(neighbor);
      connectedPins = connectedPins.concat(
        getConnectionsFromRecursive(
          graph,
          neighbor.component,
          neighbor.pin,
          visited
        )
      );
    }
  }

  return connectedPins;
}
