/* Tiny bridge for accessible kiosk controls, without replacing student's game logic. */
(function(){'use strict';
  document.addEventListener('keydown',function(event){
    if(event.key==='Escape'){
      event.preventDefault();
      if(window.parent!==window)window.parent.postMessage({source:'psycho-arcade-game',type:'exit'},'*');
    }
  });
  window.addEventListener('message',function(event){
    if(event.source!==window.parent || !event.data || event.data.source!=='psycho-arcade'||event.data.type!=='virtual-key')return;
    const code=event.data.code;
    if(!['ArrowLeft','ArrowRight','ArrowDown','ArrowUp','Space'].includes(code))return;
    const action=event.data.action==='down'?'keydown':'keyup';
    const key=code==='Space'?' ':code;
    document.dispatchEvent(new KeyboardEvent(action,{key,code,bubbles:true,cancelable:true}));
  });
})();
