import Link from 'next/link';

export default function ProjectDetailNotFound() {
  return (
    <div className="p-4 border rounded-xl">
      <h2 className="text-3xl font-bold mb-2">Producto no encontrado</h2>
      <p className="text-lg text-muted-foreground mb-4">
        El producto con el ID proporcionado no existe.
      </p>
      <Link href="/" className="text-lg text-primary text- hover:underline">
        Volver al listado de productos
      </Link>
    </div>
  );
}
