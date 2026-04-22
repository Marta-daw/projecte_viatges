import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import ApplicationLogo from '../AppLogo/AppLogo';
import AuthDropdown from '../AuthDropdown/AuthDropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import DarkModeToggle from '@/Components/DarkModeToggle/DarkModeToggle'

export default function Header() {
    const { auth } = usePage().props;
    const user = auth?.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <nav className="border-b border-gray-200 dark:border-zinc-800 transition-colors duration-300" style={{ backgroundColor: 'var(--ivory-beige)' }}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 justify-between">
                    <div className="flex">

                        <div className="flex shrink-0 items-center">
                            <Link href="/">
                                <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-white transition-colors" />
                            </Link>
                        </div>

                        <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex [&>*]:!text-gray-800 dark:[&>*]:!text-gray-200">
                            <NavLink href="/" active={route().current('home')}>Inici</NavLink>
                            {user && (
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>Dashboard</NavLink>
                            )}
                        </div>
                    </div>

                    <div className="hidden sm:ms-6 sm:flex sm:items-center gap-4">
                        <DarkModeToggle />
                        <AuthDropdown user={user} />
                    </div>

                    <div className="-me-2 flex items-center sm:hidden gap-2">
                        <DarkModeToggle />
                        <button onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)} className="p-2 text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-800 focus:outline-none transition duration-150 rounded-md">
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                <path className={showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden dark:bg-[#1e1e1b]'}>
                <div className="space-y-1 pb-3 pt-2">
                    <ResponsiveNavLink href="/" active={route().current('home')}>Inici</ResponsiveNavLink>
                    {user && <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>Dashboard</ResponsiveNavLink>}
                </div>

                <div className="border-t border-gray-200 dark:border-zinc-800 py-4 px-4">
                    <AuthDropdown user={user} />
                </div>
            </div>
        </nav>
    );
}