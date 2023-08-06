import { goToPage, logout, user } from "../index.js";
import { ADD_POSTS_PAGE, AUTH_PAGE, POSTS_PAGE } from "../routes.js";

export function renderLikeComponent({ element }) {
  element.innerHTML = `
        <div class="post-likes">
            <button data-post-id="${postID}" data-is-liked="${isLiked}" class="like-button">
              <img src="${isLiked === 'true' ? './assets/images/like-active.svg' : './assets/images/like-not-active.svg'}">
            </button>
            <p class="post-likes-text">
              Нравится: <strong>${post.likes.length}</strong>
            </p>
        </div>
`;

  element
    .querySelector(".add-or-login-button")
    .addEventListener("click", () => {
      if (user) {
        goToPage(ADD_POSTS_PAGE);
      } else {
        goToPage(AUTH_PAGE);
      }
    });

  element.querySelector(".logo").addEventListener("click", () => {
    goToPage(POSTS_PAGE);
  });

  element.querySelector(".logout-button")?.addEventListener("click", logout);

  return element;
}
