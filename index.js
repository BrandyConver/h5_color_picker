var colorPicker = function (param) {
    var target = document.querySelector(param.ele);
    var targetX = target.getBoundingClientRect().left + document.documentElement.scrollLeft + target.clientWidth / 2;
    var targetY = target.getBoundingClientRect().top + document.documentElement.scrollTop + target.clientHeight + 10;
    var component = createCanvasComponent();
    var compdiv = component.compdiv, canvas1 = component.canvas1, canvas2 = component.canvas2;
    console.log(targetX, targetY);
    canvas1.addEventListener('click', function () {
        var ctxcl = canvas1.getContext('2d');
        var ctxln = canvas2.getContext('2d');
        event.stopPropagation();
    }, true);
    canvas2.addEventListener('click', function () {
        var ctxln = canvas2.getContext('2d');
        event.stopPropagation();
    }, true);
    target.addEventListener('click', function () {
        showComp();
        event.stopPropagation();
        event.preventDefault();
    });
    function createCanvasComponent() {
        var height = 200;
        if (param.height !== undefined) {
            height = param.height;
        }
        var component = document.createElement('div');
        component.style.boxShadow = '0 0 10px 1px #222';
        component.style.width = height + height / 5 + 'px';
        component.style.height = height + 'px';
        component.style.position = "absolute";
        component.style.top = targetY + 'px';
        component.style.left = targetX - height * 3 / 6 + 'px';
        var canvas1 = document.createElement('canvas');
        canvas1.width = canvas1.height = height;
        var ctxln = canvas1.getContext('2d');
        var mask = ctxln.createLinearGradient(0, height, 0, 0);
        mask.addColorStop(0, 'rgba(0,0,0,1)');
        mask.addColorStop(1, 'rgba(0,0,0,0)');
        ctxln.fillStyle = mask;
        ctxln.fillRect(0, 0, height, height);
        var canvas2 = document.createElement('canvas');
        canvas2.height = height;
        var canvas2width = height * 4 / 25;
        canvas2.width = canvas2width;
        canvas2.style.marginLeft = height / 25 + 'px';
        component.appendChild(canvas1);
        component.appendChild(canvas2);
        var ctxcl = canvas2.getContext('2d');
        var colors = ctxcl.createLinearGradient(0, 0, 0, 150);
        colors.addColorStop(0.0000, '#f00');
        colors.addColorStop(0.1667, '#ff0');
        colors.addColorStop(0.3333, '#0f0');
        colors.addColorStop(0.5000, '#0ff');
        colors.addColorStop(0.6667, '#00f');
        colors.addColorStop(0.8333, '#f0f');
        colors.addColorStop(1.0000, '#f00');
        ctxcl.fillStyle = colors;
        ctxcl.fillRect(0, 0, canvas2width, height);
        component.style.display = 'none';
        document.body.appendChild(component);
        return {
            compdiv: component,
            canvas1: canvas1,
            canvas2: canvas2
        };
    }
    function hideComp() {
        compdiv.style.display = 'none';
    }
    function showComp() {
        compdiv.style.display = 'block';
    }
    window.addEventListener('click', function () {
        hideComp();
    }, true);
};
//# sourceMappingURL=index.js.map