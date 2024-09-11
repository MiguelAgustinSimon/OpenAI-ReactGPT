

export async function* prosConsStreamGeneratorUseCase(prompt: string, abortSignal:AbortSignal) {
  try {

    const resp = await fetch(`${import.meta.env.VITE_API}/pros-cons-discusser/stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt }),
      signal:abortSignal
    });

    if (!resp.ok) throw new Error('No se pudo realizar la comparación');

    const reader = resp.body?.getReader();
    const decoder = new TextDecoder();
    let text='';

    if (!reader) {
      console.log('No se pudo generar el reader');
      return null;
    }
    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        break;
      }

      const decodedChunk = decoder.decode(value, { stream: true });
      text += decodedChunk;
      yield text; //es lo que vamos a regresar
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}