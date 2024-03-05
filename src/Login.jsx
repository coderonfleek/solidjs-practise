import { createSignal, createEffect } from 'solid-js';
import { Navigate, useNavigate } from '@solidjs/router';

function Login() {
  const [isLoggedIn, setIsLoggedIn] = createSignal(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    // Perform login logic
    // ...

    // After successful login
    setIsLoggedIn(true);
  };

  createEffect(() => {
    if (isLoggedIn()) {
      navigate('/');
    }
  });

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
}

export default Login;