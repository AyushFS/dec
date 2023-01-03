const replace = require('replace-in-file');
const git = require('git-rev-sync');
const buildVersion = git.short();
const options = {
	files: `./src/environments/environment.ts`,
	from: /{BUILD_VERSION}/g,
	to: buildVersion,
	allowEmptyPaths: false,
};

try {
	let changedFiles = replace.sync(options);
	console.log(changedFiles);
	console.log('Modified files', changedFiles.map((f) => f.file).join(', '));
	console.log('Build version set: ' + buildVersion);
} catch (error) {
	console.error('Error occurred:', error);
}
