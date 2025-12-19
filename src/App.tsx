import "./App.css";
import ToggleTheme from "./components/ToggleTheme";

function App() {
  return (
    <div className="bg-brand-snow-white font-rubik dark:bg-brand-mystic-navy min-h-full">
      <ToggleTheme />
    </div>
  );
}

export default App;
