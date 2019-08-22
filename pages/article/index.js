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
	static async getInitialProps ({req}) {
		console.log('??????????')
		console.log(req.url)
		const queryStr = (req.url || '').split('?')[1];
		const { articleId } = queryStr;
		const e = {
			access_token: '96a1c0fd4c969d51cf077d3944dcbe3c',
			enterpriseId: '948467577997365248',
			userId: '950311681215565824',
			watermarks: [],
			name: 'ss',
			avatar: 'https://static.dingtalk.com/media/lADOjM5cK80C7s0C6g_746_750.jpg',
			position: '职位职位',
			jobnumber: '00011',
			language: 'zh_TW'
		}

		CONFIG.API.initApi(e)

		let url = CONFIG.API.getArticleDetail({articleId: '1789887346808852480'})

		console.log('url: ', url)

		const payload = await request.get({url}).then(res => {
			let {name, create_time, creator_name, content_json} = res.data
			console.log('inner', res.data)
			return {
				title: name,
				content: content_json,
				create_time: formatDate(create_time, 'yyyy-MM-dd hh:mm'),
				creator_name
			}
		}).catch(err => {
			return {
				title: '',
				content: '',
				create_time: '',
				creator_name: '',
				test_props: 'This is a test for props'
			}
		})
		console.log(payload)
		return payload
	}

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
		console.log(this.props.test_props)
		const e = {
			access_token: '96a1c0fd4c969d51cf077d3944dcbe3c',
			enterpriseId: '948467577997365248',
			userId: '950311681215565824',
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
		// this.getArticleDetail('1789887346808852480')
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
		let {content, create_time, creator_name, title} = this.props
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
