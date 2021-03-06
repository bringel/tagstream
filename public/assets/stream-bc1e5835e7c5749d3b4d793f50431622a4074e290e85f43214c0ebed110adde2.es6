var currentTwitterPhotoID, currentInstagramPhotoID, moreTwitterPhotos, moreInstagramPhotos;

function flipCoin(){
  var sources = ["instagram", "twitter"];
  var flipped = Math.floor(Math.random() * 2);

  return sources[flipped];
}

function photoTimerFired(){
  var result = flipCoin();
  if(result === "instagram"){
    getNextInstagramPhoto(currentInstagramPhotoID).then(function(result){
      result = JSON.parse(result);
      parseAndDisplayInstagramData(result);
    });
  }
  else{

  }
}

function getNextInstagramPhoto(currentID){
  var promise = new Promise(function(resolve, reject){
    let request = new XMLHttpRequest();
    if(currentInstagramPhotoID){
      request.open("get", `${window.location.origin}/stream/next_instagram_photo?current=${currentInstagramPhotoID}`);
    }
    else{
      request.open("get", `${window.location.origin}/stream/next_instagram_photo`);
    }
    request.onload = function(){
      if(request.status >= 200 && request.status < 300){
        resolve(request.response);
      }
      else{
        reject(request.status);
      }
    };
    request.send();
  });
  return promise;
}

function switchPhoto(photoData){

}

function loaded(){
  getNextInstagramPhoto("").then(function(result){
    result = JSON.parse(result);
    parseAndDisplayInstagramData(result);
  });
  setTimeout(photoTimerFired, photoSwitchTimer * 1000);
}

function parseAndDisplayInstagramData(result){
  currentInstagramPhotoID = result.id;
  var imageContainer = document.getElementById("currentPhoto");
  if(imageContainer.children.length > 0 && imageContainer.firstElementChild.tagName.toLowerCase() === "img"){
    imageContainer.firstElementChild.src = result.photo_url;
  }
  else{
    var imageTag = new Image();
    imageContainer.appendChild(imageTag);
    imageTag.src = result.photo_url;
  }

  var profilePhotoContainer = document.getElementById("profile");
  if(profilePhotoContainer.children.length > 0 && profilePhotoContainer.firstElementChild.tagName.toLowerCase() === "img"){
    profilePhotoContainer.firstElementChild.src = result.instagram_profile_photo;
  }
  else{
    var profilePhoto = new Image();
    profilePhotoContainer.appendChild(profilePhoto);
    profilePhoto.src = result.instagram_profile_photo;
  }

  var userName = document.getElementById("username");
  var fullName = document.getElementById("fullname");
  userName.textContent = `@${result.instagram_username}`;
  fullName.textContent = result.instagram_fullname;

  var caption = document.getElementById("captionText");
  caption.textContent = result.caption;

  var hearts = document.getElementById("likeCount");
  hearts.textContent = result.likes;

  setTimeout(photoTimerFired, photoSwitchTimer * 1000);
}

window.onload = loaded;
