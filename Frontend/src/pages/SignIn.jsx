import '../styles/auth.css';
import AuthForm from '../components/AuthForm';

export default function Signin() {
  return (
    <div className="auth-wrapper">
      <div className="auth-right">
        <div>
          <h1>Welcome Back!</h1>
          <p>Ready to swap skills again?</p>
        </div>
      </div>
      <div className="auth-left">
        <AuthForm type="signin" />
      </div>
    </div>
  );
}
