import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { Municipios as Props } from '../../types'

const Municipe: React.FC<Props> = ({ citiesFiltered }) => {

    const router = useRouter()

    const handleBack = () => {
        router.back()
    }

    return (
        <div>
            <Head>
                <title>Home CitiesAPI</title>
                <meta name="description" content="Netflix account page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex flex-col">
                <h1 onClick={handleBack} className="hover:cursor-pointer flex items-center justify-center font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-purple-300 to-pink-600">Inicio</h1>
                <div className="mt-5">
                    <h2 className="font-bold text-2xl text-center">Municipios disponibles</h2>
                    <ul className="mt-5 grid grid-cols-1 xl:grid-cols-2">
                        {citiesFiltered[0].muni_id.map((city) => (
                            <li key={city.id} className="m-auto justify-center w-[80%] p-2 mb-2 bg-gray-100 rounded-md hover:cursor-pointer hover:bg-gray-400/20">
                                <Link href={`colony/${city.D_mnpio}`}>
                                    <div className="flex flex-col items-center justify-center text-center">
                                        <span className="font-bold text-lg">Nombre Municipio: {city.D_mnpio}</span>
                                        <span className="text-sm">Clave Municipio: {city.c_mnpio}</span>
                                        <span className="text-sm">Cantidad de Colonias: {city.colony_id.length}</span>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    )
}

export default Municipe


export async function getServerSideProps(context: any) {
    const { muni } = context.query
    const data = await fetch(`http://localhost:4000/cities?estado=${muni}`)
    const cities = await data.json()
    return {
        props: cities
    }
}
