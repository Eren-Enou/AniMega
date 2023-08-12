const puppeteer = require('puppeteer');

(async () => {
  // Launch a headless browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    // Navigate to the Anime News Network website
    await page.goto('https://www.animenewsnetwork.com/');

    // Example: Extract article titles and thumbnail background-image URLs
const data = await page.evaluate(() => {
    const articles = [];
    const articleElements = document.querySelectorAll('.herald .wrap');
  
    for (const articleElement of articleElements) {
      const titleElement = articleElement.querySelector('h3 a');
      const thumbnailElement = articleElement.querySelector('.thumbnail');
  
      const title = titleElement ? titleElement.textContent.trim() : '';
      const thumbnailUrl = thumbnailElement ? getComputedStyle(thumbnailElement).backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, '$1') : '';
  
      articles.push({ title, thumbnailUrl });
    }
  
    return articles;
  });
  
  // Display the extracted data
  console.log('Article Data:');
  console.log(data);
  

    // Display the extracted article titles
    console.log('Article Titles:');
    console.log(articleTitles);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the browser instance
    await browser.close();
  }
})();
