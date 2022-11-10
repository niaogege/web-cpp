const createScript = (src) => `<script type='module' src=${src}></script>`;

const createLink = (src) => `<link rel='stylesheet' href=${src}></link>`;

const generateHtml = (sripts, links) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    ${links.join("\n")}
    <title>This CPP + APP</title>
  </head>
  <body>
    <div id="root"></div>
    ${sripts.join("\n")}
  </body>
</html>
`;

module.exports = {
  createScript,
  createLink,
  generateHtml,
};
