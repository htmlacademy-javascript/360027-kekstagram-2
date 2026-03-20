import {renderThumbnails} from './render-thumbnails.js';
import {generatePhotos} from './create-array-photos.js';
import {openBigPicture} from './render-big-picture.js';
import {initUploadForm} from './form/upload-photo-form.js';

const userPhotos = generatePhotos();
renderThumbnails(userPhotos, openBigPicture);
initUploadForm();
