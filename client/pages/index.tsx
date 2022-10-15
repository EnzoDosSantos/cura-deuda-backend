import Head from 'next/head'
import Link from 'next/link'
import type { Cities as Props } from '../types'


const Home: React.FC<Props> = ({ cities }) => {
  return (
    <div>
      <Head>
        <title>Home CitiesAPI</title>
        <meta name="description" content="Netflix account page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col">
        <h1 className="flex items-center justify-center font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-purple-300 to-pink-600">Inicio</h1>
        <div className="mt-5">
          <h2 className="font-bold text-2xl text-center">Estados disponibles</h2>
          <ul className="mt-5 grid grid-cols-1 xl:grid-cols-2">
            {cities.map((city) => (
              <li key={city.id} className="m-auto justify-center w-[80%] p-2 mb-2 bg-gray-100 rounded-md hover:cursor-pointer hover:bg-gray-400/20">
                <Link href={`muni/${city.d_estado}`}>
                  <div className="flex flex-col items-center justify-center text-center">
                    <span className="font-bold text-lg">Nombre del Estado: {city.d_estado}</span>
                    <span className="text-sm">Clave del Estado: {city.c_estado}</span>
                    <span className="text-sm">Cantidad de Municipios: {city.muni_id.length}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main >
    </div >
  )
}

export default Home


export async function getServerSideProps() {

  const data = await fetch('http://localhost:4000/cities')
  const json = await data.json()
  const cities = json.slice(0, 27)
  return {
    props:{
      cities
    }
  }
}