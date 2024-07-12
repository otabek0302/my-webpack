import React from "react";
import Couter from "./components/Couter";
import Hero from "./components/Hero";
import User from "@/assets/user.svg";

import { Outlet } from "react-router-dom";

import styles from "./app.module.css";

const App = () => {
  return (
    <div>
      <h1 className={styles.title}>Hello World</h1>
      <Couter />
      <Hero />
      <div>
        <img src={User} alt="user" />
      </div>
      <a href="/about">about</a>
      <br />
      <a href="/admin">admin</a>
      <Outlet />
    </div>
  );
};

export default App;
