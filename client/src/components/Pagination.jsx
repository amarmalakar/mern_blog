import { useState } from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const [active, setActive] = useState(1)
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <ul className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                {pageNumbers.map(number => (
                    <li key={number}>
                        <button
                            onClick={() => {
                                paginate(number)
                                setActive(number)
                            }}
                            className={number === active ? 
                                "z-10 bg-teal-600 border-teal-600 text-white font-semibold relative inline-flex items-center px-4 py-2 border text-sm dark:bg-gray-800 dark:border-gray-800 shadow-md"
                            :
                                "z-10 bg-teal-50 border-teal-500 text-teal-700 relative inline-flex items-center px-4 py-2 border text-sm font-medium dark:bg-gray-400 dark:text-white dark:border-gray-800"
                            }
                        >
                            <span>{number}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Pagination