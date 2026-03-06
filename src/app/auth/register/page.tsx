import { AuthForm } from '../components/AuthForm';
import { registerAction } from './actions';

const RegisterPage = () => {
  return (
    <div className="min-h-[calc(75vh-64px)] px-4 py-12">
      <div className="mx-auto max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Regístrate en la plataforma
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Únete a BiciPop y publica tu primera bici
          </p>
        </div>
        <AuthForm
          action={registerAction}
          submitText="Registrarse"
          fields={[
            {
              name: 'username',
              label: 'Username',
              placeholder: 'Ej: Juanperez23',
              type: 'text',
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
      </div>
    </div>
  );
};

export default RegisterPage;
