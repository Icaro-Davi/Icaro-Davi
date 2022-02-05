import 'dotenv/config';
import GenerateFile from "./src/handleFile";

async function init() {
    console.log(`[Init] Add new user "${process.env.MARKDOWN_NEW_SUBSCRIBER_USERNAME}"`);
    GenerateFile.updateSubscribers({
        // username: process.env.MARKDOWN_NEW_SUBSCRIBER_USERNAME || 'icaro-davi'
        username: Math.random().toString(36).slice(2, 8),
        createdAt: new Date().toJSON()
    });
    GenerateFile.createReadMe(await GenerateFile.generateMarkdownWithSubscribers());
}

init();