import React, { useState } from 'react'
import Logo from '../../assets/logo.png'
import { AiFillDelete, AiFillPlusCircle } from 'react-icons/ai'
import Select from 'react-select'
import { ToastContainer, toast } from 'react-toastify'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import Adher from './Adher'
import Pancard from './Pancard'
import Passport from './Passport'
import VoterID from './VoterID'
import Appoinment from './Appoinment'
import Salery from './Salery'
import BankStatement from './BankStatement'

function Document() {
    const [selectedOption, setSelectedOption] = useState([{ value: '', file: null }])
    const [otherFile, setOtherFile] = useState(null); // State to handle 'Other' file
    const { pathname } = useLocation()
    const newPathName = pathname.replace('/documentsupload/', '')

    const handleMore = () => {
        let newData = { value: '', file: null }
        setSelectedOption([...selectedOption, newData])
    }

    const handleChange = (e, index) => {
        let data = [...selectedOption]
        data[index].value = e?.value
        setSelectedOption(data)
    }

    const handleFileInputChange = (e, index) => {
        let data = [...selectedOption]
        data[index].file = e?.target.files[0]
        setSelectedOption(data)
    }

    const handleDelete = (index) => {
        let data = [...selectedOption]
        data.splice(index, 1)
        setSelectedOption(data)
    }

    const handleOtherFileChange = (e) => {
        setOtherFile(e.target.files[0]); // Capture the selected file
    }

    const options = [
        { label: 'Aadhar Front', value: 'aadharfront' },
        { label: 'Aadhar Back', value: 'aadharback' },
        { label: 'Voter Id', value: 'voterid' },
        { label: 'Passport', value: 'passport' },
        { label: 'Pan Card', value: 'pancard' },
        { label: 'Offer Letter', value: 'offerletter' },
        { label: 'Appointment Letter', value: 'appointmentletter' },
        { label: 'Salary Slip', value: 'salaryslip' },
        { label: 'Latest Bank Statement', value: 'bankstatement' },
        { label: 'Cancel Cheque', value: 'cancelcheque' },
        { label: 'Other', value: 'other' },
    ]

    const filteredOptions = options.filter((option) => !selectedOption.some(selected => selected.value === option.value))

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            for (let option of selectedOption) {
                formData.append(option.value, option.file)
            }
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
                <div className='flex justify-start bg-primary p-2 px-4'>
                    <img src={Logo} className='w-40 h-10' alt="Logo" />
                </div>
                <div className='flex p-4'>
                    <div className='font-semibold text-2xl flex-1'>Upload Document</div>
                </div>
                <div className='grid grid-cols-3 h-full rounded-sm px-4'>
                    {
                        selectedOption.map((x, index) => (
                            <div key={index} className="p-1 h-full">
                                <div className='font-semibold text-sm'>Document</div>
                                <div className='flex justify-center w-full items-center'>
                                    <div className='w-[90%]'>
                                        <Select
                                            name='document'
                                            id="document"
                                            options={filteredOptions}
                                            onChange={(e) => handleChange(e, index)}
                                            required
                                        />
                                    </div>
                                    {
                                        index === selectedOption.length - 1 ?
                                            <button onClick={handleMore} className='w-[10%] px-2'><AiFillPlusCircle size={26} /></button>
                                            :
                                            <button onClick={() => handleDelete(index)} className='w-[10%] px-2'><AiFillDelete color='red' size={26} /></button>
                                    }
                                </div>
                                <div className="pt-4 bg-grey-lighter">
                                    <input
                                        onChange={(e) => handleFileInputChange(e, index)}
                                        type="file" required className="block w-full text-sm text-slate-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-full file:border-0
                                file:text-sm file:font-semibold
                                file:bg-gray-500 file:text-white hover:file:text-primary
                                hover:file:bg-gray-100"
                                    />
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='flex pt-5 pl-4'>
                    <button type='Submit' className='bg-primary flex justify-center items-center text-white h-10 w-32 rounded-lg hover:bg-gray-600 hover:text-white delay-75 duration-75'>Submit</button>
                </div>
            </form>
        </>
    )
}

export default Document;
