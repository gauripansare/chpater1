﻿//This api will contain navigation logic and page load.
//It will also handle the question navigation if the page is having multiple questions.
var _Navigator = (function () {
    var packageType = "";//presenter/scorm/revel
    var _currentPageId = "";
    var _currentPageObject = {};
    var progressLevels = [17];
    var totalsimscore = 24;
    var submitCounter = 0;
    //var presentermode = false;
    var submitCounter = 0;
    var _NData = {
        "p1": {
            pageId: "p1",
            prevPageId: "",
            nextPageId: "p2",
            dataurl: "p1.htm",
            isStartPage: true,
            isAnswered: true,
        },
        "p2": {
            pageId: "p2",
            prevPageId: "p1",
            nextPageId: "p3",
            dataurl: "p2.htm",
            hinturl: "hintp2.htm",
            hasActivity: true,
        },
        "p3": {
            pageId: "p3",
            prevPageId: "p2",
            nextPageId: "p4",
            dataurl: "p3.htm",
            hinturl: "hintp3.htm",
            hasActivity: true,
           
        },
        "p4": {
            pageId: "p4",
            prevPageId: "p3",
            nextPageId: "p5",
            dataurl: "p4.htm",
            hinturl: "hintp4.htm",
            hasActivity: true,
            hasOnlyRadio: true,
        },
        "p5": {
            pageId: "p5",
            prevPageId: "p4",
            nextPageId: "p6",
            dataurl: "p5.htm",
            hinturl: "hintp5.htm",
            hasActivity: true,
        },
        "p6": {
            pageId: "p6",
            prevPageId: "p5",
            nextPageId: "p7",
            dataurl: "p6.htm",
            hinturl: "hintp6.htm",
            hasActivity: true,
        },
        "p7": {
            pageId: "p7",
            prevPageId: "p6",
            nextPageId: "p8",
            dataurl: "p7.htm",
            hinturl: "hintp7.htm",
            hasActivity: true,
            hasOnlyRadio: true,
        },
        "p8": {
            pageId: "p8",
            prevPageId: "p7",
            nextPageId: "p9",
            dataurl: "p8.htm",
            hinturl: "hintp8.htm",
            hasActivity: true,
        },
        "p9": {
            pageId: "p9",
            prevPageId: "p8",
            nextPageId: "p10",
            dataurl: "p9.htm",
            hinturl: "hintp9.htm",
            hasActivity: true,
        },
        "p10": {
            pageId: "p10",
            prevPageId: "p9",
            nextPageId: "p11",
            dataurl: "p10.htm",
            hinturl: "hintp10.htm",
            hasActivity: true,
        },
        "p11": {
            pageId: "p11",
            prevPageId: "p10",
            nextPageId: "p12",
            dataurl: "p11.htm",
            hinturl: "hintp11.htm",
            hasActivity: true,
        },
        "p12": {
            pageId: "p12",
            prevPageId: "p11",
            nextPageId: "p13",
            dataurl: "p12.htm",
            hinturl: "hintp11.htm",
            hasActivity: true,
        },
        "p13":{
            pageId: "p13",
            prevPageId: "p12",
            nextPageId: "",
            dataurl: "p13.htm",
            hasActivity: true,
            isLastPage:true,
            isAssessment:true,
            hideHint:true,
            hinturl: "hintp11.htm",
        }
    }
    var _StateData = {}

    function OnPageLoad() {

        $(".hintcontainer").hide()
        $(".hintlink").removeClass("expanded");
        $(".hintlink").attr("aria-expanded", "false")
        $("#header-title h1").show()
        $("#header-title").removeClass("startpage");
        if (_currentPageObject.isStartPage != undefined && _currentPageObject.isStartPage) {
            $("#header-title h1").hide()
            $("#header-title").addClass("startpage");
        }
        _ModuleCommon.OnPageLoad();
        submitCounter = 0;
        if (_Navigator.IsPresenterMode()) {
            $("#linknext").k_enable();
            $(".start-btn").k_disable();
        }
    }
    return {
        Get: function () {
            return _NData;
        },
        Start: function () {
            this.LoadPage("p1");
            if (this.IsPresenterMode()) {
                _ModuleCommon.AppendFooter();
            }
        },
        LoadPage: function (pageId, jsonObj) {
            $(".hintcontainer").hide();
            if (_Navigator.IsRevel() && _currentPageId !=undefined && _currentPageId !="") {
               LifeCycleEvents.OnUnloadFromPlayer()
            }
            bookmarkpageid = pageId;
            if (jsonObj == undefined) {
                jsonObj = {};
            }
            _currentPageId = pageId;
            this.UpdateProgressBar();
            _currentPageObject = _NData[_currentPageId]
            $("#header-progress").show();
            $("#header-title").show();
            $("footer").show();

            if (_currentPageObject.isStartPage != undefined && _currentPageObject.isStartPage) {
                $("#linkprevious").k_disable();
                $("#linknext").k_enable();
                $("footer").hide();
                $("#header-progress").hide();
                if (this.IsPresenterMode())
                    _ModuleCommon.AppendFooter();

            }
            if (_currentPageObject.hasActivity != undefined && _currentPageObject.hasActivity && !this.IsAnswered()) {
                $("#linknext").k_disable();
                $('#submitbtn').k_disable();
            }
            if (this.IsAnswered()) {
                $("#linknext").k_enable();

            }
            if (_currentPageObject.isLastPage != undefined && _currentPageObject.isLastPage) {
                $("#linknext").k_disable();
            }
            
            _currentPageObject.isVisited = true;

            var pageUrl = _Settings.dataRoot + _currentPageObject.dataurl + _Caching.GetUrlExtension();;
            if (_currentPageObject.isStartPage) {
                $(".main-content").load(pageUrl, function () {
                    OnPageLoad();

                    $("h1").focus();
                });
            } else {
                $(".main-content").fadeTo(250, 0.25, function () {
                    $(".main-content").load(pageUrl, function () {
                        $(this).fadeTo(600, 1)
                        OnPageLoad();
                                if (_currentPageObject.pageId == "p2") {
                                    $("#titleheader").focus();
                                }
                                else {
                                    if (_currentPageId != "p13") {
                                        $("#progressdiv").focus();
                                    }
                                    else {
                                        $("#Questioninfo").focus();
                                    }
                                }
                                if (_Navigator.IsPresenterMode() && (_currentPageObject.pageId !="p13" || _currentPageObject.pageId !="summary" )) {
                                    _ModuleCommon.LoadPresenterMod();
                                }
                        if(_currentPageId=="p13") // need to change to assessment id
                        {
                            _Assessment.ShowQuestion();
                        }
                        if (_Navigator.GetCurrentPage().hasVideo && _Navigator.IsPresenterMode()){
                            _Navigator.SetPageStatus(true);
                            _Navigator.UpdateProgressBar();
                        }
                         if (_currentPageObject.hasActivity != undefined && _currentPageObject.hasActivity && !_Navigator.IsAnswered()) {
                            $('#submitbtn').k_disable();
                        }
                        if(_currentPageObject.pageId == "p2")
                            setReader("titleheader");
                        else
                            setReader("titleheader");                       
                        //$(".hintcontent").load("pagedata/hintdata/" + _currentPageObject.hinturl, function () { });

                        //$("h2.pageheading").focus();
                    });
                })
            }

            if (_Navigator.IsRevel()) {
                LifeCycleEvents.OnLoadFromPlayer()
             }

        },
        LoadDefaultQuestion: function () {
            if (_currentPageObject.questions.length > 0) {
                _questionId = 0;
                _currentPageObject.questions[0].isQuestionVisit = true;
                for (var i = 0; i < _currentPageObject.questions.length; i++) {
                    if (_currentPageObject.questions[i].isCurrent) {
                        _questionId = i;
                    }
                }
                //second parameter is to disable question effect.
                _Question.Load(_currentPageObject.questions[_questionId], {
                    disableEffect: true
                });
            }
        },
        Prev: function () {
            if (_Navigator.IsRevel()) {
                LifeCycleEvents.OnInteraction("Previous link click.")
            }
            if ( _currentPageObject.pageId == "p13" && typeof(currentQuestionIndex) !='undefined'  &&  currentQuestionIndex > 0   ) {
				$("#ReviewIns").hide();
                $(".intro-content-question").show();
                $("#Questioninfo").show();
                currentQuestionIndex  = currentQuestionIndex - 1;
                $("#Summary").empty();
                $("#Summary").hide();
                _Assessment.ShowQuestion();
            }
            else{
                this.LoadPage(_currentPageObject.prevPageId);
            }

        },
        Next: function () {
            $("#linkprevious").k_enable();
            if (_currentPageObject.customNext != undefined && !_currentPageObject.customNext.isComplete) {
                var custFunction = new Function(_currentPageObject.customNext.jsFunction);
                custFunction();
            }
            if ( _currentPageObject.pageId == "p13")
            {
               
             if ( typeof(currentQuestionIndex) !='undefined' && typeof(gRecordData.Questions) !='undefined'  && (currentQuestionIndex +1) < gRecordData.Questions.length ) {
                    currentQuestionIndex  = currentQuestionIndex + 1
                    $("#Questioninfo").show();
                    _Assessment.ShowQuestion()
                    
                    //this.UpdateProgressBar();
                    if (gRecordData.Status != "Completed" && !this.IsPresenterMode()) {
                        $("#linknext").k_disable();
                        $("#linkprevious").k_disable();
                    }
                }

              else  if ( typeof(currentQuestionIndex) !='undefined' && typeof(gRecordData.Questions) !='undefined'  && (currentQuestionIndex +1) == gRecordData.Questions.length ) {
                    //this.UpdateProgressBar();
                    // Show review instruction
                    
                        $(".intro-content-question").hide();
                        $(".questionwrapper").hide();
                        currentQuestionIndex  = currentQuestionIndex + 1;
                        $("#Summary").show();
                        $("#Questioninfo").hide();
				        $("#Summary").load("pagedata/Summary.htm",function(){
                        _Assessment.ShowSummary()
                            $("#linkprevious").k_enable();
                            
                        })
                        $("#climate-deal").css("margin-left","23%");
                        $("#linknext").k_disable();
                        

                }                
          
			}
            else {

                this.LoadPage(_currentPageObject.nextPageId);
            }
        },
        GetProgressData: function () {
            var visitpage = 0;
            for (var i in _NData) {
                if (_NData[i].isAnswered != undefined && (_NData[i].isAnswered == true)) {
                    visitpage++;
                }
            }
            visitpage += this.GetAnswerCount() ;
            return visitpage;
        },
        GetAnswerCount:function(){
          var cnt =  (gRecordData.Questions.filter(function (item) {
                return item.IsAnswered;
            }).length  ) 
           
            return cnt;
        },
        UpdateProgressBar: function () {
            var progData = this.GetProgressData();
            var lprog_pecent = (progData * 100 / progressLevels[0]).toFixed(0);
            $(".progressDiv").text("Progress: " + lprog_pecent + "%");
            $(".progressFg").css("width", lprog_pecent + "%");

        },
        GetCurrentPage: function () {
            return _currentPageObject;
        },
        CompletePage: function (extendedJson) {
            _currentPageObject.IsComplete = true;
            _currentPageObject = $.extend(true, _currentPageObject, extendedJson)
            _StateData[_currentPageObject.pageId] = $.extend(true, {}, _currentPageObject);
        },
        GetTotalScore: function () {
            var ObtainPoint = 0;

            for (var i in _NData) {
                if (_NData[i].points > 0) {
                    ObtainPoint += _NData[i].points
                }
            }
            var quizScore =0;
            for(var b=0; b < gRecordData.Questions.length; b++){
                if(gRecordData.Questions[b].IsAnswered && gRecordData.Questions[b].IsCorrect )
                {
                    quizScore +=2;
                }
            }
            var score = ((ObtainPoint +quizScore)/ (totalsimscore + gRecordData.AssessmentScore)) * 100;
            return score.toFixed(0);
        },
        UpdateScore: function () {
            var percScore = this.GetTotalScore()
            $("#scorediv").html("Score: " + percScore + "%");
        },
        SetPageScore: function (points) {
            if (!_currentPageObject.isAnswered) {
                _NData[_currentPageId].points = points;
                this.UpdateScore();
            }
        },
        SetPageStatus: function (isAnswered) {
            if (isAnswered) {
                _NData[_currentPageObject.pageId].isAnswered = true;
                this.UpdateProgressBar();
            }
        },
        IsAnswered: function () {
            if (_currentPageObject.isAnswered != undefined && _currentPageObject.isAnswered)
                return true;

            return false;

        },
        IsLoaded: function () {
            if (_currentPageObject.isLoaded != undefined && _currentPageObject.isLoaded)
                return true;

            return false;

        },
        IncrementCounter: function () {
            submitCounter = submitCounter + 1;
        },
        GetCounter: function () {
            return submitCounter;
        },
        SetPresenterMode:function(val){
            packageType = val;
        },
        IsPresenterMode: function () {
            if(packageType == "presenter"){
                return true;
            }
            else{
                return false;
            }
        },
        SetVideoStatus: function(){
            _NData[_currentPageId].played = true;
        },
        SetNextPageId: function (nextpageid) {
            if (nextpageid == "p12") {
                _NData[_currentPageObject.nextPageId].prevPageId = "p13";
                progressLevels[0] = progressLevels[0] + 2;//increase num of pages by 1 
            }
            else if (nextpageid == "p2m1") {
                _NData[_currentPageObject.nextPageId].prevPageId = "p2m2";
                progressLevels[0] = progressLevels[0] + 2;//increase num of pages by 1 
            }
            else {
                _NData[_currentPageObject.nextPageId].prevPageId = nextpageid;
                progressLevels[0] = progressLevels[0] + 1;//increase num of pages by 1 
            }
            _NData[_currentPageId].nextPageId = nextpageid;
            this.GetBookmarkData();

        },
         GetBookmarkData: function () {
            if (!this.IsScorm() && !this.IsRevel())
                return;
            var bookmarkobj = {}
            bookmarkobj.BMPageId = bookmarkpageid;
            bookmarkobj.VisistedPages = this.GetNavigatorBMData();
            bookmarkobj.ProgressLevels = progressLevels;
            bookmarkobj.ReviewData = _ModuleCommon.GetReviewData();
            bookmarkobj.AssessmentData = _Assessment.Getbookmarkdata();
            if (this.IsRevel()) {
                if (k_Revel.get_LaunchData().mode == LaunchModes.do) {
                    var suspend_data = JSON.stringify(bookmarkobj);
                    k_Revel.set_StateData(JSON.parse(suspend_data))
                    k_Revel.PostData(gRecordData.Score, gRecordData.AssessmentScore);
                }
            }
            else if (this.IsScorm()) {
                _ScormUtility.SetSuspendData(JSON.stringify(bookmarkobj))
            }

        },
        GetNavigatorBMData: function () {
            var gVisistedPages = [];
            for (var i in _NData) {
                if (_NData[i].isAnswered || _NData[i].hasVideo) {
                    if(_NData[i].hasVideo){
                        gVisistedPages.push({ id: _NData[i].pageId, prev: _NData[i].prevPageId, next: _NData[i].nextPageId, played: _NData[i].played })
                    }else{
                        gVisistedPages.push({ id: _NData[i].pageId, prev: _NData[i].prevPageId, next: _NData[i].nextPageId })
                    }
                }
            }
            return gVisistedPages;
        },
        SetNavigatorBMData: function (gVisistedPages) {
            for (var i = 0; i < gVisistedPages.length; i++) {
                if(_NData[gVisistedPages[i].id].hasVideo  ){
                    if( _NData[gVisistedPages[i].id].played != undefined &&  _NData[gVisistedPages[i].id].played )
                    _NData[gVisistedPages[i].id].isAnswered = gVisistedPages[i].played;
                    _NData[gVisistedPages[i].id].played = gVisistedPages[i].played;
                }
                else{
                    _NData[gVisistedPages[i].id].isAnswered = true;
                }
                _NData[gVisistedPages[i].id].prevPageId = gVisistedPages[i].prev;
                _NData[gVisistedPages[i].id].nextPageId = gVisistedPages[i].next;
            }
        },
          SetBookMarkPage: function () {
            if (!this.IsScorm() && !this.IsRevel())
                return;
            if (this.IsScorm()) {
                _ScormUtility.SetBookMark(bookmarkpageid);
            }
            else if (this.IsRevel()) {
                this.GetBookmarkData();
            }
        },
        SetBookmarkData: function () {
            var bookmarkdata;
            if(this.IsScorm())
            {
                bookmarkdata = _ScormUtility.GetSuspendData();
            }
            else if(this.IsRevel())
            {
                bookmarkdata = JSON.stringify(k_Revel.get_StateData())
            }
            
            if (bookmarkdata != undefined && bookmarkdata != "") {
                bookmarkdata = JSON.parse(bookmarkdata);
                bookmarkpageid = bookmarkdata.BMPageId;
                this.SetNavigatorBMData(bookmarkdata.VisistedPages)
                progressLevels = bookmarkdata.ProgressLevels;
                _ModuleCommon.SetReviewData(bookmarkdata.ReviewData)
                _Assessment.Setbookmarkdata(bookmarkdata.AssessmentData)
            }
        },
        GetBookMarkPage: function () {
            return bookmarkpageid;
        },
        Initialize: function () {
            if (packageType == "scorm") {
                _ScormUtility.Init();
                _Navigator.SetBookmarkData();
                //bookmarkpageid = _ScormUtility.GetBookMark();
                this.GotoBookmarkPage();
            }
            else if (packageType == "revel") {
                g_tempIntv = setInterval(function () {
                    if ((typeof piSession != 'undefined' && typeof piSession.currentToken() != 'undefined' && piSession.currentToken() != null)) {
                        clearInterval(g_tempIntv);
                        g_tempIntv = null;
                        //The rest of the code will go here.
                        LifeCycleEvents.InitParams();
                        LifeCycleEvents.OnLoad();
                        if (!k_Revel.isLaunchInitialize()) {
                            k_Revel.InitLaunch()
                            var suspend_data = JSON.stringify(k_Revel.get_StateData());
                            if (suspend_data != "" && suspend_data != "{}") {
                                var isTrue = this.SetBookmarkData();
                                if (isTrue && k_Revel.get_LaunchData().mode == "do") {
                                    this.GotoBookmarkPage();
                                } else {
                                    k_Revel.set_StateData(JSON.parse(suspend_data))
                                }
                            }
                        }
                        if (k_Revel.get_LaunchData().mode == "review") {
                            var suspend_data = JSON.stringify(k_Revel.get_StateData());
                            if (suspend_data != "" && suspend_data != "{}") {
                                this.SetBookmarkData(suspend_data);
                                isReview = true;
                            }
                        }
                    }
                }, 100);

            }
            else
            {
                _Navigator.Start();
            }
        },
        GotoBookmarkPage: function () {
           
            if (bookmarkpageid != undefined && bookmarkpageid != "") {
                _Navigator.LoadPage(bookmarkpageid)
            }
            else {
                _Navigator.Start();
            }
        },
        IsScorm: function () {
            if (packageType == "scorm")
                return true;

            return false;

        },
        IsRevel: function () {
            if (packageType == "revel")
                return true;
            return false;
        },
        GetPackageType: function () {
            return packageType;
        },
    };
})();


