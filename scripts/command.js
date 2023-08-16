const fs = require('fs')
const {compile} = require('handlebars');
const path = require('path');
const execSync = require('child_process').execSync;

class ConvertMjmlToHtml {
    async readFile(path) {
        try {
            return await fs.promises.readFile(path, {encoding: 'utf-8'});
        } catch (err) {
            throw new Error(err);
        }
    }

    async convertToHtml(template) {
        const mjmlPath = path.join(__dirname, '..', 'templates', template, 'index.mjml');
        const outputPath = path.join(__dirname, '..', 'templates', template, 'index.html');

        try {
            const command = `npx mjml "${mjmlPath}" -o "${outputPath}" -c.minify true -c.minifyOptions='{"minifyCSS": true}'`
            execSync(command);
        } catch (err) {
            throw new Error(err);
        }
    }

    async replaceVariables(template) {
        const refFile = path.join(__dirname, '..', 'templates', template, 'index.html');
        const refContent = await this.readFile(refFile);

        const variablesPath = path.join(__dirname, '..', 'templates', template, 'index.json')
        const variables = await this.readFile(variablesPath)

        const newContent = compile(refContent)(JSON.parse(variables))

        await fs.promises.writeFile(path.join(__dirname, '..', 'templates', template, 'index.test.html'),
            newContent,
            (err) => {
                if (err) throw new Error(err)
            })
    }

    async listDir() {
        try {
            return await fs.promises.readdir(path.join(__dirname, '..', 'templates'));
        } catch (err) {
            console.error('Error occurred while reading directory!', err);
        }
    }

    async convert() {
        try {
            if (process.env.TEMPLATE === '') {
                const templates = await this.listDir();

                if (templates === undefined) throw 'No folders found'

                await Promise.all(templates.map(async (template) => {
                    await this.convertToHtml(template)
                    // await this.replaceVariables(template)

                    console.log(`${template} compiled`)
                }));
            } else {
                await this.convertToHtml(process.env.TEMPLATE)
                // await this.replaceVariables(process.env.TEMPLATE)

                console.log(`${process.env.TEMPLATE} compiled`)
            }
        } catch (e) {
            throw new Error(e)
        }
    }
}

new ConvertMjmlToHtml().convert().then(() => {
    console.log('Successful')
})
