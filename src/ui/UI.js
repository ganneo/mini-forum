import Post from "../model/Post";

export const successAlertType = "alert fade show d-block alert-success mt-3";
export const dangerAlertType = "alert fade show d-block alert-danger mt-3";

const hideAlertType = "alert fade show d-none";

export default class UI {
  constructor(document) {
    this.document = document;
    this.postBtn = document.getElementById("post-it-btn");
    this.updateBtn = document.getElementById("update-btn");
    this.backBtn = document.getElementById("back-btn");
    this.postArea = document.getElementById("posts");
    this.postHeadingInput = document.getElementById("post-heading");
    this.postBodyInput = document.getElementById("post-body");
    this.alertHideBtn = document.getElementById("alert-hide");
    this.alertDiv = document.getElementById("alert-div");
    this.alertSpan = document.getElementById("alert-message");
    this.postTemplate = document.getElementById("post-template");
  }

  showAllPosts(posts) {
    this.postArea.innerHTML = "";

    if (!posts || posts.length === 0) {
      return;
    }

    posts.forEach((post) => {
      const clonedPostElement = this.postTemplate.cloneNode(true);
      clonedPostElement.id = post.id;
      clonedPostElement.style.display = "block";
      clonedPostElement.querySelector(".card-title").textContent = post.title;
      clonedPostElement.querySelector("h5").textContent = post.body;
      this.postArea.appendChild(clonedPostElement);
    });
  }

  hideAlert() {
    this.alertDiv.className = hideAlertType;
  }

  showAlert(alertMessage, alertType) {
    this.alertSpan.textContent = alertMessage;
    this.alertDiv.className = alertType;

    setTimeout(() => this.hideAlert(), 3000);
  }

  clearInput() {
    this.postHeadingInput.value = "";
    this.postBodyInput.value = "";
  }

  changeToUpdateState() {
    this.updateBtn.style.display = "block";
    this.backBtn.style.display = "block";
    this.postBtn.style.display = "none";
  }

  changeToPostState() {
    this.updateBtn.style.display = "none";
    this.backBtn.style.display = "none";
    this.postBtn.style.display = "block";
  }

  createPost() {
    if (!this.postHeadingInput.value || !this.postBodyInput.value) {
      this.showAlert("Please fill in all inputs", dangerAlertType);
      return null;
    }

    return new Post(this.postHeadingInput.value, this.postBodyInput.value);
  }

  fillInput(post) {
    this.postHeadingInput.value = post.title;
    this.postBodyInput.value = post.body;
    this.updateBtn.dataset.id = post.id;
  }
}
