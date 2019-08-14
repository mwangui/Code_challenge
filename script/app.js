'use strict';

/* Please see the README.md for the running project locally */


// global variable
const endPoint           = 'https://www.westelm.com/services/catalog/v4/category/shop/new/all-new/index.json';
const itemContainer      = document.getElementById('items');
const mask               = document.getElementsByClassName('ui-widget-overlay');
const quickViewContainer = document.getElementById('quick-view-container');
const imsageWrapper      = document.getElementsByClassName('imsage-wrapper');
const overlayContainer   = document.getElementsByClassName('container');
const indicatorBar       = document.getElementById('indicator-bar');
const imageSlider        = document.getElementById('slider');
const closeQuickView     = document.getElementsByClassName('close-icon');
const nextButton         = document.getElementsByClassName('btn-next');
const prevButton         = document.getElementsByClassName('btn-prev');
let sliderPosition       = 0;
let totalImageNum        = 0;
let products;
let article;
let photoLink;
let itemPrice;
let itemName;
let imgTitle;
let dot;
let detailImg;
let totalDot;


// fetch Data
const fetchData = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', endPoint , true);
    xhr.onload = function () {
        if (this.readyState === 4 && this.status === 200){
            products = JSON.parse(this.responseText);
            generateData(products);
        }
    };
    xhr.send();
};
fetchData();

// render product from the Endpoint
const generateData = (products) => {
    for ( let item in products.groups) {
        article             = document.createElement('article');
        photoLink           = document.createElement('a');
        itemPrice           = document.createElement('div');
        itemName            = document.createElement('div');
        photoLink.href      = '#';
        photoLink.innerHTML = ('<img class="item-image" src=" ' + products.groups[item].hero.href + ' " alt=" ' + products.groups[item].name  + ' " >');
        itemName.className  = ('item-name');
        itemName.innerHTML  = ('<a href=" ' + products.groups[item].links.www + ' " > ' + products.groups[item].name  + '</a>');
        itemPrice.className = ('item-price');
        itemPrice.innerHTML = ('<span class="item-price-tag">' + '$' + products.groups[item].priceRange.selling.low + ' -- ' + '$' + products.groups[item].priceRange.selling.high + '</span>');
        article.appendChild(photoLink);
        article.appendChild(itemName);
        article.appendChild(itemPrice);
        itemContainer.appendChild(article);

        // render images for carousel
        (function detailInfo(item) {
            photoLink.addEventListener("click", function(e){
                e.preventDefault();
                mask[0].classList.remove('hidden');
                quickViewContainer.classList.remove('hidden');

                for ( let image in products.groups[item].images ) {
                    dot                 = document.createElement('li');
                    dot.className       = ('dot');
                    detailImg           = document.createElement('div');
                    detailImg.innerHTML = ('<img src="' + products.groups[image].images[image].href + '">');

                    imgTitle            = document.createElement('div');
                    imgTitle.className  = ('img-title');
                    imgTitle.innerHTML  = ('<span href=" ' + products.groups[item].links.www + ' " > ' + products.groups[item].name  + '</span>');

                    imsageWrapper[0].appendChild(imgTitle);
                    imageSlider.appendChild(detailImg);
                    imsageWrapper[0].appendChild(imageSlider);
                    indicatorBar.appendChild(dot);
                    overlayContainer[0].appendChild(indicatorBar);
                    totalImageNum =  image;
                    totalDot = document.querySelectorAll('.dot');
                    totalDot[sliderPosition].classList.add('active');
                }
            });
        }(item));

    }
};

closeQuickView[0].addEventListener("click", function(e){
    e.preventDefault();
    mask[0].classList.add('hidden');
    quickViewContainer.classList.add('hidden');
    indicatorBar.innerHTML = '';
    imageSlider.innerHTML  = '';
    imsageWrapper[0].innerHTML = '';
    sliderPosition         = 0;
    imageSlider.style.marginLeft = 0 + '%';
});

nextButton[0].addEventListener("click", function(e){
    e.preventDefault();
    sliderPosition = ( sliderPosition < totalImageNum ) ? (sliderPosition + 1) : sliderPosition;
    imageSlider.style.marginLeft =  -sliderPosition * 100 +'%';
    if ( sliderPosition > 0 ) {
        totalDot[sliderPosition - 1].classList.remove('active');
    }
    totalDot[sliderPosition].classList.add('active');
});

prevButton[0].addEventListener("click", function(e){
    e.preventDefault();
    sliderPosition = ( sliderPosition > 0 && sliderPosition <= totalImageNum) ? ( sliderPosition - 1) : sliderPosition;
    imageSlider.style.marginLeft =  -sliderPosition * 100 +'%';
    if ( sliderPosition <= totalImageNum ) {
        totalDot[sliderPosition + 1].classList.remove('active');
    }
    totalDot[sliderPosition].classList.add('active');
});




