# Notes

## Icon

### Creating the icon using inkscape
1. Select pen tool
2. Press the node of the object which would be used for alignment (e.g. central point of M)
3. Hold <kbd>control</kbd> button and drag upward/downward to create a vertical path for alignment
4. Select the vertical path created in `2`
5. Press <kbd>shift</kbd> for multi select and select the object to align
6. Press <kbd>Shift</kbd> + <kbd>Ctrl</kbd> + <kbd>A</kbd> to open `Align and Distribute` panel
7. For the `Relative to:` drop down menu, choose `First selected` (vertical path created in `2`)
8. Press `Center to vertical axis`

<https://graphicdesign.stackexchange.com/questions/31361/how-to-align-an-object-relative-to-nodes-of-another-object-in-inkscape>

### Converting the icon to png using ImageMagick

- `./magick convert -background none favicon.svg -size 256x256 -gravity center -scale 256x256 -extent 256x256 256x256.png`
- `./magick convert -background none faviconSmall.svg -size 512x512 -gravity center -scale 512x512 -extent 512x512 512x512.png`
- `./magick convert -background none faviconSmall.svg -size 192x192 -gravity center -scale 192x192 -extent 192x192 192x192.png`

<https://stackoverflow.com/questions/13153846/how-to-add-padding-when-using-imagemagick-to-convert-an-eps-into-a-png>

## Markdown parser performance

- <https://github.com/markedjs/marked/issues/963>
- <https://jsperf.com/showdown-js-vs-marked/10>
- <https://jsperf.com/latest-version-markdown-parser-performance-comparison/5>

## Chrome overlay scrollbar styles
```
.scrollbar {
    width: 7px;
    transition: width 200ms ease-out, background-color 200ms ease-out;

    &:hover {
        width: 17px;
    }

    &.dark-background {
        background-color: rgba(255, 255, 255, 0.5);
        border-left: 1px solid rgba(0, 0, 0, 0.3);
        border-top: 1px solid rgba(0, 0, 0, 0.3);
        border-bottom: 1px solid rgba(0, 0, 0, 0.3);
        &:hover {
            background-color: rgba(255, 255, 255, 0.7);
        }
    }

    &.light-background {
        background-color: rgba(0, 0, 0, 0.5);
        border-left: 1px solid rgba(255, 255, 255, 0.3);
        border-top: 1px solid rgba(255, 255, 255, 0.3);
        border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        &:hover {
            background-color: rgba(0, 0, 0, 0.7);
        }
    }
}
```