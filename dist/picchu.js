// use feature detection
if (typeof Modernizr !== 'undefined') {

    Modernizr.addTest('css-checked', function(){
        return Modernizr.testStyles('#modernizr input {width:100px} #modernizr :checked {width:200px;display:block}', function(elem, rule){
            var cb = document.createElement('input');
            cb.setAttribute("type", "checkbox");
            cb.setAttribute("checked", "checked");
            elem.appendChild(cb);
            return cb.offsetWidth == 200;
        });
    });

    Modernizr.addTest('css-sibselector', function(){
        return Modernizr.testStyles('#modernizr label {width:100px} #modernizr label ~ span {width:200px;display:block}', function(elem, rule){
            var la = document.createElement('label');
            var sp = document.createElement('span');
            elem.appendChild(la);
            elem.appendChild(sp);
            return sp.offsetWidth == 200;
        });
    });
}

// detect version of IE for special circumstances where feature detection is useless
if (typeof document.documentMode !== "undefined") {
    $('html').addClass("ie"+document.documentMode);
}

(function($) {
    // declare var in global scope
    window.Picchu = {};

    Picchu.formElements = {
        init: function() {
            this.setDisabled();
        },
        setDisabled: function() {
            // add disabled class to label elements
            var lbList = document.getElementsByTagName('label');
            for (i = 0; i < lbList.length; i++) {
                var l = lbList[i],
                    d = document.getElementById(l.htmlFor) ? document.getElementById(l.htmlFor) : document.getElementsByName(l.htmlFor)[0];
                if (d && d.disabled == true) {
                    $(l).addClass("disabled");
                }
            }
        }
    }
 
})(jQuery);

$(function() {
    Picchu.formElements.init();
    // // add disabled class to label elements
    // var lbList = document.getElementsByTagName('label');

    // for (i = 0; i < lbList.length; i++) {
    //     var l = lbList[i],
    //         d = document.getElementById(l.htmlFor) ? document.getElementById(l.htmlFor) : document.getElementsByName(l.htmlFor)[0];
    //     if (d && d.disabled == true) {
    //         $(l).addClass("disabled");
    //     }
    // }
});