
// ==========================================
// 1. API BASE URL
// ==========================================

const BASE_URL = 'https://jsonplaceholder.typicode.com';


// ==========================================
// 2. REUSABLE HTTP REQUEST FUNCTION
// ==========================================

async function request(endpoint, options = {}) {

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        signal: AbortSignal.timeout(8000),
    });

    // Check if the response was successful
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }

    // Handle responses without content
    if (response.status === 204) {
        return null;
    }

    // Convert response into JSON
    return response.json();
}


// ==========================================
// 3. API METHODS
// ==========================================

export const api = {

    // GET: Fetch the first 10 posts
    getPosts() {
        return request('/posts?_limit=10');
    },


    // GET: Filter posts by user ID
    getPostsByUser(userId) {
        const params = new URLSearchParams({
            userId: userId,
        });

        return request(`/posts?${params}`);
    },


    // POST: Create a new post
    createPost(data) {
        return request('/posts', {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(data),
        });
    },


    // PATCH: Update an existing post title
    updatePost(id, title) {
        return request(`/posts/${id}`, {
            method: 'PATCH',

            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                title: title,
            }),
        });
    },


    // DELETE: Delete a post
    deletePost(id) {
        return request(`/posts/${id}`, {
            method: 'DELETE',
        });
    },

};
