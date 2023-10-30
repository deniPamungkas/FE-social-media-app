import PropTypes from 'prop-types'

const Button = (props) => {
  return (
    <button className='w-36 h-8 bg-purple-500 text-sm' onClick={props.onClick}>
        {props.children}
    </button>
  )
}

Button.propTypes = {
    children:PropTypes.string,
    onClick: PropTypes.any
}

export default Button