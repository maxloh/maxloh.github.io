export default function initNavbar() {
  // Laravel style comment header

  /*
  |--------------------------------------------------------------------------
  | Globel varieables
  |--------------------------------------------------------------------------
  */

  const navbar = document.getElementById('navbar');
  const navbarHeight = navbar.getBoundingClientRect().height;

  /*
  |--------------------------------------------------------------------------
  | Add .sticky class to navbar when it is sticking to top of the page
  |--------------------------------------------------------------------------
  */

  const navbarObserver = new MutationObserver(() => {
    // if one of the .nav-link is active, meaning that navbar is sticking to top of the page
    if (document.getElementsByClassName('nav-link active').length !== 0) {
      navbar.classList.add('sticky');
    } else {
      navbar.classList.remove('sticky');
    }
  });
  for (const element of document.getElementsByClassName('nav-link')) {
    navbarObserver.observe(element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  /*
  |--------------------------------------------------------------------------
  | Handling .nav-link clicks
  |--------------------------------------------------------------------------
  */

  let checkScrollEndInterval;
  const onScrollEnd = () => {
    addEventListener('scroll', scrollHandler);
    clearInterval(checkScrollEndInterval);
    removeEventListener('wheel', onScrollEnd);
    removeEventListener('touchmove', onScrollEnd);
    removeEventListener('keydown', onKeyDown);
  };
  const onKeyDown = event => {
    if (['ArrowUp', 'ArrowDown'].includes(event.code)) onScrollEnd();
  };
  const navLinkClickHandler = event => {
    event.preventDefault();
    removeEventListener('scroll', scrollHandler);

    // Update navbar active item
    document
      .getElementsByClassName('nav-link active')[0]
      ?.classList.remove('active');
    event.target.classList.add('active');

    // Scroll to target
    const target = document.getElementById(
      event.target.href.substring(event.target.href.lastIndexOf('#') + 1)
    );
    const yCoord = Math.ceil(
      target.getBoundingClientRect().top +
        window.scrollY -
        navbarHeight -
        parseInt(
          getComputedStyle(document.documentElement).getPropertyValue(
            '--navbar-margin'
          )
        )
    );
    window.scroll({ top: yCoord, behavior: 'smooth' });

    // Clean up when scrolling completed or get interrupted
    checkScrollEndInterval = setInterval(() => {
      if (Math.floor(Math.abs(window.scrollY - yCoord)) === 0) onScrollEnd();
    }, 10);
    addEventListener('wheel', onScrollEnd, { once: true });
    addEventListener('touchmove', onScrollEnd, { once: true });
    addEventListener('keydown', onKeyDown);
  };

  for (const element of document.getElementsByClassName('nav-link')) {
    element.addEventListener('click', navLinkClickHandler);
  }

  /*
  |--------------------------------------------------------------------------
  | Scrollspy
  |--------------------------------------------------------------------------
  */

  const sections = [...document.getElementsByTagName('section')];
  const scrollHandler = () => {
    const activeLink = document.querySelector('a.nav-link.active');
    if (activeLink) activeLink.classList.remove('active');
    if (navbar.getBoundingClientRect().top !== 0) return;

    // This line won't be reached if navbar is not sticked to top
    // so it is safe to assume that at least one section is active
    const currentSection = sections.find(
      section => section.getBoundingClientRect().bottom > navbarHeight
    );

    document
      .querySelector('a.nav-link[href="#' + currentSection.id + '"]')
      .classList.add('active');
  };

  addEventListener('scroll', scrollHandler);

  // window.scrollY may be 0 at page reload, but updated after 100ms
  const delay = 100;
  setTimeout(() => {
    if (window.scrollY === 0) return;

    // prettier-ignore
    const transitionDuration = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--show-transition-duration'));
    // Check for navbar top value until it is zero
    setTimeout(() => {
      const interval = setInterval(() => {
        if (navbar.getBoundingClientRect().top !== 0) return;
        clearInterval(interval);
        scrollHandler();
      }, 10);
    }, transitionDuration - delay);
  }, delay);
}
