"use strict";

const error = document.getElementById("uv-error");
const errorCode = document.getElementById("uv-error-code");
const connection = new BareMux.BareMuxConnection("/baremux/worker.js");

async function loadCineby() {
        try {
                await registerSW();
        } catch (err) {
                error.textContent = "Failed to register service worker.";
                errorCode.textContent = err.toString();
                throw err;
        }

        const url = "https://www.cineby.sc";

        let frame = document.getElementById("uv-frame");
        frame.style.display = "block";
        let wispUrl =
                (location.protocol === "https:" ? "wss" : "ws") +
                "://" +
                location.host +
                "/wisp/";
        if ((await connection.getTransport()) !== "/epoxy/index.mjs") {
                await connection.setTransport("/epoxy/index.mjs", [
                        { wisp: wispUrl },
                ]);
        }
        frame.src = __uv$config.prefix + __uv$config.encodeUrl(url);
}

window.addEventListener("load", loadCineby);
