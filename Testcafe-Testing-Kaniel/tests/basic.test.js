import { Selector, t , ClientFunction} from "testcafe";

fixture `Getting started with Testcafe`
.page(`https://devexpress.github.io/testcafe/example/`)
.beforeEach(async t => {
    await t.maximizeWindow();
})

.before(async t=> {

})

.after(async t => {

})

.afterEach(async t => {

})

export const getPageTitle = ClientFunction(() => document.title);
// export const getFaviconLocation = ClientFunction(() => document.head.attributes());


test("My first Testcafe test", async t => {
    const faviconSelector = Selector("head > link[rel='shortcut icon']");
    const faviconUrl = await faviconSelector.getAttribute("href");
    const developer_name_input = Selector("#developer-name");
    const submit_button = Selector("#submit-button");
    const articleText = Selector("h1#article-header");

    await t
        .typeText(developer_name_input, "Sergio")
        .click(submit_button)
        .expect(Selector(articleText).innerText).contains("Sergio");
    const pageName = await Selector("title").innerText;
    await t
        .wait(3000)
        .expect(faviconSelector.exists).ok() && expect(articleText).contains("Sergio");
    console.log(`The page ${pageName} contains a favicon here: ${faviconUrl}`);
    console.log(`The developer's name is ${(await articleText.innerText).slice(11, -1)}.`);
});

// test("Page title test using ClientFunction", async t => {
//     await t.wait(10000);
//     const titleOfThisPage = "TestCafe Example Page";
//     const titlePage = await getPageTitle();
//     await t.expect(getPageTitle()).eql(titleOfThisPage);
//     console.log(`The title of the page is: ${titlePage}`);
//     const faviconLocation = await getFaviconLocation();
//     console.log(faviconLocation);
// });

export const getFaviconLocation = ClientFunction(() => {
    const faviconElement = document.querySelector("link[rel='icon']") || document.querySelector("link[rel='shortcut icon']");
    return faviconElement ? faviconElement.getAttribute("href") : null;
});

test("Page title test using ClientFunction", async t => {
    const faviconLocation = await getFaviconLocation(); // Move the declaration here
    console.log(faviconLocation);

    const titleOfThisPage = "TestCafe Example Page";
    const titlePage = await getPageTitle();
    await t.expect(getPageTitle()).eql(titleOfThisPage);
    console.log(`The title of the page is: ${titlePage}`);
});

test("Testing getProperty of an HTML element", async t => {
    await t.navigateTo("https://ultimateqa.com/automation/fake-pricing-page/");
    await t.wait(3000);
    const titleOfThePage = "BLOG";

    //Get the About Selector
    var aboutButton = Selector("a").withExactText("About");

    //Get the url from the About selector
    var aboutUrl = await aboutButton.getAttribute("href");
    
    //Replace "about" por "blog"
    var updatedUrl = aboutUrl.replace("about", "blog");

    //Navigate to the updated url
    await t.navigateTo(String(updatedUrl));
    await t.wait(3000);

    await t.expect(Selector("div.et_pb_text_inner > h1").exists).ok({timeout: 20000});

    //Getting the title selector from the Blog page and store in a variable
    var pageBlogTitle = Selector("div.et_pb_text_inner > h1");
    await t.rightClick(pageBlogTitle);

    //Validate that the title on the blog page is equal to the stored value in the const titleOfThePage
    await t.expect(pageBlogTitle.innerText).eql(titleOfThePage);

    await t.wait(3000);

    console.log(`About url: ${aboutUrl}`);
    console.log(`New url: ${updatedUrl}`);
});