import * as Remarkable from 'remarkable';

export const initResourcesList = () => {
    const overlay = document.getElementsByClassName('overlay')[0];
    fetch(`${location.origin}/assets/md/resources.md`).then((response) => {
        response.text().then((text) => {
            document.getElementById('resources-list').innerHTML = new Remarkable().render(text);
        });
    });

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