import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const filterData = [
    {
        fitlerType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        fitlerType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const [isOpen, setIsOpen] = useState(false); // for mobile toggle
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    };

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue]);

    return (
        <>
            {/* Mobile Toggle Button */}
            <div className="sm:hidden flex justify-end mb-4">
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-2 border rounded-md"
                >
                    {/* 3 line (hamburger) icon using spans */}
                    <div className="space-y-1">
                        <span className="block w-6 h-0.5 bg-black"></span>
                        <span className="block w-6 h-0.5 bg-black"></span>
                        <span className="block w-6 h-0.5 bg-black"></span>
                    </div>
                </button>
            </div>

            {/* Desktop Filter Sidebar */}
            <div className="hidden sm:block w-full bg-white p-3 rounded-md">
                <h1 className="font-bold text-lg">Filter Jobs</h1>
                <hr className="mt-3" />
                <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                    {filterData.map((data, index) => (
                        <div key={index}>
                            <h1 className="font-bold text-lg mt-4">{data.fitlerType}</h1>
                            {data.array.map((item, idx) => {
                                const itemId = `id${index}-${idx}`;
                                return (
                                    <div className="flex items-center space-x-2 my-2" key={itemId}>
                                        <RadioGroupItem value={item} id={itemId} />
                                        <Label htmlFor={itemId}>{item}</Label>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </RadioGroup>
            </div>

            {/* Mobile Overlay Filter */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
                    <div className="w-3/4 max-w-sm h-full bg-white p-4 overflow-y-auto">
                        {/* Close button */}
                        <div className="flex justify-end">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-600 font-bold text-lg"
                            >
                                ✕
                            </button>
                        </div>
                        <h1 className="font-bold text-lg">Filter Jobs</h1>
                        <hr className="mt-3" />
                        <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                            {filterData.map((data, index) => (
                                <div key={index}>
                                    <h1 className="font-bold text-lg mt-4">{data.fitlerType}</h1>
                                    {data.array.map((item, idx) => {
                                        const itemId = `mobile-id${index}-${idx}`;
                                        return (
                                            <div className="flex items-center space-x-2 my-2" key={itemId}>
                                                <RadioGroupItem value={item} id={itemId} />
                                                <Label htmlFor={itemId}>{item}</Label>
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                </div>
            )}
        </>
    );
};

export default FilterCard;
