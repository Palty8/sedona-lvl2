var mainNav=document.querySelector(".main-nav"),navToggle=document.querySelector(".main-nav__toggle");mainNav.classList.remove("main-nav--nojs"),navToggle.addEventListener("click",function(){mainNav.classList.contains("main-nav--closed")?(mainNav.classList.remove("main-nav--closed"),mainNav.classList.add("main-nav--opened")):(mainNav.classList.remove("main-nav--opened"),mainNav.classList.add("main-nav--closed"))});