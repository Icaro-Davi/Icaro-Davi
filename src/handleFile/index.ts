import fs from 'fs';
import path from 'path';

import { subscriber } from './handleFile.types';

class GenerateFile {
    private static readMeFilePath = path.resolve(`${require.main?.path}/README.md`);
    private static subscriberFilePath = path.resolve(`${require.main?.path}/src/json/subscribers.json`);
    private static readMeTemplateFilePath = path.resolve(`${require.main?.path}/src/template/README.md`);

    static createReadMe(markdownText: string) {
        try {
            fs.writeFileSync(this.readMeFilePath, markdownText);
            console.log('[GenerateFile] File "README.md" created successful.');
        } catch (error) {
            console.error('[GenerateFile] Failed to create file "README.md".');
            throw error;
        }
    }

    static async updateSubscribers(newSubscriber: subscriber) {
        try {
            const subscribers = (await import('../json/subscribers.json')).default as subscriber[];
            if (!subscribers.some(subscriber => subscriber.id === newSubscriber.id)) {
                subscribers.unshift(newSubscriber);
                fs.writeFileSync(this.subscriberFilePath, JSON.stringify(subscribers));
                console.log('[GenerateFile] Subscribers updated.');
            } else {
                subscribers[subscribers.findIndex(subscribe => subscribe.id === newSubscriber.id)] = newSubscriber;
                fs.writeFileSync(this.subscriberFilePath, JSON.stringify(subscribers));
                console.log('[GenerateFile] User updated.');
            }
        } catch (error) {
            console.error('[GenerateFile] Failed to update file "subscribers.json".');
            throw error;
        }
    }

    static getTemplate() {
        try {
            return fs.readFileSync(this.readMeTemplateFilePath, { encoding: 'utf-8' });
        } catch (error) {
            console.error('[GenerateFile] Failed to get Readme template.');
            throw error;
        }
    }

    static async generateMarkdownWithSubscribers() {
        try {
            const template = this.getTemplate();
            const subscribers = (await import('../json/subscribers.json')).default as subscriber[];
            const markdownSubscribers = subscribers.reduce((prev, current, index) => `${prev}[@${current.username}](https://github.com/${current.username}) `, '');
            return `${template}\n<details>\n\t<summary>There are ${subscribers.length} subscribers</summary>\n\n${markdownSubscribers}\n</details>`;
        } catch (error) {
            console.error('[GenerateFile] Failed to generate Markdown with subscribers.')
            throw error;
        }
    }
}

export default GenerateFile;