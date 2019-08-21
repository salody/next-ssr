import React from 'react'
import { withRouter } from 'next/router'
import queryString from 'query-string'
import dynamic from 'next/dynamic'
import { ddPostMsg, formatDate } from '@/utils/toolFunc'
import CONFIG from '@/config'
import request from '@/service/request'
// import Editor from '@/components/Editor'
import Loading from '@/components/Loading'
import './index.less'

const Editor = dynamic(
	() => import('@/components/Editor'),
	{ssr: false}
)

class Article extends React.Component {
	// static async getInitialProps ({req}) {
	// 	console.log('??????????')
	// 	const e = {
	// 		access_token: 'c960e8bfae33e4fd2e28524810690ce1',
	// 		enterpriseId: '948467577997365248',
	// 		userId: '1789916475256082432',
	// 		watermarks: [],
	// 		name: 'ss',
	// 		avatar: 'https://static.dingtalk.com/media/lADOjM5cK80C7s0C6g_746_750.jpg',
	// 		position: '职位职位',
	// 		jobnumber: '00011',
	// 		language: 'zh_TW'
	// 	}
	//
	// 	CONFIG.API.initApi(e)
	// 	return {
	// 		title: '',
	// 		content: '',
	// 		create_time: '',
	// 		creator_name: ''
	// 	}
	// }

	constructor (props) {
		super(props)
		this.state = {
			title: '',
			content: '',
			create_time: '',
			creator_name: ''
		}
	}

	componentDidMount = () => {
		const e = {
			access_token: '9ac1c1f27c4179862f50b6c0b570584c',
			enterpriseId: '936499552989614080',
			userId: '1789916475256082432',
			watermarks: [],
			name: 'ss',
			avatar: 'https://static.dingtalk.com/media/lADOjM5cK80C7s0C6g_746_750.jpg',
			position: '职位职位',
			jobnumber: '00011',
			language: 'zh_TW'
		}

		CONFIG.API.initApi(e)
		const {from, articleId, planId, courseId} = queryString.parse(location.search)
		// if (from === 'study' || from === 'certi') {
		// 	const url = CONFIG.API.saveProgress({
		// 		studyId: planId,
		// 		courseId,
		// 		resourceId: 'articleId'
		// 	})
		// 	this.saveProgress(url)
		// } else if (from === 'course') {
		// 	const url = CONFIG.API.saveCourseProgress({
		// 		courseId,
		// 		resourceId: articleId
		// 	})
		// 	this.saveProgress(url)
		// }
		this.getArticleDetail('1790775950917636096')
	}
	saveProgress = url => {
		let data = {
			progress: 100
		}
		request.post({url, data})
	}
	getArticleDetail = articleId => {
		Loading.show()
		let url = CONFIG.API.getArticleDetail({articleId})
		request.get({url}).then(res => {
			Loading.hide()
			let {name, create_time, creator_name, content_json} = res.data
			window.title = name
			ddPostMsg({
				msg: 'setTitle',
				title: name
			})
			this.setState({
				title: name,
				content: content_json,
				create_time: formatDate(create_time, 'yyyy-MM-dd hh:mm'),
				creator_name
			})
			// this.initInfo()
		})
	}
	initInfo = () => {
		let {from, planId, courseId} = queryString.parse(this.props.location.search)
		if (from === 'study') {
			ddPostMsg({
				msg: 'initStudyInfo',
				planId: planId
			})
		} else if (from === 'course') {
			ddPostMsg({
				msg: 'initCourseDetails',
				courseId: courseId
			})
		}
	}

	render () {
		let {content, create_time, creator_name, title} = this.state
		if (!content) return null
		return (
			<div className="article-container">
				<div className="article-top">
					<h1 className="article-top-title">{title}</h1>
					<h3 className="article-top-sub">
						<span className="article-top-time">{create_time}</span>
						<span className="article-top-user">{creator_name}</span>
					</h3>
				</div>
				<Editor content={content}/>
			</div>
		)
	}
}

export default withRouter(Article)
