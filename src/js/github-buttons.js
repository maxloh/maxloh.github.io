import { render } from 'github-buttons';

export const initGithubButtons = () => {
  for (const anchor of document.querySelectorAll('a.github-button')) {
    render(
      {
        href: anchor.href,
        'data-text': anchor.innerText,
        'data-icon': 'octicon-star',
        'data-size': 'large'
      },
      el => anchor.parentNode.replaceChild(el, anchor)
    );
  }
};
