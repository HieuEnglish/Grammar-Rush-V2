const questionBank = {
    kids: {
        easy: [
            {
                question: "Which word correctly completes the sentence? 'The cat ___ sleeping on the couch.'",
                options: ["is", "are", "am", "be"],
                correctIndex: 0
            },
            {
                question: "Choose the correct plural: 'I have two ___.'\n",
                options: ["boxs", "boxes", "box", "boxez"],
                correctIndex: 1
            },
            {
                question: "Which is the correct way to write this contraction? 'They will'",
                options: ["theyll", "they'l", "they'll", "theyl"],
                correctIndex: 2
            }
        ],
        medium: [
            {
                question: "Pick the correct word: 'My brother ___ basketball every weekend.'",
                options: ["play", "plays", "playing", "played"],
                correctIndex: 1
            },
            {
                question: "Which sentence is written correctly?",
                options: [
                    "Me and Tom went to school",
                    "Tom and I went to school",
                    "Tom and me went to school",
                    "Me and Tom goes to school"
                ],
                correctIndex: 1
            }
        ],
        hard: [
            {
                question: "Choose the sentence with the correct pronoun usage:",
                options: [
                    "Between you and I, the test was difficult.",
                    "Between you and me, the test was difficult.",
                    "Between we, the test was difficult.",
                    "Between us, the test was difficult."
                ],
                correctIndex: 1
            },
            {
                question: "Identify the sentence with correct subject-verb agreement:",
                options: [
                    "The team are playing well today.",
                    "The team is playing well today.",
                    "The team were playing well today.",
                    "The team be playing well today."
                ],
                correctIndex: 1
            }
        ]
    },
    teens: {
        easy: [
            {
                question: "Which word is spelled correctly?",
                options: ["recieve", "receive", "receve", "recive"],
                correctIndex: 1
            },
            {
                question: "Choose the correct form: 'She ___ to the party last night.'",
                options: ["go", "goes", "went", "gone"],
                correctIndex: 2
            }
        ],
        medium: [
            {
                question: "Which sentence uses the semicolon correctly?",
                options: [
                    "I love pizza; and pasta.",
                    "I love pizza, it's my favorite food.",
                    "I love pizza; it's my favorite food.",
                    "I love pizza it's my favorite food."
                ],
                correctIndex: 2
            },
            {
                question: "Identify the sentence with correct punctuation:",
                options: [
                    "The movie which we saw yesterday was great.",
                    "The movie, which we saw yesterday, was great.",
                    "The movie which we saw yesterday, was great.",
                    "The movie, which we saw yesterday was great."
                ],
                correctIndex: 1
            }
        ],
        hard: [
            {
                question: "Which of the following is a complete sentence?",
                options: [
                    "Having finished the assignment.",
                    "When we arrive at the station.",
                    "The book on the table.",
                    "She completed the marathon despite her injury."
                ],
                correctIndex: 3
            },
            {
                question: "Choose the sentence with correct parallel structure:",
                options: [
                    "She likes swimming, running, and to bike.",
                    "She likes swimming, running, and biking.",
                    "She likes to swim, running, and to bike.",
                    "She likes to swim, to run, and biking."
                ],
                correctIndex: 1
            }
        ]
    },
    adults: {
        easy: [
            {
                question: "Identify the sentence with correct subject-verb agreement:",
                options: [
                    "The data shows interesting trends.",
                    "The data show interesting trends.",
                    "The data is showing interesting trends.",
                    "The data were showing interesting trends."
                ],
                correctIndex: 1
            },
            {
                question: "Which sentence demonstrates correct pronoun case?",
                options: [
                    "Whom should I contact about this issue?",
                    "Who should I contact about this issue?",
                    "Whom should contact me about this issue?",
                    "Who contacted I about this issue?"
                ],
                correctIndex: 1
            }
        ],
        medium: [
            {
                question: "Choose the sentence with correct use of the subjunctive mood:",
                options: [
                    "I wish I was taller.",
                    "I wish I were taller.",
                    "I wish I am taller.",
                    "I wish I be taller."
                ],
                correctIndex: 1
            },
            {
                question: "Identify the correct use of the apostrophe:",
                options: [
                    "Its going to rain tomorrow.",
                    "The cat chased it's tail.",
                    "The dog lost its bone.",
                    "The book lost it's cover."
                ],
                correctIndex: 2
            }
        ],
        hard: [
            {
                question: "Select the sentence with correct parallel structure:",
                options: [
                    "The CEO was known for his integrity, vision, and being decisive.",
                    "The CEO was known for his integrity, vision, and decisiveness.",
                    "The CEO was known for having integrity, vision, and makes decisions.",
                    "The CEO was known to have integrity, having vision, and being decisive."
                ],
                correctIndex: 1
            },
            {
                question: "Choose the sentence with correct subject-verb agreement and pronoun usage:",
                options: [
                    "Neither of the candidates have submitted their application.",
                    "Neither of the candidates has submitted his or her application.",
                    "Neither of the candidates has submitted their application.",
                    "Neither of the candidates have submitted his or her application."
                ],
                correctIndex: 1
            }
        ]
    }
};

// Export the question bank
export default questionBank;