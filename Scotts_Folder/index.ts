
// Bun v1.1.27+ required
const serve =Bun.serve({
    port:5080,
    async fetch(req) {
        const url = new URL(req.url);
        if (url.pathname === "/game.js"){
            const gamejs = "./game.js";
            const gamefile = Bun.file(gamejs);
            console.log("game?");
            return new Response(gamefile); 
        } 
        const filepath = url;
        const loaded_file = Bun.file(filepath);
        return new Response(loaded_file);

        console.log("new request?");
        const path = "./index.html";
        const file = Bun.file(path);
        return new Response(file);
    }
});

  console.log("Hello listening at? : " + serve.port);