const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  // const browser = await puppeteer.launch({headless:false}); -> debugging, if you want to see chromium opening.
  const browser = await puppeteer.launch(); //open browser
  const page = await browser.newPage();

  //go to the page:
  await page.goto('https://duneanalytics.com/queries/12783/25578');
  // await page.waitForTimeout(1000); -> use this if the website isn't loading fast enough.
  await page.waitForSelector('#tabs--33--tab--1'); 
  await page.click('#tabs--33--tab--1');

  /* Skipping buttons (middle) */
  for (var o = 1;o<=2501;o++){
    await page.waitForSelector('.visual_result__1dlSK > ul > li:nth-child(6) > button');
    await page.click('.visual_result__1dlSK > ul > li:nth-child(6) > button');
    /* In case some pages aren't necessary, just skip the page: Just Clicking*/
  }

  // Starting from end:
  // await page.waitForSelector('.visual_result__1dlSK > ul > li:nth-child(7)');
  // await page.click('.visual_result__1dlSK > ul > li:nth-child(7) > button');

  let prevdate = "000000"; //2943 5385 then starting backwards, from 8017
  for (var i=1;i<500;i++){ /* Further corrections:  from 2500 until 3000 (missing from 24th until 31st december*/
    
    await page.waitForSelector('tbody > tr > td > div');
    let gettingit = await page.$eval('tbody > tr:nth-child(3) > td:nth-child(1) > div', el=>el.textContent);
    if (gettingit!= prevdate){
      prevdate = await page.$eval('tbody > tr:nth-child(3) > td:nth-child(1) > div', el => el.innerText);
      console.log(prevdate);
      let amount = await page.$$eval('tbody > tr:nth-child(3) > td > div', el => el.map(el=>el.textContent));
      //console.log(amount)

      /*Append to the file*/
      var stream = await fs.createWriteStream("Database.txt", { 'flags': 'a' });
      stream.once('open', function (fd) {
        stream.write(amount + "\r\n");
      });
      // console.log("page: " + await page.$$eval('.visual_result__1dlSK > ul > li:nth-child(5)', el => el.map(el=>el.textContent))+ "\n")
    }
    // Moving forward:
    await page.waitForSelector('.visual_result__1dlSK > ul > li:nth-child(6)');
    await page.click('.visual_result__1dlSK > ul > li:nth-child(6) > button');

    // Moving backwards:
    // await page.waitForSelector('.visual_result__1dlSK > ul > li:nth-child(4)');
    // await page.click('.visual_result__1dlSK > ul > li:nth-child(4) > button');
    /* Needs to be done: Understanding on how the tab link changes and populate the database.
    */
  } 
  
  await browser.close();
})();