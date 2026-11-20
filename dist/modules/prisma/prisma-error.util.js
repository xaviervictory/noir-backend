function tieneCodigo(error, codigo) {
    return (typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        error.code === codigo);
}
export function isPrismaUniqueConstraintError(error) {
    return tieneCodigo(error, 'P2002');
}
export function isPrismaForeignKeyError(error) {
    return tieneCodigo(error, 'P2003');
}
//# sourceMappingURL=prisma-error.util.js.map