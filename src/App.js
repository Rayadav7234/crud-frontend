import { BrowserRouter, Routes, Route } from "react-router-dom";
import Userform from "./components/Userform";
import Userdata from "./components/Userdata";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/adduser" element={<Userform />} />

            <Route path="/userlist" element={<Userdata />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
