import 'dotenv/config';
import GenerateFile from "./src/handleFile";
import GithubRequestor from './src/githubRequestor';

async function init() {
    console.log(`[Init] Add new user "${process.env.MARKDOWN_NEW_SUBSCRIBER_USERNAME}"`);
    const { id, login, name } = await GithubRequestor.getUser(process.env.MARKDOWN_NEW_SUBSCRIBER_USERNAME || 'icaro-davi');
    GenerateFile.updateSubscribers({
        id,
        ...name ? { name } : {},
        username: login,
        createdAt: new Date().toJSON()
    });
    GenerateFile.createReadMe(await GenerateFile.generateMarkdownWithSubscribers());
}

init();