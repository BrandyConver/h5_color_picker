/*
version: 2019-03  0.0.1
author: BrandyConver
script "tsc filename.js"
*/

interface pickParam  {ele : string, height? : number , showText? : boolean , afterPick? : object}
let colorPicker = function (param : pickParam) {
  let target = document.querySelector(param.ele);
  let targetX  = target.getBoundingClientRect().left + document.documentElement.scrollLeft + target.clientWidth/2;
  let targetY  = target.getBoundingClientRect().top + document.documentElement.scrollTop + target.clientHeight + 10;
  let component = createCanvasComponent();
  let {compdiv, canvas1, canvas2} = component;
  console.log(targetX,targetY)

  // 
  // compdiv.addEventListener('click', function () {
  //   console.log('click comp');
  //   event.stopPropagation();
  // });

  // 亮度选择
  canvas1.addEventListener('click', function () {
    let ctxcl = canvas1.getContext('2d');
    let ctxln = canvas2.getContext('2d');
    // 获取点击位置 getImg 
    event.stopPropagation();
  },true);
  // 色调选择
  canvas2.addEventListener('click', function (event: any) {
    let ctxln = canvas2.getContext('2d');
    // 获取点击位置 getImg 
    let x = (event.clientX - event.target.offsetLeft)*300/event.target.offsetWidth;
    let y = (event.clientY-event.target.offsetTop)*150/event.target.offsetHeight;
    event.stopPropagation();
  },true);

  // 点击弹出颜色选择器
  target.addEventListener('click',function(){
    showComp();
    event.stopPropagation();
    event.preventDefault(); // button
  });

  // create color picker component 返回相关组件
  function createCanvasComponent () :{ compdiv:any, canvas1: any, canvas2: any } {
    let height = 200;
    if (param.height !== undefined) { height = param.height }
    let component = document.createElement('div');
    component.style.boxShadow = '0 0 10px 1px #222';
    component.style.width = height + height/5+ 'px'; // 4% + 16% 
    component.style.height = height + 'px';
    component.style.position = "absolute";
    component.style.top = targetY + 'px';
    component.style.left = targetX - height*3/6 + 'px';

    let canvas1 = document.createElement('canvas');
    canvas1.width = canvas1.height = height;
    const ctxln = canvas1.getContext('2d');

    // let lightness = ctxln.createLinearGradient(0,0,height,0); // 水平渐变
    // lightness.addColorStop(0, '#fff')
    // lightness.addColorStop(1, '#fff');
    // ctxln.fillStyle = lightness;
    // ctxln.fillRect(0, 0, height, height);
    let mask = ctxln.createLinearGradient(0,height,0,0);  // 亮度垂直渐变
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
    let colors = ctxcl.createLinearGradient(0, 0, 0, 150); // 色调垂直渐变
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
  // 事件捕获，最先触发
  window.addEventListener('click',function () {
    hideComp();
  },true)


}
// export default {colorPicker};
// module export.colorPicker