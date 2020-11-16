const core = require("@actions/core");
const io = require("@actions/io");

async function action() {
  const fromPath = core.getInput("from", { required: true });
  const toPath = core.getInput("to", { required: true });

  core.info(`Attempting to copy file from ${fromPath} to ${toPath}`);

  await io.cp(fromPath, toPath, {
    recursive: false,
    force: true,
  });

  core.info(`Copied file from ${fromPath} to ${toPath}`);
}

return action()
  .then(() => {
    core.debug("Finished with cp-file-action");
  })
  .catch((err) => {
    core.setFailed(`Error while executing cp-file-action ${err}`);
  });
