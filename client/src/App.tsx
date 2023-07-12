import React from "react";
import "./App.css";
import SideNav from "./components/SideNav/SideNav";
import AddPost from "./components/TextEditor/AddPost/AddPost";
import Main from "./components/Main/Main";
import Posts from "./components/Posts/Posts";
import Post from "./components/Posts/Post/Post";
import Auth from "./components/Auth/Auth";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="min-w-full h-screen bg-cyan-500 text-6xl">
      <SideNav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:postId/*" element={<Post />} />
        <Route path="/posts/new" element={<AddPost />} />
        <Route path="/admin" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
