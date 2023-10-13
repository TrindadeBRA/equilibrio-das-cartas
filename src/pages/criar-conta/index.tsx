import { useFormik } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Head from 'next/head';

type AuthError = string | null;

export default function CreateAccount() {
    const [authError, setAuthError] = useState<AuthError>(null);
    const [isLoading, setIsLoading] = useState(false);

    const validationSchema = Yup.object({
        email: Yup.string().email('Endereço de e-mail inválido').required('E-mail é obrigatório'),
        firstName: Yup.string().required('Nome é obrigatório'),
        lastName: Yup.string().required('Sobrenome é obrigatório'),
        password: Yup.string().required('Senha é obrigatório').min(8, 'A senha deve ter pelo menos 8 caracteres'),
        date: Yup.date().required('Data de nascimento é obrigatória'),
        rememberme: Yup.boolean().required(),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            date: '',
            rememberme: false
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {

            setIsLoading(true); // Ativa o estado de carregamento quando o botão é clicado
            setAuthError(null); // Limpa qualquer erro existente

            try {
                const responseCreateAccount = await fetch('https://equilibriodascartas.thetrinityweb.com.br/wp-json/custom/v1/create-account', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: values.email,
                        firstName: values.firstName,
                        lastName: values.lastName,
                        password: values.password,
                        date: values.date,
                    }),
                });

                const dataCreateAccount = await responseCreateAccount.json();

                if (responseCreateAccount.ok) {

                    const responseLogin = await fetch('https://equilibriodascartas.thetrinityweb.com.br/wp-json/jwt-auth/v1/token', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            username: values.email,
                            password: values.password,
                        }),
                    });

                    const dataLogin = await responseLogin.json();

                    if (responseLogin.ok) {

                        const thirtyDaysInSeconds = 30 * 24 * 60 * 60;
                        const expirationDate = new Date();
                        expirationDate.setTime(expirationDate.getTime() + thirtyDaysInSeconds * 1000);

                        document.cookie = `jwt=${dataLogin.token}; expires=${expirationDate.toUTCString()}; path=/`;
                        document.cookie = `email=${dataLogin.user_email}; expires=${expirationDate.toUTCString()}; path=/`;
                        document.cookie = `user_id=${dataLogin.user_id}; expires=${expirationDate.toUTCString()}; path=/`;

                        window.location.href = '/dashboard';

                    } else {

                        // Se houver um erro na resposta da API, exiba a mensagem de erro
                        switch (dataLogin.code) {
                            case "[jwt_auth] incorrect_password":
                                setAuthError("A senha fornecida para o e-mail inserido está incorreta.");
                                break;

                            case "[jwt_auth] invalid_email":
                                setAuthError("Endereço de e-mail desconhecido.");
                                break;

                            default:
                                break;
                        }

                    }

                } else {

                    // Se houver um erro na resposta da API, exiba a mensagem de erro
                    switch (dataCreateAccount.error) {
                        case "Email já está em uso.":
                            setAuthError("Email já está em uso.");
                            break;

                        case "Erro ao criar usuário.":
                            setAuthError("Erro ao criar usuário.");
                            break;

                        default:
                            break;
                    }

                }
            } catch (error) {
                console.error('Erro ao autenticar:', error);
            } finally {
                setIsLoading(false);
            }
        },
    });

    return (
        <>
            <Head>
                <title>Crie sua conta - Equilíbrio das cartas</title>
            </Head>
            <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <Image
                        width={296}
                        height={64}
                        className="m-auto"
                        src="/logo-dark.webp"
                        alt="Your Company"
                    />
                </div>

                <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-white px-6 py-12 sm:rounded-lg sm:px-12 shadow-md">
                        <form className="space-y-6" onSubmit={formik.handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Endereço de e-mail
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        type="email"
                                        autoComplete="email"
                                        {...formik.getFieldProps('email')}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#da18ff] sm:text-sm sm:leading-6"
                                    />
                                    {formik.touched.email && formik.errors.email ? (
                                        <p className="mt-2 text-sm text-red-600">{formik.errors.email}</p>
                                    ) : null}
                                </div>
                            </div>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                                        Nome
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            id="firstName"
                                            autoComplete="given-name"
                                            {...formik.getFieldProps('firstName')}
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#da18ff] sm:text-sm sm:leading-6"
                                        />
                                        {formik.touched.firstName && formik.errors.firstName ? (
                                            <p className="mt-2 text-sm text-red-600">{formik.errors.firstName}</p>
                                        ) : null}
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                                        Sobrenome
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            id="lastName"
                                            required
                                            {...formik.getFieldProps('lastName')}
                                            autoComplete="family-name"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#da18ff] sm:text-sm sm:leading-6"
                                        />
                                        {formik.touched.lastName && formik.errors.lastName ? (
                                            <p className="mt-2 text-sm text-red-600">{formik.errors.lastName}</p>
                                        ) : null}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">
                                    Data de nascimento
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="date"
                                        id="date"
                                        {...formik.getFieldProps('date')}
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#da18ff] sm:text-sm sm:leading-6"
                                    />
                                    {formik.touched.date && formik.errors.date ? (
                                        <p className="mt-2 text-sm text-red-600">{formik.errors.date}</p>
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
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#da18ff] sm:text-sm sm:leading-6"
                                    />
                                    {formik.touched.password && formik.errors.password ? (
                                        <p className="mt-2 text-sm text-red-600">{formik.errors.password}</p>
                                    ) : null}
                                    {authError && (
                                        <p className="mt-2 text-sm text-red-600">{authError}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="rememberme"
                                        type="checkbox"
                                        {...formik.getFieldProps('rememberme')}
                                        required
                                        className="h-4 w-4 rounded border-gray-300 text-[#da18ff] focus:ring-[#da18ff]"
                                    />
                                    <label htmlFor="rememberme" className="ml-3 block text-xs leading-4 text-gray-900">
                                        Aceito Termos e Condições para receber informações relevantes de produtos, serviços e promoções da empresa e seus parceiros.
                                    </label>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-[#da18ff] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#9e30b4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#da18ff] disabled:cursor-progress"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Carregando...' : 'Criar minha conta'}
                                </button>
                            </div>
                        </form>
                    </div>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        <Link href="/" className="font-semibold leading-6 text-[#da18ff] hover:text-[#9e30b4]">
                            Voltar para o login
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};
