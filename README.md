# Homedeer — Portfolio Demo

**Portfolio Demo — Not a Real Business.** This website was created to showcase web design skills. Snow removal, leaf cleanup and Markham, Ontario, Canada are illustrative examples only. No services, quotes, bookings or business contact are offered.

## Run locally

Open `index.html` in your browser, or use a local server:

```sh
cd /workspace/homedeer
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your own local browser. Stop the server with Ctrl+C. On another computer, replace the directory with your checkout location.

## Files

- `index.html`: content, accessible navigation and inline SVG illustrations.
- `styles.css`: colours, layout, mobile breakpoints and reduced-motion support.
- `script.js`: mobile navigation and local-only demo validation.

## Local-only demo form

The previous Formspree integration has been removed from the current website. The demo validates sample name, email, service and message entries locally. It does not use fetch, send mail or save entries to persistent storage. Use sample data only. The confirmation explicitly states that nothing was sent or saved.

The demo button is not a submit button, the form intercepts submission, and a Content Security Policy blocks form actions and scripted network connections. All controls remain disabled without JavaScript. The website cannot disable a previously created Formspree account or endpoint; manage that separately in the Formspree dashboard if no longer needed. Old Git commits retain historical code.

## Preview troubleshooting / 预览故障排查

The cloud machine and your own computer are different hosts. A successful cloud server does not create a public preview URL. This onboarding chat does not provide a web preview or port-forwarding tool.

云端服务器与自己的电脑不是同一台机器。在自己电脑打开 localhost 不会连接云端服务器。

- **在自己电脑打开：** 下载网站文件到同一个文件夹，直接双击 `index.html`。此网站不需要依赖或构建。
- **在自己电脑运行服务器：** 安装 Python 3，在网站文件夹运行 `python3 serve.py`（Windows 也可使用 `py serve.py`）。然后在自己的浏览器访问 `http://localhost:8000`；如果终端提示使用了备用端口，请相应改为 8080 或 8081。保持终端运行。
- **在云端启动：** 运行 `python3 /workspace/homedeer/serve.py`。脚本固定使用网站目录，并在端口占用时尝试 8080、8081。若所用平台提供端口转发功能，转发终端实际显示的端口，再使用平台生成的访问地址。此聊天无法创建或确认该地址。
- **云端内部检查：** `curl -I http://127.0.0.1:8000/`。HTTP 200 表示云端内部访问正常，不代表外部预览已配置。

The Python server is for development only. Chromium is not required to run this site; it is only needed for optional browser automation.

## Deploy free with GitHub Pages

For GitHub Free, use a public repository. In `qitaifeng5-lang/homedeer`, open **Settings → Pages**. Under **Build and deployment**, select **Deploy from a branch**, choose **main** and **/ (root)**, then **Save**. No build command is needed.

Wait for the Pages deployment in the **Actions** tab to succeed. The expected project URL is `https://qitaifeng5-lang.github.io/homedeer/`; Settings → Pages shows the confirmed deployment URL. If the first visit returns 404, check the workflow status and allow a few minutes after successful deployment. Subsequent pushes to `main` deploy automatically.

## Search metadata and validation

The title, descriptions and sharing metadata identify the project as a portfolio demo. JSON-LD describes a WebSite, not a real Organization or service area. Canonical and sitemap retain the existing project URL. No physical address is published.

The project retains the existing green, white and dark gray design, inline SVG artwork, responsive layouts, native FAQ and reduced-motion support. No external fonts or UI libraries are needed.

## Browser checks

With Playwright available and Chromium installed, run `node tests/portfolio.test.cjs` from the repository root. Set `CHROMIUM_PATH` if Chromium is not at `/usr/bin/chromium`. Test dependencies are optional and not needed to run the website.

Verified: six screen widths (320–1440px), portfolio notice, mobile menu, FAQ, demo links, required/email/length/whitespace validation, no submission requests or browser storage during interaction, Enter/programmatic submission prevention, JavaScript-disabled controls and navigation, and no JavaScript errors. HTML references, portfolio metadata, JSON-LD and sitemap consistency also passed.
