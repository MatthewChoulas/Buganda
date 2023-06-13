import React from "react"
import logo from '../assets/blueLogo.png'


export default function Footer() {
    return (
<div className="border-gray-200 border-t-2">
        <footer className="bg-white m-4">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <div className=" sm:flex sm:items-center justify-center md:justify-between">
                <p className="flex items-center justify-center mb-4 sm:mb-0">
                    <img src={logo} className="h-8 mr-3" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MessTech</span>
                </p>
                <div className="break-words flex justify-center">
                    <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <span className="hover:underline">MessTech</span>. All Rights Reserved.</span>
                </div>
                <ul className="hidden md:block flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
</div>
    )
}