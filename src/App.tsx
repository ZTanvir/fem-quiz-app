import "./App.css";
import ToggleTheme from "./components/ToggleTheme";
import Homepage from "./pages/Homepage/HomePage";

function App() {
  return (
    <div className="bg-brand-snow-white font-rubik dark:bg-brand-mystic-navy min-h-screen bg-[url(/src/assets/images/pattern-background-mobile-light.svg)] bg-contain bg-no-repeat sm:bg-[url(/src/assets/images/pattern-background-tablet-light.svg)] sm:bg-contain md:bg-[url(/src/assets/images/pattern-background-desktop-light.svg)] md:bg-cover dark:bg-[url(/src/assets/images/pattern-background-mobile-dark.svg)] sm:dark:bg-[url(/src/assets/images/pattern-background-tablet-dark.svg)] md:dark:bg-[url(/src/assets/images/pattern-background-desktop-dark.svg)]">
      <div className="mx-auto max-w-7xl">
        <ToggleTheme />
        <Homepage />
      </div>
    </div>
  );
}

export default App;
