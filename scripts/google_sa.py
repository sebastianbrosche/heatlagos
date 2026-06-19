#!/usr/bin/env python3
"""Headless Google service-account auth, signed via the openssl CLI.

Reads the service-account JSON from the GOOGLE_SA_KEY environment variable
(set in the Claude Code environment, never committed to git).

  python3 scripts/google_sa.py token "<space-separated scopes>"
  python3 scripts/google_sa.py call  "<scope>" <GET-url>

Used for resources SHARED WITH the service account:
  claudecode@kimiclaw-bot-1.iam.gserviceaccount.com
e.g. Search Console, GA4, and Drive/Docs files shared with that address.
"""
import base64
import json
import os
import subprocess
import sys
import tempfile
import urllib.parse
import urllib.request


def b64url(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).rstrip(b"=").decode()


def sa():
    raw = os.environ.get("GOOGLE_SA_KEY")
    if not raw:
        sys.exit("GOOGLE_SA_KEY env var is not set")
    return json.loads(raw)


def access_token(scope: str) -> str:
    info = sa()
    with tempfile.NamedTemporaryFile("w", suffix=".pem", delete=False) as f:
        f.write(info["private_key"])
        key_path = f.name
    try:
        import time
        now = int(time.time())
        header = {"alg": "RS256", "typ": "JWT"}
        claims = {
            "iss": info["client_email"],
            "scope": scope,
            "aud": info["token_uri"],
            "iat": now,
            "exp": now + 3600,
        }
        signing_input = b64url(json.dumps(header).encode()) + "." + b64url(json.dumps(claims).encode())
        sig = subprocess.run(
            ["openssl", "dgst", "-sha256", "-sign", key_path],
            input=signing_input.encode(), capture_output=True, check=True,
        ).stdout
        assertion = signing_input + "." + b64url(sig)
    finally:
        os.unlink(key_path)
    body = urllib.parse.urlencode({
        "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
        "assertion": assertion,
    }).encode()
    req = urllib.request.Request(info["token_uri"], data=body)
    with urllib.request.urlopen(req) as r:
        return json.load(r)["access_token"]


def call(scope: str, url: str):
    tok = access_token(scope)
    req = urllib.request.Request(url, headers={"Authorization": "Bearer " + tok})
    with urllib.request.urlopen(req) as r:
        print(r.read().decode())


if __name__ == "__main__":
    cmd = sys.argv[1]
    if cmd == "token":
        print(access_token(sys.argv[2]))
    elif cmd == "call":
        call(sys.argv[2], sys.argv[3])
