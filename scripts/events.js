

$(document).on("mouseover", ".qheight", function (event) {
    $(this).css({
        "font-weight": "bold"
    });
    $(this).children(".question_icon").children("span").css({
        "background-color": "#003058",
        "color": "#F9FF00"
    });

});
$(document).on("mouseout", ".qheight", function (event) {
    $(".qheight").css({
        "background-color": "",
        "font-weight": "normal"
    })
    $(".question_icon").children("span").css({
        "background-color": "",
        "color": ""
    });
    $(this).css({
        "background-color": "#f1f1f1",
        "font-weight": "bold"
    });
    $(this).children(".question_icon").children("span").css({
        "background-color": "#003058",
        "color": "#F9FF00"
    });

});
$(document).on("click", ".qheight", function (event) {
    $(".qheight").removeClass("optionselected");

    $(this).addClass("optionselected");

});
var hotspotclicked = false;;
var hotspot;
$(document).on("click", ".divHotSpot", function (event) {
   
    event.preventDefault();
    $(this).k_disable()
    if (hotspotclicked || _Navigator.IsAnswered())
        return;
    hotspotclicked = true;
    $(this).addClass("hotspotclicked")
    hotspot = $(this);
    setTimeout(function(){
        hotspotclicked = false;
        _ModuleCommon.HotspotClick(hotspot, event);
    },400)
});

$(document).ready(function () {
    $("*").dblclick(function (e) {
        e.preventDefault();
    });

});


$(document).on("click", "#linkprevious", function (event) {
    if ($(this).k_IsDisabled()) return;
    _Navigator.Prev();
});
$(document).on("click", "#linknext", function (event) {
    if ($(this).k_IsDisabled()) return;
    _Navigator.Next();
});

$(document).on("click", ".hintlink", function (event) {
   
    if ($(this).hasClass("expanded")) {
        $(".hintlink").removeClass("expanded")
        $(".hintlink").attr("aria-expanded", "false")
        $(".hintcontainer").slideUp(100);

    }
    else {
        $(".hintcontainer").slideDown(100, function () {
            $(".hintlink").addClass("expanded");
            $(".hintlink").attr("aria-expanded", "true");
        });
    }

});
$(document).on("click", ".closehintlink", function (event) {

    $(".hintlink").removeClass("expanded")
    $(".hintlink").attr("aria-expanded", "false")
    $(".hintcontainer").slideUp(100);


});
$(document).on("keydown", "input.EmbededElement", function (event) {
    if ($(this).attr("disabled") || $(this).hasClass("disabled")) {
        event.preventDefault();
        return;
    }
    if (window.event) {
        key = window.event.keyCode;
    } else if (event) {
        key = event.keyCode;
    }
    if (key == 13) {
        _ModuleCommon.InputEnter($(this));
    }
});

$(window).resize(function () {
    _ModuleCommon.OrientationChange();
});

$(window).resize(function () {


});

$(document).on('click', ".activityimg", function (event) {
    if ($(".divHotSpot").hasClass("disabled"))
        return;
    _ModuleCommon.AddEditPropertiesClick(event);
});


$(document).on('click', "#start", function (event) {
    _Navigator.Next();
});
$(document).on('click', "#submitbtn", function (event) {
  
    _ModuleCommon.OnSubmit();
});
$(document).on('click', "#continuebtn", function (event) {
    _ModuleCommon.OnContinue();
});


$(document).on('change', "input[type='checkbox'].pagecheckbox", function (event) {
    _ModuleCommon.EnableSubmit();
    if ($(this).prop("checked") == true) {
        $(this).next("label").css({ "font-weight": "bold" })
    }
    else
    {
        $(this).next("label").css({ "font-weight": "normal" })
    }

});
$(document).on('change', "input[type='radio'].pageradio", function (event) {
    _ModuleCommon.EnableSubmit();
    $('input[type="radio"]:checked').addClass('beforeClass');
});

// $(document).on('click', "input[type='radio'].pageradio", function (event) {
   
// });



$(document).on('click', ".reviewsubmit", function (event) {
    _Navigator.Next();
});

$(document).on("change", ".assessmentradio", function (event) {
    $(".assessmentSubmit").k_enable();  
  
});
$(document).on("click", ".assessmentSubmit", function (event) {
    gRecordData.Questions[currentQuestionIndex].UserSelectedOptionId = $("input[type='radio']:checked").attr("id") ;
    gRecordData.Questions[currentQuestionIndex].IsAnswered = true;
    var correctoption =   gRecordData.Questions[currentQuestionIndex].Options.filter(function (item) {
        return item.IsCorrect;
    })[0];
    gRecordData.Questions[currentQuestionIndex].IsCorrect = correctoption.OptionId == $("input[type='radio']:checked").attr("id") ? true : false;
    _Navigator.UpdateScore();
    _Navigator.Next();
});
$(document).on('click', "#textareasubmitbtn", function (event) {
    ;
    $("#textareainputhere").k_disable();
    $("#textareasubmitbtn").k_disable();
    var fdkurl ="pagedata/feedbackdata/textareafeedback.htm";
    $("#div_feedback .div_fdkcontent").load(fdkurl, function () {
        $("#div_feedback p:first").attr("tabindex", "-1")
        $('body').animate({ scrollTop: document.body.scrollHeight }, animTime, function () {
            $("#div_feedback p:first").focus();
        });
    });
    _Navigator.GetCurrentPage().isAnswered = true;
    _ModuleCommon.AddReviewData(true, fdkurl);
    $("#div_feedback").show();
    $("#div_feedback").css("display", "inline-block");
    $("#linknext").k_enable();
});

$(document).on("keyup", "#textareainputhere", function (event) {
    var max = 300;
    var len = $(this).val().length;
    var char = max - len;
    $('#remainingchar').text(char);
    if(len > 0){
        $("#textareasubmitbtn").k_enable();
    }
    else{
        $("#textareasubmitbtn").k_disable();
    }
});

window.onload = function () {
    _ScormUtility.Init();
}

window.onunload = function () {
    _ScormUtility.End();
}




