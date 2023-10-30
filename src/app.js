import { loaded } from "./loaded.js";

window.addEventListener('DOMContentLoaded',loaded);
if (document.readyState == "complete") {
  loaded();
}