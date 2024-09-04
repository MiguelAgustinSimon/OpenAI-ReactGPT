

export const prosConsStreamUseCase = async( prompt: string ) => {

    try {
      
        const resp = await fetch(`${import.meta.env.VITE_API}/pros-cons-discusser/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt }),
        // todo: abortSignal
      });
  
      if ( !resp.ok ) throw new Error('No se pudo realizar la comparación');
  
      const reader = resp.body?.getReader();
      if ( !reader ) {
        console.log('No se pudo generar el reader');
        return null;
      }
      return reader;  
    } catch (error) {
      console.log(error);
      return null;
    }
  
  
  }
// export const prosConsStreamUseCase = async (prompt: string) => {
//     try {
//         const resp = await fetch(`${import.meta.env.VITE_API}/pros-cons-discusser/stream`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ prompt }),
//             //ToDo abortSignal
//         });
//         if (!resp.ok) throw new Error('No se pudo realizar la comparacion.');
        
//         const reader = resp.body?.getReader();
//         if (!reader) {
//             console.log(`No se pudo generar el reader.`);
//             return null;
//         }
//         return {
//             [Symbol.asyncIterator]() {
//               return {
//                 async next() {
//                   const { value, done } = await reader.read();
//                   return { value, done };
//                 },
//               };
//             },
//           };
//     } catch (error) {
//         return null
//     }
// }

// export const prosConsStreamUseCase = async (prompt: string) => {
//     try {
//         // Simula una respuesta de la API
//         const hardcodedResponse = `{
//             "pros": [
//                 "Las PC suelen tener un rendimiento superior debido a componentes más potentes",
//                 "Las PC son más personalizables y actualizables",
//                 "Las PC suelen tener una vida útil más larga",
//                 "Las PC suelen ser más baratas para el mismo nivel de rendimiento",
//                 "Las PC suelen tener mejores opciones de refrigeración, lo que puede prolongar la vida útil de los componentes"
//             ],
//             "cons": [
//                 "Las PC son menos portátiles que las laptops",
//                 "Las PC suelen ocupar más espacio",
//                 "Las PC pueden requerir más tiempo y conocimientos para configurar y mantener",
//                 "Las PC pueden consumir más energía que las laptops"
//             ]
//         }`;

//         // Convierte la cadena en un Uint8Array
//         const encoder = new TextEncoder();
//         const encodedResponse = encoder.encode(hardcodedResponse);

//         // Crea un ReadableStream simulado
//         const stream = new ReadableStream({
//             start(controller) {
//                 controller.enqueue(encodedResponse);
//                 controller.close();
//             }
//         });

//         // Obtén el reader del stream
//         const reader = stream.getReader();
//         return reader;
//     } catch (error) {
//         return null;
//     }
// }