#!/usr/bin/env python3
"""Serve one Lunar Paradox experience on loopback with no internet dependency."""
import argparse
from pathlib import Path
from lunar_backend import serve


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("platform", choices=("syzygy", "gravity", "astrolabe"))
    parser.add_argument("--no-browser", action="store_true")
    parser.add_argument("--port", type=int, default=0)
    args = parser.parse_args()
    root = Path(__file__).resolve().parent / ("lunar-" + args.platform)
    if not (root / "index.html").is_file():
        parser.error(f"Missing platform: {root}")
    serve(root, args.platform, Path(__file__).resolve().parent / '.lunar-data', args.port, args.no_browser)


if __name__ == "__main__":
    main()
