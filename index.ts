import GenerateFile from "./src/handleFile";

/**
 * Get username from issue request in github actions.
 * Read JSON subscribers.
 * Check if username already exists in subscribers.
 * Append username to subscribers.
 * Update subscribers.JSON.
 * 
 * Create template for Markdown file.
 * Get updated subscribers.
 * Update README.md with new subscriber.
 * 
 * Update project using github actions.
 */

async function init() {
    // GenerateFile.createReadMe("Hello World :) updated");
    // GenerateFile.updateSubscribers({username: 'teste-2'})
}

init();