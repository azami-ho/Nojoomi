document.addEventListener("DOMContentLoaded", function (event) {
    window.et_location_hash = window.location.hash;
    if ("" !== window.et_location_hash) {
        // Prevent jump to anchor - Firefox
        window.scrollTo(0, 0);
        var et_anchor_element = document.getElementById(window.et_location_hash.substring(1));
        if (et_anchor_element === null) {
            return;
        }
        // bypass auto scrolling, if supported
        if ("scrollRestoration" in history) {
            history.scrollRestoration = "manual";
        } else {
            // Prevent jump to anchor - Other Browsers
            window.et_location_hash_style = et_anchor_element.style.display;
            et_anchor_element.style.display = "none";
        }
    }
});

function togglePlayableTags(overlay_id, wait) {

    var $ = jQuery;

    if (!overlay_id) {

        overlay_id = "";
    }

    if (!wait) {

        wait = 1;
    }

    setTimeout(function () {

        $(overlay_id + ".overlay").find("iframe").not('[id^="gform"], .frm-g-recaptcha').each(function () {

            var iframeParent = $(this).parent();
            var iframe = $(this).prop("outerHTML");
            var src = iframe.match(/src=[\'"]?((?:(?!\/>|>|"|\'|\s).)+)"/)[0];

            src = src.replace("src", "data-src");
            iframe = iframe.replace(/src=".*?"/i, "src=\"about:blank\" data-src=\"\"");

            if (src != "data-src=\"about:blank\"") {
                iframe = iframe.replace("data-src=\"\"", src);
            }

            $(iframe).insertAfter($(this));

            $(this).remove();
        });

    }, wait);

    $(overlay_id + ".overlay").find("video").each(function () {
        $(this).get(0).pause();
    });

    $(overlay_id + ".overlay").find("audio").each(function () {

        this.pause();
        this.currentTime = 0;
    });
}

togglePlayableTags('', 1000);

$(document).ready(function () {
    $(".zoomImage img").wrap("<div class='imageWrap'></div>");
});

$(document).ready(function ($) {
    /* Blurbs as Tabs */
    $('.tab-title').each(function () {
        var section_id = $(this).find("a").attr("href");
        $(this).find("a").removeAttr("href");
        $(this).click(function () {
            $(this).siblings().removeClass("active-tab");

            $(this).addClass("active-tab");

            $('.tab-content').hide();
            $(section_id).show();
            $('html, body').animate({ scrollTop: $(section_id).offset().top - 450 }, 1000);
        });
    });
});

function setREVStartSize(e) {
    try {
        e.c = jQuery(e.c); var i = jQuery(window).width(), t = 9999, r = 0, n = 0, l = 0, f = 0, s = 0, h = 0;
        if (e.responsiveLevels && (jQuery.each(e.responsiveLevels, function (e, f) { f > i && (t = r = f, l = e), i > f && f > r && (r = f, n = e) }), t > r && (l = n)), f = e.gridheight[l] || e.gridheight[0] || e.gridheight, s = e.gridwidth[l] || e.gridwidth[0] || e.gridwidth, h = i / s, h = h > 1 ? 1 : h, f = Math.round(h * f), "fullscreen" == e.sliderLayout) { var u = (e.c.width(), jQuery(window).height()); if (void 0 != e.fullScreenOffsetContainer) { var c = e.fullScreenOffsetContainer.split(","); if (c) jQuery.each(c, function (e, i) { u = jQuery(i).length > 0 ? u - jQuery(i).outerHeight(!0) : u }), e.fullScreenOffset.split("%").length > 1 && void 0 != e.fullScreenOffset && e.fullScreenOffset.length > 0 ? u -= jQuery(window).height() * parseInt(e.fullScreenOffset, 0) / 100 : void 0 != e.fullScreenOffset && e.fullScreenOffset.length > 0 && (u -= parseInt(e.fullScreenOffset, 0)) } f = u } else void 0 != e.minHeight && f < e.minHeight && (f = e.minHeight); e.c.closest(".rev_slider_wrapper").css({ height: f })
    } catch (d) { console.log("Failure at Presize of Slider:" + d) }
};