import { createRoot } from "react-dom/client";
import AlbumsOverview from "./components/AlbumsOverview";

const App = () => {
  return <AlbumsOverview />;
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
