async function runRemoteScript() {
    const response = await fetch("https://raw.githubusercontent.com/nirajgiriXD/cookie-details/main/cookie-details.js");
    const scriptContent = await response.text();
    const scriptElement = document.createElement("script");
    scriptElement.textContent = scriptContent;
    document.body.appendChild(scriptElement);
    await displayCookieDetails();
}

await runRemoteScript();
