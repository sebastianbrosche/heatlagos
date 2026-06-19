#!/usr/bin/env python3
"""Meta (Facebook/Instagram) Graph API helper.

Reads META_APP_ID / META_APP_SECRET from the environment. A long-lived Page
access token (once we have it) is read from META_PAGE_TOKEN.

  python3 scripts/meta.py apptoken            # app access token (app-level only)
  python3 scripts/meta.py call <GET-url>      # call with the Page token

NOTE: reaching graph.facebook.com requires the Claude Code environment's
network access to allow it (Trusted policy blocks it; use Full or an allowlist
that includes graph.facebook.com / graph.instagram.com).
"""
import json
import os
import sys
import urllib.parse
import urllib.request

BASE = "https://graph.facebook.com/v21.0"


def app_token() -> str:
    app_id = os.environ.get("META_APP_ID")
    secret = os.environ.get("META_APP_SECRET")
    if not (app_id and secret):
        sys.exit("Missing META_APP_ID / META_APP_SECRET")
    url = "https://graph.facebook.com/oauth/access_token?" + urllib.parse.urlencode({
        "client_id": app_id, "client_secret": secret, "grant_type": "client_credentials"})
    with urllib.request.urlopen(url) as r:
        return json.load(r)["access_token"]


def call(url: str):
    tok = os.environ.get("META_PAGE_TOKEN") or app_token()
    sep = "&" if "?" in url else "?"
    full = url + sep + urllib.parse.urlencode({"access_token": tok})
    with urllib.request.urlopen(full) as r:
        print(r.read().decode())


if __name__ == "__main__":
    cmd = sys.argv[1]
    if cmd == "apptoken":
        print(app_token())
    elif cmd == "call":
        call(sys.argv[2])
