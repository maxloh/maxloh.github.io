import * as Remarkable from 'remarkable';

export const initResourcesList = () => {
    // fetch(`${location.origin}/assets/md/resources.md`)
    //     .then(response => response.text())
    //     .then(text => {
    //         document.getElementById('resources-list').innerHTML = new Remarkable().render(text);
    //     });

    document.getElementById('resources-btn').onclick = () => {
        document.getElementsByClassName('overlay')[0].style.visibility = 'visible';
        document.getElementsByClassName('overlay')[0].style.opacity = '1';
        document.body.style.overflow = 'hidden';
    }

    document.getElementById('close-btn').onclick = () => {
        document.getElementsByClassName('overlay')[0].style.visibility = '';
        document.getElementsByClassName('overlay')[0].style.opacity = '';
        document.body.style.overflow = '';
    }
}