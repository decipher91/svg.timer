/**
 * Created by decipher on 8.11.16.
 */
(function ($) {
    function setText(time, counter, i) {
        var count = time - i;

        counter.text(count);
    }

    function setInitialText(time, counter){
        counter.text(time);
    }

    var testDate = '2017-01-23T00:00:00';

    function parseDate(date) {
        var countDownDate = new Date(date);
        var dateNow = new Date();
        var diff = (countDownDate - dateNow) / 1000;
        var d = Math.floor(diff / 86400);
        var h = Math.floor(diff % 86400 / 3600);
        var m = Math.floor(diff % 86400 % 3600 / 60);
        var s = Math.floor(diff % 86400 % 3600 % 60);
        console.log(d + ' days, ' + h + ' hours, ' + m + ' minutes, ' + s + ' seconds');
        console.log('diff: ' + diff);

        return {
            date: countDownDate,
            diff: diff,
            d: d,
            h: h,
            m: m,
            s: s
        }
    }

    $.fn.svgCountDown = function (options) {
        var opts = $.extend({}, $.fn.svgCountDown.defaults, options);

        var template = "<div class='svg-hexagonal-counter svg-days-counter'>"
            + "<div class='hint'><span class='hint-count'></span><br><span class='hint-text'>days</span></div>"
            + "<svg class='counter' x='0px' y='0px' viewBox='0 0 776 628'>"
            + "<path class='track' d='M723 314L543 625.77 183 625.77 3 314 183 2.23 543 2.23 723 314z'></path>"
            + "<path class='fill' d='M723 314L543 625.77 183 625.77 3 314 183 2.23 543 2.23 723 314z'></path>"
            + "</svg>"
            + "</div>"

            + "<div class='svg-hexagonal-counter svg-hours-counter'>"
            + "<div class='hint'><span class='hint-count'></span><br><span class='hint-text'>hours</span></div>"
            + "<svg class='counter' x='0px' y='0px' viewBox='0 0 776 628'>"
            + "<path class='track' d='M723 314L543 625.77 183 625.77 3 314 183 2.23 543 2.23 723 314z'></path>"
            + "<path class='fill' d='M723 314L543 625.77 183 625.77 3 314 183 2.23 543 2.23 723 314z'></path>"
            + "</svg>"
            + "</div>"

            + "<div class='svg-hexagonal-counter svg-minutes-counter'>"
            + "<div class='hint'><span class='hint-count'></span><br><span class='hint-text'>minutes</span></div>"
            + "<svg class='counter' x='0px' y='0px' viewBox='0 0 776 628'>"
            + "<path class='track' d='M723 314L543 625.77 183 625.77 3 314 183 2.23 543 2.23 723 314z'></path>"
            + "<path class='fill' d='M723 314L543 625.77 183 625.77 3 314 183 2.23 543 2.23 723 314z'></path>"
            + "</svg>"
            + "</div>"

            + "<div class='svg-hexagonal-counter svg-seconds-counter'>"
            + "<div class='hint'><span class='hint-count'></span><br><span class='hint-text'>seconds</span></div>"
            + "<svg class='counter' x='0px' y='0px' viewBox='0 0 776 628'>"
            + "<path class='track' d='M723 314L543 625.77 183 625.77 3 314 183 2.23 543 2.23 723 314z'></path>"
            + "<path class='fill' d='M723 314L543 625.77 183 625.77 3 314 183 2.23 543 2.23 723 314z'></path>"
            + "</svg>"
            + "</div>";

        var date = parseDate(opts.date);
        console.log(date);

        return this.each(function () {
            // Build dom for svg countdown
            var parentEl = $(this);
            parentEl.append(template);

            //define dom elements
            var track = parentEl.find('.track');
            var daysCountDown = parentEl.find('.svg-days-counter');
            var daysTrack = daysCountDown.find('.track');
            var daysFill = daysCountDown.find('.fill');
            var daysHintCount = daysCountDown.find('.hint-count');

            var hoursCountDown = parentEl.find('.svg-hours-counter');
            //var hoursTrack = hoursCountDown.find('.track');
            var hoursFill = hoursCountDown.find('.fill');
            var hoursHintCount = hoursCountDown.find('.hint-count');

            var minutesCountDown = parentEl.find('.svg-minutes-counter');
            //var minutesTrack = minutesCountDown.find('.track');
            var minutesFill = minutesCountDown.find('.fill');
            var minutesHintCount = minutesCountDown.find('.hint-count');

            var secsCountDown = parentEl.find('.svg-seconds-counter');
            //var secsTrack = secsCountDown.find('.track');
            var secsFill = secsCountDown.find('.fill');
            var secsHintCount = secsCountDown.find('.hint-count');

            /* how long the timer runs for */
            var initialOffset = 2160;
            var i = 1;

            setInitialText(date.d, daysHintCount);
            setInitialText(date.h, hoursHintCount);
            setInitialText(date.m, minutesHintCount);
            setInitialText(date.s, secsHintCount);

            //set counter text
            //setText(opts, hintCount, i);


            //draw initial hexagon
            track.css('stroke', opts.track);

            function setCounter(){
                daysFill.css({
                    'stroke': opts.fill,
                    'stroke-dashoffset': initialOffset - (i * (initialOffset / date.d))
                    //'transition': 'stroke-dashoffset 1s ' + opts.transition
                });


                hoursFill.css({
                    'stroke': opts.fill,
                    'stroke-dashoffset': initialOffset - ((i * (initialOffset / 24)) * date.h )
                    //'transition': 'stroke-dashoffset 1s ' + opts.transition
                });

                minutesFill.css({
                    'stroke': opts.fill,
                    'stroke-dashoffset': initialOffset - ((i * (initialOffset / 60)) * date.m)
                    //'transition': 'stroke-dashoffset 1s ' + opts.transition
                });

                secsFill.css({
                    'stroke': opts.fill,
                    'stroke-dashoffset': initialOffset - ((i * (initialOffset / 60)) * date.s)
                });

            }

            setCounter();

            //run timer
            var interval = setInterval(function () {
                /*secsFill.css({
                    'stroke-dashoffset': initialOffset - ((i * (initialOffset / date.s))),
                    'transition': 'stroke-dashoffset 1s ' + opts.transition
                });*/
                secsFill.css({
                    'stroke': opts.fill,
                    //'stroke-dashoffset': initialOffset - ((i * (initialOffset / 60)) * date.s)
                    //'stroke-dashoffset': initialOffset - ((i * (initialOffset / date.s)))
                    //'stroke-dashoffset': initialOffset - ((i * (initialOffset /  date.s)) + ((initialOffset / 60)* date.s))
                    //'stroke-dashoffset': initialOffset - ((i * (initialOffset / 60)) * date.s)
                    'stroke-dashoffset': initialOffset - (i * (initialOffset / 60))

                });
                //console.log(i * (initialOffset /  date.s));
                //console.log(initialOffset / 60);
                //if(date.s )
                setText(date.s, secsHintCount, i);
                //console.log(i);
                //console.log(date.s);
                if (i == date.s) {
                    console.log(i);
                    console.log(date.s);
                    console.log('time to rewrite');
                    //date.s = 60;
                    //i++;
                    parseDate(opts.date);
                    setCounter();
                    setInitialText(date.d, daysHintCount);
                    setInitialText(date.h, hoursHintCount);
                    setInitialText(date.m, minutesHintCount);
                    setInitialText(date.s, secsHintCount);
                    i = 1;
                    /*secsFill.css({
                        //'stroke-dashoffset': initialOffset - (i * (initialOffset / date.s)),
                        'stroke-dashoffset': initialOffset - ((i * (initialOffset / 60)) * date.s)
                    });*/
                    //clearInterval(interval);
                }
                i++;
            }, 1000);
        });
    };

    $.fn.svgCountDown.defaults = {
        date: '2017-01-23T00:00:00',
        direction: 'forward',
        track: 'rgb(56, 71, 83)',
        fill: 'rgb(104, 214, 198)',
        transition: 'linear'
    }
}(jQuery));