var a = async (...[e = null, t = 200]) =>
	new s(JSON.stringify(e), {
		status: t,
		headers: { "Content-Type": "application/json;charset=utf-8" },
	});
const { Response: s } = await import(
	"@cloudflare/workers-types/experimental/index.js"
);
export { s as Response, a as default };
