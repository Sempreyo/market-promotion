import re, urllib.request, os

UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0 Safari/537.36"}
url = "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Montserrat:wght@600;700&display=swap"
css = urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=40).read().decode()
blocks = re.findall(r"/\*\s*([a-z\-]+)\s*\*/\s*@font-face\s*\{(.*?)\}", css, re.S)
os.makedirs("src/fonts/google", exist_ok=True)
rows = []
for subset, body in blocks:
    if subset not in ("cyrillic", "latin"):
        continue
    fam = re.search(r"font-family:\s*'([^']+)'", body).group(1)
    w = re.search(r"font-weight:\s*(\d+)", body).group(1)
    src = re.search(r"url\((https://[^)]+)\)", body).group(1)
    ur = re.search(r"unicode-range:\s*([^;]+);", body).group(1)
    name = "%s-%s-%s.woff2" % (fam.replace(" ", ""), w, subset)
    data = urllib.request.urlopen(urllib.request.Request(src, headers=UA), timeout=40).read()
    open(os.path.join("src/fonts/google", name), "wb").write(data)
    rows.append((fam, w, subset, name, len(data), ur))
    print(fam, w, subset, name, len(data))
with open("src/fonts/google/ranges.txt", "w") as f:
    for r in rows:
        f.write("|".join(str(x) for x in r) + "\n")