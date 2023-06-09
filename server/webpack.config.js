const path = require('path');
const NodePolyFillPlugin = require("node-polyfill-webpack-plugin")

module.exports  = {
    entry: {
        index: path.resolve(process.cwd(), 'src/server.js')

    },
    output: {
        path: path.resolve(process.cwd(), '.build'),
        filename: '[name].bundle.js'
    },
    plugins: [
        new NodePolyFillPlugin()
    ],
    resolve: {
        fallback: {
            "fs": false,
            "os": false,
            "path": false,
        }
    }
}