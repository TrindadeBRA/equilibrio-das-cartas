import { Dialog, Transition } from '@headlessui/react';
import {
  BackwardIcon,
  Bars3Icon,
  ChartBarIcon,
  CurrencyDollarIcon,
  HomeIcon,
  UserIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';
import { useAuth } from '../Auth/AuthProvider';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Histórico de Cartas', href: '/historico-de-cartas', icon: BackwardIcon },
  { name: 'Tokens', href: '/tokens', icon: CurrencyDollarIcon },
  { name: 'Jogar Carta', href: '/jogar-tarot', icon: ChartBarIcon },
  { name: 'Meu Perfil', href: '/meu-perfil', icon: UserIcon },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Sidebar({ contentComponent: ContentComponent, title }: any) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [slug, setSlug] = useState('');


  useEffect(() => {
    // Get the current URL
    const currentUrl = window.location.href;

    // Extract the slug from the URL
    const url = new URL(currentUrl);
    const pathname = url.pathname;
    // Set the slug in the state variable
    setSlug(pathname);

  }, []);

  // console.log("XX", ContentCompoent)
  const { user } = useAuth();

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#da18ff] px-6 pb-2">
                    <div className="flex h-16 shrink-0 items-center">
                      <Image
                        width={296}
                        height={64}
                        className=""
                        src="/logo-light.webp"
                        alt="Your Company"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    item.href == slug
                                      ? 'bg-[#9e30b4] text-white'
                                      : 'text-white hover:text-white hover:bg-[#9e30b4]',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      item.href == slug ? 'text-white' : 'text-white group-hover:text-white',
                                      'h-6 w-6 shrink-0'
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                      <a
                        href="#"
                        className="flex items-center gap-x-4 py-3 text-sm font-semibold leading-6 text-white hover:bg-[#9e30b4]"
                      >
                        <Image
                          className="h-12 w-12 rounded-full bg-[#9e30b4]"
                          src={user?.avatar_url}
                          alt=""
                          height={48}
                          width={48}
                        />
                        <div className="flex flex-col">
                          <span>{user?.first_name} {user?.last_name}</span>
                          <span>Tokens restantes: {user?.tokens_coins}</span>
                        </div>
                      </a>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#da18ff] px-6">
            <div className="flex h-16 shrink-0 items-center">
              <Image
                width={296}
                height={64}
                className=""
                src="/logo-light.webp"
                alt="Your Company"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.href == slug
                              ? 'bg-[#9e30b4] text-white'
                              : 'text-white hover:text-white hover:bg-[#9e30b4]',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.href == slug ? 'text-white' : 'text-white group-hover:text-white',
                              'h-6 w-6 shrink-0'
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="-mx-6 mt-auto">
                  <a
                    href="#"
                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-[#9e30b4]"
                  >
                    <Image
                      className="h-12 w-12 rounded-full bg-[#9e30b4]"
                      src={user?.avatar_url ? user?.avatar_url : "/public/avatar.webp"}
                      alt=""
                      height={48}
                      width={48}
                    />
                    <div className="flex flex-col">
                      <span>{user?.first_name} {user?.last_name}</span>
                      <span>Tokens restantes: {user?.tokens_coins}</span>
                    </div>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-[#da18ff] px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button type="button" className="-m-2.5 p-2.5 text-white lg:hidden" onClick={() => setSidebarOpen(true)}>
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-white">{title}</div>
        </div>

        <main className="py-4 lg:pl-72 h-[100vh]">
          <div className="px-4 sm:px-6 lg:px-8 h-full">
            {ContentComponent && <ContentComponent />}
          </div>
        </main>
      </div>
    </>
  )
}
