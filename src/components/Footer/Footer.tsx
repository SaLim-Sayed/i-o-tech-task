
"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/images/image.png";

export default function Footer() {
    return (
        <footer className="bg-[#4B2615] border-t mt-10">
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-2">
                <div className="text-center md:text-left">
                    <Link href="/">
                        <Image src={Logo} alt=" Logo" width={100} height={40} />
                    </Link>
                </div>

                <div className="flex flex-wrap gap-4  text-white">
                    <Link href="/" className="hover:text-white transition">Home</Link>
                    <Link href="/products" className="hover:text-white transition">Products</Link>
                </div>
                <p className="text-white">&copy; {new Date().getFullYear()} All rights reserved.</p>
            </div>
        </footer>
    );
}
