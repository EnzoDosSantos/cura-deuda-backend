import Head from 'next/head'
import { useRouter } from 'next/router'
import type { CityByID as Props } from '../../../../types'

const Citie: React.FC<Props> = (citie) => {

    const router = useRouter()

    const handleBack = () => {
        router.back()
    }

    return (
        <div>
            <Head>
                <title>Citie CitiesAPI</title>
                <meta name="description" content="Cities API" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex flex-col">
            <h1 onClick={handleBack} className="hover:cursor-pointer flex items-center justify-center font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-purple-300 to-pink-600">Inicio</h1>
                    <h2 className="font-bold text-2xl text-center mt-5">Toda la información disponible acerca de la colonia: {citie.d_asenta}</h2>
                <div className="flex flex-col items-center justify-center text-center border border-gray-500 mt-5">
                    <p className="font-medium text-lg">Nombre Entidad (INEGI, Marzo 2013):{" "}
                        <span className="font-bold">
                            {citie.d_estado}
                        </span>
                    </p>
                    <p className="font-medium text-lg">Nombre Municipio (INEGI, Marzo 2013):{" "}
                        <span className="font-bold">
                            {citie.D_mnpio}
                        </span>
                    </p>
                    <p className="font-medium text-lg">Nombre asentamiento:{" "}
                        <span className="font-bold">
                            {citie.d_asenta}
                        </span>
                    </p>
                    <p className="font-medium text-lg">Nombre Ciudad (Catálogo SEPOMEX):{" "}
                        <span className="font-bold">
                            {citie.d_ciudad}
                        </span>
                    </p>
                    <p className="font-medium text-lg">Tipo de asentamiento (Catálogo SEPOMEX):{" "}
                        <span className="font-bold">
                            {citie.d_tipo_asenta}
                        </span>
                    </p>
                    <p className="font-medium text-lg">Zona en la que se ubica el asentamiento (Urbano/Rural):{" "}
                        <span className="font-bold">
                            {citie.d_zona}
                        </span>
                    </p>
                    <p className="font-medium text-lg">Clave Ciudad (Catálogo SEPOMEX):{" "}
                        <span className="font-bold">
                            {citie.c_cve_ciudad}
                        </span>
                    </p>
                    <p className="font-medium text-lg">Clave Entidad (INEGI, Marzo 2013):{" "}
                        <span className="font-bold">
                            {citie.c_estado}
                        </span>
                    </p>
                    <p className="font-medium text-lg">Clave Municipio (INEGI, Marzo 2013):{" "}
                        <span className="font-bold">
                            {citie.c_mnpio}
                        </span>
                    </p>
                    <p className="font-medium text-lg">Clave Tipo de asentamiento (Catálogo SEPOMEX):{" "}
                        <span className="font-bold">
                            {citie.c_tipo_asenta}
                        </span>
                    </p>
                    <p className="font-medium text-lg">Código Postal de la Administración Postal que reparte al asentamiento:{" "}
                        <span className="font-bold">
                            {citie.d_CP}
                        </span>
                    </p>
                    <p className="font-medium text-lg">Código Postal asentamiento:{" "}
                        <span className="font-bold">
                            {citie.d_codigo}
                        </span>
                    </p>
                    <p className="font-medium text-lg">Código Postal de la Administración Postal que reparte al asentamiento:{" "}
                        <span className="font-bold">
                            {citie.c_oficina}
                        </span>
                    </p>
                    <p className="font-medium text-lg">Identificador único del asentamiento (nivel municipal):{" "}
                        <span className="font-bold">
                            {citie.id_asenta_cpcons}
                        </span>
                    </p>
                </div>
            </main>
        </div>
    )
}

export default Citie

export async function getServerSideProps(context: any) {
    const { id } = context.query
    const data = await fetch(`http://localhost:4000/cities/${id}`)
    const citie = await data.json()
    return {
        props: citie
    }
}
