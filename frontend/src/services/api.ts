export async function callOpenAI(prompt: string): Promise<string> {
    try {
        const response = await fetch("http://localhost:5000/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: prompt })
        });
        const data = await response.json();
        return data.response || "Sorry, I couldn't get a response.";
    } catch (error) {
        console.error("Error calling AI API:", error);
        return "Sorry, I am unable to connect to the server. Please ensure the backend is running.";
    }
}
