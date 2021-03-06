"use strict";

function setupClickHandlers() {
  var instagramRemoveIcons = document.querySelectorAll("#instagram .fa-remove");
  var twitterRemoveIcons = document.querySelectorAll("#twitter .fa-remove");
  var hashtagRemoveIcons = document.querySelectorAll("#hashtags .fa-remove");

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
    hashtagRemoveIcons[i].addEventListener("click", handler);
  }

  var addHashtagIcon = document.querySelector("#hashtags .fa-plus");
  addHashtagIcon.addEventListener("click", addHashtag);
}

function removeInstagramAccount(index) {
  console.log("removing instagram account at index: " + index);
}

function removeTwitterAccount(index) {
  console.log("removing twitter account at index: " + index);
}

function removeHashtag(index) {
  console.log("removing hashtag at index: " + index);
}

function addHashtag() {
  console.log("adding new hashtag");
}

window.onload = setupClickHandlers;
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//

