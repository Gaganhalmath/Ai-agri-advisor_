// Renamed to callGemini to reflect backend change, though function signature update is key
export async function callGemini(prompt: string, image?: string | null, language?: string): Promise<string> {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: prompt,
                image: image,
                language: language
            })
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Gemini API Error (${response.status}):`, errorText);
            return `Sorry, I encountered an error: ${response.status} - ${errorText}`;
        }

        const data = await response.json();
        return data.response || "Sorry, I couldn't get a response from Gemini.";
    } catch (error) {
        console.error("Error calling AI API:", error);
        return "Sorry, I am unable to connect to the server. Please ensure the backend is running.";
    }
}
