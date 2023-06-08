import React from "react"
import logo from '../assets/blueLogo.png'


export default function Footer() {
    return (
<div className="border-gray-200 border-t-2">
        <footer class="bg-white m-4">
        <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <div class="sm:flex sm:items-center sm:justify-between">
                <p class="flex items-center mb-4 sm:mb-0">
                    <img src={logo} class="h-8 mr-3" alt="Flowbite Logo" />
                    <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MessTech</span>
                </p>
                <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <span class="hover:underline">MessTech</span>. All Rights Reserved.</span>
                <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                    <li>
                        <a href="#" class="mr-4 hover:underline md:mr-6 ">About</a>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
</div>
    )
}