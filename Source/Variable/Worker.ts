/**
 * @module Worker
 *
 */
export default {
	fetch: async (
		...[{ headers }, Environment]: Parameters<Interface["fetch"]>
	) => {
		const Upgrade = headers.get("Upgrade");

		if (!Upgrade || Upgrade !== "websocket") {
			return new Response("Expected Upgrade: WebSocket", { status: 426 });
		}

		const WebSocket = new WebSocketPair();

		if (WebSocket[1]) {
			WebSocket[1].accept();

			WebSocket[1].addEventListener("message", async ({ data }) => {
				const Data: Data = new Map([]);

				try {
					const Message = (
						await import(
							"@common/now-playing_cards/Target/Function/Get.js"
						)
					).default(JSON.parse(data.toString()));

					Message.get("View") === "User" &&
					Message.get("From") === "Spotify"
						? Data.set("Session", {
								Name: (
									(await (
										await fetch(
											"https://api.spotify.com/v1/me",
											{
												headers: {
													"Content-Type":
														"application/x-www-form-urlencoded",
													Authorization: `Bearer ${await Access(
														Message.get("Key"),
														Message.get(
															"Identifier"
														),
														Environment.Token,
														"Token"
													)}`,
												},
											}
										)
									).json()) as Me
								).display_name,
							})
						: {};

					Message.get("View") === "Content"
						? Data.set(
								Message.get("From"),
								(await Access(
									Message.get("Key"),
									Message.get("Identifier"),
									Environment[
										Message.get("From") as
											| "HTML"
											| "CSS"
											| "TypeScript"
									],
									"Current"
								)) as Message
							)
						: {};

					// @TODO: When leaving persist content in a time-series-like format
					WebSocket[1].send(
						JSON.stringify({
							Original: Put(Message),
							Data: Put(Data),
						})
					);
				} catch (_Error) {
					console.log(_Error);
				}
			});
		}

		if (WebSocket[0]) {
			return new Response(null, {
				status: 101,
				webSocket: WebSocket[0],
			});
		}

		return new Response("Can't make a WebSocket.", { status: 404 });
	},
} satisfies Interface as Interface;

export const { default: Access } = await import(
	"@common/now-playing_cards/Target/Function/Access.js"
);

export const { default: Put } = await import(
	"@common/now-playing_cards/Target/Function/Put.js"
);

export const { WebSocketPair } = await import(
	"@cloudflare/workers-types/experimental/index.js"
);

import type Data from "@Interface/Data.js";
import type Me from "@Interface/Me.js";
import type Interface from "@Interface/Worker.js";
