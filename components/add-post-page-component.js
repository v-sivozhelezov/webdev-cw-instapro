import { onAddPostClick } from "../api.js";
import { getToken } from "../index.js";
import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";

export function renderAddPostPageComponent({ appEl }) {
  let imageUrl = "";

  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml = `
      <div class="page-container">
          <div class="header-container"></div>
          <div class="form">
              <h3 class="form-title">
               Добавить пост
                </h3>
              <div class="form-inputs">
                      <div class="upload-image-container">
                        <label class="file-upload-label secondary-button">
                          <input type="file" class="file-upload-input" style="display:none">Выберите фото
                        </label>
                      </div>
                      <label>
                      Опишите фотографию:
                      <textarea class="input textarea" rows="4"></textarea>
                      </label>                  
                  
                  <button class="button" id="add-button">Опубликовать</button>
              </div>
            
          </div>
      </div>    
`;

    appEl.innerHTML = appHtml;

    const setError = (message) => {
      appEl.querySelector(".form-error").textContent = message;
    };

    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });

    const uploadImageContainer = appEl.querySelector(".upload-image-container");

    if (uploadImageContainer) {
      renderUploadImageComponent({
        element: appEl.querySelector(".upload-image-container"),
        onImageUrlChange(newImageUrl) {
          imageUrl = newImageUrl;
        },
      });
    }

    document.getElementById("add-button").addEventListener("click", () => {
      onAddPostClick({
        token: getToken(),
        description: "Описание картинки",
        imageUrl
      });
    });
  };

  render();
}
