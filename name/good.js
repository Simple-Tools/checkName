(_=>{
  let btns = document.getElementsByClassName('addBtn');
  let keys= localStorage.getItem("words")?JSON.parse(localStorage.getItem("words")):[];
  let saveWords = w=>{
    localStorage.setItem("words",JSON.stringify(keys));
  }
  let clearBtnClick = e=>{
      console.log("CCC");
      keys = [];
      localStorage.setItem("words","[]");
      showWords();
  }
  let addEventToClear = ()=>{
      document.getElementById("clear").addEventListener('touchend',clearBtnClick);
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
    showWords();
  };
  let showWords = w=>{
      let words = "";
      keys.forEach(w=>{
          words+=`<span class="selected">${w}</span>`; 
      });
      document.getElementById("selectedDiv").innerHTML=`<div>已选字：<span id="clear">清空</span></div>${words}`;
      addEventToClear();
  }
  Array.from(btns).forEach((element) =>{
    element.addEventListener('touchend', btnClick);
  });
  initWordDiv();
  console.log("AAAA");
})();