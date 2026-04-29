"use client";

export default function Paginador({ pagina, setPagina }: any) {
  return (
    <div>
      <button
        onClick={() => {
          if (pagina > 1) {
            setPagina(pagina - 1);
          }
        }}
      >
        Anterior
      </button>

      <span>Página {pagina}</span>

      <button onClick={() => setPagina(pagina + 1)}>
        Siguiente
      </button>
    </div>
  );
}