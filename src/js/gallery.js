import * as PhotoSwipe from 'photoswipe';
import * as PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';
import photoswipeElement from '../html/photoswipe.html';

export const initPhotoSwipe = () => {
    const openPhotoSwipe = (imgElement, galleryClass) => {
        let pswpElement = document.querySelector('.pswp');

        // build items array, record element index
        let index = 0;
        let items;

        {
            let count = 0;
            /* imgElement.closest(galleryClass).querySelectorAll('img'): select all img elements on the same level
               [...nodeList].map(): use spread operator to convert nodeList to array and call the map function,
               while having better peroformence than Array.from(nodeList).map or Array.prototype.map.call(nodeList, function)
               https://measurethat.net/Benchmarks/Show/4507/0/arrayprototypemapcall-vs-arraymap */
            items = [...imgElement.closest(galleryClass).querySelectorAll('img')].map(element => {
                if (element === imgElement) { index = count; }
                count++;
                // msrc: prevent PhotoSwipe displaying grey placeholder
                return { src: element.currentSrc, msrc: element.currentSrc, w: element.naturalWidth, h: element.naturalHeight };
            });
        }

        // define options
        let options = {
            index: index,
            getThumbBoundsFn: () => {
                let pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = imgElement.getBoundingClientRect();
                return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
            },
            showHideOpacity: true,
            /* bgOpacity: 0.32 -> Scrim opacity in material design dialogs
               https://material.io/design/components/dialogs.html#theming */
            bgOpacity: 0.32,
            shareEl: false,
            closeElClasses: ['item', 'caption', 'zoom-wrap', 'ui'],
        };

        // Initializes and opens PhotoSwipe
        let pswp = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
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