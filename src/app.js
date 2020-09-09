import UI, { successAlertType, dangerAlertType } from "./ui/UI";
import EasyHttp from "./lib/EasyHttp";

const ui = new UI(document);
const postsEndPoint = new EasyHttp("http://localhost:3000/posts");

ui.changeToPostState();

postsEndPoint.getAll().then((posts) => ui.showAllPosts(posts));

ui.postBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const post = ui.createPost();

  if (post) {
    await postsEndPoint.post(post);
    const posts = await postsEndPoint.getAll();
    ui.showAllPosts(posts);
  }

  ui.clearInput();
});

ui.alertHideBtn.addEventListener("click", () => {
  ui.hideAlert();
});

ui.postArea.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete")) {
    const currPostId = parseInt(e.target.parentNode.parentNode.parentNode.id);

    await postsEndPoint.deleteById(currPostId);
    const posts = await postsEndPoint.getAll();
    ui.showAllPosts(posts);
    ui.showAlert("Post Deleted", successAlertType);
    ui.clearInput();
    ui.changeToPostState();
  }
});

ui.postArea.addEventListener("click", async (e) => {
  if (e.target.classList.contains("edit")) {
    const currPostId = parseInt(e.target.parentNode.parentNode.parentNode.id);

    const postItem = await postsEndPoint.getById(currPostId);
    ui.fillInput(postItem);
    ui.changeToUpdateState();
  }
});

ui.backBtn.addEventListener("click", (e) => {
  e.preventDefault();
  ui.changeToPostState();
  ui.clearInput();
});

ui.updateBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const postId = parseInt(ui.updateBtn.dataset.id);

  const postItem = ui.createPost();
  if (!postItem) {
    const originPost = await postsEndPoint.getById(postId);
    ui.fillInput(originPost);
    ui.showAlert("Please fill in all inputs!", dangerAlertType);
    return;
  }

  await postsEndPoint.update(postItem, postId);
  const postArr = await postsEndPoint.getAll();
  ui.showAllPosts(postArr);
  ui.clearInput();
  ui.changeToPostState();
  ui.showAlert("Post updated!", successAlertType);
});
