import { initAnimation } from './animation';
import { initNavbar } from './navbar';
import { initPhotoSwipe } from './gallery';
import { initResourcesList } from './resources';

addEventListener('DOMContentLoaded', function () {
    // initAnimation();
    initNavbar();
    initPhotoSwipe();
    initResourcesList();
});