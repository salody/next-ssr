import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import { ICON_CONFIG } from '@/config'
import { initPreviewDoc } from '@/actions/previewDoc'
import SvgIcon from '@/components/Icon'
import './index.less'

const mapStateToProps = () => {
  return {}
}

const mapDispatchToMethods = dispatch => {
  return {
    initPreviewDoc: payload => dispatch(initPreviewDoc(payload))
  }
}

class DocDisplay extends React.Component {
  constructor(props) {
    super(props)
  }
  linkToPreview = () => {
    const { mediaData } = this.props
    const { type, path, url, name } = mediaData.meta.record
    this.props.initPreviewDoc({
      url,
      docType:  type,
      docTitle: name,
      aliUrl:   path
    })
    this.props.history.push('/previewDoc')
  }
  render() {
    const { mediaData } = this.props
    let { type } = mediaData.meta.record
    return (
      <div className="article-doc" onClick={this.linkToPreview}>
        <span className="article-doc-icon">
          <SvgIcon type={ICON_CONFIG[type === 'audio/mp3' ? 'mp3' : type]} color="#000" size={32} />
        </span>
        <span className="article-doc-name">{mediaData.name}</span>
        <span className="article-doc-link">点我查看</span>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToMethods
)(withRouter(DocDisplay))
