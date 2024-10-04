import type { KVNamespace } from "@cloudflare/workers-types/experimental/index.js";

/**
 * @module Worker
 *
 */
export default interface Interface {
	Token: KVNamespace;
	HTML: KVNamespace;
	CSS: KVNamespace;
	TypeScript: KVNamespace;
}
