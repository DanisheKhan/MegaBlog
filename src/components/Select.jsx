import React, { useId } from 'react'

function Select({
    options,
    label,
    className,
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full'>        {label && <label htmlFor={id} className='inline-block mb-1.5 pl-1 text-blue-100 font-medium text-sm'>{label}</label>}
            <select
                {...props}
                id={id}
                ref={ref}
                className={`px-3 py-2.5 bg-[#182234]/50 border border-blue-900/30 focus:border-blue-700/50 rounded-lg text-white outline-none shadow-inner w-full ${className}`}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option >
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)