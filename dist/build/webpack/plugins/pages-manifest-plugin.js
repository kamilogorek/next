"use strict";exports.__esModule=true;exports.default=void 0;var _webpack=_interopRequireDefault(require("webpack"));var _webpackSources=_interopRequireDefault(require("webpack-sources"));var _constants=require("../../../next-server/lib/constants");var _getRouteFromEntrypoint=_interopRequireDefault(require("../../../next-server/server/get-route-from-entrypoint"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}// @ts-ignore: TODO: remove ignore when webpack 5 is stable
const{RawSource}=_webpack.default.sources||_webpackSources.default;const isWebpack5=parseInt(_webpack.default.version)===5;// This plugin creates a pages-manifest.json from page entrypoints.
// This is used for mapping paths like `/` to `.next/server/static/<buildid>/pages/index.js` when doing SSR
// It's also used by next export to provide defaultPathMap
class PagesManifestPlugin{constructor(serverless){this.serverless=void 0;this.serverless=serverless;}createAssets(compilation,assets){const entrypoints=compilation.entrypoints;const pages={};for(const entrypoint of entrypoints.values()){const pagePath=(0,_getRouteFromEntrypoint.default)(entrypoint.name,this.serverless);if(!pagePath){continue;}const files=entrypoint.getFiles().filter(file=>!file.includes('webpack-runtime')&&file.endsWith('.js'));if(files.length>1){console.log(`Found more than one file in server entrypoint ${entrypoint.name}`,files);continue;}// Write filename, replace any backslashes in path (on windows) with forwardslashes for cross-platform consistency.
pages[pagePath]=files[0].replace(/\\/g,'/');}assets[_constants.PAGES_MANIFEST]=new RawSource(JSON.stringify(pages,null,2));}apply(compiler){if(isWebpack5){compiler.hooks.make.tap('NextJsPagesManifest',compilation=>{// @ts-ignore TODO: Remove ignore when webpack 5 is stable
compilation.hooks.processAssets.tap({name:'NextJsPagesManifest',// @ts-ignore TODO: Remove ignore when webpack 5 is stable
stage:_webpack.default.Compilation.PROCESS_ASSETS_STAGE_ADDITIONS},assets=>{this.createAssets(compilation,assets);});});return;}compiler.hooks.emit.tap('NextJsPagesManifest',compilation=>{this.createAssets(compilation,compilation.assets);});}}exports.default=PagesManifestPlugin;
//# sourceMappingURL=pages-manifest-plugin.js.map