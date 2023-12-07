/**
 * Formatea un nombre, capitalizando la primera letra de cada palabra y convirtiendo el resto en minúsculas.
 * @param {string} name - El nombre que se va a formatear.
 * @returns {string} - El nombre formateado.
 * @example
 * // Retorna 'Juan Perez'
 * const formattedName = nameFormatter('juan perez');
 * console.log(formattedName);
 */

export function nameFormatter(name) {
    // Dividir el nombre en palabras
    const words = name.split(' ');
  
    // Capitalizar la primera letra de cada palabra y convertir el resto a minúsculas
    const formattedName = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
  
    // Unir las palabras formateadas de nuevo en una cadena
    return formattedName.join(' ');
    }
  
  // Ejemplo de uso
  const formattedName = nameFormatter('juan perez');
  console.log(formattedName); // Output: Juan Perez