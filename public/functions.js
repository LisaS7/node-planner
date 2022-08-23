/** 
 * Add a new element to the given parent element and optionally insert text.
 * @param {String} elementString The type of element to create
 * @param {Object} parent The html parent element which the new element will append to
 * @param {String} content The text to put inside the new element's innerHTML
 * @return {Object} The newly created html element
 */
 function addElement (elementString, parent, content=null) {
    let element = document.createElement(elementString);
    parent.appendChild(element);
    if (content) {
        element.innerHTML = content;
    }
    return element;
}

/**
 *  Toggle a task on a given element. Also ensures the class isn't on any other elements.
 * @param {Object} activeElement The element which the class should be applied to.
 * @param {String} className The name of the class to toggle.
 */
function toggleClass (activeElement, className) {
    let otherActive = Array.from(document.getElementsByClassName(className));
    otherActive.forEach(inactiveElement => {
        inactiveElement.classList.remove(className);
    })
    activeElement.classList.toggle(className);
}

export {addElement, toggleClass};