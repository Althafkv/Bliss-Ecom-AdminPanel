import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../features/auth/authSlice';
import { RiAdminFill } from 'react-icons/ri'

let schema = yup.object().shape({
  email: yup
    .string()
    .email("Email Should be valid")
    .required("Email is Required"),
  password: yup.string().required("Password is Required")
})
const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values))
    },
  });
  const authState = useSelector((state) => state);
  const { user, isError, isSuccess, isLoading, message } = authState.auth;

  useEffect(() => {
    if (isSuccess) {
      navigate("admin")
      setTimeout(() => {
        window.location.reload()
      }, 2000);
    } else {
      navigate("")
    }
  }, [user, isError, isSuccess, isLoading])

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid" alt="Phone image" />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <h3 className="text-center fw-bold title mb-2">Login <RiAdminFill /></h3>
            <p className='text-center text-success'>Admin Login</p>
            <div className="error text-center">
              {message.message == "Rejected" ? "You are not an admin" : ""}
            </div>
            <form action="" onSubmit={formik.handleSubmit}>

              <div className="form-outline mb-4">
                <CustomInput
                  type="text"
                  name='email'
                  id="email"
                  label="Email Address"
                  className="form-control form-control-lg"
                  onCh={formik.handleChange("email")}
                  onBl={formik.handleBlur("email")}
                  val={formik.values.email}
                />
                <div className="error mt-2">
                  {formik.touched.email && formik.errors.email}
                </div>
              </div>

              <div className="form-outline mb-4">
                <CustomInput
                  type="password"
                  id="pass"
                  name='password'
                  label="Password"
                  className="form-control form-control-lg"
                  onCh={formik.handleChange("password")}
                  onBl={formik.handleBlur("password")}
                  val={formik.values.password}
                />
                <div className="error mt-2">
                  {formik.touched.password && formik.errors.password}
                </div>
              </div>

              <div className='text-center'><button type="submit" className="btn btn-primary btn-block shadow">Login</button></div>

            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login