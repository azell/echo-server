"use strict";

let http = require("http");

{
  let server = http.createServer((request, response) => {

    // start of new HTTP request
    let requestDataSlabList = [];

    // wire up request events
    request.on("data", (data) => {

      // add received data to buffer
      requestDataSlabList.push(data);
    });

    request.on("end", (data) => {

      // send response to client
      response.writeHead(
        200,
        { "Content-Type": "application/json" }
      );

      let headerItemList = [];

      for (let headerItem of Object.keys(request.headers).sort()) {
        headerItemList.push(`${headerItem}: ${request.headers[headerItem]}`);
      }

      let body = JSON.stringify({
        method: request.method.toUpperCase(),
        url: request.url,
        headers: headerItemList,
        data: requestDataSlabList.join("")
      });

      console.log(body);
      response.end(body);
    });
  });

  // exit on Ctrl-C
  process.on('SIGINT', function() {
    process.exit();
  });

  // start listening server
  server.listen(8080);
}
