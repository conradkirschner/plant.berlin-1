import Head from 'next/head'
import Map from "../components/Map";
import { useState} from "react";
import Navigation from "../components/Navigation";
import DisplayModalImport from "../service/DisplayModal";

export default function Home() {
  const [data, setData] = useState(null);
  let DisplayModal = () => <div></div>
  if (data) {
    DisplayModal =() =>  <DisplayModalImport data={data} setData={setData}></DisplayModalImport>;
    // setData( null);
  }

  // const { data: session } = useSession()
  // if (session) {
  //   return (
  //       <>
  //         Signed in as {session.user.email} <br />
  //         as {JSON.stringify(session)} <br />
  //         <button onClick={() => signOut()}>Sign out</button>
  //       </>
  //   )
  // }
  // return (
  //     <>
  //       Not signed in <br />
  //       <button onClick={() => signIn()}>Sign in</button>
  //     </>
  // )
  return (
      <div style={{overflow:"hidden"}} >

        <Navigation hidden={(data!==null)}/>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <Head>
            <title>Plant.Berlin</title>
            <link rel="icon" href="/logo.png" />
          </Head>

          <main style={{zIndex:2}} className={` flex flex-col w-full flex-1 sm:px-20 text-center`}>
            <Map height={"50vh"} data={undefined} zoom={18} lat={52.507148032550674} long={13.298478126525879} setData={setData} followPosition={null}/>
            <DisplayModal/>

            <div className={"hidden"}>
              <h1 className="text-6xl font-bold">
                Berliner Baumscheiben
              </h1>

              <p style={{backgroundColor: "rgba(127,127,127,0.2)"}} className="mt-3 p-3 text-green-800 text-2xl">
                Pflanze in Berlin
              </p>

              <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
                <a
                    className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
                >
                  <h3 className="text-2xl font-bold">Wie bepflanze ich korrekt? &rarr;</h3>
                  <p className="mt-4 text-xl">
                    Finde jetzt heraus ob du richtig pflanzt.
                  </p>
                </a>

                <a
                    href="https://nextjs.org/learn"
                    className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
                >
                  <h3 className="text-2xl font-bold">Bewertung &rarr;</h3>
                  <p className="mt-4 text-xl">
                    Entdecke jetzt die schönsten Baumscheiben Berlins!
                  </p>
                </a>

                <a
                    href="https://github.com/vercel/next.js/tree/master/examples"
                    className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
                >
                  <h3 className="text-2xl font-bold">Unterstützen &rarr;</h3>
                  <p className="mt-4 text-xl">
                    Erstelle dir jetzt ein Profil um mit uns Baumscheiben zu dokumentieren.
                  </p>
                </a>


              </div>
            </div>
          </main>

          <footer className="flex items-center justify-center w-full mt-6 h-24 border-t">
            <a
                className="flex items-center justify-center text-center"
                href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
            >
              Data provided by OpenStreetMap Contributors & Open Data Berlin <br />
              Developer - Conrad Kirschner
            </a>
          </footer>


        </div>
      </div>

  )
}
