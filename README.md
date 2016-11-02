# [SVG Timer](http://codepen.io/decipher91/pen/rMXYRV)


SVG Timer currently supports hexagonal countdown only, check demo at [codepen](http://codepen.io/decipher91/pen/rMXYRV)

* Homepage: [https://html5boilerplate.com](https://html5boilerplate.com)
* Source: [https://github.com/h5bp/html5-boilerplate](https://github.com/h5bp/html5-boilerplate)
* Twitter: [@h5bp](https://twitter.com/h5bp)


## Quick start

Choose one of the following options:

1. Download the latest stable release from
   [github](https://github.com/decipher91/svg.timer/archive/master.zip)
   and include

   `dist/svgTimer.min.js` and `svgTimer.min.css`

   or

   `src/svgTimer.js` and `src/svgTimer.css` if you want to use non-minified version

2. Clone the git repo

   `git clone https://github.com/decipher91/svg.timer.git`

3. Install via bower

   `bower install svg-timer --save`

   Include link in your html file

   `bower_components/svg-timer/dist/svgTimer.min.js`

   `bower_components/svg-timer/dist/svgTimer.min.css`



## Usage

```html
<div class="timer">
<script>
  $(function () {
      $('.timer').svgTimer();
  });
</script>
```

Config options:

* time: string representing number of seconds
* track: color for main hexagon, can be rgb, rgba or hex
* fill: color for counting fill, can be rgb, rgba or hex
* transition: transition property (can be ease, linear, ease-in, ease-out, ease-in-out, step-start, cubic-bezier) --- see
     [https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function)

Extend options like this:
```javascript
     $('.svg-test').countDown({
        time: 45,
        transition: 'cubic-bezier'
      });
```

## Contributing



## License

The code is available under the [MIT license](LICENSE.txt).
