if (typeof window !== 'undefined') {
    /* TODO: Update here */
    const templates = [
        "test"
    ];

    function createRow(template) {
        let row = document.createElement('tr');

        let templateName = createCell(template);
        let templateHtml = createCellWithLink(`/templates/${template}/index.html`);
        // let testHtml = createCellWithLink(`/templates/${template}/index.test.html`)

        // row.append(templateName, templateHtml, testHtml)
        row.append(templateName, templateHtml);

        return row;
    }

    function createCell(name) {
        let cell = document.createElement('td');

        cell.textContent = name;

        return cell;
    }

    function createCellWithLink(link) {
        let cell = document.createElement('td');

        let svg = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
              <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
            </svg>
        `;
        let a = document.createElement('a');
        a.href = link;
        a.innerHTML = svg;

        cell.append(a);

        return cell;
    }

    templates.forEach((t) => {
        let list = document.getElementById('list');

        const row = createRow(t);

        list.append(row);
    });
}

function updateTheme(mediaMatch) {
    if (mediaMatch.matches) {
        document.body.setAttribute("data-bs-theme", "dark");
    } else {
        document.body.setAttribute("data-bs-theme", "light");
    }
}

// Set the theme based on the user's preference
if (window.matchMedia) {
    updateTheme(window.matchMedia('(prefers-color-scheme: dark)'));

    window.matchMedia('(prefers-color-scheme: dark)').addListener(updateTheme);
}
