import React from 'react'

const Input = ({ label, data }) => {
    return (
        <div className='mb-4'>
            <label htmlFor={data.id} className="block text-grey-darker font-bold mb-2" >{label}</label>
            <input
                {...data}
                name={data.value}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker dark:text-black"
            />
        </div>
    )
}

export default Input