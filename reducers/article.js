import { CHANGE_PRACTICE_TYPE } from '../constants'

const initState = {
	title:        '',
	content:      '',
	create_time:  '',
	creator_name: ''
}

const articleReducer = (state = initState, action) => {
	switch (action.type) {
		case 'INIT_ARTICLE':
			return {
				...state,
				...action.paylod
			}
		default:
			return state
	}
}

export default articleReducer
