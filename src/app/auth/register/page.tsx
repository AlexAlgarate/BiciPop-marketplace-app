import { AuthForm } from '../components/AuthForm';
import { registerAction } from './actions';

const RegisterPage = () => {
  return (
    <AuthForm
      action={registerAction}
      submitText="Registrarse"
      fields={[
        {
          name: 'username',
          label: 'Username',
          placeholder: 'Ej: Juanperez23',
        },
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          placeholder: 'Ej: juanperez@email.com',
        },
        {
          name: 'location',
          label: 'Location',
          placeholder: 'Ej: Guadalajara',
        },
        {
          name: 'password',
          label: 'Password',
          type: 'password',
          placeholder: 'Mín. 8 caracteres, incluye mayúsculas y minúsculas',
        },
      ]}
    />
  );
};

export default RegisterPage;
