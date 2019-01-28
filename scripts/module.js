var userAgentCustom = window.navigator.userAgent;
var ua = navigator.userAgent.toLowerCase();
var isAndroid = ua.indexOf("android") > -1;
var isIE11version = !!navigator.userAgent.match(/Trident.*rv\:11\./);
var isIOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
var CurClientWidth = window.innerWidth;
var Macbrowser = navigator.userAgent.indexOf('Chrome');
var Macos = navigator.userAgent.indexOf('Mac');
var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
var isIpad = userAgentCustom.match(/iPad/i)
var isIphone = (navigator.userAgent.match(/iPhone/i))
var isIEEdge = /Edge/.test(navigator.userAgent)
var isFirefox = /Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)
var animTime = 1000;
if (isIphone != null) {
    animTime = 3000;
}
jQuery.fn.extend({
    k_enable: function () {
        return this.removeClass('disabled').attr("aria-disabled", "false").removeAttr("disabled");
    },
    k_disable: function () {
        this.addClass('disabled').attr("aria-disabled", "true").attr("disabled", "disabled");
        if (!isIE11version) {
            this.attr("disabled", "disabled");
        }
        return;
    },    
    link_k_disable: function() {
        return this.addClass('disabled').attr("aria-disabled","true");
    },
    k_IsDisabled: function () {
        if (this.hasClass('disabled')) { return true; } else { return false; }
    }
});
var _ModuleCommon = (function () {
    var reviewData = [];
    return {
        EnableNext: function () {
            var currentPageData = _Navigator.GetCurrentPage();
            if (currentPageData.nextPageId != undefined && currentPageData.nextPageId != "") {
                $("#linknext").k_enable();
            }
        },
        GetPageReviewData: function () {
            var currentPageData = _Navigator.GetCurrentPage();
            if (reviewData != undefined && reviewData.length > 0) {
                for (var i = 0; i < reviewData.length; i++) {
                    if (reviewData[i].pageId == currentPageData.pageId) {
                        return reviewData[i];
                    }
                }
            }

        },
        RemoveReviewData: function () {
            var currentPageData = _Navigator.GetCurrentPage();
            index = -1;
            if (reviewData != undefined && reviewData.length > 0) {
                for (var i = 0; i < reviewData.length; i++) {
                    if (reviewData[i].pageId == currentPageData.pageId) {
                        index = i;
                        break;
                    }
                }
            }
            if (i > -1) {
                reviewData.splice(i, 1);
            }

        },
        GetReviewData: function () {
            return reviewData;
        },
        SetReviewData: function (rData) {
            reviewData = rData;
        },
        GetPageDetailData: function () {
            var currentPageData = _Navigator.GetCurrentPage();
            var pageData = _PData[currentPageData.pageId];
            return pageData;
        },
        ShowFeedbackReviewMode: function () {
            var pageData = this.GetPageDetailData();
            var reviewData = this.GetPageReviewData();
            var fdkurl = "";
            if (pageData != undefined && reviewData != undefined) {
                fdkurl = reviewData.fdkurl;
                $("#div_feedback").removeAttr("aria-hidden");
                $("#div_feedback").show();
                $("#div_feedback").css("display", "inline-block");
                $("#div_feedback .div_fdkcontent").load(fdkurl, function () {
                    //this.SetFeedbackTop()
                    window.scrollTo(0, document.body.scrollHeight);
                });
            }
        },
        DisplayUserReviewMode: function () {
            if (_Navigator.GetCurrentPage().pageId == "p12") {
                this.ShowTextareaReviewMode();
                var reviewData = this.GetPageReviewData();
                fdkurl = reviewData.fdkurl;
                $("#div_feedback").removeAttr("aria-hidden");
                $("#div_feedback").show();
                $("#div_feedback").css("display", "inline-block");
                $("#div_feedback .div_fdkcontent").load(fdkurl, function () {
                    //this.SetFeedbackTop()
                    window.scrollTo(0, document.body.scrollHeight);
                });
                $("textarea").k_disable();
            }
            else {
                $('input:not(#submitbtn)').k_disable();
            $('#submitbtn').link_k_disable();
                this.DisplayCheckboxCorrectIncorrect();
                this.ShowFeedbackReviewMode();
            }
        },
        ShowTextareaReviewMode: function () {
            var pageReviewData = this.GetPageReviewData();
            if (pageReviewData != undefined) {
                $("textarea").text(pageReviewData.textarea_text);
                $("#remainingchar").text(pageReviewData.remainChar);
            }
        },
        DisplayCheckboxCorrectIncorrect: function () {
            var pageDetailData = this.GetPageDetailData();
            var pageReviewData = this.GetPageReviewData();

            if (reviewData != undefined) {
                $("#" + pageReviewData.radio).prop("checked", "true");
                $('input[type="radio"]:checked').next("label").find("span").addClass("without-before")
                if (pageDetailData.radio == pageReviewData.radio) {

                    $("#" + pageDetailData.radio).next("label").append(' <i class="fa radio-fa-check fa-check" style="font-size:15px;color:#01662C;"></i>');
                    $("#" + pageDetailData.radio).addClass("correct");
                    $('input[type="radio"]:checked').next("label").find("span").addClass("without-before")
                }
                else {
                    $('input[type="radio"]:checked').next("label").find("span").addClass("without-before")
                    $("#" + pageReviewData.radio).next("label").append(' <i class="fa radio-fa-check-incorrect fa-times" style="font-size:20px;color:#B22222"></i>');
                    $("#" + pageReviewData.radio).addClass("incorrect");
                    $("#" + pageDetailData.radio).next("label").append(' <i class="fa radio-fa-check fa-check" style="font-size:15px;color:#01662C;"></i>');
                    $("#" + pageDetailData.radio).addClass("correct");
                }

                for (var i = 0; i < pageReviewData.checkbox.length; i++) {
                    $("#" + pageReviewData.checkbox[i]).prop("checked", "true");
                    if (pageDetailData.checkbox.indexOf(pageReviewData.checkbox[i]) >= 0) {
                        $(".checkmark").hide();
                        $("#" + pageReviewData.checkbox[i]).next("label").append(' <i class="fa fa-check" style="font-size:20px;color:#01662C;"></i>');
                        $("#" + pageReviewData.checkbox[i]).addClass("correct");
                        $("#" + pageReviewData.checkbox[i]).next("label").css({ "font-weight": "bold" })
                    }
                    else {
                        $(".checkmark").hide();
                        $("#" + pageReviewData.checkbox[i]).next("label").append(' <i class="fa fa-times" style="font-size:20px;color:#B22222"></i>');
                        $("#" + pageReviewData.checkbox[i]).addClass("incorrect");
                        $("#" + pageReviewData.checkbox[i]).next("label").css({ "font-weight": "bold" })
                    }
                    $("#" + pageReviewData.checkbox[i]).next("label").find(".checkmark").removeClass("checkmark");
                }
                for (var i = 0; i < pageDetailData.checkbox.length; i++) {
                    if ($("#" + pageDetailData.checkbox[i]).next("label").find(".checkmark").length > 0) {
                        $("#" + pageDetailData.checkbox[i]).addClass("correct");
                        $("#" + pageDetailData.checkbox[i]).next("label").append(' <i class="fa fa-check" style="font-size:20px;color:#01662C;"></i>');
                        //$("#" + pageDetailData.checkbox[i]).addClass("correct");
                        $("#" + pageDetailData.checkbox[i]).next("label").find(".checkmark").removeClass("checkmark");
                        //$("#" + pageDetailData.checkbox[i]).closest("label").css({ "font-weight": "bold" })
                    }
                }
            }
            this.SetAccessibility();
            if (isFirefox || isIE11version) {
                this.SetCustomarialabelforRadio();
            }
        },
        DisplayChecklistCorrectIncorrect: function () {
            var chkboxarray = $("input[type='checkbox']:checked").map(function () {
                return $(this).attr("id");
            }).get();
            var pageDetailData = this.GetPageDetailData();
            var radio = $("input[type='radio']:checked").attr("id")
            correctcnt = 0;
            if (pageDetailData.radio == radio) {
                $("#" + pageDetailData.radio).next("label").append(' <i class="fa radio-fa-check fa-check" style="font-size:15px;color:#01662C;"></i>');
                $("#" + pageDetailData.radio).addClass("correct");
                $('input[type="radio"]:checked').next("label").find("span").addClass("without-before")
            }
            else {
                $('input[type="radio"]:checked').next("label").find("span").addClass("without-before")
                $("#" + radio).next("label").append(' <i class="fa radio-fa-check-incorrect fa-times" style="font-size:20px;color:#B22222"></i>');
                $("#" + radio).addClass("incorrect");

            }
            $(".checkmark").hide();
            for (var i = 0; i < chkboxarray.length; i++) {
                if (pageDetailData.checkbox.indexOf(chkboxarray[i]) >= 0) {
                    $("#" + chkboxarray[i]).next("label").append(' <i class="fa fa-check" style="font-size:20px;color:#01662C;"></i>');
                    $("#" + chkboxarray[i]).addClass("correct");
                    correctcnt++;
                }
                else {
                    $("#" + chkboxarray[i]).next("label").append(' <i class="fa fa-times" style="font-size:20px;color:#B22222"></i>');
                    $("#" + chkboxarray[i]).addClass("incorrect");
                }

                $("#" + chkboxarray[i]).next("label").find(".checkmark").removeClass("checkmark");
            }

            this.Applycss();
            this.SetAccessibility();
            if (isFirefox || isIE11version) {
                this.SetCustomarialabelforRadio();
            }
        },
        SetAccessibility: function () {
            var radio = $("input[type='radio']:checked").attr("id")
            var rarialabel = "";
            if ($("#" + radio).hasClass("correct")) {
                rarialabel = "Correct option Selected " + $("#" + radio).next("label").text();
                $("#" + radio).next("label").attr("aria-hidden", "true");
            }
            else {
                $("input[type='radio'].correct").attr("aria-label", "Correct option");
                rarialabel = "Incorrect option selected " + $("#" + radio).next("label").text();
                $("#" + radio).next("label").attr("aria-hidden", "true");
            }
            $("#" + radio).attr("aria-label", rarialabel);
            var chkboxarray = $("input[type='checkbox']").map(function () {
                return $(this).attr("id");
            }).get();
            var carialabel = "";
            for (var i = 0; i < chkboxarray.length; i++) {
                carialabel = "";
                if ($("#" + chkboxarray[i]).hasClass("correct")) {
                    if ($("#" + chkboxarray[i]).prop("checked") == true) {
                        carialabel = "Correct option selected " + $("#" + chkboxarray[i]).next("label").text();
                        $("#" + chkboxarray[i]).next("label").attr("aria-hidden", "true");
                    }
                    else {
                        carialabel = "Correct option " + $("#" + chkboxarray[i]).next("label").text();
                        $("#" + chkboxarray[i]).next("label").attr("aria-hidden", "true");
                    }
                }
                else if ($("#" + chkboxarray[i]).hasClass("incorrect")) {
                    carialabel = "Incorrect option selected " + $("#" + chkboxarray[i]).next("label").text();
                    $("#" + chkboxarray[i]).next("label").attr("aria-hidden", "true");
                }
                $("#" + chkboxarray[i]).attr("aria-label", carialabel);
            }

        },
        OnPageLoad: function () {
            var pageDetailData = this.GetPageDetailData();
            this.ApplycontainerWidth();
            $("#div_feedback").hide();
            $('#hintdiv').hide();
            $("#textareasubmitbtn").link_k_disable();
            if (pageDetailData != undefined && pageDetailData.radio != undefined) {
                $("input[type='checkbox']").addClass("pagecheckbox").k_disable();
                $(".checkbox-item").k_disable();
                $("input[type='radio']").addClass("pageradio");
                $("#submitbtn").link_k_disable();
            }
            if (_Navigator.IsAnswered() && !_Navigator.GetCurrentPage().isStartPage) {
                this.DisplayUserReviewMode();
            }
            else {
                this.RemoveReviewData();
            }
            if ((/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))) {
                $('#footer-navigation').css('display', 'table');
            }
            /*if (_Navigator.IsPresenterMode()) {
                this.LoadPresenterMod();
            }*/

        },
        LoadPresenterMod: function () {
            $("#linknext").k_enable();
            /*
            var currPage = _Navigator.GetCurrentPage();
            _Navigator.SetPageStatus(true);
            if(currPage.pageId == "p12"){
                $("#textareainputhere").k_disable();
            }
            var pageDetailData = this.GetPageDetailData();
            if (pageDetailData != undefined) {
                $("#" + pageDetailData.radio).next("label").find("span").after(' <i class="fa radio-fa-check fa-check" style="font-size:15px;color:#01662C;"></i>');
                $("#" + pageDetailData.radio).attr("checked", "true");
                $("#" + pageDetailData.radio).addClass("correct");
                $("#" + pageDetailData.radio).next("label").find("span").addClass("without-before");
                $("input[type='radio']").k_disable();
                for (var i = 0; i < pageDetailData.checkbox.length; i++) {
                    $("#" + pageDetailData.checkbox[i]).next("label").find("span").after(' <i class="fa radio-fa-check fa-check" style="font-size:20px;color:#01662C;"></i>');
                    $("#" + pageDetailData.checkbox[i]).addClass("correct");
                    $("#" + pageDetailData.checkbox[i]).attr("checked", "true");
                    $("#" + pageDetailData.checkbox[i]).next("label").css("font-weight", "bold");
                    $("input[type='checkbox']").k_disable();
                    $("input[type='checkbox']").next("label").find(".checkmark").removeClass("checkmark");
                    $("input[type='checkbox']").next("label").find("span").hide();
                    $("input[type='checkbox']").css({ "position": "absolute", "opacity": "0" });
                }
            }
            if(_Navigator.GetCurrentPage().pageId == "p12"){
                $("#textareainputhere").addClass("disabled")
            }
            this.SetAccessibility();
            if (isFirefox || isIE11version) {
                this.SetCustomarialabelforRadio();
            }
            if (isIE11version) {
                //this.IECustomCheckboxAccessbility();
            }
            _Navigator.SetPageStatus(true)
            */

        },
        Applycss: function () {

            var isIE11version = !!navigator.userAgent.match(/Trident.*rv\:11\./);
            if (/Edge/.test(navigator.userAgent) || isIE11version) {
                $('input[type="radio"]:checked').closest("label").find(".radio-fa-check").css("bottom", "7px")
            }
        },
        EnableSubmit: function () {
            //var currPage = _Navigator.GetCurrentPage().pageId;
            var pageData = this.GetPageDetailData();
            if ($("input[type='radio']:checked").attr("id") == "radio1") {
                $("input[type='checkbox']:checked").each(function () {
                    $(this).removeAttr("checked");
                    $(this).closest("label").css({ "font-weight": "normal" })
                })
                $("input[type='checkbox']").k_disable();
                $(".checkbox-item").k_disable();
                $("#submitbtn").k_enable();
            }

            else if ($("input[type='radio']:checked").attr("id") == "radio2") {
                $("input[type='checkbox']").k_enable();
                $(".checkbox-item").k_enable();
                if (pageData.checkbox.length == 0 && $("input[type='checkbox']:checked").length > 0) {
                    $("#submitbtn").k_enable();
                }
                else if ($("input[type='checkbox']:checked").length > 0 && $("input[type='checkbox']:checked").length == pageData.checkbox.length) {
                    $("#submitbtn").k_enable();
                }
                else {
                    $("#submitbtn").link_k_disable();
                }
            }

        },
        CalculateScore: function () {
            var pageData = this.GetPageDetailData();
            var score = 0;
            if ($("input[type='radio']:checked").attr("id") == pageData.radio) {
                score += 1;
            }
            var chkboxarray = $("input[type='checkbox']:checked").map(function () {
                return $(this).attr("id");
            }).get();

            for (var i = 0; i < chkboxarray.length; i++) {
                if (pageData.checkbox.indexOf(chkboxarray[i]) >= 0) {
                    score += 1;
                }
            }
            return score

        },
        OnSubmit: function () {
            $('input:not(#submitbtn)').k_disable();
            $('#submitbtn').link_k_disable();
            var currPid = _Navigator.GetCurrentPage().pageId;
            _Navigator.IncrementCounter();
            var pageData = this.GetPageDetailData();
            var fdbkUrl = "";
            if (_Navigator.GetCurrentPage().hasOnlyRadio) {
                var isRadioCorrect = this.GetRadioStatus();
                if (isRadioCorrect) {
                    fdbkUrl = _Settings.dataRoot + pageData.feedback[0];
                    $('input[type="radio"]:checked').next("label").find("span").addClass("without-before")
                    $("#" + pageData.radio).attr("checked", "checked");
                    this.AddReviewData(true, fdbkUrl);
                    this.DisplayCheckboxCorrectIncorrect();
                    _Navigator.SetPageScore(this.CalculateScore())
                    _Navigator.SetPageStatus(true);
                    this.EnableNext();
                    _Navigator.GetBookmarkData();
                }
                else {
                    if ((_Navigator.GetCounter() == 1)) {
                        fdbkUrl = _Settings.dataRoot + pageData.feedback[2];
                        this.AddReviewData(false, fdbkUrl);
                        this.DisplayChecklistCorrectIncorrect();
                    }
                    else {
                        fdbkUrl = _Settings.dataRoot + pageData.feedback[1];
                        this.AddReviewData(true, fdbkUrl);
                        this.DisplayCheckboxCorrectIncorrect();
                        _Navigator.SetPageScore(this.CalculateScore())
                        _Navigator.SetPageStatus(true);
                        this.EnableNext();
                        _Navigator.GetBookmarkData();
                    }
                }
            }
            else {
                var isAllCheckCorrect = this.GetCheckboxStatus();
                var isRadioCorrect = this.GetRadioStatus();
                if (isRadioCorrect && isAllCheckCorrect) {
                    fdbkUrl = _Settings.dataRoot + pageData.feedback[0];
                    $('input[type="radio"]:checked').next("label").find("span").addClass("without-before")
                    $("#" + pageData.radio).attr("checked", "checked");
                    this.AddReviewData(true, fdbkUrl);
                    this.DisplayCheckboxCorrectIncorrect();
                    _Navigator.SetPageScore(this.CalculateScore())
                    _Navigator.SetPageStatus(true);
                    this.EnableNext();
                    _Navigator.GetBookmarkData();
                }
                else {

                    if ((_Navigator.GetCounter() == 1 && isRadioCorrect && !isAllCheckCorrect) ||
                        (_Navigator.GetCounter() == 1 && !isRadioCorrect != true && isAllCheckCorrect) ||
                        (_Navigator.GetCounter() == 1 && !isRadioCorrect && !isAllCheckCorrect)) {

                        fdbkUrl = _Settings.dataRoot + pageData.feedback[1];
                        this.AddReviewData(false, fdbkUrl);
                        this.DisplayChecklistCorrectIncorrect();
                    }
                    else if (_Navigator.GetCounter() == 2 && !isRadioCorrect && !isAllCheckCorrect ||
                        (_Navigator.GetCounter() == 2 && !isRadioCorrect && isAllCheckCorrect)) {
                        fdbkUrl = _Settings.dataRoot + pageData.feedback[2];
                        this.AddReviewData(false, fdbkUrl);
                        this.DisplayCheckboxCorrectIncorrect();
                        _Navigator.SetPageScore(this.CalculateScore())
                        _Navigator.SetPageStatus(true);
                        this.EnableNext();
                        _Navigator.GetBookmarkData();
                    }
                    else if ((_Navigator.GetCounter() == 2 && isRadioCorrect && !isAllCheckCorrect)) {
                        fdbkUrl = _Settings.dataRoot + pageData.feedback[3];
                        this.AddReviewData(false, fdbkUrl);
                        this.DisplayCheckboxCorrectIncorrect();
                        _Navigator.SetPageScore(this.CalculateScore())
                        _Navigator.SetPageStatus(true);
                        this.EnableNext();
                        _Navigator.GetBookmarkData();
                    }
                }
            }
            $("#div_feedback").removeAttr("aria-hidden");
            $('input:not(#submitbtn)').k_disable();
            $('#submitbtn').link_k_disable();
            $("#div_feedback").show();
            $("#div_feedback").css("display", "inline-block");
            $("#div_feedback .div_fdkcontent").load(fdbkUrl, function () {
                $("#div_feedback p:first").attr("tabindex", "-1");
                if (isIOS) {
                    $("#div_feedback p:first").attr("role", "text")
                }
                window.scrollTo(0, document.body.scrollHeight);
                $("#div_feedback p:first").focus();
            });
        },
        GetCheckboxStatus: function () {
            var pageDetailData = this.GetPageDetailData();
            var checkboxarray = $("input[type='checkbox']:checked").map(function () {
                return $(this).attr("id");
            });
            var retval = true;
            if (checkboxarray != undefined) {
                if (checkboxarray.length < pageDetailData.checkbox.length) {
                    retval = false;
                }
                else {
                    var truecount = 0;
                    for (var i = 0; i < checkboxarray.length; i++) {
                        for (var j = 0; j < pageDetailData.checkbox.length; j++) {
                            if (checkboxarray[i] != pageDetailData.checkbox[j]) {
                                retval = false;
                            }
                            else {
                                retval = true;
                                truecount++;
                                break;
                            }
                        }
                    }
                    if (pageDetailData.checkbox.length == truecount) {
                        retval = true;
                    }
                    else {
                        retval = false;
                    }
                }
            }
            else {
                retval = false;
            }

            return retval;
        },
        GetRadioStatus: function () {
            var pageData = this.GetPageDetailData();
            if ($("input[type='radio']:checked").attr("id") == pageData.radio) {
                return true;
            }
            else {
                return false
            }
        },
        OnContinue: function () {

            $(".checkmark").show();
            $('input[type="checkbox"].incorrect').next("label").find("span").removeClass("without-before");
            $('input[type="checkbox"].incorrect').next("label").css({ "font-weight": "normal" })
            $("input[type='checkbox']:not(.correct)").k_enable();
            $("input[type='checkbox']:not(.correct)").removeAttr("checked");
            $("input[type='checkbox']:not(.correct)").removeAttr("aria-label")
            $("input[type='checkbox']:not(.correct)").next("label").find("span").addClass("checkmark")
            $("input[type='checkbox']:not(.correct)").next("label").find("i").remove();
            $("input[type='checkbox']:not(.correct)").next("label").removeAttr("aria-hidden");
            $('input[type="checkbox"]:not(.correct)').removeAttr("aria-hidden");
            $('input[type="checkbox"]:not(.correct)').next("label").next(".Accessibility").remove();
            //$(".Accessibility").remove();
            $('input[type="checkbox"]:not(.correct)').removeAttr("aira-hidden");

            if (!$('input[type="radio"]:checked').hasClass("correct")) {
                $('input[type="radio"]:checked').next("label").find("span").removeClass("without-before")
                //$('input[type="radio"]:checked').removeAttr("aria-hidden");
                //$('input[type="radio"]:checked').next("label").find("i").remove();
                $("input[type='radio']:not(.correct)").k_enable();
                $("input[type='radio']:not(.correct)").removeAttr("checked").removeAttr("aria-label");
            }
            $("input[type='radio']:not(.correct)").next("label").next(".Accessibility").remove();
            $('input[type="radio"]:not(.correct)').next("label").removeAttr("aria-hidden");
            $("input[type='radio']:not(.correct)").removeAttr("aria-hidden");
            $("input[type='radio'].incorrect").next("label").find("i").remove();
            $("input[type='radio']").removeClass("incorrect");
            //$("input[type='radio']").next("label").removeAttr("aria-hidden");
            $("#div_feedback .div_fdkcontent").html("");
            $("#div_feedback").attr("aria-hidden","true");
            $("#div_feedback").hide();
            $(".checkmark").show();

            $('html,body').animate({ scrollTop: document.body.scrollHeigh }, 500, function () {
                $(".radio-group div:first").attr("tabindex", "-1")
                $(".radio-group div:first").focus();
            });
            if ($('input[type="radio"]:checked').hasClass("correct")) {
                $("input[type='checkbox']:not(.correct)").k_enable();
            }
            else {
                $("input[type='checkbox']").k_disable();
            }
        },
        AddReviewData: function (isCorrect, fdkurl) {
            var pageData = this.GetPageDetailData();
            var currentPageData = _Navigator.GetCurrentPage();
            var found = false;
            var index = 0;
            for (var i = 0; i < reviewData.length; i++) {
                if (currentPageData.pageId == reviewData[i].pageId) {
                    index = i;
                    found = true;
                    break;
                }
            }
            if (found) {
                reviewData[i].radio = $("input[type='radio']:checked").attr("id")
                reviewData[i].checkbox = $("input[type='checkbox']:checked").map(function () {
                    return $(this).attr("id");
                }).get();
                reviewData[i].isCorrect = isCorrect;
                reviewData[i].fdkurl = fdkurl;
            }
            else if (currentPageData.pageId == "p12") {
                var obj = {};
                obj.pageId = currentPageData.pageId;
                obj.textarea_text = $("textarea").val();
                obj.remainChar = $("#remainingchar").text();
                obj.fdkurl = fdkurl;
                reviewData.push(obj);
            }
            else {
                var obj = {};
                obj.pageId = currentPageData.pageId;
                obj.radio = $("input[type='radio']:checked").attr("id");
                obj.checkbox = $("input[type='checkbox']:checked").map(function () {
                    return $(this).attr("id");
                }).get();
                obj.isCorrect = isCorrect;
                obj.fdkurl = fdkurl;
                reviewData.push(obj)
            }
        },

        ApplycontainerWidth: function () {

            var innerWidth = $(window).width();

            $("#header-title img").attr("src", "assets/images/logo.png")

            if (innerWidth < 850) {
                if ($(".activityContainer").find(".activityimg").length > 0) {
                    var marginleft = $(".intro-content:first").css("margin-left");
                    marginleft = marginleft.substring(0, marginleft.indexOf("px"))

                    var imgcntwidth = innerWidth - (marginleft * 2);
                    $(".activity").css({ "width": imgcntwidth + "px" })
                }
                if (innerWidth <= 500) {
                    $("#header-title img").attr("src", "assets/images/pearson-logo-v1.png")
                }
            }
            else {
                $(".activity").css({ "width": "auto" })
            }

        },
        OrientationChange: function () {

            this.ApplycontainerWidth();

        },

        SetFeedbackTop: function () {
            var ptop = Number($("#div_feedback").position().top);
            var pheight = Number($("#div_feedback").outerHeight());
            var pdiff = (_Settings.minHeight + _Settings.topMargin) - (ptop + pheight);
            if (pdiff > 0) {
                $("#div_feedback").css("margin-top", (pdiff + 35) + "px");
            }
        },
        AppendFooter: function () {
            $("#header-progress .presentationModeFooter").show();

            $("footer").show();
            $("#linknext").k_enable();

        },
        AppendScormReviewFooter: function () {
            $(".presentationModeFooter").html('Review Mode');
            $("#header-progress .presentationModeFooter").show();

            $("footer").show();
            $("#linknext").k_enable();
            /*
            if ($(".ScormReviewFooter").length == 0) {
                var str = '<div class="ScormReviewFooter"> Review Mode</div>';
                $("footer").append($(str));
                $("footer").show();
                $("#linknext").k_enable();
            }*/
        },

        SetCustomarialabelforRadio: function () {
            $(".Accessibility").remove();
            $("input[type='radio']").each(function () {
                var ischecked = "\n radio button unavailable"
                if ($(this).prop("checked") == "true" || $(this).prop("checked") == true) {
                    ischecked = ischecked + " checked "
                }
                else {
                    ischecked = ischecked + " not checked "
                }
                var radioalabel = "";
                if ($(this).hasClass("correct") && $(this).prop("checked")) {
                    radioalabel = ischecked + " correct option selected" + $(this).next("label").text();
                }
                else if ($(this).hasClass("incorrect") && $(this).prop("checked")) {
                    radioalabel = ischecked + " incorrect option selected " + $(this).next("label").text();
                }
                else {
                    radioalabel = ischecked + $(this).next("label").text();
                }
                radioalabel = radioalabel;
                $(this).next("label").after("<label class='Accessibility'>" + radioalabel + "</label>");
                $(this).attr("aria-hidden", "true");
                $(this).next("label").attr("aria-hidden", "true");
                //$(this).closest("div").find("*").attr("aria-hidden", "true")

            });

            var chkboxarray = $("input[type='checkbox']").map(function () {
                return $(this).attr("id");
            }).get();
            var carialabel = "";
            for (var i = 0; i < chkboxarray.length; i++) {
                var ischecked = "\n checkbox unavailable"
                carialabel = "";
                if ($("#" + chkboxarray[i]).prop("checked") == "true" || $("#" + chkboxarray[i]).prop("checked") == true) {
                    ischecked = ischecked + " checked "
                }
                else {
                    ischecked = ischecked + " not checked "
                }
                if ($("#" + chkboxarray[i]).hasClass("correct")) {
                    if ($("#" + chkboxarray[i]).prop("checked") == true) {
                        $("#" + chkboxarray[i]).attr("checked", "true");
                        carialabel = ischecked + " Correct option selected " + $("#" + chkboxarray[i]).next("label").text();
                        $("#" + chkboxarray[i]).next("label").attr("aria-hidden", "true");
                    }
                    else {
                        $("#" + chkboxarray[i]).attr("checked", "true");
                        carialabel = ischecked + " Correct option " + $("#" + chkboxarray[i]).next("label").text();
                        $("#" + chkboxarray[i]).next("label").attr("aria-hidden", "true");
                    }
                }
                else if ($("#" + chkboxarray[i]).hasClass("incorrect")) {
                    carialabel = ischecked + " Incorrect option selected " + $("#" + chkboxarray[i]).next("label").text();
                    $("#" + chkboxarray[i]).next("label").attr("aria-hidden", "true");
                }
                else {
                    carialabel = ischecked + $("#" + chkboxarray[i]).next("label").text();
                }
                $("#" + chkboxarray[i]).next("label").after("<label class='Accessibility'>" + carialabel + "</label>")
                $("#" + chkboxarray[i]).attr("aria-hidden", "true");
                $("#" + chkboxarray[i]).next("label").attr("aria-hidden", "true");
            }
            //$("#ffread").text(carialabel).css({"opacity":"0","font-size":"0"});
        },
    }
})();
$(document).ready(function () {
    _Navigator.Initialize();
    $('body').attr({ "id": "thebody", "onmousedown": "document.getElementById('thebody').classList.add('no-focus');", "onkeydown": "document.getElementById('thebody').classList.remove('no-focus');" })
});
