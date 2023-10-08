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
    onSubmit: (values) => {
      // Aqui você pode lidar com a submissão do formulário, por exemplo, fazer a chamada de API para autenticação
      console.log(values);
      // Redirect para a página de dashboard após a autenticação
      router.push('/dashboard');
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
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Entre com o seu perfil
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Ainda não tem?{' '}
                <a href="#" className="font-semibold text-[#da18ff] hover:text-indigo-500">
                  Ganhe uma leitura grátis!
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
                        name="email"
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
                        name="password"
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
                      <a href="#" className="font-semibold text-[#da18ff] hover:text-indigo-500">
                        Esqueceu a senha?
                      </a>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-[#da18ff] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#da18ff]"
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
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="/bg-login.webp"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default Login;
