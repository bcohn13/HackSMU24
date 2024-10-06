// Bun v1.1.27+ required
const serve = Bun.serve({
    port: 5080,
    async fetch(req) {
        const url = new URL(req.url);
        const filepath = url.pathname;
        //console.log("FILE PATH: " + filepath);

        if (filepath === "/") {
            const home = Bun.file("./index.html");
            return new Response(home);
        }

        try {
            const loaded_file = Bun.file("." + filepath);
            return new Response(loaded_file);
        } catch (error) {
            return new Response("File not found", { status: 404 });
        }
    }
});

console.log("Listening on localhost:" + serve.port);