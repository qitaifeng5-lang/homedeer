#!/usr/bin/env python3
"""Serve the existing site; use a fallback if the requested port is occupied."""
import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


def create_server(port):
    handler = partial(SimpleHTTPRequestHandler, directory=str(Path(__file__).resolve().parent))
    for candidate in dict.fromkeys([port, 8080, 8081]):
        try:
            return ThreadingHTTPServer(('0.0.0.0', candidate), handler)
        except OSError as error:
            if error.errno != 98:  # Linux: address already in use
                raise
            print(f'Port {candidate} is occupied; trying another port.', flush=True)
    raise SystemExit('All candidate ports are occupied. Choose another with --port NUMBER.')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--port', type=int, default=8000)
    args = parser.parse_args()
    if not 1 <= args.port <= 65535:
        parser.error('port must be between 1 and 65535')
    server = create_server(args.port)
    print(f'Homedeer is listening on 0.0.0.0:{server.server_port}', flush=True)
    print('Cloud: use your platform’s port forwarding, if available. Localhost on your computer does not reach this cloud machine.', flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
