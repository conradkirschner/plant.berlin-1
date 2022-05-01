import {getCsrfToken} from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function SignIn({csrfToken}) {
    const registerURL = '/api/protected/user/register';

    return (
        <body className="bg-white font-family-karla h-screen">

        <div className="w-full flex flex-wrap">

            <div className="w-full md:w-1/2 flex flex-col">

                <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-12">
                    <a href="#" className="">
                        <Image src={'/logo.png'} width={"150px"} height={"50px"}></Image>
                    </a>
                </div>

                <div
                    className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                    <p className="text-center text-3xl">Herzlich Willkommen Stadtgärtner.</p>
                    <form className="flex flex-col pt-3 md:pt-8" method="post" action={registerURL}>
                        {/*<input type="hidden" name={"csrf"} value={csrfToken} />*/}
                        <div className="flex flex-col pt-4">
                            <label htmlFor="email" className="text-lg">Email</label>
                            <input type="email" id="email" name="username" placeholder="your@email.com"
                                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>

                        <div className="flex flex-col pt-4">
                            <label htmlFor="anzeigeName" className="text-lg">Anzeige Name</label>
                            <input type="text" name="anzeigeName" id="anzeigeName" placeholder="Öffentlicher Name"
                                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
                        <div className="flex flex-col pt-4">
                            <label htmlFor="password" className="text-lg">Passwort</label>
                            <input type="password" name="password" id="password" placeholder="Password"
                                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>


                        <div className="flex flex-col pt-4">
                            <label htmlFor="confirm-password" className="text-lg">Password bestätigen</label>
                            <input type="password" name="password2" id="confirm-password" placeholder="Password"
                                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
                        <div className="inline flex-col pt-4 flex-nowrap">
                            <input type="checkbox" id="confirm-agb" name="confirm-agb" value={"true"}
                                   className=""/>
                            <label htmlFor="confirm-agb" className="text-lg">Ich bestätige die <a className={"text-blue-800"} href={""}>AGB</a> und <a className={"text-blue-800"} href={"/"}>Geschäftsbedingungen</a> </label>
                        </div>

                        <input type="submit" value="Jetzt registrieren"
                               className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"/>
                    </form>
                    <div className="text-center pt-12 pb-12">
                        <p>Du hast schon einen Account? </p>
                        <p className="underline font-semibold">
                            <Link href="/user/SignIn" >Dann kannst du dich hier anmelden.</Link>
                        </p>
                    </div>
                </div>

            </div>

            <div className="w-1/2 shadow-2xl">
                <img className="object-cover w-full h-screen hidden md:block"
                     src="https://source.unsplash.com/IXUM4cJynP0" alt="Background"/>
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
