
$(function () {

  // Settings dialog
  if ($(".js-btn-settings").exists()) {
    $(".js-btn-settings").click(function(e){
      const settingsDialogData = $(e.currentTarget).data("settingsDialog")
      Modal.generate()
      Modal.buildFriendsUpdateSettingsDialog(settingsDialogData, (newData) => {
        $(e.currentTarget).data("settingsDialog", newData)
      })
      Modal.show()
    });
  }

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

      if(direction == "right") {
        var animeSlide = [];
        $slideBlock.find(".widget-slide li.btn-anime").each(function(){
          animeSlide.push($(this));
        });

        for(var i=0;i<moveSlideNum;i++){
          animeSlide[i].clone(true).insertAfter($slideBlock.find(".widget-slide li.btn-anime:last"));
        }

        $slideBlock.find(".widget-slide").css("marginLeft","0px");

        $slideBlock.find(".widget-slide").animate({
          marginLeft : `${-1*animeWidth*moveSlideNum}px`
          }, {
          duration : 500,
          easing   : "swing",
          complete : function() {
              const getMarginLeftVal = parseInt($slideBlock.find(".widget-slide").css("marginLeft").replace("px",""));
              for(let i=0;i<moveSlideNum;i++){
                $slideBlock.find(".widget-slide").css("marginLeft",`${getMarginLeftVal+animeWidth*moveSlideNum}px`);
                $slideBlock.find(".widget-slide li.btn-anime:first").remove();
              }
              $btnInner.show();
            }
        });
      }else{
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
            duration : 500,
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

  //anime slider in index.php
  if($(".widget-slide-block")[0]){
    animeSlider("widget-seasonal-video",40,6);
    animeSlider("widget-episode-video",30,8);
    animeSlider("widget-manga-store",30,8);
    animeSlider("widget-promotional-video",30,8);
  }//$('.watch-anime-slide-block')[0]

  // anime eposide video widget
  if ($(".js-widget-episode-video-link")[0]) {
    $(".js-widget-episode-video-link").on("click", function() {
      const url = $(this).data("url");
      location.href = url;
    });
    $(".js-widget-episode-video-link .title").on("mouseover", function() {
      $(this).parents(".js-widget-episode-video-link").css({ opacity: 1 });
    }).on("mouseout", function() {
      $(this).parents(".js-widget-episode-video-link").css({ opacity: "" });
    });
  }
});

