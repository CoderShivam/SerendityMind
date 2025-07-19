import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Features from "./pages/Features";
import ScrollTop from './components/ScrollTop'
import Testimonials from "./pages/Testimonials";
import Navbar from "./components/Navbar";
import Stories from "./pages/Stories";
import Exercises from "./pages/Exercises";
import Mediation from "./pages/Mediation";
import Footer from "./components/Footer";
import MoodTracker from "./pages/MoodTracker";
import Community from "./pages/Community";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Journal from "./pages/Journal";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <ScrollTop />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="features" element={<Features />} />
          <Route path="features/stories" element={<Stories />} />
          <Route path="features/exercises" element={<Exercises />} />
          <Route path="features/meditation" element={<Mediation />} />
          <Route path="features/mood" element={<MoodTracker />} />
          <Route path="features/community" element={<Community />} />
          <Route path="features/journal" element={<Journal />} />

          
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="login" element={<Login />} />
          <Route path="signUp" element={<Register />} />
         
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
