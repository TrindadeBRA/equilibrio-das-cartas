import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';

const Login = () => {
  const router = useRouter();


  const validationSchema = Yup.object({
    email: Yup.string().email('Endereço de e-mail inválido').required('E-mail é obrigatório'),
    password: Yup.string()
      .required('Senha é obrigatória')
      .min(8, 'A senha deve ter pelo menos 8 caracteres'),
  });
  

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch('https://equilibriodascartas.thetrinityweb.com.br/wp-json/jwt-auth/v1/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: values.email,
            password: values.password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          const thirtyDaysInSeconds = 30 * 24 * 60 * 60;
          const expirationDate = new Date();
          expirationDate.setTime(expirationDate.getTime() + thirtyDaysInSeconds * 1000);
        
          // Defina os cookies com os valores do token JWT e e-mail
          document.cookie = `jwt=${data.token}; expires=${expirationDate.toUTCString()}; path=/`;
          document.cookie = `email=${data.user_email}; expires=${expirationDate.toUTCString()}; path=/`;

          // Redirecione para a página de dashboard
          window.location.href = '/dashboard';
        } else {
          // Se houver um erro na resposta da API, exiba a mensagem de erro
          console.error('Erro ao autenticar:', data.message);
        }
      } catch (error) {
        console.error('Erro ao autenticar:', error);
      }
    },
  });

  return (
    <>
      <div className="flex min-h-full flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <Image
                width={296}
                height={64}
                className="m-auto"
                src="/logo-dark.webp"
                alt="Your Company"
              />
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900 text-center">
                Entre com o seu perfil
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500 text-center">
                Ainda não tem uma conta?{' '}
                <a href="#" className="font-semibold text-[#da18ff] hover:text-[#9e30b4]">
                  ganhe uma leitura grátis!
                </a>
              </p>
            </div>

            <div className="mt-10">
              <div>
                <form onSubmit={formik.handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                      Endereço de e-mail
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        required
                        {...formik.getFieldProps('email')}
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#da18ff] sm:text-sm sm:leading-6"
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <p className="mt-2 text-sm text-red-600">{formik.errors.email}</p>
                      ) : null}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                      Senha
                    </label>
                    <div className="mt-2">
                      <input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        {...formik.getFieldProps('password')}
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#da18ff] sm:text-sm sm:leading-6"
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <p className="mt-2 text-sm text-red-600">{formik.errors.password}</p>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm leading-6">
                      <a href="#" className="font-semibold text-[#da18ff] hover:text-[#9e30b4]">
                        Esqueceu a senha?
                      </a>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-[#da18ff] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#9e30b4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#da18ff]"
                    >
                      Conectar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <Image
            className="absolute inset-0 h-full w-full object-cover"
            width={1920}
            height={1080}
            src="/bg-login.webp"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default Login;





