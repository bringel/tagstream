"use strict";

function setupClickHandlers() {
  var instagramRemoveIcons = document.querySelectorAll("#instagram .icon-remove");
  var twitterRemoveIcons = document.querySelectorAll("#twitter .icon-remove");
  var hashtagRemoveIcons = document.querySelectorAll("#hashtags .icon-remove");

  for (var i = 0; i < instagramRemoveIcons.length; i++) {
    var handler = removeInstagramAccount.bind(document, i);
    instagramRemoveIcons[i].addEventListener("click", handler);
  }

  for (var i = 0; i < twitterRemoveIcons.length; i++) {
    var handler = removeTwitterAccount.bind(document, i);
    twitterRemoveIcons[i].addEventListener("click", handler);
  }

  for (var i = 0; i < hashtagRemoveIcons.length; i++) {
    var handler = removeHashtag.bind(document, i);
    hashtagRemoveIcons[i].addEventListener("click", removeHashtag);
  }

  var addHashtagIcon = document.querySelector("#hashtags .icon-add");
  addHashtagIcon.addEventListener("click", addHashtag);
}

function removeInstagramAccount(index) {
  console.log("removing account at index " + index);
  var token = document.querySelector("meta[name='csrf-token']").content;
  var xhr = new XMLHttpRequest();
  xhr.open("post", window.location.origin + "/admin/remove_account?account_index=" + index + "&account_type=0");
  xhr.setRequestHeader("X-CSRF-Token", token);
  console.log(xhr);
  xhr.send();
}

function removeTwitterAccount(index) {
  console.log("removing twitter account at index: " + index);
  var token = document.querySelector("meta[name='csrf-token']").content;
  var xhr = new XMLHttpRequest();
  xhr.open("post", window.location.origin + "/admin/remove_account?account_index=" + index + "&account_type=1");
  xhr.setRequestHeader("X-CSRF-Token", token);
  console.log(xhr);
  xhr.send();
}

function removeHashtag(event) {
  event.stopPropagation();
  //console.log(`removing hashtag at index: ${index}`);
  var hashtagsContainer = document.getElementById("hashtags");

  var target = event.target;
  while (target.tagName.toLowerCase() !== "p") {
    target = target.parentNode;
  }

  hashtagsContainer.removeChild(target);
}

function addHashtag(event) {
  event.stopPropagation();
  console.log("adding new hashtag");

  var hashtagsContainer = document.getElementById("hashtags");
  var addingRow = hashtagsContainer.lastElementChild;
  var clonedRow = addingRow.cloneNode(true);

  var inputs = clonedRow.getElementsByTagName("input");
  inputs[0].value = "";

  var svgTags = addingRow.getElementsByTagName("svg");
  var useTags = addingRow.getElementsByTagName("use");

  var svgRemove = svgTags[0]; //currently the add icon, will be the new remove icon
  var svgRemoveUse = useTags[0];

  svgTags = clonedRow.getElementsByTagName("svg");

  var svgAdd = svgTags[0]; //add icon in new row

  svgRemove.classList.remove("icon-add");
  svgRemove.classList.add("icon-remove");

  svgRemoveUse.setAttribute("xlink:href", "#icon-remove");

  svgRemove.removeEventListener("click", addHashtag);
  svgRemove.addEventListener("click", removeHashtag);
  svgAdd.addEventListener("click", addHashtag);
  hashtagsContainer.appendChild(clonedRow);
}

window.onload = setupClickHandlers;
