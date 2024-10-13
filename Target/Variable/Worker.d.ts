import type Type from "../Interface/Worker.js";

/**
 * @module Worker
 *
 */
declare const _default: Type;
export default _default;
export declare const Access: import("@common/now-playing_cards/Target/Interface/Access.js").default;
export declare const Put: import("@common/now-playing_cards/Target/Interface/Put.js").default;
export declare const WebSocketPair: new () => {
	0: import("@cloudflare/workers-types/experimental/index.js").WebSocket;
	1: import("@cloudflare/workers-types/experimental/index.js").WebSocket;
};
