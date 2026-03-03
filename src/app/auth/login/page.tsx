import { AuthForm } from '../components/AuthForm';
import { loginAction } from './actions';

const LoginPage = () => {
  return (
    <AuthForm
      action={loginAction}
      submitText="Iniciar sesión"
      fields={[
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          placeholder: 'Ej: juanperez@email.com',
        },
        {
          name: 'password',
          label: 'Password',
          type: 'password',
          placeholder: 'Mín 8 caracteres',
        },
      ]}
    />
  );
};

export default LoginPage;
