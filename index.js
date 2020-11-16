const core = require('@actions/core');
const io = require('@actions/io');
const fs = require('fs')

async function action() {
    const folderToCache = core.getInput('folder-to-cache', { required: true });
    const cacheTargetFolder = core.getInput('storage-folder', { required: true })

    core.info(`Attempting to restore cache from ${cacheTargetFolder} to ${folderToCache}`)

    const cachedFolderExists = await fs.existsSync(cacheTargetFolder)
    if (!cachedFolderExists) {
        core.info('The cache folder does not exist at path ', cacheTargetFolder)
        return
    }

    await io.cp(cacheTargetFolder, folderToCache, { recursive: true, force: false });

    core.info(`Restored cache from ${cacheTargetFolder} to ${folderToCache}`)
}

return action().then(() => {
    core.debug('finished with local-cache-action')
}).catch((err) => {
    core.setFailed(`Error while executing local-cache-action cleanup ${err}`);
})


