# MIZU//KOKORO 2.0 静态部署包

这是已经构建好的纯静态版本。

本地预览：

```bash
python3 -m http.server 8080
```

然后访问终端给出的地址。也可将目录完整上传至任意静态站点服务。不要直接双击 `index.html`；ES Module 与浏览器安全策略可能阻止资源加载。

麦克风功能需要 HTTPS 或 localhost，并需要浏览器授权。推荐 WebGL2 和独立 GPU；性能不足时切换 MID / LOW。
