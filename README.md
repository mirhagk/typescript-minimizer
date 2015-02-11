# typescript-minimizer
A project that makes use of the typescript compiler API to compile to javascript, except it minimizes as well.

## Status

This project is still in the prototyping stage, and does not produce any useful output

## Goal

To run a series of optimizations, akin to google's closure compiler, but with typescript rules in mind.

This will allow it to do the following additional optimizations:

- Expanded constant propogation - Since (some) types are known at compile time, 
the results of more expressions can be known at compile time
- Known public API - The set of external facing methods and classes are known at compile time 
(marked with the export keyword) so all public facing APIs can remain constant
- Safe aggressive renaming - Thanks to the above it's possibly to aggressive rename anything that isn't publicly facing.
- Safe aggressive inlining - it's possible to inline more functions
- Dead Code Opimizations - More code is known to be dead to the TypeScript compiler.
