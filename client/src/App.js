import { Route, BrowserRouter, Routes } from "react-router-dom";
import Landing from "./Pages/Landing";
import Overview from "./Pages/Overview";
import Credits from "./Pages/Credits";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Overview" element={<Overview />} />
          <Route path="/Credits" element={<Credits />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
