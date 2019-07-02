import * as Remarkable from 'remarkable';
import { css } from './functions';

export const initResourcesList = () => {
    fetch(`${location.origin}/assets/md/resources.md`).then((response) => {
        response.text().then((text) => {
            document.getElementById('resources-list').innerHTML = new Remarkable().render(text)
        });
    });

    document.getElementById('resources-btn').onclick = () => {
        css('.overlay', { 'visibility': 'visible', 'opacity': '1' });
        css('body', { 'overflow': 'hidden' });
    }

    document.getElementById('close-btn').onclick = () => {
        css('.overlay', { 'visibility': '', 'opacity': '' });
        css('body', { 'overflow': '' });
    }
}