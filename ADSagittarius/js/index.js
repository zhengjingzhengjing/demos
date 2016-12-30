/**
 * Created by Administrator on 2016/11/3.
 */
$(function(){

    /*banner轮播图js*/
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 30,
        hashnav: true,
        hashnavWatchState: true,
        autoplay:3000,
        effect : 'fade',
        fade: {
            crossFade: false,
        }
    });

})


function $$$ID(_Id){
    return document.getElementById(_Id);
}
function hide(_Id){
    $$$ID(_Id).style.display = $$$ID(_Id).style.display == 'none'?'':'none';  
    $$$ID('sanjiao').className = $$$ID('sanjiao').className == 'sanjiao2'?'':'sanjiao2';  
}
function pick1(_Id){
    var divs = $$$ID('languageSel').getElementsByTagName('div');
    for(var i=0;i<divs.length;i++){
        divs[i].onclick = function(){
            $$$ID('languageInput').innerHTML = this.innerHTML;
            hide('languageSel');
        } 
    }   
}
pick1('language');
