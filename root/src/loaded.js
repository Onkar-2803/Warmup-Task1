import { getSummaries, toggleSummary } from "./summary.js";

const TITLE_WHEN_CLOSED = 'Expand';
let loadedCalled = false;
  
/* add handlers for summaries when HTML dochas been parsed*/
// function loaded () {
export const loaded = () => {
  if (loadedCalled) { return; }
  loadedCalled = true;
  // FIXME(slightlyoff): Add global handlers instead of one per item.
  // getSummaries().forEach(function (summary) {
  getSummaries().forEach( summary =>{
    summary.setAttribute('title', TITLE_WHEN_CLOSED);

    // Listen on mousedown instead of click so that we can prevent text
    // selection if mouse is clicked rapidly.
    summary.addEventListener('mousedown', toggleSummary);

    summary.addEventListener('touchstart', toggleSummary);

    // Link resolving can't be canceled in mousedown event, only in click
    // event.
    // summary.addEventListener('click', function (e) { e.preventDefault(); });
    summary.addEventListener('click', e => e.preventDefault() ); // prevent from responding both touchstart and click events
  });
}