---
sidebar_position: 2
title: 安装 ComfyUI
description: 系统要求与三种安装方式（桌面版 / 便携版 / 手动安装）
---

# 安装 ComfyUI

## 先看硬件：你的电脑能跑吗？

ComfyUI 的计算主要发生在显卡上，显存（VRAM）是最关键的指标：

| 项目 | 最低建议 | 舒适建议 |
| ---- | -------- | -------- |
| 显卡 | NVIDIA / AMD 独显，4 GB 显存 | NVIDIA，8 GB 及以上显存 |
| 系统 | Windows 10+ / macOS 12+ / 主流 Linux | 同左 |
| 内存 | 8 GB | 16 GB 及以上 |
| 硬盘 | 10 GB 可用空间（不含模型） | SSD，预留 50 GB 以上放模型 |

:::note 显卡说明
NVIDIA 显卡兼容性最好；Apple Silicon（M 系列芯片） Mac 可直接用统一内存运行；AMD 显卡在 Windows 上建议搭配 DirectM 或 ZLUDA 方案，具体见官方文档。没有合适显卡时，也可以使用 Comfy 官方的云端服务，本站的拆解内容同样适用。
:::

## 方式一：官方桌面版（推荐新手）

1. 打开 [comfy.org/download](https://www.comfy.org/download)，下载对应系统的安装器；
2. 运行安装器，按向导选择模型存放目录后完成安装；
3. 启动 ComfyUI Desktop，首次启动会引导你下载默认模型，一路确认即可。

桌面版自带图形化的模型管理器与更新器，是目前最省心的方式。

## 方式二：Windows 便携版（免安装）

适合喜欢绿色软件、想自由控制目录的用户：

1. 从官网下载页获取 **Windows 便携包（7z 压缩包）**；
2. 用 7-Zip 解压到你想要的目录（路径中避免中文与空格更稳妥）；
3. 双击目录中的 `run_nvidia_gpu.bat`（N 卡）或对应的启动脚本；
4. 浏览器自动打开 `http://127.0.0.1:8188`，即进入 ComfyUI 界面。

更新时运行 `update` 脚本即可拉取最新版本。

## 方式三：手动安装（适合开发者）

对 Python 环境有掌控需求的用户可以手动部署：

```bash
# 1. 克隆仓库
git clone https://github.com/comfyanonymous/ComfyUI.git
cd ComfyUI

# 2. 建议先创建虚拟环境
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS / Linux

# 3. 安装 PyTorch（N 卡示例，按官网指引选择对应 CUDA 版本）
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu126

# 4. 安装依赖并启动
pip install -r requirements.txt
python main.py
```

启动后同样访问 `http://127.0.0.1:8188`。

## 常见安装问题

| 现象 | 处理思路 |
| ---- | -------- |
| 提示显存不足（out of memory） | 先把生成分辨率调小；ComfyUI 会按可用显存自动降级模式，旧显卡可查文档中的低显存启动参数 |
| 启动后浏览器没打开 | 手动访问 `http://127.0.0.1:8188` |
| 下载模型放到哪 | 桌面版在设置中指定的目录；便携/手动版在 ComfyUI 目录的 `models/` 下对应子文件夹（checkpoint 放 `models/checkpoints`） |
| 杀毒软件拦截启动脚本 | 将 ComfyUI 目录加入白名单 |

:::tip 装好后做什么
带着刚装好的环境进入下一篇[首次生成图像](/docs/first-generation)，六 个节点跑出你的第一张图。
:::
