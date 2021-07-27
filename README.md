# DuneAnalytics-webscrapping
I didn't find an option to download the database about the amount of ETH2 staked, so I used puppeteer and node to retrieve the data from a query of the user @hagaetc 

# Description 
Wasn't able to check what was the issue with the long duration of the function. After some thousands of pages, chromium would stop working. Because of that, in order to retrieve the data:
  * I started from page 1 and run until chromium crashed.
  * Then I skipped the pages until the page where it crashed and started from there until it crashed again.
  * Started from the last page and copy the data until the page where it crashed (in the middle).

# Tools needed:
  * Nodejs: https://nodejs.org.
  * Puppeteer: https://pptr.dev.

# Parts

##  Moving Forward.
  * from first page until the last.

##  Skipping Pages/Buttons.
  * Skipping the pages until you end in the one it crashed.

##  Moving Backwards
  * Use it after it crashes in the middle. You can start from the last page and move backwards to retrieve the data.

## If statement
  * Used to avoid repetition between data retrieved on the same date.

## page.waitForSelector()
  * Use it so node will wait until it finds the field you are searching for.
   * '>' indicates a child-parent relationship (a > img = an image inside a link).
   * '.class' you use a period if you are searching for the class instead of the html element.
   * '#id' hashtag indicates the field is an id (if < Div id="abc123">...< /Div >, then use 'page.waitForSelector('#abc123');' for example.

## page.$eval('element being searched', el=>el.textContent)
 * Will return the text or the elements inside.
  * can return the HTML or the text inside the element.

## page.click()
 * Will click on the element if it finds it.
