import { USER_POSTS_PAGE, POSTS_PAGE, LOADING_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, getToken, user } from "../index.js";
import { getLike, getUserPosts } from "../api.js";
import { renderLikeComponent } from "./like-component.js";

export function clickLike(likeButton) {
  likeButton.addEventListener('click', () => {
    if (user) {
    const postID = likeButton.dataset.postId;
    getLike({
      isLiked: likeButton.dataset.isLiked,
      token: getToken(),
      postID
    })
      .then((response) => {
        renderLikeComponent({
          element: likeButton.closest('.post-likes'),
          post: response.post
        });
      })
    } else alert("Лайкать посты могут только авторизованные пользователи");
  })
};

export function renderPostsPageComponent({ appEl }) {
  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
  const appHtml = posts.map((post) => {
    return `
    <div class="page-container">
      <div class="header-container"></div>
      <ul class="posts">
        <li class="post">
          <div class="post-header" data-user-id="${post.user.id}">
              <img src="${post.user.imageUrl}" class="post-header__user-image">
              <p class="post-header__user-name">${post.user.name}</p>
          </div>
          <div class="post-image-container">
            <img class="post-image" src="${post.imageUrl}">
          </div>
          <div class="post-likes">
            <button data-post-id="${post.id}" data-is-liked="${post.isLiked}"  class="like-button">
              <img src="${post.isLiked === true ? './assets/images/like-active.svg' : './assets/images/like-not-active.svg'}">
            </button>
            <p class="post-likes-text">
              Нравится: <strong>${post.likes.length}</strong>
            </p>
          </div>
          <p class="post-text">
            <span class="user-name">${post.user.name}</span>
            ${post.description}
          </p>
          <p class="post-date">
          ${post.createdAt}
          </p>
        </li>    
      </ul>
    </div>`;
  }).join('');

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(LOADING_PAGE);
      getUserPosts({ userID: userEl.dataset.userId })
        .then((response) => {
          goToPage(USER_POSTS_PAGE, {
            userPosts: response.posts,
          });
        })
    });
  }

  for (const likeButton of document.querySelectorAll('.like-button')) {
    clickLike(likeButton);
  }
};

