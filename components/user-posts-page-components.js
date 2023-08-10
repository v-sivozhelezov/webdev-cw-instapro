import { USER_POSTS_PAGE, POSTS_PAGE, LOADING_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, getToken } from "../index.js";
import { getLike, getUserPosts } from "../api.js";
import { clickLike } from "./posts-page-component.js";

export function renderUserPostsPageComponent({ appEl }) {
    const appHtml =
        `<div class="page-container">
                <div class="header-container"></div>
                <div class="post-header post-user__header" data-user-id="${posts[0].user.id}">
                        <img src="${posts[0].user.imageUrl}" class="post-header__user-image  post-user__image">
                        <p class="post-header__user-name post-user__name ">${posts[0].user.name}</p>
                    </div>` +
        posts.map((post) => {
            return `<ul class="posts">
                    <li class="post user-post">
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
                </ul>`}).join('');
             + `</div>`;

appEl.innerHTML = appHtml;

renderHeaderComponent({
    element: document.querySelector(".header-container"),
});

for (const likeButton of document.querySelectorAll('.like-button')) {
    clickLike(likeButton);
}
};

