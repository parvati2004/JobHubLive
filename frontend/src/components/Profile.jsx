import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div>
            <Navbar />
            
            {/* User Info Card */}
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-6 sm:p-8'>
                <div className='flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-8 items-center'>
                    <div className='flex flex-col sm:flex-row items-center gap-4 sm:gap-6'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage 
                                src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" 
                                alt="profile" 
                            />
                        </Avatar>
                        <div className='text-center sm:text-left'>
                            <h1 className='font-medium text-xl sm:text-2xl'>{user?.fullname}</h1>
                            <p className='text-sm sm:text-base'>{user?.profile?.bio || "No bio available"}</p>
                        </div>
                    </div>
                    <Button 
                        onClick={() => setOpen(true)} 
                        className="w-1/3 lg:w-full m:w-auto mt-2 sm:mt-0" 
                        variant="outline"
                    >
                        <Pen />
                    </Button>
                </div>

                {/* Contact Info */}
                <div className='my-5 flex flex-col sm:flex-row sm:gap-6 gap-2'>
                    <div className='flex items-center gap-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>

                {/* Skills */}
                <div className='my-5'>
                    <h1 className='font-bold mb-2'>Skills</h1>
                    <div className='flex flex-wrap gap-2'>
                        {user?.profile?.skills?.length > 0 
                            ? user.profile.skills.map((item, index) => <Badge key={index}>{item}</Badge>) 
                            : <span>NA</span>}
                    </div>
                </div>

                {/* Resume */}
                <div className='grid w-full max-w-sm gap-1.5'>
                    <Label className="text-md font-bold">Resume</Label>
                    {isResume && user?.profile?.resume
                        ? <a 
                            target='_blank' 
                            href={user.profile.resume} 
                            className='text-blue-500 w-full hover:underline break-words'
                          >
                            {user.profile.resumeOriginalName}
                          </a>
                        : <span>NA</span>
                    }
                </div>
            </div>

            {/* Applied Jobs */}
            <div className='max-w-4xl mx-auto bg-white rounded-2xl p-4 sm:p-6 my-5'>
                <h1 className='font-bold text-lg sm:text-xl mb-4'>Applied Jobs</h1>
                <AppliedJobTable />
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile
