import { Presentational } from "./components/Presentational";
import { CurrentPageProvider } from "./ContextProviders/CurrentPageProvider";
import { QueryClientProvider } from "./lib/QueryClientProvider";

function App() {
  return (
    <CurrentPageProvider>
      <QueryClientProvider>
        <Presentational />
      </QueryClientProvider>
    </CurrentPageProvider>
  );
}

export default App;
