import React from 'react'
import { useState, useEffect } from "react"
import { syncAuth, reset } from '../features/auth/auth_slice'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

function SignIn() {
    const [formData, setFormData] = useState({
        secretKey: "",
    })

    const { secretKey } = formData;

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        })
        )
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const userData = {
            secretKey
        }
        dispatch(syncAuth(userData));

    }

    useEffect(() => {
        if (isSuccess) {
            navigate("/confirm_login")
        }

        if (isError) {
            alert(message)
        }

        dispatch(reset())

    }, [ isLoading, isSuccess, isError, navigate, dispatch])
    return (
        <div>
            <h2>
                Sign in
            </h2>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <input type="text" name="secretKey" onChange={onChange} />
                </form>
            </section>
        </div>
    )
}

export default SignIn