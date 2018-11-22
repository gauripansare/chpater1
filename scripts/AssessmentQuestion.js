gRecordData = {
    Status: "NotStarted",
    AssessmentScore: 5,
    VisitedNumberOfPages: "0",
    LastVisitedPage: "", // UserSelectedOptionId will be used to jump to the unattempted question
    RecordTitle: "How Does Barbara Corcoran Pick Her Investments on Shark Tank?",
    LandingPageURL: "record2_landing.htm",
    QuestionSequence: "Numbers", // this can be used later if different display style is required
    OptionSequence: "LowerAlphabets", // this can be used later if different display style is required
    RandomizeQuestions: false,
    RandomizeOptions: false,
    Questions: [
                    {
                        QuestionId: "1",
                        QuestionText: "Should you accept a statement if it contains numeric data to back it up?",
                        Options: [
                                     {
                                         "OptionId": "1",
                                         "OptionText": "Yes. If the author has data, it means they are presenting a factual argument.",
                                         "IsCorrect": false,
                                    },
                                     {
                                         "OptionId": "2",
                                         "OptionText": "No. Just citing a number does not mean that the statement is presenting valid, well-researched data.",
                                         "IsCorrect": true,
                                         score: 2,
                                    },
                                     {
                                         "OptionId": "3",
                                         "OptionText": "No. You should only accept as facts statements that have been footnoted.",
                                         "IsCorrect": false,
                                    }

                        ],
                        feedback : ["No, that is not true. There are many ways to present data if you are trying to manipulate an argument. The data might be falsified. It might be taken out of context. It might be “cherry-picked”—that is, selected over a small range of time so that it supports the presenter’s conclusion. Look for data that is taken from reviewed, well known non-biased sources and presented in the same context as the original author used.",
                        "Yes, that’s right. There are many ways to present data if you are trying to manipulate an argument. The data might be falsified. It might be taken out of context. It might be “cherry-picked”—that is, selected over a small range of time so that it supports the presenter’s conclusion. Look for data that is taken from reviewed, well known, non-biased sources and presented in the same context as the original author used.",
                        "No, that’s not right. Even if a statement has a footnote, there are many ways to present data if you are trying to manipulate an argument. The data might be falsified. It might be taken out of context. It might be “cherry-picked”—that is, selected over a small range of time so that it supports the presenter’s conclusion. Look for data that is taken from reviewed, well known non-biased sources, and presented in the same context as the original author used."
                        ],
                        IsAnswered:false,
                        "UserSelectedOptionId": ""
                    },
                    {
                        QuestionId: "2",
                        QuestionText: "The use of overly general language like “every” and “always” is important to notice because",
                        Options: [
                                     {
                                         "OptionId": "1",
                                         "OptionText": "it means that the author is a subject matter expert.",
                                         "IsCorrect": false,
                                     },
                                     {
                                         "OptionId": "2",
                                         "OptionText": "it indicates that the author has done extensive amounts of research.",
                                         "IsCorrect": false,
                                     },
                                     {
                                         "OptionId": "3",
                                         "OptionText": "it should trigger some suspicion.",
                                         "IsCorrect": true,
                                         score: 2,

                                     }

                        ],
                        feedback : ["No, that is not true. Answers to complex problems are rarely able to be reduced to statements with overly general terms like these.",
                        "No, it doesn’t. Answers to complex problems are rarely able to be reduced to statements with overly general terms like these.",
                        "Yes, that’s right. Answers to complex problems are rarely able to be reduced to statements with overly general terms like these."
                        ],
                        IsAnswered:false,
                        "UserSelectedOptionId": ""

                    },
                    {
                        QuestionId: "3",
                        QuestionText: "A statement presented with no source is",
                        Options: [
                                     {
                                         "OptionId": "1",
                                         "OptionText": "made up and that is why the author presented no source.",
                                         "IsCorrect": false,
                                     },
                                     {
                                         "OptionId": "2",
                                         "OptionText": "a biased opinion that promotes the author’s view.",
                                         "IsCorrect": false,
                                    },
                                     {
                                         "OptionId": "3",
                                         "OptionText": "to be considered an opinion until it is researched and verified.",
                                         "IsCorrect": true,
                                         score: 2,
                                    }

                        ],
                        feedback : ["That’s not always true. If data or specific events are referenced in an argument, they should be documented. The author may have forgotten or misunderstood this rule. You should consider the statement an opinion until you research and verify it.",
                        "That’s not always true. The author may have forgotten or misunderstood the need to footnote. You should consider the statement an opinion until you research and verify it..",
                        "That’s correct. If data is referenced in an argument, it should be documented."
                        ],
                        IsAnswered:false,
                        "UserSelectedOptionId": ""

                    },
                    {
                        QuestionId: "4",
                        QuestionText: "If a statement uses Wikipedia or another crowd-sourced site as a source,",
                        Options: [
                                    {
                                         "OptionId": "1",
                                         "OptionText": "you will want to investigate further to make sure the argument is supported by more authoritative sources.",
                                         "IsCorrect": true,
                                         score: 2,
                                    },
                                     {
                                         "OptionId": "2",
                                         "OptionText": "you know that the argument being made is inaccurate.",
                                         "IsCorrect": false,
                                     },
                                     {
                                         "OptionId": "3",
                                         "OptionText": "you can assume the point being made is incorrect.",
                                         "IsCorrect": false,
                                   }
                        ],
                        feedback : ["Yes, that’s correct.",
                                    "No, that is not right. It may be accurate but because crowd-sourced sites can be edited so easily, they should never be your final source of authenticity.",
                                    "No, that is not right. It may be accurate but because crowd-sourced sites can be edited so easily they should never be your final source of authenticity."
                                ],
                        IsAnswered:false,
                        "UserSelectedOptionId": ""
                    },
                    {
                        QuestionId: "5",
                        QuestionText: "A statement with a footnote should be",
                        Options: [
                                     {
                                         "OptionId": "1",
                                         "OptionText": "taken as fact.",
                                         "isCorrect": false,
                                     },
                                     {
                                         "OptionId": "2",
                                         "OptionText": "evaluated by investigating the source presented.",
                                         "IsCorrect": true,
                                         score: 2,
                                     },
                                     {
                                         "OptionId": "3",
                                         "OptionText": "considered an opinion.",
                                         "IsCorrect": false,
                                   }
                        ],
                        feedback : ["That’s not right. However, if the source is reputable and has no vested interest in the statement being made, you can consider it a factual statement.",
                        "Yes. If the source is reputable and has no vested interest in the statement being made, you can consider it a factual statement.",
                        "No, it may support the author’s opinion. However, if the source is reputable and has no vested interest in the statement being made, you can consider it a factual statement."
                        ],
                        IsAnswered:false,
                        "UserSelectedOptionId": ""
                    }

    ]
}