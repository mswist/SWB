/*
 * Modal
 *
 * Pico.css - https://picocss.com
 * Copyright 2019-2023 - Licensed under MIT
 */

// Config
const isOpenClass = "modal-is-open";
const openingClass = "modal-is-opening";
const closingClass = "modal-is-closing";
const animationDuration = 400; // ms
let visibleModal = null;

// Toggle modal
const toggleModal = (event) => {
  event.preventDefault();
  const modal = document.getElementById(event.currentTarget.getAttribute("data-target"));
  if(event.currentTarget.tagName == "TR") {
    data = {
      "msgId": event.currentTarget.cells[1].textContent,
      "correlationId": event.currentTarget.cells[2].textContent,
      "msg": event.currentTarget.cells[3].textContent
    }
  }
  else {
    data = {
      "msgId": "",
      "correlationId": newMsg.correlationId,
      "msg": newMsg.msg
    }
  }
  typeof modal != "undefined" && modal != null && isModalOpen(modal)
    ? closeModal(modal)
    : openModal(modal, data);
};

// Is modal open
const isModalOpen = (modal) => {
  return modal.hasAttribute("open") && modal.getAttribute("open") != "false" ? true : false;
};

// Open modal
const openModal = (modal, data) => {
  populateModal(modal, data);
  if (isScrollbarVisible()) {
    document.documentElement.style.setProperty("--scrollbar-width", `${getScrollbarWidth()}px`);
  }
  document.documentElement.classList.add(isOpenClass, openingClass);
  setTimeout(() => {
    visibleModal = modal;
    document.documentElement.classList.remove(openingClass);
  }, animationDuration);
  modal.setAttribute("open", true);
};

// Close modal
const closeModal = (modal) => {
  visibleModal = null;
  document.documentElement.classList.add(closingClass);
  setTimeout(() => {
    document.documentElement.classList.remove(closingClass, isOpenClass);
    document.documentElement.style.removeProperty("--scrollbar-width");
    modal.removeAttribute("open");
  }, animationDuration);
};

// Close with a click outside
document.addEventListener("click", (event) => {
  if (visibleModal != null) {
    const modalContent = visibleModal.querySelector("article");
    const isClickInside = modalContent.contains(event.target);
    !isClickInside && closeModal(visibleModal);
  }
});

// Close with Esc key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && visibleModal != null) {
    closeModal(visibleModal);
  }
});

// Get scrollbar width
const getScrollbarWidth = () => {
  // Creating invisible container
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll"; // forcing scrollbar to appear
  outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps
  document.body.appendChild(outer);

  // Creating inner element and placing it in the container
  const inner = document.createElement("div");
  outer.appendChild(inner);

  // Calculating difference between container's full width and the child width
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  // Removing temporary elements from the DOM
  outer.parentNode.removeChild(outer);

  return scrollbarWidth;
};

// Is scrollbar visible
const isScrollbarVisible = () => {
  return document.body.scrollHeight > screen.height;
};

const populateModal = ( modal, data ) => {
    modal.querySelector("textarea").value = data.msg
    modal.querySelector("#correlationId").value = data.correlationId
    modal.querySelector("#msgId").value = data.msgId
    //if msgId is not null, then make all fields read only and hide submit button
    //otherwise hide msgId field
    if(data.msgId != "") {
        modal.querySelector("label[for=msgId]").style.display = "initial"
        modal.querySelector("#msgId").style.display = "initial"
        modal.querySelector("textarea").readOnly = true
        modal.querySelector("#correlationId").readOnly = true
        modal.querySelector("#createMessage").style.display = "none"
    }
    else {
        modal.querySelector("label[for=msgId]").style.display = "none"
        modal.querySelector("#msgId").style.display = "none"
        modal.querySelector("#createMessage").style.display = "initial"
        modal.querySelector("textarea").readOnly = false
        modal.querySelector("#correlationId").readOnly = false        
    }
}