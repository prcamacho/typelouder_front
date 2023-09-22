export async function performFetch(fetchData) {
    try {
        // Check if required data is provided
        if (!fetchData || !fetchData.url || !fetchData.method) {
            throw new Error('Missing mandatory data for the Fetch request.');
        }

        // Configure options for the Fetch request, including credentials
        const options = {
            method: fetchData.method, // Request method (e.g., 'POST')
            headers: fetchData.headers || {}, // Request headers (optional)
            body: fetchData.body, // Convert the object to JSON and use it as the request body
            credentials: 'include' // Include credentials in the request
        };

        // Perform the Fetch request and wait for the response
        const response = await fetch(fetchData.url, options);

        // Check if the response is successful (status code in the range 200-299)
        if (!response.ok) {
            throw new Error(`Error in Fetch request: ${response.status} ${response.statusText}`);
        }

        // Return the response in JSON format
        return await response.json();
    } catch (error) {
        // Catch any errors and reject the promise
        throw error;
    }
}
