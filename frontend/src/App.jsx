import { useState } from "react";
import "./App.css";
import LeftNavigation from "./components/LeftNavigation";
import RightNavigation from "./components/RightNavigation";

export default function App() {
  return (
    <div id="app">
      <LeftNavigation />
      <main>Main Content</main>
      <RightNavigation />
    </div>
  );
}
