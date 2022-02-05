import https from 'https';

class GithubRequestor {
    private static options = {
        hostname: 'api.github.com',
        headers: { 'user-agent': 'node.js' }
    };

    static async getUser(username: string) {
        try {
            const user = await new Promise<{ id: number; name: string; login: string; }>((resolve, reject) => {
                https.request({ ...this.options, method: 'GET', path: `/users/${username}` }, (res) => {
                    let data = ''
                    res.on('data', chunk => { data += chunk });
                    res.on('end', () => resolve(JSON.parse(data)));
                }).on('error', (err) => {
                    reject(err);
                }).end();
            });
            console.log('[Github Requestor] User fetch success.');
            return user;
        } catch (error) {
            console.error('[Github Requestor] Failed to get user');
            throw error;
        }
    }

}

export default GithubRequestor;