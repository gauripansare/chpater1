jQuery.fn.extend({
    k_enable: function () {
        return this.removeClass('disabled').attr("aria-disabled", "false").removeAttr("disabled");
    },
    k_disable: function () {
        return this.addClass('disabled').attr("aria-disabled", "true").attr("disabled", "disabled");
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
        RemoveReviewData:function(){
            var currentPageData = _Navigator.GetCurrentPage();
            index = -1;
            if (reviewData != undefined && reviewData.length > 0) {
                for (var i = 0; i < reviewData.length; i++) {
                    if (reviewData[i].pageId == currentPageData.pageId) {
                        index =i;
                        break;
                    }
                }
            }
            if(i > -1)
            {
                reviewData.splice(i,1);
            }

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

                $("#div_feedback").show();
                $("#div_feedback").css("display", "inline-block");
                $("#div_feedback .div_fdkcontent").load(fdkurl, function () {
                    //this.SetFeedbackTop()
                    $("body").animate({
                        scrollTop: $(document).height()
                    }, 1000);
                });
            }
        },
        DisplayUserReviewMode: function () {
            if (_Navigator.GetCurrentPage().pageId == "p12") {
                this.ShowTextareaReviewMode();
                var reviewData = this.GetPageReviewData();
                fdkurl = reviewData.fdkurl;

                $("#div_feedback").show();
                $("#div_feedback").css("display", "inline-block");
                $("#div_feedback .div_fdkcontent").load(fdkurl, function () {
                    //this.SetFeedbackTop()
                    $("body").animate({
                        scrollTop: $(document).height()
                    }, 1000);
                });
                $("textarea").k_disable();
            }
            else {
                $("input").k_disable();
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
        },
        SetAccessibility: function () {
            var radio = $("input[type='radio']:checked").attr("id")
            var rarialabel = "";
            if ($("#" + radio).hasClass("correct")) {
                rarialabel = "Correct option";
            }
            else {
                $("input[type='radio'].correct").closest("label").find("i").attr("aria-label", "Correct option")
                rarialabel = "Incorrect option selected";
            }
            $("#" + radio).closest("label").find("i").attr("aria-label", rarialabel);
            var chkboxarray = $("input[type='checkbox']").map(function () {
                return $(this).attr("id");
            }).get();
            var carialabel = "";
            for (var i = 0; i < chkboxarray.length; i++) {
                carialabel = "";
                if ($("#" + chkboxarray[i]).hasClass("correct")) {
                    carialabel = "Correct option";
                }
                else {
                    carialabel = "Incorrect option selected";
                }
                $("#" + chkboxarray[i]).closest("label").find("i").attr("aria-label", carialabel)
            }

        },
        OnPageLoad: function () {
            debugger;
            var pageDetailData = this.GetPageDetailData();
            //this.ApplycontainerWidth();
            $("#div_feedback").hide();
            $('#hintdiv').hide();
            $("#textareasubmitbtn").k_disable();
            if (pageDetailData != undefined && pageDetailData.radio != undefined) {
                $("input[type='checkbox']").addClass("pagecheckbox").k_disable();
                $(".checkbox-item").k_disable();
                $("input[type='radio']").addClass("pageradio");
                $("#submitbtn").k_disable();
            }
            if (_Navigator.IsAnswered() && !_Navigator.GetCurrentPage().isStartPage) {
                this.DisplayUserReviewMode();
            }
            else
            {
                this.RemoveReviewData();
            }
            if (_Navigator.IsPresenterMode() == true) {
                LoadPresenterMod();
            }

        },
        LoadPresenterMod: function () {
            $("#linknext").k_enable();
            $("#" + pageDetailData.radio).before(' <i class="fa radio-fa-check fa-check" style="font-size:15px;color:#01662C;"></i>');
            $("#" + pageDetailData.radio).addClass("correct");
            $("input[type='radio']").k_disable();
            for (var i = 0; i < pageDetailData.checkbox.length; i++) {
                $("#" + pageDetailData.checkbox[i]).after(' <i class="fa radio-fa-check fa-check" style="font-size:20px;color:#01662C;"></i>');
                $("#" + pageDetailData.checkbox[i]).addClass("correct");
                $("#" + pageDetailData.checkbox[i]).closest("label").css("font-weight", "bold");
                $("input[type='checkbox']").k_disable();
                $("input[type='checkbox']").closest("label").find(".checkmark").removeClass("checkmark");
            }
        },
        Applycss: function () {

            var isIE11version = !!navigator.userAgent.match(/Trident.*rv\:11\./);
            if (/Edge/.test(navigator.userAgent) || isIE11version) {
                $('input[type="radio"]:checked').closest("label").find(".radio-fa-check").css("bottom", "7px")
            }
        },
        EnableSubmit: function () {
            debugger;
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
                if(pageData.checkbox.length == 0 && $("input[type='checkbox']:checked").length >0 )
                {
                    $("#submitbtn").k_enable();
                }
                else if ($("input[type='checkbox']:checked").length > 0 && $("input[type='checkbox']:checked").length == pageData.checkbox.length) {
                    $("#submitbtn").k_enable();
                }
                else
                {
                    $("#submitbtn").k_disable();
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
            debugger;
            $("input").k_disable();
            var currPid = _Navigator.GetCurrentPage().pageId;
            _Navigator.IncrementCounter();
            var pageData = this.GetPageDetailData();            
            var fdbkUrl = "";
            if (_Navigator.GetCurrentPage().hasOnlyRadio) {
                var isRadioCorrect = this.GetRadioStatus();
                if (isRadioCorrect) {
                    debugger;
                    fdbkUrl = _Settings.dataRoot + pageData.feedback[0];
                    $('input[type="radio"]:checked').next("label").find("span").addClass("without-before")
                    $("#" + pageData.radio).attr("checked", "checked");
                    this.AddReviewData(true, fdbkUrl);
                    this.DisplayCheckboxCorrectIncorrect();
                    _Navigator.SetPageScore(this.CalculateScore())
                    _Navigator.SetPageStatus(true);
                    this.EnableNext();
                }
                else {
                    if((_Navigator.GetCounter() == 1))
                    {
                         fdbkUrl = _Settings.dataRoot + pageData.feedback[2];
                         this.AddReviewData(false, fdbkUrl);
                         this.DisplayChecklistCorrectIncorrect();
                        
                    }
                    else
                    {
                        fdbkUrl = _Settings.dataRoot + pageData.feedback[1];
                        this.AddReviewData(true, fdbkUrl);
                        this.DisplayCheckboxCorrectIncorrect();
                        _Navigator.SetPageScore(this.CalculateScore())
                        _Navigator.SetPageStatus(true);
                        this.EnableNext();
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
                }
                else {

                    if ((_Navigator.GetCounter()== 1 && isRadioCorrect && !isAllCheckCorrect ) || 
                    (_Navigator.GetCounter() == 1 && !isRadioCorrect != true && isAllCheckCorrect) || 
                    (_Navigator.GetCounter() == 1 && !isRadioCorrect  && !isAllCheckCorrect )) {

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
                    }
                    else if ((_Navigator.GetCounter() == 2 && isRadioCorrect && !isAllCheckCorrect)) {
                        fdbkUrl = _Settings.dataRoot + pageData.feedback[3];
                        this.AddReviewData(false, fdbkUrl);
                        this.DisplayCheckboxCorrectIncorrect();
                        _Navigator.SetPageScore(this.CalculateScore())
                        _Navigator.SetPageStatus(true);
                        this.EnableNext();
                    }
                }
            }
            $("#div_feedback .div_fdkcontent").load(fdbkUrl, function () {
                $('html,body').animate({ scrollTop: document.body.scrollHeight }, 1000, function () { });
            });
            $("#div_feedback").show();
            $("input").k_disable();
            $("#div_feedback").css("display", "inline-block");
        },
        GetCheckboxStatus: function () {
            debugger;
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
            $("input[type='checkbox']:not(.correct)").next("label").find("span").addClass("checkmark")
            $("input[type='checkbox']:not(.correct)").next("label").find("i").remove();

            if (!$('input[type="radio"]:checked').hasClass("correct")) {
                $('input[type="radio"]:checked').next("label").find("span").removeClass("without-before")
                $('input[type="radio"]:checked').next("label").find("i").remove();
                $("input[type='radio']").k_enable();
                $("input[type='radio']").removeAttr("checked");
            }
            $("input[type='radio']").removeClass("incorrect");
            $("#div_feedback .div_fdkcontent").html("");
            $("#div_feedback").hide();
            $(".checkmark").show();
            $('html,body').animate({ scrollTop: document.body.scrollHeigh }, 500, function () { });
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

    }
})();
$(document).ready(function () {
    debugger;
    _Navigator.Start();
    //$("h1:first").focus();

    //if (_Settings.enableCache) {
    //    _Caching.InitAssetsCaching();
    //    _Caching.InitPageCaching();
    //}
    $('body').attr({ "id": "thebody", "onmousedown": "document.getElementById('thebody').classList.add('no-focus');", "onkeydown": "document.getElementById('thebody').classList.remove('no-focus');" })
});
