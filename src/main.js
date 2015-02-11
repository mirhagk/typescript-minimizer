/// <reference path="node.d.ts" />
/// <reference path="typescript.d.ts" />
var ts = require("typescript");
function main() {
    console.log(process.argv[2]);
}
function compile(filenames, options) {
    var host = ts.createCompilerHost(options);
    var program = ts.createProgram(filenames, options, host);
    var checker = ts.createTypeChecker(program, true);
    var result = checker.emitFiles();
    var allDiagnostics = program.getDiagnostics().concat(checker.getDiagnostics()).concat(result.diagnostics);
    allDiagnostics.forEach(function (diagnostic) {
        var lineChar = diagnostic.file.getLineAndCharacterFromPosition(diagnostic.start);
        console.log("" + diagnostic.file.filename + " (" + lineChar.line + "," + lineChar.character + "): " + diagnostic.messageText);
    });
    console.log("Process exiting with code '" + result.emitResultStatus + "'.");
    process.exit(result.emitResultStatus);
}
exports.compile = compile;
function minimize(node) {
    //var code = ts.forEachChild(node,minimize);
    var children = node.getChildren();
    var code = "";
    for (var i = 0; i < children.length; i++) {
        code += minimize(children[i]) + ",";
    }
    switch (node.kind) {
    }
    //console.log(node.kind);
    //console.log(ts.SyntaxKind.SourceFile);
    //console.log(JSON.stringify(ts.SyntaxKind));
    return code + "->" + node.kind.toString();
}
function minimizeCompiler(filenames, options) {
    var host = ts.createCompilerHost(options);
    var program = ts.createProgram(filenames, options, host);
    return minimize(program.getSourceFiles()[0]);
}
exports.minimizeCompiler = minimizeCompiler;
main();
console.log(minimizeCompiler(process.argv.slice(2), {
    noEmitOnError: true,
    noImplicitAny: true,
    target: 1 /* ES5 */,
    module: 1 /* CommonJS */
}));
