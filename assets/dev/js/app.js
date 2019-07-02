import { initAnimation } from './animation';
import { initPhotoSwipe } from './gallery';
import { initNavbar } from './navbar';
import { initResourcesList } from './resources';

addEventListener('DOMContentLoaded', function () {
    initAnimation();
    initNavbar();
    initPhotoSwipe();
    initResourcesList();
});