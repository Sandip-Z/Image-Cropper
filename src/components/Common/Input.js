import React from 'react'

const Input = ({onChange, placeholder, value, ...props}) => {
    return <input 
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        {...props}
    />
}

export default Input