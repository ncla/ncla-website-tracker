var MUSE = {
    ajaxContent: null,
    bannerID: 0,
    bannerInterval: null,
    bannerSpeed: 7000,
    bcAPIMod: null,
    bcExpMod: null,
    bcPlayer: null,
    bcVid: null,
    initHeight: -1,
    loading: false,
    lightboxHtml: '<img src="/_static/local/images/loading.gif" alt="" class="lightboxImg" style="width:31px; height:31px; margin-top:-15px; margin-left:-15px;" />',
    mapBasic: null,
    popoverAdded: false,
    popoverDoubleInitCheck: false,
    scriptAddThisAdded: false,
    scriptBrightcoveAdded: false,
    scriptFacebookAdded: false,
    scriptFirst: null,
    scriptJWPlayer: false,
    scriptMapAdded: false,
    scriptMapFullAdded: false,
    scriptScrollPane: null,
    scriptSwfObjAdded: null,
    scriptTwitterAdded: false,
    scriptVersion: "",
    scriptVersionNo: 0,
    videoClip: 0,
    Init: function() {
        MUSE.scriptFirst = document.getElementsByTagName("script")[0];
        MUSE.BlurFocus();
        MUSE.STORE.Init();
        ISLE.COOKIES.Init();
        MUSE.BindUserAreaLinks();
        MUSE.CheckFooterLocation();
        $(window).load(function() {
            MUSE.CheckFooterLocation()
        });
        $(window).resize(function() {
            MUSE.CheckFooterLocation();
            if ($(".videoHolder").length > 0) {
                if (typeof brightcove !== "undefined") {
                    MUSE.BrightcoveResizePlayer()
                }
            }
            MUSE.CheckPopupSize();
            MUSE.SetBgDims()
        });
        MUSE.SetBgDims();
        $("#fadeWrap, .closePopup").click(function() {
            MUSE.PopupClose();
            return false
        });
        if ($("ul.accordion").length > 0) {
            $("ul.accordion > li:last > a").addClass("base");
            $("ul.accordion:not(.doLinks)").children("li").children("a").click(function() {
                $(this).parent().toggleClass("on");
                MUSE.CheckFooterLocation();
                return false
            })
        }
        if ($("ul.tabs").length > 0) {
            $("ul.tabs:not(.tabsLink)").children("li").children("a").click(function() {
                var d = $(this);
                if (d.hasClass("go")) {
                    return true
                } else {
                    var e = d.parent();
                    var f = e.parent();
                    f.children("li").removeClass("on");
                    e.addClass("on");
                    var g = f.children("li").index(e);
                    f.nextAll(".tabContent").first().children("div").hide();
                    f.nextAll(".tabContent").first().children("div:eq(" + g + ")").show();
                    MUSE.CheckFooterLocation();
                    return false
                }
            })
        }
        $(".closeMsg").click(function() {
            $(this).parent(".msg").slideUp();
            return false
        });
        if ($(".reloadBlock").length > 0) {
            $(".reloadBlock .paging a").click(function() {
                MUSE.ReloadBlock($(this), ".reloadBlock .paging a");
                return false
            })
        }
        MUSE.AddHoverTooltip();
        $(".eventObjFull .cont h3").each(function(d) {
            var e = $(this).height();
            if (e > 25) {
                $(this).addClass("multiline")
            }
        });
        $(".sizingGuide").click(function() {
            $("#fadeWrap, .sizingPopup").show();
            return false
        });
        if ($(".popupFbLogin").length > 0) {
            $("#fadeWrap, .popup").show()
        }
        $(".triggerAccor").click(function() {
            $(this).next(".accordion").slideToggle();
            return false
        });
        var a = $(".flags ul li a.on").parent();
        $(a).clone().addClass("cloned").prependTo(".flags ul");
        $(a).addClass("cloneMe");
        $(".flags .dropArrow").click(function() {
            $(this).parent().toggleClass("flagsExposed")
        });
        $(".lightbox").click(function() {
            $("#fadeWrap").show();
            $(".lightboxImg").remove();
            $("body").append(MUSE.lightboxHtml);
            var d = $(this).attr("href");
            setTimeout(function() {
                var e = new Image();
                e.onload = function() {
                    var i = $(window).width();
                    var f = $(window).height();
                    var h = e.width;
                    var g = e.height;
                    if ((i - 20) < h) {
                        g = ((i - 20) * g) / h;
                        h = i - 20
                    }
                    if ((f - 20) < g) {
                        h = ((f - 20) * h) / g;
                        g = f - 20
                    }
                    $(".lightboxImg").attr("src", d).css({
                        width: h + "px",
                        height: g + "px",
                        "margin-top": -(g / 2) + "px",
                        "margin-left": -(h / 2) + "px"
                    })
                };
                e.src = d
            }, 500);
            return false
        });
        if ($(".loadModTwitter").length) {
            $(".loadModTwitter").load("/_handlers/modules/twitter.ashx")
        }
        if ($(".loadModNewsFromWeb").length) {
            $(".loadModNewsFromWeb").load("/_handlers/modules/newsfromweb.ashx")
        }
        if ($(".modulePhotos").length) {
            $(".modulePhotos li a").click(function() {
                if (!MUSE.loading) {
                    MUSE.loading = true;
                    setTimeout(function() {
                        MUSE.loading = false
                    }, 2000);
                    var d = $(this);
                    var e = d.children("img");
                    var j = e.attr("src").replace("_thumb.jpg", "_original.jpg");
                    var h = d.attr("href");
                    var f = d.parents(".module").find(".onDisplay");
                    var g = f.parent();
                    var k = f.width();
                    f.css("visibility", "hidden");
                    var i = new Image();
                    i.onload = function() {
                        g.attr("href", h);
                        var l = (i.height * k) / (i.width);
                        f.animate({
                            height: l + "px"
                        }, 500, function() {
                            f.attr("src", j);
                            f.css("visibility", "visible");
                            MUSE.loading = false
                        })
                    };
                    i.src = j
                }
                return false
            })
        }
        if ($(".reloadBlock .altPaging").length) {
            $(".reloadBlock .altPaging a").click(function() {
                MUSE.ReloadBlock($(this), ".reloadBlock .altPaging a");
                return false
            })
        }
        if ($(".bannerPhotos .altPaging").length) {
            $(".bannerPhotos .altPaging a").click(function() {
                var d = $(this);
                d.siblings().removeClass("on");
                d.addClass("on");
                var e = $(this).index() + 1;
                var f = $(".bannerPhotos .images .page").outerWidth(true);
                $(".bannerPhotos .images .pagesWrap:visible").animate({
                    marginLeft: ((1 - e) * f) + "px"
                }, 500);
                f = $(".bannerPhotos .info .page").outerWidth(true);
                $(".bannerPhotos .info .pagesWrap:visible").animate({
                    marginLeft: ((1 - e) * f) + "px"
                }, 500);
                return false
            })
        }
        if ($(".bannerPhotos a.scan").length) {
            $(".bannerPhotos a.scan").click(function() {
                var d = $(this);
                var e = d.closest(".bannerPhotos");
                var f = e.find(".pagesWrap:visible");
                d.siblings(".scan").removeClass("on");
                d.addClass("on");
                var h = parseInt(f.data("pg"));
                var i = parseInt(f.data("maxpg"));
                h = h + ((d.hasClass("scanRight")) ? 1 : -1);
                if (h < 1) {
                    h = i
                }
                if (h > i) {
                    h = 1
                }
                f.data("pg", h);
                var g = (h == i) ? 0 : 0;
                var j = e.find(".images .pagesWrap:visible .page").outerWidth(true);
                $(".bannerPhotos .images .pagesWrap:visible").animate({
                    marginLeft: (((1 - h) * j) + g) + "px"
                }, 500);
                j = $(".bannerPhotos .info .pagesWrap:visible .page").outerWidth(true);
                $(".bannerPhotos .info .pagesWrap:visible").animate({
                    marginLeft: (((1 - h) * j) + g) + "px"
                }, 500);
                return false
            })
        }
        if ($(".bannerPhotoCarousel").length) {
            $(".bannerPhotoCarousel .pagesWrap .photo > img[data-src]").each(function() {
                var d = $(this);
                d.attr("src", d.attr("data-src"))
            })
        }
        if ($(".bannerPhotos .tools li a").length) {
            $(".bannerPhotos .tools li a").click(function() {
                var d = $(this);
                var e = d.closest(".tools");
                e.find("li a").removeClass("on");
                d.addClass("on");
                var f = d.closest(".bannerPhotos");
                var g = d.data("wrap");
                f.find(".pagesWrap").hide();
                f.find(g).show();
                return false
            })
        }
        if ($(".modalBtns").length) {
            $(".modalBtns a.btn").click(function() {
                MUSE.LightboxView($(this));
                return false
            })
        }
        if ($(".changeBG").length) {
            $(".changeBG .open").click(function() {
                $(".changeBG .selector").slideToggle();
                return false
            });
            $(".changeBG .close").click(function() {
                $(".changeBG .selector").slideUp();
                return false
            });
            $(".changeBG .listWrap li a").click(function() {
                var e = $(this);
                $("#fadeWrap").show();
                $(".lightboxImg").remove();
                $("body").append(MUSE.lightboxHtml);
                $(".changeBG .listWrap li a").removeClass("on");
                e.addClass("on");
                var f = parseInt(e.data("themeid"));
                var d = $("body").attr("id");
                if (typeof(d) === "undefined") {
                    d = ""
                }
                $.ajax({
                    type: "POST",
                    url: "/_handlers/modules/changebg.ashx",
                    data: {
                        id: f,
                        bodyID: d
                    },
                    success: function(g, h) {
                        if (g.success) {
                            $("<img/>").attr("src", g.bgImage).load(function() {
                                $("body").append(g.styles);
                                $("#bg img").attr("src", g.bgImage)
                            }).each(function() {
                                if (this.complete) {
                                    $(this).trigger("load")
                                }
                            })
                        }
                    },
                    error: function(i, h, g) {},
                    complete: function(h, g) {
                        setTimeout(function() {
                            $(".lightboxImg").remove();
                            $("#fadeWrap").hide()
                        }, 250)
                    }
                });
                return false
            })
        }
        if ($(".isleFlashBanner").length > 0) {
            MUSE.LoadFlashBanners()
        }
        if ($(".isleBannerPaging").length > 0) {
            $(".isleBannerPaging a").click(function() {
                clearInterval(MUSE.bannerInterval);
                MUSE.BannerClick($(this));
                MUSE.bannerInterval = setInterval(function() {
                    MUSE.BannerNext()
                }, MUSE.bannerSpeed);
                clearInterval(MUSE.bannerInterval);
                return false
            });
            MUSE.bannerInterval = setInterval(function() {
                MUSE.BannerNext()
            }, MUSE.bannerSpeed);
            $(".isleBannerWrap .bannerItem.on").each(function() {
                var d = $(this);
                if (parseInt(d.data("bannertype")) > 0) {
                    d.closest(".isleBannerWrap").css("background", "#000")
                }
            })
        }
        $(".commentFeatured li:odd").addClass("alternate");
        if ($(".btnReport").length > 0) {
            $(".btnReport").click(function() {
                if (confirm("Are you sure you wish to report this comment?")) {
                    MUSE.ReportComment($(this))
                }
                return false
            })
        }
        if ($(".commentList").length > 0) {
            var b = window.location.hash;
            if (b != "") {
                $(".commentList li#" + b).addClass("alternate")
            }
        }
        if ($(".countryFlyover").length > 0) {
            MUSE.AddToCookie();
            $(".countryFlyover").slideDown();
            $(".clsFlagChk").click(function() {
                var d = "?set=1";
                $.ajax({
                    type: "POST",
                    url: "/_iiwm/Handlers/Location/Set.ashx",
                    data: d,
                    success: function(e, f) {},
                    error: function(g, f, e) {
                        alert("error: " + e)
                    },
                    complete: function(f, e) {
                        $(".countryFlyover").slideUp()
                    }
                })
            })
        }
        if ($(".gigPhotosOfficial .paging a").length > 0) {
            $(".gigPhotosOfficial .paging a").click(function() {
                var d = parseInt($(".gigPhotosOfficial").attr("data-gigid"));
                MUSE.GigElementPaging($(this), ".gigPhotosOfficial", ".photosLoading", "getphotos", "pgo", d);
                return false
            })
        }
        if ($(".gigPhotosFan .paging a").length > 0) {
            $(".gigPhotosFan .paging a").click(function() {
                var d = parseInt($(".gigPhotosFan").attr("data-gigid"));
                MUSE.GigElementPaging($(this), ".gigPhotosFan", ".photosLoading", "getfanphotos", "pgf", d);
                return false
            })
        }
        if ($(".gigAttendees").length > 0) {
            $(".btnAddAttendance").click(function() {
                MUSE.GigFunction($(this));
                return false
            });
            $(".viewAttend").click(function() {
                MUSE.GigFunction($(this));
                return false
            })
        }
        if ($("ul.toggle li").length > 0) {
            $("ul.toggle li h3 a").click(function() {
                var d = $(this);
                var f = d.children("span");
                var e = d.parent().parent().find("div");
                if (f.text() == "Show") {
                    $("ul.toggle li div").slideUp();
                    $("ul.toggle li span").text("Show");
                    f.text("Hide");
                    e.slideDown(function() {
                        MUSE.CheckFooterLocation()
                    })
                } else {
                    f.text("Show");
                    e.slideUp(function() {
                        MUSE.CheckFooterLocation()
                    })
                }
                return false
            })
        }
        if ($(".audioPlayerWrap,.discogItem").length > 0) {
            var c = document.createElement("script");
            c.src = "/_static/shared/scripts/isleaudio" + MUSE.scriptVersion + ".js?v" + MUSE.scriptVersionNo;
            c.id = "isleaudio-js";
            MUSE.scriptFirst.parentNode.insertBefore(c, MUSE.scriptFirst);
            MUSE.JWPlayerScript();
            MUSE.CheckAndStartAudio()
        }
        if ($(".playTrack").length > 0) {
            $(".playTrack").click(function() {
                var e = $(this);
                var d = parseInt(e.attr("data-clip"));
                ISLE.AUDIO.TrackLoaderHide();
                if (e.hasClass("playVideo")) {
                    if (MUSE.bcVid !== null && !e.hasClass("trackPlaying")) {
                        $(".trackTable a.playTrack").removeClass("trackPlaying");
                        e.closest("tr").find(".playTrack").addClass("trackPlaying");
                        if (MUSE.videoClip == d) {
                            MUSE.bcVid.play()
                        } else {
                            $(".currentAudioClip").html(e.attr("data-title"));
                            MUSE.videoClip = d;
                            var f = "id=" + MUSE.videoClip;
                            $.ajax({
                                type: "POST",
                                url: "/_iiwm/Handlers/Video/bc.ashx",
                                data: f,
                                success: function(g, h) {
                                    MUSE.bcVid.loadVideoByID(g)
                                },
                                error: function(i, h, g) {
                                    alert("error: " + g)
                                },
                                complete: function(h, g) {}
                            })
                        }
                    } else {
                        $(".trackTable a.playTrack").removeClass("trackPlaying");
                        MUSE.bcVid.pause()
                    }
                } else {
                    if (ISLE.AUDIO.player) {
                        if (!e.hasClass("trackPlaying")) {
                            $(".trackTable a.playTrack").removeClass("trackPlaying");
                            e.closest("tr").find(".playTrack").addClass("trackPlaying");
                            if (ISLE.AUDIO.clip == d) {
                                jwplayer().play()
                            } else {
                                $(".audioList ul li:nth-child(" + d + ") a").trigger("click")
                            }
                        } else {
                            $(".trackTable a.playTrack").removeClass("trackPlaying");
                            jwplayer().pause()
                        }
                    } else {
                        $(".audioList ul li:nth-child(" + d + ") a").trigger("click")
                    }
                }
                return false
            });
            $(".audioList input.monitor").change(function() {
                var d = $(this).attr("data-state");
                if (d == "play") {
                    $(".playTrack").removeClass("trackPlaying");
                    $(".playTrack[data-clip=" + ISLE.AUDIO.clip + "]").addClass("trackPlaying")
                } else {
                    if (d == "pause") {
                        $(".playTrack[data-clip=" + ISLE.AUDIO.clip + "]").removeClass("trackPlaying")
                    }
                }
            })
        }
        MUSE.ScanMediaHolder();
        if ($(".videoHolder").length > 0) {
            MUSE.BrightcoveExp()
        }
        if ($(".uploadPhoto").length > 0) {
            $(".uploadPhoto a.btn").click(function() {
                if ($(this).hasClass("userReg")) {
                    return true
                } else {
                    $(this).closest(".uploadPhoto").find(".uploadPane").slideToggle()
                }
                return false
            })
        }
        if ($(".moduleGallery .mainImg img").length > 0) {
            MUSE.ConfigureTouchWipe();
            $(".loadPhotoComments").live("click", function() {
                $(".loadPhotoComments").hide();
                $(".photoComments").html("Loading...");
                return true
            })
        }
        if ($(".readMore").length > 0) {
            $(".readMore").click(function() {
                MUSE.LightboxView($(this));
                return false
            })
        }
        MUSE.AddSocialWidgets();
        if ($("#mapDiv").length > 0) {
            MUSE.AddGoogleScript("MUSE.LoadGoogle")
        }
        if ($("#mapDivFull").length > 0) {
            MUSE.AddMapFull()
        }
    },
    AddGoogleScript: function(a) {
        if (!MUSE.scriptMapAdded) {
            var b = document.createElement("script");
            b.type = "text/javascript";
            b.src = "//maps.google.com/maps/api/js?sensor=false&callback=" + a;
            MUSE.scriptFirst.parentNode.insertBefore(b, MUSE.scriptFirst);
            MUSE.scriptMapAdded = true
        }
    },
    AddHoverTooltip: function() {
        if ($(".hoverText").length > 0) {
            if (!MUSE.popoverAdded) {
                MUSE.popoverAdded = true;
                $("body").append('<div class="popoverHover"></div>')
            }
            $(".hoverText").mousemove(function(a) {
                var b = $(".popoverHover");
                var c = a.pageX;
                var d = a.pageY;
                var h = b.width();
                var g = b.height();
                var f = $(this).attr("data-position");
                if (typeof f !== "undefined") {
                    switch (f) {
                        case "below":
                            d = d + 60;
                            break
                    }
                }
                b.css({
                    left: (c - Math.floor(h / 2) - 10) + "px",
                    top: (d - 25 - g) + "px"
                })
            });
            $(".hoverText").mouseover(function() {
                var a = $(this);
                var b = a.attr("title");
                a.attr("data-title", b);
                a.attr("title", "");
                $(".popoverHover").html(b)
            });
            $(".hoverText").mouseout(function() {
                var a = $(this);
                a.attr("title", a.attr("data-title"));
                $(".popoverHover").html("&nbsp;");
                $(".popoverHover").css("top", "-100px")
            })
        }
    },
    AddMapFull: function(a) {
        if (!MUSE.scriptMapFullAdded) {
            var b = document.createElement("script");
            b.type = "text/javascript";
            b.src = "/_static/local/scripts/musemap" + MUSE.scriptVersion + ".js?v" + MUSE.scriptVersionNo;
            MUSE.scriptFirst.parentNode.insertBefore(b, MUSE.scriptFirst);
            MUSE.scriptMapFullAdded = true
        }
        MUSE.AddScrollPane();
        if (typeof MUSE.MAP === "undefined") {
            setTimeout(function() {
                MUSE.AddMapFull()
            }, 100)
        } else {
            MUSE.MAP.Init()
        }
    },
    AddScrollPane: function() {
        if (!MUSE.scriptScrollPane) {
            var b = document.createElement("script");
            b.type = "text/javascript";
            b.src = "/_static/local/scripts/jscrollpane.js";
            MUSE.scriptFirst.parentNode.insertBefore(b, MUSE.scriptFirst);
            var a = document.createElement("script");
            a.type = "text/javascript";
            a.src = "/_static/local/scripts/jq-mousewheel.js";
            MUSE.scriptFirst.parentNode.insertBefore(a, MUSE.scriptFirst);
            MUSE.scriptScrollPane = true
        }
    },
    AddSocialWidgets: function() {
        if (!MUSE.scriptFacebookAdded && $(".socialFB").length > 0) {
            MUSE.scriptFacebookAdded = true;
            $("body").append('<div id="fb-root"></div>');
            var a = document.createElement("script");
            a.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
            a.id = "facebook-jssdk";
            MUSE.scriptFirst.parentNode.insertBefore(a, MUSE.scriptFirst)
        }
        if (!MUSE.scriptTwitterAdded && $(".socialTW").length > 0) {
            MUSE.scriptTwitterAdded = true;
            var c = document.createElement("script");
            c.src = "//platform.twitter.com/widgets.js";
            c.id = "twitter-wjs";
            MUSE.scriptFirst.parentNode.insertBefore(c, MUSE.scriptFirst)
        }
        if ($(".socialAT").length > 0) {
            $(".addthis_counter").hide();
            $(".socialAT").each(function() {
                var d = $(this);
                var e = d.find(".addthis_toolbox");
                if (e.attr("data-url")) {
                    e.attr("addthis:url", e.attr("data-url"))
                }
                if (e.attr("data-text")) {
                    e.attr("addthis:title", e.attr("data-text"))
                }
            });
            var b = "//s7.addthis.com/js/250/addthis_widget.js#domready=1";
            if (window.addthis) {
                window.addthis = null;
                window._adr = null;
                window._atc = null;
                window._atd = null;
                window._ate = null;
                window._atr = null;
                window._atw = null
            }
            $.getScript(b);
            setTimeout(function() {
                $(".addthis_counter").show()
            }, 2000)
        }
    },
    AddToCookie: function() {
        var a = new Date().getTime();
        $.ajax({
            type: "GET",
            url: "/_iiwm/Handlers/Location/AddToCookie.ashx",
            data: "cachetime=" + a,
            success: function(b, c) {},
            error: function(d, c, b) {},
            complete: function(c, b) {}
        })
    },
    BannerClick: function(c) {
        var a = c.attr("data-multibanner");
        elBnrWrap = c.closest(".isleBannerMultiWrap").find(".isleBannerWrap");
        c.closest(".isleBannerPaging").attr("data-banneritem", a).find("a").removeClass("on");
        c.addClass("on");
        var e = elBnrWrap.find(".bannerItem:visible").height();
        var d = elBnrWrap.find(".bannerItem" + a);
        var b = parseInt(d.data("bannertype"));
        if (b > 0) {
            elBnrWrap.css("background", "#000");
            elBnrWrap.find(".bannerItem:visible").fadeOut(function() {
                elBnrWrap.find(".bannerItem" + a).show()
            })
        } else {
            elBnrWrap.css("background", 'url("/_static/local/images/loading.gif") no-repeat center center #000');
            var g = elBnrWrap.find(".bannerItem" + a + " img").attr("src");
            var f = new Image();
            f.onload = function() {
                elBnrWrap.find(".bannerItem img").css("width", "100%");
                elBnrWrap.find(".bannerItem:visible").fadeOut(function() {
                    elBnrWrap.find(".bannerItem" + a).show();
                    elBnrWrap.find(".bannerItem img").css("width", "100%")
                })
            };
            f.src = g
        }
    },
    BannerNext: function() {
        $(".isleBannerPaging").each(function() {
            var c = $(this);
            var a = parseInt(c.attr("data-bannercount"));
            if (a > 1) {
                var b = parseInt(c.attr("data-banneritem"));
                b++;
                if (b >= a) {
                    if (b > a) {
                        b = 1
                    }
                }
                if (b <= 1) {
                    if (b < 1) {
                        b = a
                    }
                }
                MUSE.BannerClick(c.find("a.thumbItem" + b))
            }
        })
    },
    BindUserAreaLinks: function() {
        $('a[href^="/user-area.htm"]').unbind("click");
        $('a[href^="/user-area.htm"]').click(function() {
            if ($(this).hasClass("userReg")) {
                return true
            } else {
                MUSE.PopupLogin();
                return false
            }
        })
    },
    BlurFocus: function() {
        $(".input[data-default]").each(function() {
            var b = $(this);
            var a = b.attr("data-default");
            b.unbind("focus");
            b.unbind("blur");
            b.focus(function() {
                if ($(this).val() == a) {
                    $(this).val("")
                }
            });
            b.blur(function() {
                if ($(this).val() == "") {
                    $(this).val(a)
                }
            })
        })
    },
    BrightcoveExp: function() {
        if (!MUSE.scriptBrightcoveAdded) {
            var a = document.createElement("script");
            a.src = "//admin.brightcove.com/js/BrightcoveExperiences.js";
            a.id = "brightcove-js";
            MUSE.scriptFirst.parentNode.insertBefore(a, MUSE.scriptFirst);
            MUSE.scriptBrightcoveAdded = true
        }
        if (typeof brightcove === "undefined") {
            setTimeout(function() {
                MUSE.BrightcoveExp()
            }, 100)
        } else {
            brightcove.createExperiences()
        }
    },
    BrightcoveLoaded: function(a) {
        MUSE.bcPlayer = brightcove.api.getExperience(a);
        MUSE.bcAPIMod = brightcove.api.modules.APIModules;
        MUSE.bcExpMod = MUSE.bcPlayer.getModule(MUSE.bcAPIMod.EXPERIENCE);
        MUSE.bcExpMod.addEventListener(brightcove.api.events.ExperienceEvent.TEMPLATE_READY, MUSE.BrightcoveReady)
    },
    BrightcoveReady: function() {
        MUSE.bcVid = MUSE.bcPlayer.getModule(MUSE.bcAPIMod.VIDEO_PLAYER);
        MUSE.bcVid.addEventListener(brightcove.api.events.MediaEvent.COMPLETE, MUSE.BrightcoveVidComplete);
        MUSE.bcVid.addEventListener(brightcove.api.events.MediaEvent.PLAY, MUSE.BrightcoveVidPlay);
        MUSE.bcVid.addEventListener(brightcove.api.events.MediaEvent.STOP, MUSE.BrightcoveVidPause)
    },
    BrightcoveResizePlayer: function() {
        var a = $(".videoHolder").parent();
        MUSE.bcExpMod.setSize(a.width(), Math.floor((a.width() * 9) / 16))
    },
    BrightcoveVidComplete: function() {
        $('a.playTrack[data-clip="' + MUSE.videoClip + '"]').removeClass("trackPlaying")
    },
    BrightcoveVidPause: function() {
        $('a.playTrack[data-clip="' + MUSE.videoClip + '"]').removeClass("trackPlaying")
    },
    BrightcoveVidPlay: function() {
        $('a.playTrack[data-clip="' + MUSE.videoClip + '"]').addClass("trackPlaying");
        clearInterval(MUSE.bannerInterval)
    },
    CheckAndStartAudio: function() {
        if (typeof jwplayer === "undefined") {
            setTimeout(function() {
                MUSE.CheckAndStartAudio()
            }, 100)
        } else {
            if (typeof ISLE.AUDIO === "undefined") {
                setTimeout(function() {
                    MUSE.CheckAndStartAudio()
                }, 100)
            } else {
                ISLE.AUDIO.Init()
            }
        }
    },
    CheckFooterLocation: function() {
        if ($("footer").length > 0) {
            var a = $("footer");
            if (a.hasClass("footerFixed")) {
                a.removeClass("footerFixed");
                MUSE.initHeight = (a.height() + a.position().top);
                if ($(window).height() > MUSE.initHeight) {
                    a.addClass("footerFixed")
                }
            } else {
                MUSE.initHeight = (a.height() + a.position().top);
                if ($(window).height() > MUSE.initHeight) {
                    a.addClass("footerFixed")
                }
            }
        }
    },
    CheckPopupSize: function() {
        if ($(".popupReadMore").length > 0) {
            var a = $(".popupReadMore");
            var d = a.height();
            a.css("height", "auto");
            var e = a.outerHeight();
            var b = a.height();
            var f = $(window).height();
            var c = ($(window).height() < e + 80) ? (f - 100) : b;
            a.css("height", c + "px");
            e = a.outerHeight();
            a.css("height", d + "px");
            a.animate({
                marginTop: "-" + (e / 2) + "px",
                height: c + "px"
            }, 500, function() {
                $(".popupReadMore .module").css("visibility", "visible")
            })
        }
    },
    ClosePopup: function() {
        $("#fadeWrap").trigger("click")
    },
    ConfigureTouchWipe: function() {
        $(".moduleGallery .mainImg img").touchwipe({
            wipeRight: function() {
                MUSE.LoadPhoto(false)
            },
            wipeLeft: function() {
                MUSE.LoadPhoto(true)
            },
            min_move_x: 20,
            min_move_y: 20,
            preventDefaultEvents: true
        })
    },
    GetNVC: function(f) {
        var e = {};
        if (typeof f !== "undefined" && f.length > 0) {
            var a = f.split("?");
            if (a.length > 1) {
                var c = a[1].split("&");
                for (var d = 0; d < c.length; d++) {
                    var b = c[d].split("=");
                    if (b.length > 1) {
                        e[b[0]] = b[1]
                    }
                }
            }
        }
        return e
    },
    GigElementPaging: function(b, a, e, j, h, c) {
        $(e).show();
        var d = b.attr("href");
        var i = MUSE.GetNVC(d);
        var f = 1;
        var g = 1;
        if (typeof i[h] !== "undefined") {
            f = parseInt(i[h])
        }
        if (typeof i[h + "start"] !== "undefined") {
            g = parseInt(i[h + "start"])
        }
        var k = "md=" + j + "&id=" + c + "&pg=" + f + "&pgstart=" + g;
        $.ajax({
            type: "POST",
            url: "/_handlers/listings/main.ashx",
            data: k,
            success: function(l, m) {
                $(a).html(l)
            },
            error: function(n, m, l) {
                alert("error: " + l)
            },
            complete: function(m, l) {
                $(e).hide();
                $(a).find(".paging a").click(function() {
                    MUSE.GigElementPaging($(this), a, e, j, h, c);
                    return false
                })
            }
        })
    },
    GigFunction: function(a) {
        $(".gigFunction").slideUp();
        var b;
        var c;
        var f = a.attr("data-gigmd");
        switch (f) {
            case "addattendance":
                c = ".gigAddAttendance";
                break;
            case "getfans":
                c = ".gigAttendees";
                break
        }
        b = $(c);
        if (b.is(":visible")) {
            b.slideUp()
        } else {
            var e = a.attr("data-loaditem");
            if (typeof e !== "undefined") {
                $(e).show()
            }
            var d = parseInt(a.attr("data-gigid"));
            var g = "md=" + f + "&id=" + d + "&url=" + encodeURIComponent(window.location.pathname);
            $.ajax({
                type: "POST",
                url: "/_handlers/listings/main.ashx",
                data: g,
                success: function(h, i) {
                    b.html(h)
                },
                error: function(j, i, h) {
                    alert("error: " + h)
                },
                complete: function(j, i) {
                    b.slideDown();
                    $(c).find(".btn").bind("click", function() {
                        if ($(this).hasClass("userReg")) {
                            return true
                        } else {
                            $(this).closest(c).slideUp();
                            return false
                        }
                    });
                    if ($(c).find(".gigNewUserCount").length > 0) {
                        var h = parseInt($(c).find(".gigNewUserCount").html());
                        $(".gigUserCount").html(h)
                    }
                    if ($(c).find(".paging a").length > 0) {
                        $(c).find(".paging a").click(function() {
                            MUSE.GigElementPaging($(this), ".gigAttendees", ".attendingLoading", "getfans", "pga", d);
                            return false
                        })
                    }
                    $(".gigAddAttendance .userLogin").bind("click", function() {
                        $(".gigAddAttendance").hide();
                        MUSE.PopupLogin();
                        return false
                    });
                    if (typeof e !== "undefined") {
                        $(e).hide()
                    }
                }
            })
        }
    },
    JWPlayerExp: function(a) {
        MUSE.JWPlayerScript();
        if (typeof jwplayer === "undefined") {
            setTimeout(function() {
                MUSE.JWPlayerExp(a)
            }, 100)
        } else {
            a()
        }
    },
    JWPlayerScript: function() {
        if (!MUSE.scriptJWPlayer) {
            var a = document.createElement("script");
            a.src = "/_static/shared/scripts/jwplayer.v2.js?v" + MUSE.scriptVersionNo;
            a.id = "jwplayer-js";
            MUSE.scriptFirst.parentNode.insertBefore(a, MUSE.scriptFirst);
            MUSE.scriptJWPlayer = true
        }
    },
    LightboxComment: function(c) {
        if ($(".popupReadMore .moduleComments").length) {
            var g = $(".popupReadMore .moduleComments textarea");
            var d = $(".popupReadMore .moduleComments .top input.btn");
            var e = $(".popupReadMore .moduleComments .reloadBlock");
            var f = e.find(".reloadPane");
            var a = g.val();
            var b = g.data("commenttype");
            var h = g.data("refid");
            d.hide();
            d.before('<img src="/_static/local/images/loading-comments.gif" alt="" id="popupCommentLoading" />');
            f.show();
            $.ajax({
                type: "POST",
                url: "/_handlers/comments/add.ashx",
                data: {
                    comment: a,
                    commentType: b,
                    refID: h
                },
                success: function(i, j) {
                    $(".popupReadMore .moduleComments .top .msgError").remove();
                    $("#popupCommentLoading").remove();
                    if (i.success) {
                        g.hide();
                        g.before('<div class="msg msgSuccess"><p>Comment Added</p></div>');
                        $(".popupReadMore .moduleComments .reloadBlock ol.commentList").prepend(i.html)
                    } else {
                        g.before('<div class="msg msgError"><p>' + i.val + "</p></div>");
                        d.show()
                    }
                    f.hide()
                },
                error: function(k, j, i) {},
                complete: function(j, i) {}
            })
        }
    },
    LightboxView: function(a) {
        var b = a.closest(".viewInfo");
        var e = a.data("method");
        var d;
        var c;
        if (typeof a.attr("data-itemid") === "undefined") {
            c = parseInt(b.data("itemid"));
            d = b.data("itemtype")
        } else {
            c = parseInt(a.data("itemid"));
            d = a.data("itemtype")
        }
        if (a.parents(".isleBannerMultiWrap").length) {
            clearInterval(MUSE.bannerInterval)
        }
        $("object:visible,embed:visible").addClass("popupHidden").hide();
        $("#fadeWrap").show();
        $(".popup").remove();
        $("body").append('<div class="popup popupReadMore popupLoading"></div>');
        $(".popupReadMore").show();
        if (MUSE.ajaxContent) {
            MUSE.ajaxContent.abort()
        }
        MUSE.ajaxContent = $.ajax({
            type: "POST",
            url: "/_handlers/content/main.ashx",
            data: {
                type: "lightbox",
                itemtype: d,
                itemid: c
            },
            success: function(f, g) {
                $(".popupReadMore").removeClass("popupLoading");
                setTimeout(function() {
                    $(".popupReadMore").html(f);
                    $(".popupReadMore .close").click(function() {
                        MUSE.PopupClose();
                        return false
                    });
                    MUSE.CheckPopupSize();
                    MUSE.AddSocialWidgets();
                    MUSE.BindUserAreaLinks();
                    MUSE.ScanMediaHolder();
                    $(".btnReport").bind("click", function() {
                        MUSE.ReportComment($(this));
                        return false
                    });
                    $(".popupReadMore .readMore").bind("click", function() {
                        MUSE.LightboxView($(this));
                        return false
                    });
                    if ($(".popupReadMore .moduleComments").length) {
                        $(".popupReadMore form").attr("action", "#");
                        var h = $(".popupReadMore .moduleComments .top input.btn");
                        h.removeAttr("id");
                        h.removeAttr("name");
                        h.removeAttr("onclick");
                        h.click(function() {
                            MUSE.LightboxComment();
                            return false
                        })
                    }
                }, 500)
            },
            error: function(h, g, f) {},
            complete: function(g, f) {}
        })
    },
    LoadFlashBanners: function() {
        if (!MUSE.scriptSwfObjAdded) {
            var a = document.createElement("script");
            a.src = "/_static/shared/scripts/swfobject.js?v" + MUSE.scriptVersionNo;
            a.id = "swfscript-js";
            MUSE.scriptFirst.parentNode.insertBefore(a, MUSE.scriptFirst);
            MUSE.scriptSwfObjAdded = true
        }
        if (typeof SWFObject === "undefined") {
            setTimeout(function() {
                MUSE.LoadFlashBanners()
            }, 100)
        } else {
            $(".isleFlashBanner").each(function() {
                var b = $(this);
                var c = new SWFObject(b.attr("data-bannerflashpath"), b.attr("data-bannerflashid"), "100%", "100%", "7", "#000000");
                c.addParam("movie", b.attr("data-bannerflashpath"));
                c.addParam("quality", "high");
                c.addParam("menu", "false");
                c.addParam("wmode", "transparent");
                c.write(b.attr("data-bannerflashoutid"))
            })
        }
    },
    LoadGoogle: function() {
        var a = $("#mapDiv");
        var c = a.attr("data-latitude");
        var d = a.attr("data-longitude");
        var h = "";
        var f = new google.maps.LatLng(c, d);
        var g = {
            zoom: 16,
            center: f,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        MUSE.mapBasic = new google.maps.Map(document.getElementById("mapDiv"), g);
        if (c != 0 || d != 0 || h != "") {
            var e = new google.maps.Marker({
                position: new google.maps.LatLng(c, d),
                map: MUSE.mapBasic,
                title: h
            })
        }
        if ($(".mapInfoWindowWrap").length > 0) {
            var b;
            google.maps.event.addListener(e, "click", function() {
                if (b) {
                    b.close()
                }
                b = new google.maps.InfoWindow({
                    content: $(".mapInfoWindowWrap").html()
                });
                b.open(MUSE.mapBasic, e)
            })
        }
    },
    LoadPhoto: function(b) {
        var a = parseInt($(".hdnGalleryID").val());
        var d = (b) ? parseInt($(".hdnNextPhotoID").val()) : parseInt($(".hdnPrevPhotoID").val());
        if (d > 0) {
            var c = (b) ? "-100%" : "100%";
            $(".viewPhoto .mainImg img").animate({
                marginLeft: c
            }, 750, function() {
                $(".viewPhoto .mainImg img").css("visibility", "hidden");
                $(".photoLoading").show();
                $.ajax({
                    type: "POST",
                    url: "/_handlers/photos/newimage.ashx",
                    data: {
                        galleryid: a,
                        photoid: d
                    },
                    success: function(e, f) {
                        $(".photoHolder").html(e)
                    },
                    error: function(g, f, e) {},
                    complete: function(f, e) {
                        MUSE.ConfigureTouchWipe()
                    }
                })
            })
        } else {
            var c = (b) ? "-10%" : "10%";
            $(".viewPhoto .mainImg img").animate({
                marginLeft: c
            }, {
                queue: true,
                duration: 100
            }).animate({
                marginLeft: "0"
            })
        }
    },
    LoadVideo: function(b, c, a) {
        var d = "ref=" + (c + 1) + "&id=" + MUSE.videoClip + "&autostart=" + a + "&bannerid=" + MUSE.bannerID;
        $.ajax({
            type: "POST",
            url: "/_iiwm/Handlers/Video/Embed.ashx",
            data: d,
            success: function(e, f) {
                b.html(e)
            },
            error: function(g, f, e) {},
            complete: function(f, e) {
                MUSE.BrightcoveExp()
            }
        })
    },
    PopupIframeHeight: function() {
        $("#iframePopupLogin").height("250px");
        $(".popupLogin").height("250px");
        $(".popupLogin").css("margin-top", "-130px")
    },
    PopupClose: function() {
        $("#fadeWrap, .popup, .lightboxImg").hide();
        $("object.popupHidden,embed.popupHidden").show();
        $(".popupReadMore .module").css("visibility", "hidden");
        if (MUSE.ajaxContent) {
            MUSE.ajaxContent.abort()
        }
    },
    PopupLogin: function() {
        $("object:visible,embed:visible").addClass("popupHidden").hide();
        $("#fadeWrap").show();
        if ($("#iframePopupLogin").length == 0) {
            var b = window.location.pathname;
            var a = MUSE.GetNVC($(this).attr("href"));
            if (typeof a.returnurl !== "undefined") {
                b = a.returnurl
            }
            $("body").append('<div class="popup popupLogin"><iframe id="iframePopupLogin" src="/_popup/login.aspx?refpage=' + b + '" scrolling="no" frameborder="0" width="255" height="235" style="background:url(/_static/local/images/loading-whitebg.gif) center center no-repeat;"></iframe></div>')
        }
        $(".popupLogin").show()
    },
    PopupLoginClose: function() {
        $(".popupLogin").html('<div class="popupLoad"></div>')
    },
    PopupLoginReload: function() {
        if ($(".popupLogin").length > 0) {
            $(".popupLogin").remove()
        }
        MUSE.PopupLogin()
    },
    PopupLoginTemp: function() {
        $("object:visible,embed:visible").addClass("popupHidden").hide();
        $("#fadeWrap").show();
        if ($(".popupLogin").length > 0) {
            $(".popupLogin").html('<div class="popupLoad"></div>')
        } else {
            $("body").append('<div class="popup popupLogin"><div class="popupLoad"></div></div>')
        }
    },
    ReloadBlock: function(a, j) {
        var c = a.closest(".reloadBlock");
        var b = c.children(".reloadPane");
        var d = c;
        b.show();
        var e = a.attr("href");
        var h = MUSE.GetNVC(e);
        var f = 1;
        var g = 1;
        var k = c.attr("data-reloadtype");
        var i = "type=" + k;
        switch (k) {
            case "comments":
                if (typeof h.pgc !== "undefined") {
                    f = parseInt(h.pgc)
                }
                if (typeof h.pgcstart !== "undefined") {
                    g = parseInt(h.pgcstart)
                }
                i = i + "&commenttype=" + c.attr("data-commenttype");
                i = i + "&commentref=" + c.attr("data-comment-ref");
                i = i + "&commentpg=" + f;
                i = i + "&commentpgstart=" + g;
                break;
            case "featcomments":
                if (typeof h.pgc !== "undefined") {
                    f = parseInt(h.pgc)
                }
                i = i + "&commentpg=" + f;
                break;
            default:
                i = ""
        }
        $("html,body").animate({
            scrollTop: d.offset().top - 110
        }, "fast");
        if (i != "") {
            setTimeout(function() {
                $.ajax({
                    type: "POST",
                    url: "/_handlers/content/main.ashx",
                    data: i,
                    success: function(l, m) {
                        c.html(l + '<div class="reloadPane"><span></span></div>')
                    },
                    error: function(n, m, l) {},
                    complete: function(m, l) {
                        b.slideUp("fast");
                        $(j).unbind("click");
                        $(j).bind("click", function() {
                            MUSE.ReloadBlock($(this), j);
                            return false
                        });
                        switch (k) {
                            case "comments":
                                $(".btnReport").bind("click", function() {
                                    MUSE.ReportComment($(this));
                                    return false
                                });
                            default:
                        }
                        MUSE.CheckFooterLocation()
                    }
                })
            }, 500)
        } else {
            b.hide()
        }
    },
    ReportComment: function(b) {
        var a = parseInt(b.attr("data-commentid"));
        $("#fadeWrap").show();
        $("object:visible,embed:visible").addClass("popupHidden").hide();
        if ($(".popupReport").length == 0) {
            $("body").append('<div class="popup popupReport"></div>')
        }
        var b = $(".popupReport");
        b.html('<div class="popupLoad"></div>');
        b.show();
        var c = "commentid=" + a + "&url=" + encodeURIComponent(window.location.pathname);
        setTimeout(function() {
            $.ajax({
                type: "POST",
                url: "/_handlers/comments/report.ashx",
                data: c,
                success: function(d, e) {
                    b.html(d)
                },
                error: function(f, e, d) {},
                complete: function(e, d) {
                    $(".popupReport .close").bind("click", function() {
                        MUSE.ClosePopup();
                        return false
                    });
                    $(".popupReport .userLogin").bind("click", function() {
                        $(".popupReport").hide();
                        MUSE.PopupLogin();
                        return false
                    })
                }
            })
        }, 250)
    },
    ScanMediaHolder: function() {
        var a = $(".mediaHolder").length;
        if (a > 0) {
            $(".mediaHolder").each(function(c) {
                var b = $(this);
                MUSE.videoClip = parseInt(b.attr("data-media"), 10);
                MUSE.bannerID = parseInt(b.attr("data-bannerid"), 10);
                MUSE.LoadVideo(b, c, false)
            })
        }
    },
    SetBgDims: function() {
        var a = $("#bg img");
        var b = new Image();
        var c = a.attr("src");
        b.onload = function() {
            a.show();
            var f = $(window);
            var i = f.width();
            var h = f.height();
            var e = "100%";
            var d = "auto";
            if (i > 0) {
                var g = (i / b.width) * b.height;
                if (g < h) {
                    e = "auto";
                    d = "100%"
                }
            }
            a.css({
                width: e,
                height: d
            })
        };
        b.src = c
    }
};
$(function() {
    MUSE.Init()
});
MUSE.STORE = {
    Init: function() {
        MUSE.STORE.GetBasket();
        if ($(".buy").length > 0) {
            $(".buy .btn").click(function() {
                var a = this;
                $(this).text("Please wait...");
                $.ajax({
                    url: "/_handlers/shop/basketadd.ashx",
                    type: "POST",
                    dataType: "html",
                    data: {
                        sID: $(a).attr("s"),
                        bID: $(a).attr("b"),
                        q: $(a).siblings('[name="qty"]').find("option:selected").text()
                    },
                    success: function(b) {
                        $(a).siblings('[name="result"]').html(b);
                        MUSE.STORE.GetBasket(1);
                        $(".buy .btn").text("Add to basket")
                    }
                });
                return false
            })
        }
        if ($(".prodItem").length > 0) {
            $(".prodItem ul.stock li:first").show();
            $("select.options").change(function() {
                MUSE.STORE.ShowStock()
            })
        }
        if ($(".trackcb").length > 0) {
            $(".trackcb").change(function() {
                if (this.checked) {
                    $("#" + $(this).attr("t")).addClass("selected")
                } else {
                    $("#" + $(this).attr("t")).removeClass("selected")
                }
            })
        }
        if ($(".buyTrack").length > 0) {
            $(".buyTrack .btn").click(function() {
                var a = this;
                $(this).text("Please wait...");
                var b = "";
                $(".trackcb:checkbox:checked").each(function() {
                    b = b + $(this).attr("t") + ","
                });
                $.ajax({
                    url: "/_handlers/shop/basketadd.ashx",
                    type: "POST",
                    dataType: "html",
                    data: {
                        tIDs: b,
                        bID: $(a).attr("b"),
                        q: "1"
                    },
                    success: function(c) {
                        $(a).parents(".shopTracks").next('[name="result"]').html(c);
                        MUSE.STORE.GetBasket(1);
                        $(".buyTrack .btn").text("Add to basket")
                    }
                });
                $(".trackcb:checkbox:checked").attr("checked", false);
                $("ul.tracks li").removeClass("selected");
                return false
            })
        }
    },
    GetBasket: function() {
        $.ajax({
            type: "GET",
            url: "/_handlers/shop/basket.ashx",
            success: function(a) {
                $(".miniBasket").html(a)
            }
        })
    },
    ShowStock: function() {
        $(".prodItem ul.stock li").hide();
        var a = $("select.options").val();
        $(".prodItem ul.stock li.s" + a).show()
    }
};
var ISLE = {
    Init: function() {},
    ConfirmDelete: function() {
        return confirm("Are you sure you want to delete this?")
    },
    ShowWaitingIcon: function(a) {
        var b = "/_static/local/images/loading-sml.gif";
        if (jQuery.isFunction(a.before)) {
            a.before('<img src="' + b + '" alt="" class=""imgLoad"" />');
            a.hide()
        } else {
            var c = document.createElement("img");
            c.src = b;
            c.setAttribute("class", "imgLoad");
            a.parentNode.insertBefore(c, a);
            a.style.display = "none"
        }
    }
};
ISLE.COOKIES = {
    Domain: "",
    Init: function() {
        if (ISLE.COOKIES.GetCookie("CookieTextSeen") != 1) {
            ISLE.COOKIES.CookiePrompt()
        }
    },
    CookiePrompt: function() {
        var a = ISLE.COOKIES.GetCookie("CookiesAccepted");
        var c = $(".cookiePrompt");
        var b = c.find(".cookieClosePrompt");
        $(c).show();
        b.bind("click keydown", function(d) {
            if (!d.keyCode || d.keyCode == 13) {
                $(c).hide();
                ISLE.COOKIES.SetCookie("CookieTextSeen", 1, 365, document.domain);
                d.preventDefault();
                return false
            }
        })
    },
    GetCookie: function(b) {
        var c, d, e, a = document.cookie.split(";");
        for (c = 0; c < a.length; c++) {
            d = a[c].substr(0, a[c].indexOf("="));
            e = a[c].substr(a[c].indexOf("=") + 1);
            d = d.replace(/^\s+|\s+$/g, "");
            if (d == b) {
                return unescape(e)
            }
        }
    },
    SetCookie: function(a, f, e, c) {
        var d = new Date();
        d.setDate(d.getDate() + e);
        var b = escape(f) + ((e == null) ? "" : "; expires=" + d.toUTCString());
        if (c) {
            b += "; domain=" + c + "; path=/"
        }
        document.cookie = a + "=" + b
    }
};

function confirmDelete() {
    ISLE.ConfirmDelete()
}

function showWaitingIcon(a) {
    ISLE.ShowWaitingIcon(a)
}

function pageLoad(c, b) {
    MUSE.BlurFocus();
    if (MUSE.popoverDoubleInitCheck) {
        MUSE.AddHoverTooltip()
    } else {
        MUSE.popoverDoubleInitCheck = true
    }
    $(".hdnRebindComments").each(function() {
        var d = $(this);
        if (d.val() != "") {
            var f = d.closest(".moduleComments");
            var e = f.find(".reloadBlock");
            e.find("a.dummyLink").remove();
            e.append('<a href="?pgc=1&pgcstart=1" class="dummyLink"></a>');
            MUSE.ReloadBlock(e.find("a.dummyLink"), ".reloadBlock .paging a");
            d.val("")
        }
    });
    if ($(".colorPickerField").length > 0) {
        var a = true;
        $(".colorpicker").remove();
        $(".colorPickerField").keypress(function(d) {
            if (d.keyCode == "13") {
                d.preventDefault()
            }
        });
        $(".colorPickerImg").click(function() {
            $(this).parent().children(".colorPickerField").trigger("click")
        });
        $(".colorPickerField").ColorPicker({
            onSubmit: function(f, e, g, d) {
                $(d).val(e);
                $(d).ColorPickerHide();
                a = true;
                $(d).parent().children(".colorPickerImg").css({
                    backgroundColor: "#" + e
                })
            },
            onBeforeShow: function() {
                $(this).ColorPickerSetColor(this.value)
            }
        }).bind("keyup", function() {
            $(this).ColorPickerSetColor(this.value)
        })
    }
};