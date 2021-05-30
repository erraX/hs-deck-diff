const shell = require('shelljs');

if (shell.exec('wget -P ./server/data https://raw.githubusercontent.com/HearthSim/hsdata/master/CardDefs.xml').code !== 0) {
    shell.echo('Update successfully!')
    shell.exit(1);
}
