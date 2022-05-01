import {getCsrfToken} from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function SignIn({csrfToken}) {
    return (
        <body className="bg-white font-family-karla h-screen">

        <div className="w-full flex flex-wrap">

            <div className="w-full md:w-1/2 flex flex-col">

                <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
                    <a href="#" className="">
                        <Image src={'/logo.png'} width={"150px"} height={"50px"}></Image>
                    </a>
                </div>

                <div
                    className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                    <p className="text-center text-3xl">Schön das du da bist.</p>
                    <form method="post" action="/api/auth/callback/credentials">
                        <input name="csrfToken" type="hidden" defaultValue={csrfToken}/>
                        <div className="flex flex-col pt-4">
                            <label htmlFor="email" className="text-lg">Email</label>
                            <input type="text" name="username" id="username" placeholder="your@email.com"
                                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>

                        <div className="flex flex-col pt-4">
                            <label htmlFor="password" className="text-lg">Password</label>
                            <input type="password" name="password" id="password" placeholder="Password"
                                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>

                        <input type="submit" value="Log In"
                               className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"/>
                    </form>
                    <div className="text-center pt-12 pb-12">
                        <p>Noch keinen Account?</p>
                        <p className="underline font-semibold">
                            <Link href="/user/Register" >
                                Jetzt Account erstellen
                            </Link>
                        </p>
                    </div>
                </div>

            </div>

            <div className="w-1/2 shadow-2xl">
                <img className="object-cover w-full h-screen hidden md:block"
                     src="https://source.unsplash.com/IXUM4cJynP0"/>
            </div>
        </div>

        </body>
    )
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    }
}
