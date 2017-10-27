(_=>{
  let ua = window.navigator.userAgent.toLowerCase(); 
  let btns = document.getElementsByClassName("addBtn");
  let toggleBtn = document.getElementById("toggleSlectedBtn");
  let searchForm = document.getElementById("searchForm");
  let inputBox = document.getElementById("search");
  let keys= localStorage.getItem("words")?JSON.parse(localStorage.getItem("words")):[];
  let selected = document.getElementsByClassName("selected");
  let selectedDiv;
  let changeSearchPositon = ()=>{
    inputBox.addEventListener('focus',e=>{
      searchForm.style.margin = "50px 0";
      setTimeout(()=>{
        searchForm.style.margin = "0";
      },3500);
    });
    inputBox.addEventListener('blur',e=>{
      searchForm.style.margin = "0";
    });
  }
  let fromSubmit = ()=>{
    searchForm.addEventListener("submit",(e)=>{
      let key = inputBox.value;
      if(key.length>1) key=key.substring(0,1);
      console.log(key);
      inputBox.blur();
      if(document.getElementById(key)){
        location.hash = key;
      }else{
        let info = nameData[inputBox.value];
        if(info) alert(info);
        else alert("未找到此字");
      }
      inputBox.value = "";
      //info.innerText = data[inputBox.value];
      e.preventDefault();
    });
  }
  let saveWords = w=>{
    localStorage.setItem("words",JSON.stringify(keys));
  }
  let clearBtnClick = e=>{
      keys = [];
      localStorage.setItem("words","[]");
      showWords();
      if(keys.length==0) wordHide();
  }
  let addEventToClear = ()=>{
      document.getElementById("clear").addEventListener('touchend',clearBtnClick);
      Array.from(selected).forEach(i=>{
        i.addEventListener('touchend', gotoSelected);
      });
  }
  let addEvents = ()=>{
    Array.from(btns).forEach(i=>{
      i.addEventListener('touchend', btnClick);
    });
    toggleBtn.addEventListener('touchend',toggleBtnClick);
    fromSubmit();
    if(/micromessenger/.exec(ua)) changeSearchPositon();
    // for(let i=0; i<btns.length; i++){
    //   btns[i].addEventListener('touchend', btnClick);
    // }
  }
  let wordHide = ()=>{
    toggleBtn.innerText = "显示已选字";
    selectedDiv.style.margin = "0 0 -100px 0";
  }
  let wordShow = ()=>{
    toggleBtn.innerText = "隐藏已选字";
    selectedDiv.style.margin = "0";
  }
  let toggleBtnClick = e=>{
    if(toggleBtn.innerText=="显示已选字"){
      wordShow();
    }else{
      wordHide();
    }
  };
  let btnClick = e=>{
    //   console.log("HI");
    //   console.log(e.srcElement.parentElement.id);
      let word = e.srcElement.parentElement.id;
      if(keys.indexOf(word)<0) keys.push(word);
      saveWords();
      showWords();
  };
  let gotoSelected = e=>{
     let key = e.srcElement.innerText;
     location.hash = key;
  }
  let initWordDiv = ()=>{
    let wordDiv = document.createElement('div');
    wordDiv.id="selectedDiv";
    document.getElementsByTagName('body')[0].appendChild(wordDiv);
    selectedDiv = document.getElementById("selectedDiv");   
    showWords();
    wordHide();
  };
  let showWords = w=>{
      let words = "";
      keys.forEach(w=>{
          words+=`<span class="selected">${w}</span>`; 
      });
      selectedDiv.innerHTML =`<div><div>已选字：<span id="clear">清空</span></div>${words}</div>`;
      addEventToClear();
      wordShow();
  };
  addEvents();
  initWordDiv();
  console.log("AAAA");
})();