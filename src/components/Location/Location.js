import React, {Component} from 'react';
import PropTypes from 'prop-types'
import './location.less';


class Location extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="nav-tab defaut map">
                <a href="#" className="item">
                    <i className="iconfont icon-map"></i>
                    <p>当前位置：<strong>{this.props.location}</strong></p>
                    <i className="iconfont icon-right-more"></i>
                </a>
            </div>
        )
    }
}

Location.defaultProps  = {
    location: ''
}

Location.propTypes = {
    location: PropTypes.string
}

export default Location;
