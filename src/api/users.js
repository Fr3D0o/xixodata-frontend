async function fetchJokes() {
    try {
        const response = await fetch('http://localhost:3000/user/login');
        const jokes = await response.json();

        return jokes
    } catch (error) {
        console.error(error);
    }
}

export default fetchJokes
