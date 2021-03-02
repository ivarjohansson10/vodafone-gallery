Vodafone Test Overview

Create a JavaScript App to render all the phones described in /vodafonephones/api/phones.json.

The app should:
• Display all phones in a gallery layout.
• Show details of an individual phone when it is selected.
• It should contain two routes:
o Gallery route.
o Phone details route.

Expected App behaviour

Gallery route
• Phones rendered in a Gallery layout.
• A max of nine phones should be rendered at a time. Pagination should be used to display
any more phones.
• Each phone gallery item should display:
o A combined phone image of the front and back of phone which should be
rendered at 135px x 160px.
o A phone name
o An initial phone price.
o An initial plan and it's cost per month.
o If all variants of a phone are out of stock the phone should show as out of stock.
o A user should be able to filter the phones. E.g. filter by price, brand, o/s etc.
o A user should be able to sort the phones.
o Clicking a phone will trigger the Phone details route.

Phone details route
• Contains more detailed information about a phone.
• Usersshould be able to navigate between a phone details route and the gallery route.
• The phone details page should be broken into three sections

o Top section
§ Phone name
§ Should contain a main phone image but should also allow a user to see
other images of the phone.
§ All available phone colours and capacities (e.g. 32GB, 64Gb etc.) should
be rendered here.
§ Selecting a different phone colour will update all phone imagesto the
correct colour.
§ Selecting a different phone capacity will update the phone pricing
rendered in the middle section.
§ A summary about the key headline features of the phone should be
rendered here.
§ If a phone variant is out of stock then the colour and capacity should
have an X through it.

o Middle section
§ Should show how much the phone costs on each of our monthly tariffs
i.e. the cost of phone on Unlimited Lite, RED Unlimited and RED
Unlimited Max.
§ User should be able to select one of these prices.
§ The associated data allocation and free extra for each tariff should also be
output.
§ If the phone price is €0.00 on a particular plan it should be output as Free.

o Bottom section
§ Should render more detailed information about the phone. i.e. text
describing the phone.
§ Should give the user an overview of the selected phone, the once off
price and the monthly cost.
To complete this test:
• All the data you need is contained in /vodafone-phones/api/phones.json. Analyse it
carefully.
• Pay attention to the user experience.
• Add in some extra functionality and features -show us your imagination!
• If possible complete the test using React JS, but if not feel free to use Vanilla JS or any
libraries or frameworks that you like (but show us your work too!).
• Treat this test as if it should be production ready.
• Pay attention to performance.
• The data provided in this test is purely for test purposes, it has no bearing on the prices of
phones, plans or offers on our production website.
• Good luck!
