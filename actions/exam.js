import {
  INIT_QUESTION_BY_ID,
  INIT_QUESTION_INDEX,
  INIT_QUESTIONS,
  UPDATE_QUESTION_ANSWER,
  UPDATE_QUESTION_STATUS,
  CLEAN_QUESTION,
  INIT_CORRECT_AND_INCORRECT
} from '@/constants/exam'

export const initQuestions = questions => dispatch => {
  dispatch(initQuestionById(questions))
  dispatch(saveQuestions(questions.map(item => item.id)))
  let correctCount = questions.filter(item => item.result === true).length
  let inCorrectCount = questions.filter(item => item.result === false).length
  dispatch(initCorrectAndInCorrect(correctCount, inCorrectCount))
}

const saveQuestions = questions => {
  return {
    type:    INIT_QUESTIONS,
    payload: {
      questions
    }
  }
}
export const initQuestionById = questions => dispatch => {
  let questionById = {}
  let questionIndex = []
  questions.map((question, index) => {
    questionById[question.id] = question
    questionIndex.push({
      id:     question.id,
      index:  index + 1,
      status: question.result === true ? 'correct' : question.result === false ? 'error' : 'noAnswer'
    })
  })
  dispatch(initQuestionIndex(questionIndex))
  dispatch(saveQuestionById(questionById))
}

const saveQuestionById = questionById => {
  return {
    type:    INIT_QUESTION_BY_ID,
    payload: {
      questionById
    }
  }
}
export const initQuestionIndex = questionIndex => {
  return {
    type:    INIT_QUESTION_INDEX,
    payload: {
      questionIndex
    }
  }
}

export const updateQuestion = (id, answer, updateStatus) => dispatch => {
  dispatch(updateQuestionAnswer(id, answer))
  if (updateStatus) {
    dispatch(updateQuestionStatus(id))
  }
}

export const updateQuestionStatus = id => {
  return {
    type:    UPDATE_QUESTION_STATUS,
    payload: {
      id
    }
  }
}

export const updateQuestionAnswer = (id, answer) => {
  return {
    type:    UPDATE_QUESTION_ANSWER,
    payload: {
      id,
      answer
    }
  }
}

export const cleanQuestion = () => {
  return {
    type: CLEAN_QUESTION
  }
}

export const initCorrectAndInCorrect = (correctCount, inCorrectCount) => {
  return {
    type:    INIT_CORRECT_AND_INCORRECT,
    payload: {
      correctCount,
      inCorrectCount
    }
  }
}
