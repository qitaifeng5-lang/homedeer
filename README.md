# Homedeer Services

A responsive, English demonstration website for a fictional Ontario home service company. Built with plain HTML, CSS and JavaScript; no dependencies or build step.

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
- `script.js`: mobile menu and demo form validation.

## Before real use

This is a fictional company. The email uses the reserved `.example` domain and cannot receive mail. Ontario coverage is explicitly unconfirmed; replace it with accurate information. No reviews, prices, street addresses or phone numbers are asserted.

The contact form is a demo. It does not send or save entries. It checks required fields, email format, a nonblank name and a message of 10–2,000 characters. Use sample details only. Before accepting enquiries, connect a secure HTTPS backend, add server-side validation and abuse protection, establish appropriate privacy and retention practices, and update the demo notices only after end-to-end verification. Never put credentials in frontend JavaScript.

Navigation remains available without JavaScript. Form submission is disabled without JavaScript.

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

GitHub Pages serves static files only: the contact form remains a demo and the `.example` email remains a placeholder. Publishing a Codex environment does not automatically deploy GitHub Pages.
