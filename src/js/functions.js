export const css = (element, styles) => {
    if (typeof element === 'string') element = document.querySelector(element);
    if (typeof styles === 'string') {
        return window.getComputedStyle(element).getPropertyValue(styles);
    } else {
        for (var key in styles) {
            element.style.setProperty(key, styles[key]);
        }
    }
}