$(document).ready(function(){
    $.msParallax = new parallaxBackground();

    function parallaxBackground() {

        function parallaxObj(el) {
            this.el = $(el);
            this.calculate();
        }

        parallaxObj.prototype.calculate = function() {
            this.topRatio = getRatio((win.scrollTop() + win.height()) - this.el.offset().top);
            this.midRatio = getRatio((win.scrollTop() + win.height()) - (this.el.offset().top + this.el.outerHeight() / 2));
            this.botRatio = getRatio((win.scrollTop() + win.height()) - (this.el.offset().top + this.el.outerHeight()));
        }

        function getRatio(val) {
            return val / win.height() * 1;
        }

        function checkScrollPos() {
            $.each(backgrounds, function(i, bg) {
                this.calculate();

                //if the background container is in the browser viewport
                if (this.topRatio > -0.2 && this.botRatio < 1.2) {
                    var topPosition = Math.round(this.midRatio * -100);
                    this.el.css({'background-position': '50% ' + topPosition + 'px'});
                }
            });
        }

        var win = $(window);

        var backgrounds = $('.ms-parallax-background').map(function(i, el) {
            return new parallaxObj(el);
        }).toArray();

        $(document).scroll($.throttle(10, checkScrollPos));

        $(window).resize($.debounce(400, checkScrollPos));
    }
});