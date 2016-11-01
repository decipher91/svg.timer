/**
 * Created by decipher on 1.11.16.
 */
(function ( $ ) {
    $.fn.countDown = function(options) {
        var opts = $.extend({}, $.fn.countDown.defaults, options);

        var template = "<div class='svg-hexagonal-counter'>"
            + "<h2>0</h2>"
            + "<svg class='counter' x='0px' y='0px' viewBox='0 0 776 628'>"
            + "<path class='track' d='M723 314L543 625.77 183 625.77 3 314 183 2.23 543 2.23 723 314z'></path>"
            + "<path class='fill' d='M723 314L543 625.77 183 625.77 3 314 183 2.23 543 2.23 723 314z'></path>"
            + "</svg>"
            + "</div>";

        return this.each(function() {
            // Build dom for svg countdown
            var parentEl = $(this);
            parentEl.append(template);

            //define dom elements
            var track = parentEl.find('.track');
            var fill = parentEl.find('.fill');
            var counterText = parentEl.find('h2');

            //set time and offset
            var time = opts.time; /* how long the timer runs for */
            var initialOffset = '2160';
            var i = 1;

            //run timer
            var interval = setInterval(function() {
                track.css('stroke', opts.track);
                fill.css({
                    'stroke': opts.fill,
                    'stroke-dashoffset': initialOffset-(i*(initialOffset/time)),
                    'transition': 'stroke-dashoffset 1s ' +  opts.transition
                });
                counterText.text(i);
                if (i == time) {
                    clearInterval(interval);
                }
                i++;
            }, 1000);
        });
    };

    $.fn.countDown.defaults = {
        time: 60,
        track: 'rgb(56, 71, 83)',
        fill: 'rgb(104, 214, 198)',
        transition: 'linear'
    }
}( jQuery ));



$(function () {
    $('.svg-test').countDown();
});
