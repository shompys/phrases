import { Presentational } from "./components/Presentational";
import { QueryClientProvider } from "./libs/QueryClientProvider";

function App() {
  return (
    <QueryClientProvider>
      <Presentational />
    </QueryClientProvider>
  );
}

export default App;
