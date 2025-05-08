// Question bank for Grammar Rush game
const questionBank = {
    'elementary': {
        'easy': [
            {
                question: 'Which word completes the sentence: "The cat ___ on the mat."',
                options: ['sit', 'sits', 'sitting', 'sat'],
                correctIndex: 1
            },
            {
                question: 'Choose the correct plural: "I have two ___"',
                options: ['boxs', 'boxes', 'box', 'boxies'],
                correctIndex: 1
            },
            {
                question: 'Which is the correct spelling?',
                options: ['happey', 'happy', 'happi', 'happie'],
                correctIndex: 1
            }
        ],
        'medium': [
            {
                question: 'Choose the correct verb tense: "Yesterday, I ___ to school."',
                options: ['walk', 'walked', 'walking', 'walks'],
                correctIndex: 1
            },
            {
                question: 'Which sentence is correct?',
                options: ['She dont like cake', 'She doesnt like cake', 'She do not like cake', 'She not like cake'],
                correctIndex: 1
            },
            {
                question: 'Select the correct pronoun: "___ is my book."',
                options: ['These', 'Those', 'This', 'That'],
                correctIndex: 2
            }
        ],
        'hard': [
            {
                question: 'Choose the correct comparative form: "This book is ___ than that one."',
                options: ['more interesting', 'interestinger', 'most interesting', 'much interesting'],
                correctIndex: 0
            },
            {
                question: 'Which sentence uses punctuation correctly?',
                options: ['Where are you going.', 'Where are you going?', 'Where are you going!', 'Where are you going,'],
                correctIndex: 1
            },
            {
                question: 'Select the correct possessive form:',
                options: ['the boys hat', 'the boy hat', 'the boys\'s hat', 'the boy\'s hat'],
                correctIndex: 3
            }
        ]
    },
    'middle': {
        'easy': [
            {
                question: 'Identify the subject in: "The tall tree swayed in the wind."',
                options: ['tall', 'tree', 'swayed', 'wind'],
                correctIndex: 1
            },
            {
                question: 'Choose the correct form of "to be": "They ___ studying when I called."',
                options: ['was', 'were', 'is', 'are'],
                correctIndex: 1
            },
            {
                question: 'Which word is an adverb?',
                options: ['quick', 'quickest', 'quickly', 'quicker'],
                correctIndex: 2
            }
        ],
        'medium': [
            {
                question: 'Select the correct conjunction: "I like both pizza ___ pasta."',
                options: ['but', 'or', 'and', 'so'],
                correctIndex: 2
            },
            {
                question: 'Which sentence uses the correct form of "their/there/they\'re"?',
                options: ['Their going to the park', 'They\'re going to the park', 'There going to the park', 'Theyre going to the park'],
                correctIndex: 1
            },
            {
                question: 'Choose the correct verb agreement: "Neither of the students ___ absent."',
                options: ['are', 'is', 'were', 'been'],
                correctIndex: 1
            }
        ],
        'hard': [
            {
                question: 'Identify the type of sentence: "Although it was raining, we went to the park."',
                options: ['Simple', 'Compound', 'Complex', 'Compound-Complex'],
                correctIndex: 2
            },
            {
                question: 'Choose the correct passive voice: "The letter ___"',
                options: ['was written by him', 'was wrote by him', 'was writed by him', 'was writing by him'],
                correctIndex: 0
            },
            {
                question: 'Select the correct form of the irregular verb:',
                options: ['I have went', 'I have gone', 'I have goed', 'I have going'],
                correctIndex: 1
            }
        ]
    },
    'high': {
        'easy': [
            {
                question: 'Identify the participle in: "The crying baby needed attention."',
                options: ['The', 'crying', 'baby', 'needed'],
                correctIndex: 1
            },
            {
                question: 'Choose the correct form of the infinitive:',
                options: ['to going', 'to goes', 'to go', 'to went'],
                correctIndex: 2
            },
            {
                question: 'Which sentence demonstrates parallel structure?',
                options: ['He likes swimming and to run', 'He likes swimming and running', 'He likes to swim and runs', 'He likes swim and running'],
                correctIndex: 1
            }
        ],
        'medium': [
            {
                question: 'Select the correct subjunctive mood:',
                options: ['I wish I was there', 'I wish I were there', 'I wish I be there', 'I wish I am there'],
                correctIndex: 1
            },
            {
                question: 'Identify the gerund phrase:',
                options: ['Running quickly', 'To run quickly', 'The quick run', 'Running in the park is fun'],
                correctIndex: 3
            },
            {
                question: 'Choose the correct semicolon usage:',
                options: ['He ran fast, he was late.', 'He ran fast; he was late.', 'He ran fast; and he was late.', 'He ran fast;he was late.'],
                correctIndex: 1
            }
        ],
        'hard': [
            {
                question: 'Identify the sentence with correct subordination:',
                options: [
                    'Because he was late, missed the train.',
                    'He was late, because missed the train.',
                    'Because he was late, he missed the train.',
                    'He was late because, he missed the train.'
                ],
                correctIndex: 2
            },
            {
                question: 'Select the sentence with the correct use of appositives:',
                options: [
                    'My brother John he is a doctor.',
                    'My brother, John is a doctor.',
                    'My brother, John, is a doctor.',
                    'My brother John, is a doctor.'
                ],
                correctIndex: 2
            },
            {
                question: 'Choose the sentence with correct subject-verb agreement in inverted order:',
                options: [
                    'There is many books on the shelf.',
                    'There are many books on the shelf.',
                    'There be many books on the shelf.',
                    'There exists many books on the shelf.'
                ],
                correctIndex: 1
            }
        ]
    }
};