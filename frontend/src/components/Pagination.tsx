import React from 'react';

const Pagination = ({ currentPage, totalPages, paginate }: { currentPage: number, totalPages: number, paginate: (pageNumber: number) => void }) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="flex justify-center mt-4">
            <ul className="inline-flex">
                {pageNumbers.map(number => (
                    <li key={number} className={`px-3 py-2 ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
                        <a href="#" onClick={() => paginate(number)}>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
