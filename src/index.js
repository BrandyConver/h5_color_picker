/*
version: 2019-03  0.0.1
author: BrandyConver
*/
// { ele: '#inputpicker', showText: true, afterPick: callback () {...}, height: 200}
var colorPicker = function (param) {
  let component = createCanvasComponent();
  let {compdiv, canvas1, canvas2} = component;
  let target = document.querySelector(param.ele);

  
  compdiv.addEventListener('click', function () {
    console.log('click comp');
    event.stopPropagation();
  });

  canvas1.addEventListener('click', function () {
    let ctxcl = canvas1.getContext('2d');
    event.stopPropagation();
  });

  canvas2.addEventListener('click', function () {
    let ctxln = canvas2.getContext('2d');
    event.stopPropagation();
  });

  //
  target.addEventListener('click',function(){
    showComp();
    event.stopPropagation();
    event.preventDefault(); // button
  });

  // create color picker component
  function createCanvasComponent () {
    let height = 200;
    if (param.height !== undefined) { height = param.height }
    let component = document.createElement('div');
    component.style.border = '5px solid #666';
    component.style.width = height + height/5+ 'px'; // 4% + 16% 
    component.style.height = height + 'px';

    let canvas1 = document.createElement('canvas');
    canvas1.width = canvas1.height = height;
    const ctxln = canvas1.getContext('2d');

    // let lightness = ctxln.createLinearGradient(0,0,height,0); // 水平渐变
    // lightness.addColorStop(0, '#fff')
    // lightness.addColorStop(1, '#fff');
    // ctxln.fillStyle = lightness;
    // ctxln.fillRect(0, 0, height, height);
    let mask = ctxln.createLinearGradient(0,height,0,0);  // 垂直渐变
    mask.addColorStop(0,'rgba(0,0,0,1)')
    mask.addColorStop(1,'rgba(0,0,0,0)')
    ctxln.fillStyle = mask;
    ctxln.fillRect(0, 0, height, height);
    
    let canvas2 = document.createElement('canvas')
    canvas2.height = height;
    let canvas2width = height*4/25;
    canvas2.width = canvas2width;
    canvas2.style.marginLeft = height/25 + 'px';
    component.appendChild(canvas1);
    component.appendChild(canvas2);
    const ctxcl = canvas2.getContext('2d');
    let colors = ctxcl.createLinearGradient(0, 0, 0, 150); // 垂直渐变
    colors.addColorStop(0.0000,'#f00');
    colors.addColorStop(0.1667,'#ff0');
    colors.addColorStop(0.3333,'#0f0');
    colors.addColorStop(0.5000,'#0ff');
    colors.addColorStop(0.6667,'#00f');
    colors.addColorStop(0.8333,'#f0f');
    colors.addColorStop(1.0000,'#f00');
    ctxcl.fillStyle = colors;
    ctxcl.fillRect(0, 0, canvas2width, height);
    component.style.display = 'none';
    document.body.appendChild(component);
    return {
      compdiv: component,
      canvas1,
      canvas2
    };
  }
  function hideComp () {
    compdiv.style.display = 'none';
  }
  // compute position and show
  function showComp () {
    compdiv.style.display = 'block';
  }
  window.addEventListener('click',function () {
    hideComp();
  })


}
// export default {colorPicker};
// module export.colorPicker