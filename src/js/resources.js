import resources from '../md/resources.md';

export const initResourcesList = () => {
    document.getElementById('resources-list').innerHTML = resources;
    const overlay = document.getElementsByClassName('overlay')[0];

    document.getElementById('resources-btn').onclick = () => {
        overlay.style.visibility = 'visible';
        overlay.style.opacity = 1;
        document.body.style.overflow = 'hidden';
    };

    document.getElementById('close-btn').onclick = () => {
        overlay.style.visibility = '';
        overlay.style.opacity = '';
        document.body.style.overflow = '';
    };
};