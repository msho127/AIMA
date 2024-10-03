function follow() {
  var followButton = document.getElementById("followId");

  if (followButton.classList.contains("follow2")) {

    followButton.innerText = "フォローする";
      followButton.classList.remove("follow2");
  } else {

    followButton.innerText = "フォロー中";
      followButton.classList.add("follow2");
  }
}
