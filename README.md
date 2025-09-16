# X Uncensored
<p align="center">
	<img alt="X Uncensored logo" src="logo.svg" width="320px">
</p>  

### Description
Browser extension for Chrome, Firefox, Edge, Opera, and Safari that bypasses X's ([x.com](https://x.com)) identity verification requirement that's needed to view certain types of content on that platform.

This extension is intended to be used by those who are 18+ but are unable to verify their identity and/or age on X for whatever reason (e.g. privacy concerns, technical limitations, etc).

### Installing
This extension can be installed on **Chrome** by downloading its [newest non-Safari release](https://github.com/NicolasFlamel1/X-Uncensored/releases), going to [Chrome's extensions page](chrome://extensions) (`chrome://extensions`) in your web browser, enabling developer mode there, and dragging and dropping the file you downloaded onto that page.

This extension can be installed on **Firefox** by downloading its [newest non-Safari release](https://github.com/NicolasFlamel1/X-Uncensored/releases), going to [Firefox's debugging page](about:debugging#/runtime/this-firefox) (`about:debugging#/runtime/this-firefox`) in your web browser, and choosing to load the file you downloaded as a temporary add-on.

This extension can be installed on **Edge** by downloading its [newest non-Safari release](https://github.com/NicolasFlamel1/X-Uncensored/releases), going to [Edge's extensions page](edge://extensions) (`edge://extensions`) in your web browser, enabling developer mode there, and dragging and dropping the file you downloaded onto that page.

This extension can be installed on **Opera** by downloading its [newest non-Safari release](https://github.com/NicolasFlamel1/X-Uncensored/releases), going to [Opera's extensions page](opera://extensions) (`opera://extensions`) in your web browser, enabling developer mode there, and dragging and dropping the file you downloaded onto that page.

This extension can be installed on **Safari** by downloading its [newest Safari release](https://github.com/NicolasFlamel1/X-Uncensored/releases), installing it, and enabling Safari to use unsigned extensions.

### Using
Once this extension is installed and enabled, you can browse [x.com](https://x.com) and view content there that you weren't previously able to view due to X's identity verification requirement.

### Building
If you're using Windows then you can run the following command in a command prompt from the root of this project after updating your PowerShell's Archive module by running the command `powershell Install-Module Microsoft.PowerShell.Archive -MinimumVersion 1.2.3.0 -Repository PSGallery -Force` with admin rights to build this extension for non-Safari web browsers. This will create the browser extension `X Uncensored.zip`.
```
"./build.bat"
```
If you're using macOS or Linux then you can run the following command in a terminal from the root of this project to build this extension for non-Safari web browsers. This will create the browser extension `X Uncensored.zip`.
```
"./build.sh"
```
If you're using macOS then you can use Xcode to compile the `X Uncensored.xcodeproj` project to build this extension for Safari.
