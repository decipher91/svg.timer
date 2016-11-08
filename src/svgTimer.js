(function ( $ ) {
    function setText(opts, counter, i){
        if(opts.direction === 'forward'){
            counter.text(i);
        } else if (opts.direction === 'backwards') {
            var count = opts.time - i;
            counter.text(count);
        } else {
            counter.text(i);
        }
    }

    var testDate = '2017-01-23T00:00:00';

    function parseDate(date){
        var countDownDate = new Date(date);
        console.log(countDownDate);
        var dateNow = new Date();
        var diff = (countDownDate - dateNow)/1000;
        var d = Math.floor(diff / 86400);
        var h = Math.floor( diff % 86400 / 3600);
        var m = Math.floor(diff % 86400 % 3600 / 60 );
        var s = Math.floor(diff % 86400 % 3600 % 60 );
        console.log(d + ' days, ' + h + ' hours, ' + m + ' minutes, ' + s + ' seconds');
    }

    parseDate(testDate);

    $.fn.svgTimer = function(options) {
        var opts = $.extend({}, $.fn.svgTimer.defaults, options);

        var template = "<div class='svg-hexagonal-counter'>"
            + "<div class='hint'><span class='hint-count'></span><br><span class='hint-text'></span></div>"
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
            var hintCount = parentEl.find('.hint-count');
            var hintText = parentEl.find('.hint-text').text(opts.hint);


            //set time and offset
            var time = opts.time; /* how long the timer runs for */
            var initialOffset = 2160;
            var i = 1;

            //set counter text
            setText(opts, hintCount, i);


            //draw initial hexagon
            track.css('stroke', opts.track);
            fill.css({
                'stroke': opts.fill,
                'stroke-dashoffset': initialOffset-(i*(initialOffset/time)) + 'px',
                'transition': 'stroke-dashoffset 1s ' +  opts.transition
            });

            //run timer
            var interval = setInterval(function() {
                //track.css('stroke', opts.track);
                fill.css({
                    'stroke': opts.fill,
                    'stroke-dashoffset': initialOffset-(i*(initialOffset/time)) + 'px',
                    'transition': 'stroke-dashoffset 1s ' +  opts.transition
                });
                setText(opts, hintCount, i);

                if (i == time) {
                    clearInterval(interval);
                }
                i++;
            }, opts.interval);
        });
    };

    $.fn.svgTimer.defaults = {
        time: 60,
        interval: 1000,
        direction: 'forward',
        track: 'rgb(56, 71, 83)',
        fill: 'rgb(104, 214, 198)',
        transition: 'linear',
        hint: 'seconds'

    }
}( jQuery ));