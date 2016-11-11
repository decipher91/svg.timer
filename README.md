# [SVG Timer](http://codepen.io/decipher91/pen/rMXYRV)


SVG Hexagonal final countdown, displays days, hours, minutes and seconds to certain date [codepen](http://codepen.io/decipher91/pen/rMXYRV)

## Quick start

Choose one of the following options:

1. Download the latest stable release from
   [github](https://github.com/decipher91/svg.timer/archive/master.zip)
   and include

   `dist/svgCountDown.min.js` and `svgCountDown.min.css`

   or

   `src/svgCountDown.js` and `src/svgCountDown.css` if you want to use non-minified version

2. Clone the git repo

   `git clone https://github.com/decipher91/svg.timer.git`

3. Install via bower

   `bower install svg-timer --save`

   Include link in your html file

   `bower_components/svg-timer/dist/svgCountDown.min.js`

   `bower_components/svg-timer/dist/svgCountDown.min.css`



## Usage

```html
<div class="timer">
<script>
  $(function () {
      $('.timer').svgCountDown();
  });
</script>
```

Config options:

* date: ISO date string with date and time, for example '2017-01-23T00:00:00'
* track: color for main hexagon, can be rgb, rgba or hex
* fill: color for counting fill, can be rgb, rgba or hex
* transition: transition property (can be ease, linear, ease-in, ease-out, ease-in-out, step-start, cubic-bezier) --- see
     [https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function)


Extend options like this:
```javascript
     $('.timer').svgCountDown({
        date: '2017-02-11T03:15:00'
      });
```

## Contributing



## License

The code is available under the [MIT license](LICENSE.txt).
