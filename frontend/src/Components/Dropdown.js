import React, { useState, useRef, useEffect } from 'react';

const Dropdown = ({ options, onChange, label }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(label || "Id");
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleOptionClick = (option) => {
        setSelectedOption(option.label);
        setIsOpen(false);
        onChange(option);
    };

    return (
        <div ref={dropdownRef} className="relative inline-block text-left">
            <button
                onClick={toggleDropdown}
                className="border border-syyclopsOrange px-2 rounded-lg text-white bg-syyclopsBlue"
            >
                {selectedOption}
            </button>

            {isOpen && (
                <div
                    className="absolute right-0 lg:right-0 lg:left-auto md:left-0 mt-2 w-32 bg-syyclopsBlue border border-syyclopsOrange rounded-lg shadow-lg z-50"
                >
                    {options.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => handleOptionClick(option)}
                            className="w-full text-left text-white px-4 py-2 Dropdown-option text-sm hover:bg-syyclopsLightBlue rounded-lg"
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
