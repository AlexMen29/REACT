export async function InitializeDatabase(db) {
    // Crear tabla patients con los campos ampliados
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS patients (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            phone TEXT,
            birthDate TEXT,
            address TEXT
        );
    `);

    // Migraciones seguras en caso de que la tabla ya existiera previamente con solo 'id' y 'name'
    try {
        await db.execAsync(`ALTER TABLE patients ADD COLUMN phone TEXT;`);
    } catch (e) {
        // Columna ya existe
    }

    try {
        await db.execAsync(`ALTER TABLE patients ADD COLUMN birthDate TEXT;`);
    } catch (e) {
        // Columna ya existe
    }

    try {
        await db.execAsync(`ALTER TABLE patients ADD COLUMN address TEXT;`);
    } catch (e) {
        // Columna ya existe
    }
}
