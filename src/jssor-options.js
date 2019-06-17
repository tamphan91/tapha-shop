var jssor_1_slider;
var jssor_2_slider;
var jssor_options = {
    $AutoPlay: 1,
    // $AutoPlaySteps: 4,
    $AutoPlaySteps: 2,
    $SlideDuration: 160,
    $SlideWidth: 242,
    $SlideHeight: 300,
    // $SlideWidth: 323,
    // $SlideHeight: 420,
    // $SlideWidth: 486,
    // $SlideHeight: 600,
    // $SlideSpacing: 3,
    $Align: 0,
    $SlideSpacing: 3,
    $ArrowNavigatorOptions: {
        $Class: $JssorArrowNavigator$,
        // $Steps: 4
        $Steps: 2
    },
    $BulletNavigatorOptions: {
        $Class: $JssorBulletNavigator$
    }
};

var jssor_options2 = {
    $AutoPlay: 1,
    // $AutoPlaySteps: 4,
    $AutoPlaySteps: 2,
    $SlideDuration: 160,
    $SlideWidth: 242,
    $SlideHeight: 300,
    // $SlideWidth: 323,
    // $SlideHeight: 420,
    // $SlideWidth: 486,
    // $SlideHeight: 600,
    // $SlideSpacing: 3,
    $Align: 120,
    $SlideSpacing: 3,
    $ArrowNavigatorOptions: {
        $Class: $JssorArrowNavigator$,
        // $Steps: 4
        $Steps: 2
    },
    $BulletNavigatorOptions: {
        $Class: $JssorBulletNavigator$
    }
};
var MAX_WIDTH = 980;

function ScaleSlider1() {
    var containerElement = jssor_1_slider.$Elmt.parentNode;
    var containerWidth = containerElement.clientWidth;
    if (containerWidth) {
        var expectedWidth = Math.min(MAX_WIDTH || containerWidth, containerWidth);
        var slidesCount = jssor_1_slider.$SlidesCount();

        if(slidesCount === 3) {
            if(containerWidth <= 240) { // small phone
                console.log('small phone');
                jssor_1_slider.$ScaleSize(expectedWidth, 85);
            } else if(containerWidth <= 288) { // ip 5/5SE
                console.log('ip 5/5SE');
                jssor_1_slider.$ScaleSize(expectedWidth, 121);
            } else if(containerWidth <= 343) { // ipx, galaxy s5, ip6-7-8
                console.log('ipx, galaxy s5, ip6-7-8');
                jssor_1_slider.$ScaleSize(expectedWidth, 141);
            } else if(containerWidth <= 379) { // pixel 2, pixel 2 xl
                console.log('pixel 2, pixel 2 xl');
                jssor_1_slider.$ScaleSize(expectedWidth, 155);
            } else if(containerWidth <= 382) { // ip6-7-8 plus
                console.log('ip6-7-8 plus');
                jssor_1_slider.$ScaleSize(expectedWidth, 157);
            } else {
                jssor_1_slider.$ScaleWidth(expectedWidth);
            }
        } else {
            if(containerWidth <= 240) { // small phone
                console.log('small phone');
                jssor_1_slider.$ScaleSize(expectedWidth, 135);
            } else if(containerWidth <= 288) { // ip 5/5SE
                console.log('ip 5/5SE');
                jssor_1_slider.$ScaleSize(expectedWidth, 175);
            } else if(containerWidth <= 343) { // ipx, galaxy s5, ip6-7-8
                console.log('ipx, galaxy s5, ip6-7-8');
                jssor_1_slider.$ScaleSize(expectedWidth, 209);
            } else if(containerWidth <= 379) { // pixel 2, pixel 2 xl
                console.log('pixel 2, pixel 2 xl');
                jssor_1_slider.$ScaleSize(expectedWidth, 231);
            } else if(containerWidth <= 382) { // ip6-7-8 plus
                console.log('ip6-7-8 plus');
                jssor_1_slider.$ScaleSize(expectedWidth, 233);
            } else {
                jssor_1_slider.$ScaleWidth(expectedWidth);
            }
        }
    }
    else {
        window.setTimeout(ScaleSlider1, 30);
    }
}

