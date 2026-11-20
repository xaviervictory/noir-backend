function tieneCodigo(error: unknown, codigo: string): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === codigo
  );
}

// P2002: se intentó guardar un valor repetido en una columna UNIQUE
export function isPrismaUniqueConstraintError(error: unknown): boolean {
  return tieneCodigo(error, 'P2002');
}

// P2003: falló una clave foránea (por ejemplo, borrar algo que otra tabla usa)
export function isPrismaForeignKeyError(error: unknown): boolean {
  return tieneCodigo(error, 'P2003');
}
