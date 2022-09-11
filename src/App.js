import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Inicio from "./components/common/Inicio";
import AdminPage from "./components/pages/AdminPanel/AdminPage";
import PrivateRoute from "./components/common/PrivateRoute";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route>
            <Route exact path="/*" index element={<Inicio></Inicio>}></Route>
          </Route>
          <Route>
            <Route
              path="rn/*"
              element={
                <PrivateRoute>
                  <AdminPage></AdminPage>
                </PrivateRoute>
              }
            ></Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
