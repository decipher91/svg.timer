/**
 * Created by decipher on 1.11.16.
 */
var config = {
    time: 60,
    track: 'rgb(56, 71, 83)',
    fill: 'rgb(104, 214, 198)',
    transition: 'linear'
};

    $(function(){
        //define dom elements
        var parentEl = $('.svg-hexagonal-counter');
        var track = parentEl.find('.track');
        var fill = parentEl.find('.fill');
        var counterText = parentEl.find('h2');

        //set config params
        var time = config.time; /* how long the timer runs for */
        var initialOffset = '2160';
        var i = 1;

        //run timer
        var interval = setInterval(function() {
            track.css('stroke', config.track);
            fill.css({
                'stroke': config.fill,
                'stroke-dashoffset': initialOffset-(i*(initialOffset/time)),
                'transition': 'stroke-dashoffset 1s ' +  config.transition
            });
            counterText.text(i);
            if (i == time) {
                clearInterval(interval);
            }
            i++;
        }, 1000);
    });
