import '../scss/style.scss';
import { initNavigation } from './navigation';
import { initPhotoSwipe } from './gallery';
import { initResourcesList } from './resources';

addEventListener('DOMContentLoaded', function () {
    initNavigation();
    initPhotoSwipe();
    initResourcesList();
});