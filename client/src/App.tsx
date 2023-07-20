import React from "react";
import "./App.css";
import SideNav from "./components/SideNav/SideNav";
import AddPost from "./components/TextEditor/AddPost/AddPost";
import Main from "./components/Main/Main";
import Post from "./components/Posts/Post/Post";
import Auth from "./components/Auth/Auth";
import Settings from "./components/Settings/Settings";
import Collections from "./components/Collections/Collections";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="text-6xl h-full">
      <SideNav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/posts/:postId/*" element={<Post />} />
        <Route path="/posts/new" element={<AddPost />} />
        <Route path="/admin" element={<Auth />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/collections" element={<Collections />} />
      </Routes>
    </div>
  );
}

export default App;
