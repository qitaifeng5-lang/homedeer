# Homedeer Services

A responsive, English website for Homedeer Services in Ontario. Built with plain HTML, CSS and JavaScript; no dependencies or build step.

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
- `script.js`: mobile menu, form validation and Formspree submission.

## Connect customer enquiries with Formspree

GitHub Pages cannot process email itself. Formspree provides a hosted form endpoint and a free tier with usage limits; check its current pricing at https://formspree.io/plans before selecting a plan.

1. Register or sign in at https://formspree.io/ and create a form in the dashboard.
2. Set and verify the recipient email using Formspree’s instructions. Do not place account passwords or API keys in this repository.
3. Copy the endpoint shown by the dashboard (`https://formspree.io/f/` followed by your form ID).
4. Set the contact form’s `data-endpoint=""` in `index.html` to that exact URL. Do not invent an ID. Until this is configured, the submit button is disabled and an unavailable notice is shown.
5. Push to `main`, wait for GitHub Pages deployment, then submit a clearly labelled test enquiry from the published HTTPS site. Confirm both the Formspree dashboard entry and receipt at the verified inbox (including spam). If you enable domain restrictions, allow `qitaifeng5-lang.github.io` according to the dashboard instructions.
6. Review the service’s spam protection, account limits and privacy settings before accepting enquiries.

The form retains name, email, service and message fields. It shows “Thank you! We will contact you soon.” only after an HTTP success response with Formspree’s `ok: true` acknowledgement. This confirms service acceptance, not inbox delivery. Failed or uncertain requests retain entries and show an error. Submissions are disabled without JavaScript. The configured Homedeer Contact endpoint is `https://formspree.io/f/xvkzdqwq`. Live inbox delivery still needs to be verified with a test submission from the published site.

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

GitHub Pages serves static files only: customer enquiries require the configured Formspree endpoint described above. Publishing a Codex environment does not automatically deploy GitHub Pages.

## Customer experience and search settings

Service cards explain the property details to include in an enquiry. Quote links lead directly to the existing Formspree form. How It Works describes the enquiry, quote and scheduling stages; the native HTML FAQ works without JavaScript. Specific towns, response times, ice treatment and leaf disposal are not guaranteed and need business confirmation.

Mobile controls use at least 44px navigation targets and 16px form text to avoid focus zoom on iOS. The page uses system fonts, local CSS/JavaScript and inline SVG; there are no external font, image or UI-library downloads on initial load. No measured Lighthouse score is claimed.

Search metadata includes a descriptive title, description, canonical URL, Open Graph tags and Organization JSON-LD without fabricated addresses, reviews or credentials. `sitemap.xml` lists the GitHub Pages URL. If a custom domain is introduced, update the canonical, Open Graph URL, structured-data URL and sitemap together. Submit the sitemap URL to Google Search Console after verifying ownership. A project site cannot control the account-wide `/robots.txt`; no project-path robots file is required. These settings do not guarantee indexing or ranking.

Validation for this update: Chromium checked widths 320, 390, 760, 768, 1024 and 1440px without horizontal overflow; mobile navigation, FAQ toggles, quote anchor links, no-JavaScript navigation/FAQ and the Formspree form were exercised. Browser request interception checked all four fields, failed responses retaining entries, and acknowledged success resetting the form. No real customer messages were sent. HTML targets, JSON-LD, sitemap consistency, HTTP assets and JavaScript syntax also passed.
