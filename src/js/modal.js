import * as basicLightbox from 'basiclightbox';
import '../../node_modules/basiclightbox/dist/basicLightbox.min.css';

export default function lightboxImage(src) {
  return basicLightbox.create(`<img src="${src}" width="800" height="600">`);
}