function setReader(idToStartReading) {
    $('#hiddenAnchor').attr("href", "#" + idToStartReading)
    $('#hiddenAnchor')[0].click()
}
function removeCSS(cssFileToRemove) {
	for(var w=0; w < document.styleSheets.length; w++ ){
		if(document.styleSheets[w].href.indexOf(cssFileToRemove) != -1 ) {
			document.styleSheets[w].disabled = true;
		}
	}
}
function addCSS(cssFileToAdd) {
	var isCSSAlreadyAdded = false;
	for(var w=0; w < document.styleSheets.length; w++ ){
		if(document.styleSheets[w].href.indexOf(cssFileToAdd) != -1 ) {
			isCSSAlreadyAdded = false;
		}
	}
	console.log(isCSSAlreadyAdded + " --")
	if(! isCSSAlreadyAdded){
		var newlink = document.createElement("link");
		newlink.setAttribute("rel", "stylesheet");
		newlink.setAttribute("type", "text/css");
		newlink.setAttribute("href", cssFileToAdd);
		document.getElementsByTagName("head").item(0).appendChild(newlink);
	}
}

function changeCSS(cssFile, cssLinkIndex) {

    var oldlink = document.getElementsByTagName("link").item(cssLinkIndex);

    var newlink = document.createElement("link");
    newlink.setAttribute("rel", "stylesheet");
    newlink.setAttribute("type", "text/css");
    newlink.setAttribute("href", cssFile);

    document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
}
