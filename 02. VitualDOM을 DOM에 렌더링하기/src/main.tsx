import React from "@/lib/React";
import App from "./App";

const root = document.querySelector("#root");
const dom = React.createDOM(<App />);

root?.appendChild(dom);
