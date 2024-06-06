import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let err = {}
    if (email.length < 5 || !email.includes('@') || !email.includes('.')) err.email = 'Please enter a valid Email'
    if (username.length < 8) err.username = 'Username must be at least 5 characters long'
    if (username.length > 20) err.username = 'Username must be less than 21 characters long'
    if (password.length < 8) err.password = 'Password must be 8 characters'
    if (password.length > 20) err.password = 'Password must be less than 21 characters long'
    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }
    setErrors(err)

    if (Object.values(err).length === 0) {

        const serverResponse = await dispatch(
          thunkSignup({
            email,
            username,
            password,
          })
        );
    
      if (serverResponse) {
        setErrors(serverResponse);
      } else {
        closeModal();
      }
    }
  };

  return (
    <div className='sign-up-modal'>
      <h1>Sign Up</h1>
      <p className='error-text'>{errors.server && <p>{errors.server}</p>}</p>
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
        <p className='error-text'>{errors.email && <p>{errors.email}</p>}</p>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <p className='error-text'>{errors.username && <p>{errors.username}</p>}</p>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <p className='error-text'>{errors.password && <p>{errors.password}</p>}</p>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <p className='error-text'>{errors.confirmPassword && <p >{errors.confirmPassword}</p>}</p>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
