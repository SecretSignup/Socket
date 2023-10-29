/**
 * @module Worker
 *
 */
export default interface Type {
    Token: KVNamespace;
    HTML: KVNamespace;
    CSS: KVNamespace;
    TypeScript: KVNamespace;
}
import type { KVNamespace } from "@cloudflare/workers-types/experimental/index.js";
