(_=>{
  let btns = document.getElementsByClassName('addBtn');
  let keys= localStorage.getItem("words")?JSON.parse(localStorage.getItem("words")):[];
  let selectedDiv;
  let saveWords = w=>{
    localStorage.setItem("words",JSON.stringify(keys));
  }
  let clearBtnClick = e=>{
      keys = [];
      localStorage.setItem("words","[]");
      showWords();
      if(keys.length==0) selectedDiv.style.margin = "0 0 -100px 0";
  }
  let addEventToClear = ()=>{
      document.getElementById("clear").addEventListener('touchend',clearBtnClick);
  }
  let addEventToAddBtn = ()=>{
    Array.from(btns).forEach(i=>{
      i.addEventListener('touchend', btnClick);
    });
    // for(let i=0; i<btns.length; i++){
    //   btns[i].addEventListener('touchend', btnClick);
    // }
  }
  let btnClick = (e)=>{
    //   console.log("HI");
    //   console.log(e.srcElement.parentElement.id);
      let word = e.srcElement.parentElement.id;
      if(keys.indexOf(word)<0) keys.push(word);
      saveWords();
      showWords();
  };
  let initWordDiv = ()=>{
    let wordDiv = document.createElement('div');
    wordDiv.id="selectedDiv";
    document.getElementsByTagName('body')[0].appendChild(wordDiv);
    selectedDiv = document.getElementById("selectedDiv");   
    showWords();
    if(keys.length==0) selectedDiv.style.margin = "0 0 -100px 0";
  };
  let showWords = w=>{
      let words = "";
      keys.forEach(w=>{
          words+=`<span class="selected">${w}</span>`; 
      });
      selectedDiv.innerHTML =`<div><div>已选字：<span id="clear">清空</span></div>${words}</div>`;
      selectedDiv.style.margin = "0";
      addEventToClear();
  };
  addEventToAddBtn();
  initWordDiv();
  console.log("AAAA");
})();