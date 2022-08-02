import { useState, useEffect } from "react"
import { confirmOtp, reset } from '../features/auth/auth_slice'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

function ConfirmLogin() {
  const [formData, setFormData] = useState({
    code: "",
  })

  const { code } = formData;

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const { isLoading, isError, isSuccess, message, user } = useSelector((state) => state.auth)

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
      code
    }
    dispatch(confirmOtp(userData));

  }

  useEffect(() => {
    if (isSuccess || user) {
      navigate("/dashboard")
    }

    if (isError) {
      alert(message)
    }

    dispatch(reset())

  }, [isLoading, isSuccess, isError, navigate, dispatch])

  return (
    <div>
      <h2>
        Confirm sign in.
      </h2>
      <section className="form">
        <form onSubmit={onSubmit}>
          <input type="text" name="code" onChange={onChange} />
        </form>
      </section>
    </div>
  )
}

export default ConfirmLogin