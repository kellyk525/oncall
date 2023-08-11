import katex from "katex";

declare global {
  interface Window {
    katex: any;
  }
}

window.katex = katex;
