/**
 * Created by decipher on 8.11.16.
 */
(function ($) {
    'use strict';
    function setText(time, counter) {
        var count;
        if (time === 0) {
            count = 0;
        } else {
            count = 60 - time
        }

        counter.text(count);
    }

    function setInitialText(time, counter){
        counter.text(time);
    }

    var testDate = '2017-01-23T00:00:00';

    function parseDate(date) {
        var dfd = jQuery.Deferred();
        var dateToParse = date;

        setTimeout(function() {
            var countDownDate = new Date(dateToParse);
            var dateNow = new Date();
            var diff = (countDownDate - dateNow) / 1000;
            var d = Math.floor(diff / 86400);
            var h = Math.floor(diff % 86400 / 3600);
            var m = Math.floor(diff % 86400 % 3600 / 60);
            var s = Math.floor(diff % 86400 % 3600 % 60);
            console.log(d + ' days, ' + h + ' hours, ' + m + ' minutes, ' + s + ' seconds');
            var date = {
                date: countDownDate,
                diff: diff,
                d: d,
                h: h,
                m: m,
                s: s
            };
            dfd.resolve(date);
        });

        return dfd.promise();

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

        var date;
        var $this = this;

        parseDate(opts.date).then(function(status, data){
            date = status;
            runCountDown();
        });



        function runCountDown(){
            return $this.each(function () {
                // Build dom for svg countdown
                var parentEl = $(this);
                parentEl.append(template);

                //define dom elements
                var track = parentEl.find('.track');
                var daysCountDown = parentEl.find('.svg-days-counter');
                var daysFill = daysCountDown.find('.fill');
                var daysHintCount = daysCountDown.find('.hint-count');

                var hoursCountDown = parentEl.find('.svg-hours-counter');
                var hoursFill = hoursCountDown.find('.fill');
                var hoursHintCount = hoursCountDown.find('.hint-count');

                var minutesCountDown = parentEl.find('.svg-minutes-counter');
                var minutesFill = minutesCountDown.find('.fill');
                var minutesHintCount = minutesCountDown.find('.hint-count');

                var secsCountDown = parentEl.find('.svg-seconds-counter');
                var secsFill = secsCountDown.find('.fill');
                var secsHintCount = secsCountDown.find('.hint-count');

                /* how long the timer runs for */
                var initialOffset = 2160;
                var i = date.s;

                setInitialText(date.d, daysHintCount);
                setInitialText(date.h, hoursHintCount);
                setInitialText(date.m, minutesHintCount);
                setText(i, secsHintCount);

                //draw initial hexagon
                track.css('stroke', opts.track);

                function setCounter(){
                    daysFill.css({
                        'stroke': opts.fill,
                        'stroke-dashoffset': initialOffset - (initialOffset / date.d),
                        'transition': 'stroke-dashoffset 1s ' + opts.transition
                    });


                    hoursFill.css({
                        'stroke': opts.fill,
                        'stroke-dashoffset': initialOffset - ((initialOffset / 24) * (24 - date.h) ),
                        'transition': 'stroke-dashoffset 1s ' + opts.transition
                    });

                    minutesFill.css({
                        'stroke': opts.fill,
                        'stroke-dashoffset': initialOffset - ((initialOffset / 60) * (60 - date.m) ),
                        'transition': 'stroke-dashoffset 1s ' + opts.transition
                    });
                }


                setCounter();
                secsFill.css({
                    'stroke': opts.fill,
                    'stroke-dashoffset': initialOffset - ((initialOffset / 60) * date.s)
                });

                //run timer
                var interval = setInterval(function () {

                    if (i == 60) {
                        i = 0;
                        parseDate(opts.date).then(function(status){
                            date = status;
                            console.log(status);
                            setCounter();
                            setInitialText(date.d, daysHintCount);
                            setInitialText(date.h, hoursHintCount);
                            setInitialText(date.m, minutesHintCount);
                            //setText(i, secsHintCount);

                        });
                    }
                    setText(i, secsHintCount);
                    if (i == 0){
                        secsFill.css({

                            'stroke': opts.fill,
                            'stroke-dashoffset': initialOffset - ((initialOffset / 60)* i),
                            'transition': 'none '
                        });
                    } else {
                        secsFill.css({
                            'stroke': opts.fill,
                            'stroke-dashoffset': initialOffset - ((initialOffset / 60)* i),
                            'transition': 'stroke-dashoffset 1s ' + opts.transition

                        });

                    }
                    i++;
                }, 1000);
            });
        }


    };

    $.fn.svgCountDown.defaults = {
        date: '2017-01-23T00:00:00',
        direction: 'forward',
        //track: 'rgb(56, 71, 83)',
        track: '#582C27',
        //fill: 'rgb(104, 214, 198)',
        fill: '#DD1F2C',
        transition: 'linear'
    }
}(jQuery));