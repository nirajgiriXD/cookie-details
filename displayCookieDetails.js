const remoteFileURL =
    "https://raw.githubusercontent.com/nirajgiriXD/cookie-details/main/cookie-details-object.json";
const cookieDetailsContainerId = "cookie-details-container";

async function fetchCookieDetails() {
    res = await fetch(remoteFileURL);
    const cookieDetails = await res.json();
    return cookieDetails;
}

async function getCookieDetailsHTML() {
    const htmlElement = document.createElement("div");
    htmlElement.id = cookieDetailsContainerId;

    let outputHTML = "";
    const cookieObj = await fetchCookieDetails();

    const table = document.querySelector(
        "div.h-full.w-full.overflow-auto.min-w-\\[70rem\\] > div.h-full.flex.flex-col"
    );

    if (table) {
        const rows = table.querySelectorAll(
            "div.outline-0.flex.divide-x.divide-american-silver"
        );

        const page = document.querySelector(
            "li.truncate.pl-6.cursor-pointer.flex.items-center.bg-royal-blue.text-white:nth-child(2)"
        )?.innerText;

        if (rows) {
            outputHTML += `<div class="border-t border-gray-400">`;
            rows.forEach((row) => {
                const columns = row.querySelectorAll("div");
                const cookieName = columns[0].innerText;
                const cookieDomain = columns[2].innerText;
                const cookieScope = columns[10].innerText;
                if (cookieScope === "Third Party") {
                    const cookieDetails = cookieObj[cookieName][cookieDomain];

                    outputHTML += `<div class="p-5">`;
                    outputHTML += `<div class="max-w-md mx-auto bg-white rounded p-4 shadow">`;
                    outputHTML += `<ul class="list-inside space-y-2">`;
                    outputHTML += `
                        <li class="p-2">
                        <h2 class="border-b border-gray-200 p-2">
                            ${cookieName} (<span class="text-royal-blue">${cookieDomain}</span>)
                        </h2>
                    `;
                    if (cookieDetails) {
                        cookieDetails.forEach((cookieDetail) => {
                            outputHTML += `
                                <ul class="list-inside ml-4 p-3">
                                    <li>
                                        <strong>Category: </strong>
                                        ${cookieDetail["Category"]}
                                    </li>
                                    <li>
                                        <strong>Purpose: </strong>
                                        ${cookieDetail["Purpose"]}
                                    </li>
                                    <li>
                                        <strong>Impact: </strong>
                                        ${cookieDetail["Impact"]}
                                    </li>
                                    <li>
                                        <strong>Website: </strong>
                                        <a href="${page}" target="_blank" class="text-royal-blue">${page}</a>
                                    </li>
                                </ul>
                            `;
                        });
                    } else {
                        outputHTML += `
                            <ul class="list-inside ml-4 p-3">
                                <li>
                                    <strong>Category: </strong>
                                    Nothing found in database.
                                </li>
                                <li>
                                    <strong>Purpose: </strong>
                                    Nothing found in database.
                                </li>
                                <li>
                                    <strong>Impact: </strong>
                                    Nothing found in database.
                                </li>
                                <li>
                                    <strong>Website: </strong>
                                    <a href="${page}" target="_blank" class="text-royal-blue">${page}</a>
                                </li>
                            </ul>
                        `;
                    }
                    outputHTML += `</ul>`;
                    outputHTML += `</div>`;
                    outputHTML += `</div>`;
                }
            });
            outputHTML += `</li>`;
            outputHTML += `</div>`;
        }
    }

    htmlElement.innerHTML = outputHTML;
    return htmlElement;
}

async function displayCookieDetails() {
    const previousCookieDetailContainer = document.getElementById(
        cookieDetailsContainerId
    );

    if (previousCookieDetailContainer) {
        previousCookieDetailContainer.remove();
    }

    const html = await getCookieDetailsHTML();
    const body = document.querySelector("body");
    body.appendChild(html);
}

// await displayCookieDetails();
