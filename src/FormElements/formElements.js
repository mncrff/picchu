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

window.onload = new function(){
    var cbList = document.querySelectorAll('label input[type=checkbox]');
    var disabledList = document.querySelectorAll('input[disabled]');

    console.log(disabledList);

    for (i = 0; i < cbList.length; i++) {
        assignCheckboxClasses(cbList[i]);

        cbList[i].addEventListener('click', function(){
            updateCheckbox(this);
        });
    }

    function assignCheckboxClasses(cb) {
        var lb = cb.parentNode;

        if (cb.checked) {
            addClass(lb, "checked");
        }
        if (cb.disabled) {
            addClass(lb, "disabled");
        }
    }

    function updateCheckbox(cb) {
        var lb = cb.parentNode;
        console.log(lb);

        if (hasClass(lb, "checked")) {
            removeClass(lb, "checked");
        } else {
            addClass(lb, "checked");
        }
    }

    function addClass(el, kls) {
        if (!el.className.match(new RegExp("\\b\\s\?"+kls+"\\b"),'')) {
            return el.className = el.className+" "+kls;
        }
    }
    function removeClass(el, kls) {
        el.className = el.className.replace(new RegExp("\\b\\s\?"+kls+"\\b"),'');
    }
    function hasClass(el, kls) {
        return (' ' + el.className + ' ').indexOf(' ' + kls + ' ') > -1;
    }
}