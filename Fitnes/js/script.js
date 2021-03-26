const filterButtons=document.querySelector("#filter-btns").children;
const items=document.querySelector(".portfolio-gallery").children;


for(let i=0; i<filterButtons.length; i++){
	filterButtons[i].addEventListener("click",function(){
		for(let j=0; j<filterButtons.length; j++){
			filterButtons[j].classList.remove("active")
		}
		this.classList.add("active");
		const target=this.getAttribute("data-target")
		for(let k=0; k<items.length; k++){
			items[k].style.display="none";
			if (target==items[k].getAttribute("data-id")) {
							items[k].style.display="block";

			}

			if (target=="all") {

			items[k].style.display="block";

			}

		}
 	})
}
 const closeLightbox=document.querySelector(".close-lightbox");
 const lightbox=document.querySelector(".lightbox");
 const lightboxImage=lightbox.querySelector("img")
//close lightbox clicking outside of image area

lightbox.addEventListener("click", function(){
	if (event.target!=lightboxImage) {
		lightbox.classList.remove("show");
 	lightbox.classList.add("hide");
	}

})//xxxxclose lightbox clicking outside of image area



 closeLightbox.addEventListener("click",function(){
 	lightbox.classList.remove("show");
 	lightbox.classList.add("hide");
 })
 //when click + show lightbox//
 const gallery=document.querySelector(".portfolio-gallery");
 const galleryItem=gallery.querySelectorAll(".item");

 galleryItem.forEach(function(element){
 	element.querySelector(".moj").addEventListener("click",function(){
 		lightbox.classList.remove("hide");
 		lightbox.classList.add("show");
 		lightboxImage.src=element.querySelector("img").getAttribute("src")
 	})
 })
 

 
//<!--Testimional slider-->
const sliderContainer=document.querySelector(".testi-slider");
const slides=sliderContainer.children;
const containerWidth=sliderContainer.offsetWidth;
const margin=30;
let itemPerSlide=0;
let slideDots;
//responsive
const responsive=[ 
	{brakePoint: {width:0, item:1}}, //if window width > 0 then 1 item show in slide
	{brakePoint: {width:991, item:2}}, //if window width > 991 then 2 item show in slide
]
function load(){
	for(let i=0; i<responsive.length; i++){
		if (window.innerWidth>responsive[i].brakePoint.width){
			itemPerSlide=responsive[i].brakePoint.item;
		}

	}
	start();

}

function start(){
	totalWidth=0;
 for( let i=0; i<slides.length; i++){
	slides[i].style.width=(containerWidth/itemPerSlide)-margin + "px";
	slides[i].style.margin=margin/2 + "px";
	totalWidth+=containerWidth/itemPerSlide;
}
sliderContainer.style.width=totalWidth + "px";
//DOTS
 slideDots=Math.ceil(slides.length/itemPerSlide);
for(let i=0; i<slideDots; i++){
	const div=document.createElement("div");
	div.id=i;
	div.setAttribute("onclick", "controlSlide(this)");
	if(i==0){
		div.classList.add("active");
	}
	document.querySelector(".slide-controls").appendChild(div);}
}
let currentSlide=0;
let autoSlide=0;
function controlSlide(element){
	//when click on controlButtons clear timer
	clearInterval(timer) 
  timer=setInterval(autoPlay,5000);
  //when click on controlButtons clear timer---------
autoSlide=element.id;
	currentSlide=element.id;
	changeSlide(currentSlide)

}
function changeSlide(currentSlide){
	controlButtons=document.querySelector(".slide-controls").children;
	for(let i=0; i<controlButtons.length; i++){
		controlButtons[i].classList.remove("active")
	}
	//console.log(currentSlide)
	controlButtons[currentSlide].classList.add("active")
	//Animate slider
	sliderContainer.style.marginLeft=-(containerWidth*currentSlide) +"px";

}
//autoplay slide
function autoPlay(){
console.log("call")
if(autoSlide==slideDots-1){
	autoSlide=0;
}
else{
	autoSlide++;

}
changeSlide(autoSlide)
}
//when click on controlButtons clear timer



let timer=setInterval(autoPlay,5000);
 
window.onload=load();