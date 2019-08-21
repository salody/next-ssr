import {
  INIT_QUESTIONS,
  INIT_QUESTION_BY_ID,
  INIT_QUESTION_INDEX,
  UPDATE_QUESTION_ANSWER,
  UPDATE_QUESTION_STATUS,
  CLEAN_QUESTION,
  INIT_CORRECT_AND_INCORRECT
} from '../constants/exam'

const initState = {
  questions:      [],
  questionById:   {},
  questionIndex:  [],
  correctCount:   0,
  inCorrectCount: 0
}

const computeQuestionStatus = (inputAnswer, correctAnswer, type) => {
  if (inputAnswer.length === 0) {
    return 'noAnswer'
  }
  if (type === 'short_answer') {
    let correctKeywordList = []
    for (let i = 0; i < correctAnswer.length; i++) {
      let correctAnswerList = correctAnswer[i].indexOf(',') !== -1 ? correctAnswer[i].split(',') : [correctAnswer[i]]
      for (let j = 0; j < correctAnswerList.length; j++) {
        if (inputAnswer[0].indexOf(correctAnswerList[j]) !== -1) {
          correctKeywordList.push(1)
          break
        }
      }
    }
    if (correctKeywordList.length === correctAnswer.length) {
      return 'correct'
    }
    return 'error'
  }
  if (type === 'multiple') {
    if (inputAnswer.length !== correctAnswer.length) {
      return 'error'
    }
    for (let i = 0; i < correctAnswer.length; i++) {
      if (inputAnswer.indexOf(correctAnswer[i]) === -1) {
        return 'error'
      }
    }
    return 'correct'
  }
  if (type === 'blank') {
    if (inputAnswer.length !== correctAnswer.length) {
      return 'error'
    }
    for (let i = 0; i < correctAnswer.length; i++) {
      let correctAnswerList = correctAnswer[i].indexOf(',') !== -1 ? correctAnswer[i].split(',') : [correctAnswer[i]]
      if (correctAnswerList.indexOf(inputAnswer[i]) === -1) {
        return 'error'
      }
    }
    return 'correct'
  }
  if (correctAnswer.length !== inputAnswer.length) {
    return 'error'
  } else {
    for (let i = 0; i < inputAnswer.length; i++) {
      if (inputAnswer[i] !== correctAnswer[i]) {
        return 'error'
      }
    }
  }
  return 'correct'
}

const ExamReducer = (state = initState, action) => {
  let questionById = state.questionById
  let questionIndex = state.questionIndex
  let operateQuestionIndex
  let status
  switch (action.type) {
    case INIT_QUESTIONS:
      return {
        ...state,
        questions: action.payload.questions
      }
    case INIT_QUESTION_BY_ID:
      return {
        ...state,
        questionById: action.payload.questionById
      }
    case INIT_QUESTION_INDEX:
      return {
        ...state,
        questionIndex: action.payload.questionIndex
      }
    case UPDATE_QUESTION_ANSWER:
      questionById[action.payload.id].answer = action.payload.answer
      return {
        ...state,
        questionById
      }
    case UPDATE_QUESTION_STATUS:
      operateQuestionIndex = questionIndex.find(item => item.id === action.payload.id)
      status = computeQuestionStatus(
        questionById[action.payload.id].answer,
        questionById[action.payload.id].correct_answer,
        questionById[action.payload.id].type
      )
      questionById[action.payload.id].answerStatus = status
      operateQuestionIndex.status = status
      return {
        ...state,
        questionById,
        questionIndex,
        correctCount:   status === 'correct' ? state.correctCount + 1 : state.correctCount,
        inCorrectCount: status === 'error' ? state.inCorrectCount + 1 : state.inCorrectCount
      }
    case CLEAN_QUESTION:
      return {
        ...state,
        questions:      [],
        questionById:   {},
        questionIndex:  [],
        correctCount:   0,
        inCorrectCount: 0
      }
    case INIT_CORRECT_AND_INCORRECT:
        return {
          ...state,
          correctCount:   action.payload.correctCount,
          inCorrectCount: action.payload.inCorrectCount
        }
    default:
      return state
  }
}

export default ExamReducer
