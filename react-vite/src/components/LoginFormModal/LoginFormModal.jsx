import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const handleDemoLogin = async (e) => {
    e.preventDefault()
    
    setEmail('demo@aa.io')
    setPassword('password')

    const serverResponse = await dispatch(thunkLogin({
      email: 'demo@aa.io',
      password: 'password'
      })
    );

    if (serverResponse) {
      setErrors(serverResponse)
    } else {
      closeModal()
    }
  }

  return (
    <div className='login-page'>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email ? <p className='login-errors'>{errors.email}</p> : <p className='login-errors-space-holder'></p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password ? <p className='login-errors'>{errors.password}</p> : <p className='login-errors-space-holder'></p>}
        <button className='login-button'type="submit">Log In</button>
      </form>
      <button className='demo-user-button' onClick={handleDemoLogin}>
        Demo User
      </button>
    </div>
  );
}

export default LoginFormModal;
