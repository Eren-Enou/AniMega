const $ = window.$;

$(function () {

  
  const hasTouchEvent = ("ontouchstart" in window);


  const animeSlider = function (selectorName,btnWidth,slideMargin) {

console.log(selectorName,btnWidth,slideMargin)

    const $slideBlock = $(`#${selectorName}.widget-slide-block`);

    if (!$slideBlock.find(".widget-slide li.btn-anime").length) {
      return;
    }

    const moveSlideNum = $slideBlock.find(".js-widget-slide").data("slide") || 4;//How many move
    const animeW     = $slideBlock.find(".widget-slide li.btn-anime").eq(0).outerWidth();
    const animeCount = $slideBlock.find(".widget-slide li.btn-anime").length;//count total Anime
    const animeWidth = animeW + slideMargin;


    const setSlideWidth = animeWidth * (animeCount + moveSlideNum);//Slider Outer Width
    $slideBlock.find(".widget-slide").width(setSlideWidth);

    //button
    const $sliderBtnLeft = $slideBlock.find(".btn-widget-slide-side.left");
    const $sliderBtnRight = $slideBlock.find(".btn-widget-slide-side.right");

    // hide button
    if(animeCount < moveSlideNum + 1) {
      $sliderBtnLeft.hide();
      $sliderBtnRight.hide();
    }else if(!hasTouchEvent){
      const hideBtnTimer = setInterval(function(){
          $sliderBtnLeft.css({left: -1*btnWidth,opacity:0});
          $sliderBtnRight.css({right: -1*btnWidth,opacity:0});
          clearInterval(hideBtnTimer);
      } , 1500);
    }

    //click
    $sliderBtnLeft.find(".btn-inner").on("click",function(e){
      const btn = {
        direction : "left",
        button    : $(this)
      };
      moveSlideAnime(btn);
    });
    $sliderBtnRight.find(".btn-inner").on("click",function(e){
      const btn = {
        direction : "right",
        button    : $(this)
      };
      moveSlideAnime(btn);
    })

    //hover
    if(!hasTouchEvent){
      $slideBlock.find(".widget-slide-outer").on("mouseover",function(){
        $sliderBtnLeft.css({left: 0,opacity:1});
        $sliderBtnRight.css({right: 0,opacity:1});
      }).on("mouseout",function(){
        $sliderBtnLeft.css({left: -1*btnWidth,opacity:0});
        $sliderBtnRight.css({right: -1*btnWidth,opacity:0});
      });

      $sliderBtnLeft.on("mouseover",function(){
        $sliderBtnLeft.css({left: 0,opacity:1});
        $sliderBtnRight.css({right: -1*btnWidth,opacity:0});
      }).on("mouseout",function(){
        $sliderBtnRight.css({right: -1*btnWidth,opacity:0});
        $sliderBtnLeft.css({left: -1*btnWidth,opacity:0});
      });

      $sliderBtnRight.on("mouseover",function(){
        $sliderBtnRight.css({right: 0,opacity:1});
        $sliderBtnLeft.css({left: -1*btnWidth,opacity:0});
      }).on("mouseout",function(){
        $sliderBtnRight.css({right: -1*btnWidth,opacity:0});
        $sliderBtnLeft.css({left: -1*btnWidth,opacity:0});
      });
    }

    // slide function
    const moveSlideAnime = function(obj) {
      const direction = obj.direction;
      const $btnInner = obj.button;
      $btnInner.hide();

      {
        var animeSlide = [];
        $slideBlock.find(".widget-slide li.btn-anime").each(function(){
          animeSlide.push($(this));
        });
        animeSlide.reverse();

        for(var i=0;i<moveSlideNum;i++){
          animeSlide[i].clone(true).insertBefore($slideBlock.find(".widget-slide li.btn-anime:first"));
        }

        const marginLeftVal = `${-1*animeWidth*moveSlideNum}px`;
        $slideBlock.find(".widget-slide").css("marginLeft",marginLeftVal);

        $slideBlock.find(".widget-slide").animate({
            marginLeft : "0px"
            }, {
            duration : 0,
            easing   : "swing",
            complete : function() {
              for(let i=0;i<moveSlideNum;i++){
                $slideBlock.find(".widget-slide li.btn-anime:last").remove();
              }
              $btnInner.show();
            }
        });
      }
    };
  }

  animeSlider("widget-seasonal-video",40,6);
  animeSlider("widget-upcoming-video",40,6);
});
