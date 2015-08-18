var Picchu = {

    addClass: function (el, kls) {
        if (!el.className.match(new RegExp("\\b\\s\?"+kls+"\\b"),'')) {
            return el.className = el.className+" "+kls;
        }
    },

    removeClass: function(el, kls) {
        el.className = el.className.replace(new RegExp("\\b\\s\?"+kls+"\\b"),'');
    },

    hasClass: function(el, kls) {
        return (' ' + el.className + ' ').indexOf(' ' + kls + ' ') > -1;
    }

}

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
    var htmlTag = document.getElementsByTagName('html')[0];
    Picchu.addClass(htmlTag, "ie"+document.documentMode);
}

window.onload = function(){
    // add disabled class to label elements
    var lbList = document.getElementsByTagName('label');

    for (i = 0; i < lbList.length; i++) {
        var l = lbList[i],
            d = document.getElementById(l.htmlFor) ? document.getElementById(l.htmlFor) : document.getElementsByName(l.htmlFor)[0];
        if (d && d.disabled == true) {
            Picchu.addClass(l, "disabled");
        }
    }

    // add checked class to checkbox label elements
    var cbList = document.querySelectorAll('label input[type=checkbox]');

    for (i = 0; i < cbList.length; i++) {
        assignCheckboxClasses(cbList[i]);

        cbList[i].addEventListener('click', function(){
            updateCheckbox(this);
        });
    }

    function assignCheckboxClasses(cb) {
        if (cb.checked) {
            Picchu.addClass(cb.parentNode, "checked");
        }
    }

    function updateCheckbox(cb) {
        var lb = cb.parentNode;

        if (Picchu.hasClass(lb, "checked")) {
            Picchu.removeClass(lb, "checked");
        } else {
            Picchu.addClass(lb, "checked");
        }
    }
}