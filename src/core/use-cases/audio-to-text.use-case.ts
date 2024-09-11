import type { AudioToTextResponse } from "../../interfaces/audio-to-text.response";

export const audioToTextUseCase = async (fileAudio: File, prompt?: string) => {
    try {
        const formData = new FormData();
        formData.append('file', fileAudio);
        if (prompt) {
            formData.append('prompt', prompt);
        }


        const resp = await fetch(`${import.meta.env.VITE_GPT_API}/audio-to-text`, {
            method: 'POST',
            body: formData
        })
        if (!resp.ok) throw new Error('No se pudo realizar la generación del audio a texto.');

        const data = await resp.json() as AudioToTextResponse;

        return data;
    } catch (error) {
        console.log(error);
        return null;
        
    }
}