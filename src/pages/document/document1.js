import React, { useState } from 'react'
import Adher from './Adher'
import Pancard from './Pancard'
import Passport from './Passport'
import VoterID from './VoterID'
import Appoinment from './Appoinment'
import Salery from './Salery'
import BankStatement from './BankStatement'
import Select from 'react-select'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

function Document1() {
    const [document, setDocument] = useState('')
    const [address, setAddress] = useState('')
    const [employment, setEmployment] = useState([])
    const [otherFile, setOtherFile] = useState(null); // State to handle 'Other' file
    const { pathname } = useLocation()
    const newPathName = pathname.replace('/documentsupload/', '')

    // ... other state and handler declarations

    const handleOtherFileChange = (e) => {
        setOtherFile(e.target.files[0]); // Capture the selected file
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            // ... handle other files

            if (otherFile) {
                formData.append('other', otherFile);
            }
            
            const response = await axios.post(`${process.env.REACT_APP_API_URL}documentsupload/${newPathName}`, formData, {
                headers: {
                    'Accept': 'application/json'
                }
            })
            if (response.data.code === 200) {
                toast.success(`${response.data.message}`)
                // Optional: Redirect or close window
            }
        } catch (error) {
            console.error('Error uploading documents:', error)
            toast.error("Error uploading documents")
        }
    }

    return (
        <>
            <ToastContainer />
            <form onSubmit={handleSubmit}>
                {/* ... form fields and components */}
                {
                    document.includes("OT") && (
                        <div className="pt-4 bg-grey-lighter">
                            <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-red-400">
                                {/* ... SVG and text */}
                                <input type='file' onChange={handleOtherFileChange} className="" />
                            </label>
                        </div>
                    )
                }
                {/* ... other form fields and components */}
                <div className='justify-end pt-5 pl-4'>
                    <button type='Submit' className='bg-gray-800 text-white h-10 w-16 rounded-lg grid grid-cols pt-2 hover:bg-black hover:text-white'>Submit</button>
                </div>
            </form>
        </>
    )
}

export default Document1;
