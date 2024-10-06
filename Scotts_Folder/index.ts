
// Bun v1.1.27+ required
const serve =Bun.serve({
    port:5080,
    async fetch(req) {
      return new Response(await Bun.file("./index.html").bytes(), {
        headers: {
          "Content-Type": "text/html",
        },
      })
    },
});

  console.log("Hello listening at? : ");
  console.log(serve.port);