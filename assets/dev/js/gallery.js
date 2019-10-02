import * as PhotoSwipe from 'photoswipe';
import * as PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';

export const initPhotoSwipe = () => {
    const openPhotoSwipe = (imgElement, galleryClass) => {
        let pswpElement = document.querySelector('.pswp');

        // build items array, record element index
        let index = 0;
        let items;

        {
            let count = 0;
            /* [...HTMLCollection].map(): use spread operator to convert nodeList to array and call the map function,
               while having better peroformence than Array.from(nodeList).map or Array.prototype.map.call(nodeList, function)
               https://measurethat.net/Benchmarks/Show/4507/0/arrayprototypemapcall-vs-arraymap */
            items = [...imgElement.closest(galleryClass).getElementsByTagName('img')].map((element) => {
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
    }

    [...document.querySelectorAll('.gallery-item img')].forEach((element) => {
        element.onclick = (event) => {
            // Prevent browser opening href links
            event.preventDefault();
            openPhotoSwipe(event.target, '.gallery');
            document.body.style.overflow = 'hidden';
        }
    });

    // Add PhotoSwipe (.pswp) element to page
    document.body.insertAdjacentHTML('beforeend',
        '<!-- Root element of PhotoSwipe. Must have class pswp. -->' +
        '<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">' +
        '' +
        '    <!-- Background of PhotoSwipe. ' +
        '         It\'s a separate element as animating opacity is faster than rgba(). -->' +
        '    <div class="pswp__bg"></div>' +
        '' +
        '    <!-- Slides wrapper with overflow:hidden. -->' +
        '    <div class="pswp__scroll-wrap">' +
        '' +
        '        <!-- Container that holds slides. ' +
        '            PhotoSwipe keeps only 3 of them in the DOM to save memory.' +
        '            Don\'t modify these 3 pswp__item elements, data is added later on. -->' +
        '        <div class="pswp__container">' +
        '            <div class="pswp__item"></div>' +
        '            <div class="pswp__item"></div>' +
        '            <div class="pswp__item"></div>' +
        '        </div>' +
        '' +
        '        <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->' +
        '        <div class="pswp__ui pswp__ui--hidden">' +
        '' +
        '            <div class="pswp__top-bar">' +
        '' +
        '                <!--  Controls are self-explanatory. Order can be changed. -->' +
        '' +
        '                <div class="pswp__counter"></div>' +
        '' +
        '                <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>' +
        '' +
        '                <button class="pswp__button pswp__button--share" title="Share"></button>' +
        '' +
        '                <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>' +
        '' +
        '                <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>' +
        '' +
        '                <!-- Preloader demo https://codepen.io/dimsemenov/pen/yyBWoR -->' +
        '                <!-- element will get class pswp__preloader--active when preloader is running -->' +
        '                <div class="pswp__preloader">' +
        '                    <div class="pswp__preloader__icn">' +
        '                      <div class="pswp__preloader__cut">' +
        '                        <div class="pswp__preloader__donut"></div>' +
        '                      </div>' +
        '                    </div>' +
        '                </div>' +
        '            </div>' +
        '' +
        '            <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">' +
        '                <div class="pswp__share-tooltip"></div> ' +
        '            </div>' +
        '' +
        '            <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">' +
        '            </button>' +
        '' +
        '            <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">' +
        '            </button>' +
        '' +
        '            <div class="pswp__caption">' +
        '                <div class="pswp__caption__center"></div>' +
        '            </div>' +
        '' +
        '        </div>' +
        '' +
        '    </div>' +
        '' +
        '</div>'
    );
};