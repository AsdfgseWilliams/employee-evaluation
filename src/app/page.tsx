import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex justify-center items-center rounded-lg min-h-[90vh] bg-gradient-to-r from-pink-400 to-purple-500">
      <div className="text-center text-white">
        <h1 className="text-5xl font-extrabold tracking-tight mb-6">Evaluación de Empleados</h1>
        <p className="text-lg mb-8">Bienvenido al sistema de evaluación. Haz clic en el siguiente botón para comenzar.</p>
        <Link href="/evaluation">
          <button className="px-8 py-3 bg-pink-600 text-white text-xl font-semibold rounded-full shadow-lg hover:bg-pink-400 transition duration-300 ease-in-out transform hover:scale-105">
            Ir a la Evaluación
          </button>
        </Link>
      </div>
    </div>
  );
}
