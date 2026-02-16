import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import Home from "./pages/public/Home";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import ManageExperience from "./pages/admin/ManageExperience";
import ManageProjects from "./pages/admin/ManageProjects";
import ManageSkills from "./pages/admin/ManageSkills";
import ManageEducation from "./pages/admin/ManageEducation";
import ManagePublications from "./pages/admin/ManagePublications";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute />}>
              <Route index element={<Dashboard />} />
              <Route path="experience" element={<ManageExperience />} />
              <Route path="projects" element={<ManageProjects />} />
              <Route path="skills" element={<ManageSkills />} />
              <Route path="education" element={<ManageEducation />} />
              <Route path="publications" element={<ManagePublications />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
