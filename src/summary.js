const TITLE_WHEN_CLOSED = 'Expand';
const TITLE_WHEN_OPEN = 'Collapse';

const requestAnimationFrame =
      window.requestAnimationFrame || // standard way to schedule animations
      // if none available, self-set frame rate
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };

export const toggleSummary = evt =>{
  // Prevent the text from being selected if rapidly clicked.
  evt.preventDefault();

  const summary = evt.target;
  const detail = findDetailFor(summary);
  if (!detail) { return; }

  // CSS Transitions don't work as expected on things set to 'display: none'. Make the
  // stretch details visible if needed, then use a timeout for the transition to take
  // effect.
  if (summary.classList.contains('stretchtext-open')) {
    detail.style.display = 'none';
  } else {
    detail.style.display = isBlockLevelDetail(summary) ? 'block' : 'inline';
  }

  requestAnimationFrame(function () {
    summary.classList.toggle('stretchtext-open');
    detail.classList.toggle('stretchtext-open');

    if (summary.classList.contains('stretchtext-open')) {
      setTitle(summary, TITLE_WHEN_OPEN);
    } else {
      setTitle(summary, TITLE_WHEN_CLOSED);
    }
  });
}

/* Return boolean: if the strechtext starts from a new paragraph */
// function isBlockLevelDetail (summary) {
const isBlockLevelDetail = summary => {
  return summary.nodeName.toLowerCase() === 'a';
}
/* Set the value of the attribute 'title' on element summary */
// function setTitle (summary, title) {
const setTitle = (summary, title) =>{
  // If the user placed a manual title on the summary leave it alone.
  // if (summary.hasAttribute('title')) {
  //   return;
  // } else {
  //   summary.setAttribute('title', title);
  // }
  if (!summary.hasAttribute('title')) {
    summary.setAttribute('title', title);
  }
}

/* Find stretchtext detail for a summary */
// function findDetailFor (summary) {
const findDetailFor = summary => {
  if (isBlockLevelDetail(summary)) {
    const id = summary.getAttribute('href').replace(/^#/, '');
    const detail = document.getElementById(id);
    if (!detail && window.console) {
      // template literals
      console.error('No StretchText details element with ID: ${id}');
    }
    return detail;
  } else {
    const detail = summary.nextElementSibling;
    if (!detail && window.console) {
      console.error('No StretchText details element found for: ', summary);
    }
    return detail;
  }
}

/* Retrieve all summaries (10 in total)*/
// function getSummaries () {
export const getSummaries = () => {
  // var results = [], summaries;
  // epub-type
  let summaries = document.querySelectorAll('[epub-type="stretchsummary"]');
  // Array.prototype.forEach.call(summaries, function (result) {
  //   results.push(result);
  //   console.log(result);
  // });
  // summaries.forEach(result => results.push(result));
  let results = Array.from(summaries);
  // CSS class.
  summaries = document.getElementsByClassName('stretchsummary');
  // Array.prototype.forEach.call(summaries, function (result) {
  //   results.push(result);
  // });
  // [...summaries].forEach(result => results.push(result));
  // results = results.concat(...summaries);
  results = [...results, ...summaries];
  return results;
}