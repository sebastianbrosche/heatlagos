#!/usr/bin/env python3
"""Headless Google user-OAuth auth (Gmail, Photos) via a stored refresh token.

Reads the OAuth desktop client from GOOGLE_OAUTH_CLIENT_ID / _SECRET and the
refresh token from the env var named on the command line. All values live in
the Claude Code environment, never in git.

  python3 scripts/google_user.py token GMAIL_REFRESH_TOKEN
  python3 scripts/google_user.py call  GMAIL_REFRESH_TOKEN <GET-url>

Refresh tokens currently in use:
  GMAIL_REFRESH_TOKEN   -> stine.hegre@gmail.com, scope https://mail.google.com/
  PHOTOS_REFRESH_TOKEN  -> Photos Library (read-only; Google 2025 limits apply)
"""
import json
import os
import sys
import urllib.parse
import urllib.request

TOKEN_URI = "https://oauth2.googleapis.com/token"


def access_token(refresh_env: str) -> str:
    cid = os.environ.get("GOOGLE_OAUTH_CLIENT_ID")
    secret = os.environ.get("GOOGLE_OAUTH_CLIENT_SECRET")
    refresh = os.environ.get(refresh_env)
    if not (cid and secret and refresh):
        sys.exit(f"Missing GOOGLE_OAUTH_CLIENT_ID/_SECRET or {refresh_env}")
    body = urllib.parse.urlencode({
        "client_id": cid,
        "client_secret": secret,
        "refresh_token": refresh,
        "grant_type": "refresh_token",
    }).encode()
    req = urllib.request.Request(TOKEN_URI, data=body)
    with urllib.request.urlopen(req) as r:
        return json.load(r)["access_token"]


def call(refresh_env: str, url: str):
    tok = access_token(refresh_env)
    req = urllib.request.Request(url, headers={"Authorization": "Bearer " + tok})
    with urllib.request.urlopen(req) as r:
        print(r.read().decode())


if __name__ == "__main__":
    cmd = sys.argv[1]
    if cmd == "token":
        print(access_token(sys.argv[2]))
    elif cmd == "call":
        call(sys.argv[2], sys.argv[3])
