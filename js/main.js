import {renderThumbnails} from './render-thumbnails.js';
import {openBigPicture} from './render-big-picture.js';
import {initUploadForm} from './form/upload-photo-form.js';
import {getData} from './api.js';
import {showDataErrorMessage} from './message.js';

getData()
  .then((photos) => {
    renderThumbnails(photos, openBigPicture);
  })
  .catch(() => {
    showDataErrorMessage();
  });

initUploadForm();
