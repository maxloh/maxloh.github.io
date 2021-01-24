import * as PhotoSwipe from 'photoswipe';
import * as PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';
import photoswipeElement from '../html/photoswipe.html';

export const initPhotoSwipe = () => {
    const openPhotoSwipe = (imgElement, galleryClass) => {
        const pswpElement = document.getElementsByClassName('pswp')[0];

        // build items array, record element index
        let imgIndex = 0;
        const items = [...imgElement.closest(galleryClass).getElementsByTagName('img')].map((element, index) => {
            if (element === imgElement) { imgIndex = index; }
            // msrc: prevent PhotoSwipe displaying grey placeholder
            return { src: element.currentSrc, msrc: element.currentSrc, w: element.naturalWidth, h: element.naturalHeight };
        });

        // define options
        const options = {
            index: imgIndex,
            getThumbBoundsFn: () => {
                const rect = imgElement.getBoundingClientRect();
                return { x: rect.left, y: rect.top + window.scrollY, w: rect.width };
            },
            showHideOpacity: true,
            /* bgOpacity: 0.32 -> Scrim opacity in material design dialogs
               https://material.io/design/components/dialogs.html#theming */
            bgOpacity: 0.32,
            shareEl: false,
            closeElClasses: ['item', 'caption', 'zoom-wrap', 'ui'],
        };

        // Initializes and opens PhotoSwipe
        const pswp = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
        pswp.init();

        // Prevent double shadow of .pswp__img and .pswp__img--placeholder
        pswp.listen('initialZoomInEnd', () => {
            document.getElementsByClassName('pswp__img--placeholder')[0].style.display = 'none';
        });

        pswp.listen('close', () => {
            document.body.style.overflow = '';
        });
    };

    for (const element of document.querySelectorAll('.gallery-item img')) {
        element.onclick = function (event) {
            // Prevent browser opening href links
            event.preventDefault();
            openPhotoSwipe(event.target, '.gallery');
            document.body.style.overflow = 'hidden';
        };
    }

    // Add PhotoSwipe (.pswp) element to page
    document.body.insertAdjacentHTML('beforeend', photoswipeElement);
};