/*
version: 2019-03  0.0.1
author: BrandyConver
*/
var atestfun = function (param) {
  // click body to hide component
  document.body.addEventListener('click',function(){

  })
  let target = document.querySelector(param.ele);
  target.addEventListener('click',function(){
    event.stopPropagation();
  })
  target.innerHTML = 'testfun';
  target.style.background="red"
}