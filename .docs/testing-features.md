# How to test certain features

## Counter of new articles per followed project in the project list

In the test environment, articles are marked as new when they are less than 60 days old. In the stakeholder app, this is 3 days. The difficulty to test these is because:
- You only see the counter on followed projects
- When you leave a followed project with new articles, they are marked as read. This is saved in the local storage of the app.
- Therefore, when you return to the project list, the articles are no longer marked as new
- Therefore you don't see the counter for that project

The solution is to follow some projects with recent articles and then remove the app data. Now, the local storage is emptied and articles are no longer marked as read.

To accomplish removal of the app data differs per OS:

### iOS
- Delete the app, then install again

### Android
- Go to the app overview where you see the "Amsterdam App Test" icon
- Press and hold the icon until a pop-up appears
- Press the topright 'i' in the pop-up 
- In the menu go to "Storage" (or "Opslag" in Dutch)
- At the bottom press the "Delete data" (in Dutch "Gegevens wissen") button and press Ok
- Go back to the app to see the counters