function ScaleSlider2() {
    var containerElement = jssor_2_slider.$Elmt.parentNode;
    var containerWidth = containerElement.clientWidth;
    if (containerWidth) {
        var expectedWidth = Math.min(MAX_WIDTH || containerWidth, containerWidth);
        jssor_2_slider.$ScaleWidth(expectedWidth);
        var slidesCount = jssor_2_slider.$SlidesCount();
        console.log('slidesCount', slidesCount);
        console.log('containerWidth', containerWidth);
        if(slidesCount === 3) {
            if(containerWidth <= 240) { // small phone
                console.log('small phone');
                jssor_2_slider.$ScaleSize(expectedWidth, 85);
            } else if(containerWidth <= 288) { // ip 5/5SE
                console.log('ip 5/5SE');
                jssor_2_slider.$ScaleSize(expectedWidth, 121);
            } else if(containerWidth <= 343) { // ipx, galaxy s5, ip6-7-8
                console.log('ipx, galaxy s5, ip6-7-8');
                jssor_2_slider.$ScaleSize(expectedWidth, 141);
            } else if(containerWidth <= 379) { // pixel 2, pixel 2 xl
                console.log('pixel 2, pixel 2 xl');
                jssor_2_slider.$ScaleSize(expectedWidth, 155);
            } else if(containerWidth <= 382) { // ip6-7-8 plus
                console.log('ip6-7-8 plus');
                jssor_2_slider.$ScaleSize(expectedWidth, 157);
            } else {
                jssor_2_slider.$ScaleWidth(expectedWidth);
            }
        } else {
            if(containerWidth <= 240) { // small phone
                console.log('small phone');
                jssor_2_slider.$ScaleSize(expectedWidth, 135);
            } else if(containerWidth <= 288) { // ip 5/5SE
                console.log('ip 5/5SE');
                jssor_2_slider.$ScaleSize(expectedWidth, 175);
            } else if(containerWidth <= 343) { // ipx, galaxy s5, ip6-7-8
                console.log('ipx, galaxy s5, ip6-7-8');
                jssor_2_slider.$ScaleSize(expectedWidth, 209);
            } else if(containerWidth <= 379) { // pixel 2, pixel 2 xl
                console.log('pixel 2, pixel 2 xl');
                jssor_2_slider.$ScaleSize(expectedWidth, 231);
            } else if(containerWidth <= 382) { // ip6-7-8 plus
                console.log('ip6-7-8 plus');
                jssor_2_slider.$ScaleSize(expectedWidth, 233);
            } else {
                jssor_2_slider.$ScaleWidth(expectedWidth);
            }
        }
        
    }
    else {
        window.setTimeout(ScaleSlider2, 30);
    }
}

function jssor_1_slider_init() {
    jssor_1_slider = new $JssorSlider$("jssor_1", jssor_options);

    ScaleSlider1();

    $(window).bind("load", ScaleSlider1);
    $(window).bind("resize", ScaleSlider1);
    $(window).bind("orientationchange", ScaleSlider1);
}

function jssor_2_slider_init() {
    jssor_2_slider = new $JssorSlider$("jssor_2", jssor_options);

    ScaleSlider2();

    $(window).bind("load", ScaleSlider2);
    $(window).bind("resize", ScaleSlider2);
    $(window).bind("orientationchange", ScaleSlider2);
}

function jssor_2_slider_append(slidesHtml) {
    jssor_2_slider.$AppendSlides(slidesHtml, 0);
}

function jssor_2_slider_reload(slidesHtml) {
    jssor_2_slider.$ReloadSlides(slidesHtml);
}

function jssor_2_slider_detroy() {
    //destroy jssor slider instance and remove all html inside the slider element                            
    jssor_2_slider.$Destroy();
    //release memory
    jssor_2_slider = null;
    // jssor_2_slider = new $JssorSlider$("jssor_2", jssor_options);
    // ScaleSlider2();
}