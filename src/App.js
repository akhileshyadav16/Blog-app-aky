import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateBlog from "./pages/CreateBlog";
import BlogPage from "./pages/BlogPage";


function App() {
  return (
    <div className="min-h-screen text-slate-300 w-screen bg-gradient-to-r from-slate-950  to-slate-900">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/create-blog" element={<CreateBlog/>}/>
        <Route path="/update-blog/:_id" element={<CreateBlog />} />
        <Route path="/blog-details/:_id" element={<BlogPage/>}/>
      </Routes>
    </div>
  )
}

export default App;
