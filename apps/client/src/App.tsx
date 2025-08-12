import "./App.css";

function App() {
  return (
    <div>
      <button
        onClick={() =>
          fetch("/api")
            .then((res) => res.json())
            .then((data) => console.log(data))
        }
      >
        Click me
      </button>
    </div>
  );
}

export default App;
