const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR_URL = 'img/muffin-grey.svg';

const avatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const advertFileChooser = document.querySelector('.ad-form__upload input[type=file]');
const advertPreviewContainer = document.querySelector('.ad-form__photo');

const resetPhotos = () => {
  const advertPreviews = document.querySelector('.ad-form__photo').querySelectorAll('img');
  advertPreviews.forEach((img) => img.remove());
  avatarPreview.src = DEFAULT_AVATAR_URL;
};

const uploadAdvertImg = () => {
  advertFileChooser.addEventListener('change', () => {
    const newImg = new Image(70, 70);
    advertPreviewContainer.appendChild(newImg);

    const file = advertFileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        newImg.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
};

const uploadAvatarImg = () => {
  avatarFileChooser.addEventListener('input', () => {
    const file = avatarFileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
};

uploadAdvertImg();
uploadAvatarImg();

export {resetPhotos};
