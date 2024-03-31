import { MantineProvider } from "@mantine/core";
import "./App.css";
import "@mantine/core/styles.css";
import { Router } from "./Router";

function App() {
  return (
    <MantineProvider>
      <Router />
    </MantineProvider>
  );
}

export default App;
