import { getConnectionsFrom, getGraphFromConnectionString } from './util/graph';
import { useState } from 'react';

const graph = getGraphFromConnectionString();
console.log(graph);
console.log(getConnectionsFrom(graph, 'ADDER_0', '7'));

function App() {
  const [currentComponent, setCurrentComponent] = useState(
    Object.keys(graph)[0]
  );

  return (
    <div>
      <select
        value={currentComponent}
        onChange={(e) => setCurrentComponent(e.target.value)}
      >
        {Object.keys(graph).map((component) => (
          <option key={component}>{component}</option>
        ))}
      </select>

      <ul>
        {Object.keys(graph[currentComponent]).map((pin) => (
          <li key={`${currentComponent} ${pin}`}>
            <div>pin {pin}</div>
            <div>
              <ul>
                {getConnectionsFrom(graph, currentComponent, pin).map(
                  (connection) => (
                    <li
                      key={`${currentComponent} ${pin} ${connection.component} ${connection.pin}`}
                    >
                      {connection.component} pin {connection.pin}
                    </li>
                  )
                )}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
