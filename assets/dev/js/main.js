import { initAnimation } from './animation';
import { initPhotoSwipe } from './gallery';
import { initNavbar } from './navbar';

addEventListener('DOMContentLoaded', function () {
    initAnimation();
    initNavbar();
    initPhotoSwipe();
});