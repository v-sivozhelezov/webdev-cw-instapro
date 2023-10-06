import { clickLike } from "./posts-page-component.js";

export function renderLikeComponent({ element, post }) {
    element.innerHTML = `
          <div class="post-likes">
              <button data-post-id="${post.id}" data-is-liked="${post.isLiked}" class="like-button">
                <img src="${post.isLiked === true ? './assets/images/like-active.svg' : './assets/images/like-not-active.svg'}">
              </button>
              <p class="post-likes-text">
                Нравится: <strong>${post.likes.length}</strong>
              </p>
          </div>
  `;
    clickLike(element.querySelector('.like-button'));
}