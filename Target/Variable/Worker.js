var f = {
	fetch: async (...[{ headers: i }, s]) => {
		const r = i.get("Upgrade");
		if (!r || r !== "websocket")
			return new Response("Expected Upgrade: WebSocket", { status: 426 });
		const t = new c();
		return (
			t[1] &&
				(t[1].accept(),
				t[1].addEventListener("message", async ({ data: p }) => {
					const a = new Map([]);
					try {
						const e = (
							await import(
								"@common/now-playing_cards/Target/Function/Get.js"
							)
						).default(JSON.parse(p.toString()));
						e.get("View") === "User" &&
							e.get("From") === "Spotify" &&
							a.set("Session", {
								Name: (
									await (
										await fetch(
											"https://api.spotify.com/v1/me",
											{
												headers: {
													"Content-Type":
														"application/x-www-form-urlencoded",
													Authorization: `Bearer ${await o(
														e.get("Key"),
														e.get("Identifier"),
														s.Token,
														"Token",
													)}`,
												},
											},
										)
									).json()
								).display_name,
							}),
							e.get("View") === "Content" &&
								a.set(
									e.get("From"),
									await o(
										e.get("Key"),
										e.get("Identifier"),
										s[e.get("From")],
										"Current",
									),
								),
							t[1].send(
								JSON.stringify({ Original: n(e), Data: n(a) }),
							);
					} catch {}
				})),
			t[0]
				? new Response(null, { status: 101, webSocket: t[0] })
				: new Response("Can't make a WebSocket.", { status: 404 })
		);
	},
};
const { default: o } = await import(
		"@common/now-playing_cards/Target/Function/Access.js"
	),
	{ default: n } = await import(
		"@common/now-playing_cards/Target/Function/Put.js"
	),
	{ WebSocketPair: c } = await import(
		"@cloudflare/workers-types/experimental/index.js"
	);
export { o as Access, n as Put, c as WebSocketPair, f as default };
