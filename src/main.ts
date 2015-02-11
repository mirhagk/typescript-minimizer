/// <reference path="node.d.ts" />
/// <reference path="typescript.d.ts" />
import ts = require("typescript");

function main():void{
  console.log(process.argv[2]);
}

export function compile(filenames: string[], options: ts.CompilerOptions): void {
    var host = ts.createCompilerHost(options);
    var program = ts.createProgram(filenames, options, host);
    var checker = ts.createTypeChecker(program, /*produceDiagnostics*/ true);
    var result = checker.emitFiles();

    var allDiagnostics = program.getDiagnostics()
        .concat(checker.getDiagnostics())
        .concat(result.diagnostics);

    allDiagnostics.forEach(diagnostic => {
        var lineChar = diagnostic.file.getLineAndCharacterFromPosition(diagnostic.start);
        console.log(`${diagnostic.file.filename} (${lineChar.line},${lineChar.character}): ${diagnostic.messageText}`);
    });

    console.log(`Process exiting with code '${result.emitResultStatus}'.`);
    process.exit(result.emitResultStatus);
}

function minimize(node: ts.Node): string{
    //var code = ts.forEachChild(node,minimize);
    var children = node.getChildren();
    var code = "";
    for (var i = 0; i < children.length;i++) {
        code += minimize(children[i]) +",";
    }
    //code = code.slice(0, -2);
    //console.log(node);
    switch (node.kind) {

    }
    //console.log(node.kind);
    //console.log(ts.SyntaxKind.SourceFile);
    //console.log(JSON.stringify(ts.SyntaxKind));
    return code+"->"+node.kind.toString();
}
export function minimizeCompiler(filenames: string[], options: ts.CompilerOptions) : string {
    var host = ts.createCompilerHost(options);
    var program = ts.createProgram(filenames, options, host);
    return minimize(program.getSourceFiles()[0]);
}


main();

console.log(minimizeCompiler(process.argv.slice(2), {
    noEmitOnError: true, noImplicitAny: true,
    target: ts.ScriptTarget.ES5, module: ts.ModuleKind.CommonJS
}));
