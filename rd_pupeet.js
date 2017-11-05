const puppeteer = require('puppeteer');









/*
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://fd8-courses.leclercdrive.fr/magasin-096201-Leulinghem/rayon-284371-Beurres-et-Cremes.aspx');
 
  // Get the "viewport" of the page, as reported by the page.
  const dimensions = await page.evaluate(() => {
    console.log("yep");
    return {
      width: document.getElementById["ulListeProduits"],
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio
    };
  });

  console.log('Dimensions:', dimensions);

  await browser.close();
})();
*/