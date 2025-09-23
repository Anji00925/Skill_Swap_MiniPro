import '../styles/auth.css';
import AuthForm from '../components/AuthForm';

export default function Signup() {
  return (
    <div className="auth-wrapper">
      <div className="auth-right">
        <div>
          <h1>Join SkillSwap!</h1>
          <p>Offer and learn amazing skills from others.</p>
        </div>
      </div>
      <div className="auth-left">
        <AuthForm type="signup" />
      </div>
    </div>
  );
}
