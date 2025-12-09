export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-base text-brand">
      {/* Hero Section para probar el scroll */}
      <section className="flex min-h-screen flex-col items-center justify-center px-4 py-20 sm:px-6 md:px-12">
        <h1 className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
          Richard3D
        </h1>
        <p className="mb-8 text-center text-lg text-brand/70 sm:text-xl md:text-2xl">
          Impresiones 3D de alta calidad
        </p>
      </section>

      {/* Sección adicional para probar el scroll */}
      <section className="min-h-screen px-4 py-20 sm:px-6 md:px-12">
        <div className="container mx-auto">
          <h2 className="mb-8 text-3xl font-bold sm:text-4xl md:text-5xl">
            Nuestros Servicios
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-brand/10 bg-brand/5 p-6 backdrop-blur-sm"
              >
                <h3 className="mb-2 text-xl font-semibold">Servicio {item}</h3>
                <p className="text-brand/60">Descripción del servicio {item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
