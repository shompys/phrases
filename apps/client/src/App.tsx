import { Presentational } from "./components/Presentational";
import { QueryClientProvider } from "./lib/QueryClientProvider";

function App() {
  return (
    <QueryClientProvider>
      <Presentational />
    </QueryClientProvider>
  );
}

export default App;
