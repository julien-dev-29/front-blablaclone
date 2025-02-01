import React from 'react'
import PropTypes from 'prop-types'
import { Loader } from './Loader'

const Button = ({ children, type = 'primary', loading = false, className, ...props }) => {
    className += ' btn'
    var htmlType = null
    if (type === 'submit') {
        className += ' btn-primary'
        htmlType = type
    } else {
        className += ' btn-' + type
    }
    return (
        <button className={className} type={htmlType} {...props}>
            {loading ? <><Loader size={'sm'} />Chargement...</> : children}
        </button>
    )
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.string,
    loading: PropTypes.bool
}

export default Button