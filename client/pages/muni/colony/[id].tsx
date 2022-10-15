import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'
import type { Municipios as Props } from '../../../types'

const Municipe: React.FC<Props> = ({ citiesFiltered }) => {
    const [slice, setSlice] = useState(30)
    const data = citiesFiltered[0].muni_id[0].colony_id
    const [cities, setCities] = useState(data.slice(0, slice))
    const divRef = useRef<HTMLDivElement | null>(null)
    
    const router = useRouter()
    
    useEffect(() => {
        setCities(data.slice(0, slice))
    }, [slice, data])


    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setSlice(slice + 30)
            }
        })
        observer.observe(divRef.current!)
        return () => {
            observer.disconnect()
        }
    }, [slice])

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
                    <h2 className="font-bold text-2xl text-center">Colonias disponibles</h2>
                    <ul className="mt-5 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 xl:grid-cols-4">
                        {
                            cities.map((city) => (
                                <li key={city.id} className="m-auto justify-center w-[80%] p-2 mb-2 bg-gray-100 rounded-md hover:cursor-pointer hover:bg-gray-400/20">
                                    <Link href={`citie/${city.id}`}>
                                        <div className="flex flex-col items-center justify-center text-center">
                                            <span className="font-bold text-lg">Nombre de la colonia: {city.d_asenta}</span>
                                            <span className="text-sm">Código Postal: {city.c_oficina}</span>
                                            <span className="text-sm">Nombre del Municipio: {city.d_ciudad}</span>
                                            <span className="text-sm">Zona: {city.d_zona}</span>
                                        </div>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </main>
            <div ref={divRef} />
        </div>
    )
}

export default Municipe


export async function getServerSideProps(context: any) {
    const { id } = context.query
    const data = await fetch(`http://localhost:4000/cities?municipio=${id}`)
    const cities = await data.json()
    return {
        props: cities
    }
}
