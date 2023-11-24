import { Fragment } from "react";
import NextLink from "./next-link";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import logoWhiteBg from "../../images/dsa-logo-white-bg.png";

const navigation = [{ name: "Zoom", href: "/" }];

const isPathCurrent = (asPath: string) => (path: string) => {
  if (path !== "/" && asPath.startsWith(path)) {
    return true;
  } else if (path === asPath) {
    return true;
  }
  return false;
};

export default function Nav() {
  const { asPath } = useRouter();
  // TODO: update when auth0 fixed
  // const { data: session } = useSession();
  let session = {};
  const isLinkActive = isPathCurrent(asPath);

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center lg:items-stretch lg:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <NextLink href="/" className="hidden lg:block">
                    <img className="h-14 w-auto rounded" src={logoWhiteBg.src} alt="Portal" />
                  </NextLink>
                  <NextLink href="/" className="block lg:hidden">
                    <img className="h-14 w-auto rounded" src={logoWhiteBg.src} alt="Portal" />
                  </NextLink>
                </div>

                <div className="hidden lg:ml-8 lg:flex lg:space-x-8">
                  {navigation.map((item) => (
                    <NextLink
                      href={item.href}
                      key={item.name}
                      className={classNames(
                        isLinkActive(item.href)
                          ? "border-red-500 text-gray-900"
                          : "border-transparent text-gray-500 hover:border-gray-300",
                        "text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium",
                      )}
                      aria-current={isLinkActive(item.href) ? "page" : undefined}>
                      {item.name}
                    </NextLink>
                  ))}
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 lg:static lg:inset-auto lg:ml-6 lg:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  {({ open }) => (
                    <>
                      <div>
                        <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={
                              session?.user?.image ||
                              "http://www.gravatar.com/avatar/?d=identicon"
                            }
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        show={open}
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95">
                        <Menu.Items
                          static
                          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {/* <Menu.Item>
                                                        {({ active }) => (
                                                            <NextLink
                                                                href="/"
                                                                className={classNames(
                                                                    active ? "bg-gray-100" : "",
                                                                    "block px-4 py-2 text-sm text-gray-700",
                                                                )}>
                                                                Your Profile
                                                            </NextLink>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <NextLink
                                                                href="/"
                                                                className={classNames(
                                                                    active ? "bg-gray-100" : "",
                                                                    "block px-4 py-2 text-sm text-gray-700",
                                                                )}>
                                                                Settings
                                                            </NextLink>
                                                        )}
                                                    </Menu.Item> */}
                          <Menu.Item>
                            {({ active }) => (
                              <NextLink
                                href="/api/auth/signout"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700",
                                )}>
                                Sign out
                              </NextLink>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="bg-gray-50 border-b border-gray-200 lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button as={Fragment} key={item.name}>
                  <NextLink
                    href={item.href}
                    className={classNames(
                      isLinkActive(item.href) ? "bg-gray-100" : "hover:bg-gray-100",
                      "block px-3 py-2 rounded-md text-gray-900 text-sm",
                    )}
                    aria-current={isLinkActive(item.href) ? "page" : undefined}>
                    {item.name}
                  </NextLink>
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
