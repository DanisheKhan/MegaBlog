import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full'>            {label && <label
            className='inline-block mb-1.5 pl-1 text-blue-100 font-medium text-sm'
            htmlFor={id}>
            {label}
        </label>
        }<input
                type={type}
                className={`px-3 py-2.5 rounded-lg text-white bg-[#182234]/50 focus:bg-[#182234]/80 outline-none duration-200 border border-blue-900/30 focus:border-blue-700/50 w-full shadow-inner ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
})

export default Input