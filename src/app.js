import { loaded } from "./loaded.js";

function updateElementsWithAttributes(cloneParentContainer, elementSelector, attributeName, updateAttribute, updateAttributeFactor) {
  /*
    Function to select all the specified elementSelector elements from cloneParentContainer HTML, 
    remove attributeName from each element, and add the attributeName's attributeValue as a class value for that element.
    Also, the function updates (increments) updateAttribute value for each element with updateAttributeFactor.
  */
  const elements = cloneParentContainer.querySelectorAll(`${elementSelector}[${attributeName}]`);
  elements.forEach(element => {
    const attributeValue = element.getAttribute(attributeName);
    element.removeAttribute(attributeName);
    element.classList.add(attributeValue);

    if (updateAttribute == 'id' || updateAttribute == 'href') {
      let attributeValue = element.getAttribute(updateAttribute);
      attributeValue = attributeValue + updateAttributeFactor;
      element.setAttribute(updateAttribute, attributeValue);
    }
  });
}

window.addEventListener('DOMContentLoaded', loaded);
if (document.readyState == "complete") {;
  loaded();
}

document.addEventListener('DOMContentLoaded', function () {
  const parentContainer = document.querySelector('.parent');
  const childContainer = document.querySelector('.child');
  if (parentContainer && childContainer) {
    const cloneParentContainer = parentContainer.cloneNode(true);
    childContainer.appendChild(cloneParentContainer);
    updateElementsWithAttributes(cloneParentContainer, 'span', 'epub-type', '', '0');
    updateElementsWithAttributes(cloneParentContainer, 'aside', 'epub-type', 'id', '3');
    updateElementsWithAttributes(cloneParentContainer, 'ol', 'epub-type', 'id', '3');
    updateElementsWithAttributes(cloneParentContainer, 'a', 'epub-type', 'href', '3');
  }
});