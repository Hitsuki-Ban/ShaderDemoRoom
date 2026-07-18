#!/usr/bin/env python3
from __future__ import annotations

import contextlib
import http.server
import socket
import threading
import webbrowser
from pathlib import Path

HOST = "127.0.0.1"
START_PORT = 8765
ROOT = Path(__file__).resolve().parent / "dist"


def free_port(start: int = START_PORT) -> int:
    for port in range(start, start + 30):
        with contextlib.closing(socket.socket()) as sock:
            try:
                sock.bind((HOST, port))
            except OSError:
                continue
            return port
    raise RuntimeError("No available local port found")


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self) -> None:
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def log_message(self, format: str, *args: object) -> None:
        print(f"[archive] {format % args}")


def main() -> None:
    if not (ROOT / "index.html").is_file():
        raise RuntimeError("Missing dist/index.html; run `pnpm build` first")

    port = free_port()
    server = http.server.ThreadingHTTPServer((HOST, port), Handler)
    url = f"http://{HOST}:{port}/"
    threading.Timer(0.7, lambda: webbrowser.open(url)).start()
    print(f"Archive of the Ninth Tide: {url}")
    print("Press Ctrl+C to stop the local server.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
