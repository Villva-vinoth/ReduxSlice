import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { addUser , editUser, deleteUser } from '../../redux/slice/user'

const UserAdd = () => {

    const user = useSelector((state) => state.user)

    const [userState, setUserState] = useState(true)
    const [edit,setIsEdit] = useState(false)
    const [editId,setEditId] =useState(null)

    const [formState,setFormState] = useState('')

    const dispatch = useDispatch()

    const { register, handleSubmit, formState: { errors }, reset,setValue } = useForm()



    const [fileInput, setFileInput] = useState()
    const fileRef = useRef(null)
    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const fileURl = URL.createObjectURL(file)
            setFileInput(fileURl)
        }
        else {
            setFileInput(null)
        }
    }

    const handleClick = () => {

        if (fileRef.current) {
            fileRef.current.value = null;
        }
        setFileInput(null)
    }

    const handleReset = () => {
        reset()
        handleClick()
        setIsEdit(false)
        setEditId(null)
        setTimeout(()=>{
            setFormState('')
        },2000)
    }

    const submit = (data) => {
       if(edit){
            delete data.file 
            data.file = fileInput
            data.id = editId

            dispatch(editUser(data))
            handleReset()
          
            setFormState('Updated Successfull !')
       }
       else{
        // console.log(data)

        delete data.file
        data.id = user.length + 1
        data.file = fileInput

        dispatch(addUser(data))
        handleReset()
        setUserState(!userState)

        setFormState('Created Successfull !')


       }
    }


    const handleEdit = (item) => {
        setIsEdit(true)
        setValue('name',item.name)
        setValue('email',item.email)
        setValue('gender',item.gender)
        setValue('dob',item.dob)
        // setValue('file', item.file);

        // let fileUrl = URL.createObjectURL(item.file)
        setFileInput(item.file)
        setEditId(item.id)


    }

    const handleDelete = (item) =>{
        dispatch(deleteUser(item))
        setFormState('Deleted Successfull !')
        handleReset()

    }


    return (
        <div className='flex relative'>
           { formState && <div className='absolute top-1/2 left-1/2 text-green-400 bg-black w-[30%] h-[30%] flex items-center justify-center  transform -translate-x-1/2 -translate-y-1/2 '>{formState}</div>}
            <div className='flex items-center flex-col w-[50%]'>
                <p className='text-xl '>User Form</p>
                <form onSubmit={handleSubmit(submit)} className='bg-red-50 rounded w-[80%] shadow-md pt-8 pb-8 m-4 px-6'>
                    <div className='mb-2'>
                        {
                            fileInput && <div className='relative w-40 h-40'>
                                <img src={fileInput} className='rounded w-[100%] h-[100%] py-2 px-2' />
                                <div className='absolute text-sm text-red-500 bg-red-300 top-2 right-5 border border-red-400  text-center rounded-[60%] w-5 h-5 cursor-pointer' onClick={handleClick} >X</div>
                            </div>
                        }
                       { !fileInput &&  <input
                            type='file'
                            className='rounded w-50 h-10'
                            ref={fileRef}
                            {...register('file', { required: true })}
                            onChange={handleFileChange}
                        />}
                        {errors.file && <p className='text-red-500'>Please Upload the File</p>}

                    </div>
                    <div className='mb-2'>
                        <input
                            className='border shadow py-2 px-2 leading-tight w-[100%]'
                            type='text'
                            placeholder='name' {...register('name', {
                                required: true
                            })} />
                        {errors.name && <p className='text-red-500'>Please Enter the name</p>}
                    </div>
                    <div className='mb-2'>
                        <input type='email'
                            className='w-[100%] border py-2 px-2 leading-tight shadow'
                            placeholder='email'{
                            ...register('email', {
                                required: true,
                                // /^[a-z0-9]+@[a-z]+\.[a-z]{2,}$/
                                pattern: /^[a-z0-9]+@[a-z]+\.[a-z]{2,}$/
                            })
                            } />
                        {errors.email && <p className='text-red-500'>Please Enter the email</p>}
                    </div>
                    <div className='mb-2'>
                        <input placeholder='Date of Birth'
                            className='w-[100%] border py-2 px-2 leading-tight shadow'
                            type='date'
                            {
                            ...register('dob', {
                                required: true
                            })
                            } />
                        {errors.dob && <p className='text-red-500  mt-2'>Please select the dob</p>}
                    </div>
                    <div className='mb-2'>
                        <select name='gender'
                            className='w-[100%] border py-2 px-2 leading-tight shadow'

                            {
                            ...register('gender', {
                                required: true
                            })
                            }>
                            <option value={''}>select gender</option>
                            <option value={'male'}>Male</option>
                            <option value={'female'}>Female</option>
                        </select>
                        {errors.gender && <p className='text-red-500'>Please Enter the gender</p>}
                    </div>
                    <div className='flex justify-center gap-4'>
                        <button className='border shadow p-2 text-center w-[50%] bg-green-950 text-white' type='submit'>
                            submit
                        </button>
                        <button className='border shadow p-2 text-center w-[50%] bg-red-950 text-white' type='reset'
                        onClick={handleReset}
                        >
                            {!edit ? 'Reset':'cancel'}
                        </button>
                    </div>
                </form>
            </div>

            <div className='w-[40%] flex flex-col items-center'>

                <p className='text-xl'>User list</p>

                <table className='border w-[100%] mt-1' >
                    <thead>
                        <tr className='border'>
                            <th>Sno</th>
                            <th>Name</th>
                            <th colSpan={2}>Email</th>
                            <th>Gender</th>
                            <th colSpan={2}>options</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            user.map((it, index) => {
                                return (
                                    <tr key={index + 1} className='border text-center'>
                                        <td>{index + 1}</td>
                                        <td>{it.name}</td>
                                        <td colSpan={2}>{it.email}</td>
                                        <td>{it.gender}</td>
                                        <td className='cursor-pointer'>
                                            <button onClick={()=>handleEdit(it)} className='capitalize bg-green-400 text-white p-1'>
                                                edit
                                            </button> 
                                        </td>
                                        <td className='cursor-pointer'>
                                            <button onClick={()=>handleDelete(it)} className='capitalize bg-red-400 text-white p-1'>
                                                delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserAdd