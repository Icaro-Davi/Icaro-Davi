import fs from 'fs';
import path from 'path';
import subscribers from '../json/subscribers.json';

import { subscriber } from './handleFile.types';

class GenerateFile {
    private static readMeFilePath = path.resolve(`${require.main?.path}/README.md`);
    private static subscriberFilePath = path.resolve(`${require.main?.path}/src/json/subscribers.json`);

    static createReadMe(markdownText: string) {
        try {
            fs.writeFileSync(this.readMeFilePath, markdownText);
            console.log('[GenerateFile] File "README.md" created successful');
        } catch (error) {
            console.error('[GenerateFile] Failed to create file "README.md".');
            throw error;
        }
    }

    static updateSubscribers(newSubscriber: subscriber) {
        try {
            if (!subscribers.some(subscriber => subscriber.username === newSubscriber.username)) {
                subscribers.push(newSubscriber);
                fs.writeFileSync(this.subscriberFilePath, JSON.stringify(subscribers));
            } else {
                throw new Error('Subscriber already exists.');
            }
        } catch (error) {
            console.log('[GenerateFile] Failed to update file "subscribers.json".');
            throw error;
        }
    }
}

export default GenerateFile;