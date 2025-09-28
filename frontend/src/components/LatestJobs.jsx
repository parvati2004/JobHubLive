import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 

const LatestJobs = () => {
    const { allJobs = [] } = useSelector(store => store.job);

    return (
        <div className="max-w-7xl mx-auto my-20 px-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center lg:text-left">
                <span className="text-[#6A38C2]">Latest & Top </span> Job Openings
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
                {allJobs?.length > 0 
                    ? allJobs.slice(0, 6).map((job) => (
                        <LatestJobCards key={job._id} job={job} />
                      ))
                    : <span className="col-span-full text-center text-gray-500">No Job Available</span>
                }
            </div>
        </div>
    );
};

export default LatestJobs;
