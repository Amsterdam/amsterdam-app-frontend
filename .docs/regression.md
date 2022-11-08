# General

- Test on iOS and Android
- Test on devices with and without notches/indents
- Test on various screen sizes (tablets too)
- Test with accessibility features on
- Extra focus on new functionality and fixed bugs

---

# Checklist

Use the bullet points below to make sure your manual regression test is complete. Add items for new functionality and feel free to update and expand!

---

## Home

### Modules

- Complete and correct module list
- Swipe to delete
- Add button

### Navigation bar

- User Profile button on Home screen
- Settings button on Home screen
- Correct title and back button

## User Profile

- Add/change/remove address
- Remove address feedback message (close)
- "Meer informatie"

## Settings

- Complete and correct module list
- Module on/off (check on Home screen)

---

## Module: Afvalwijzer

### Afvalwijzer

- Address is already filled out if defined in User Profile
- Add/change address
- If address is set:
  - Show collection day, collection time, link "Grof afval"
  - Show "Afvalpunten" content with link to map on web
  - Show Restafval item
  - Show Containers item, with link to map on web
  - Show "Kloppen de dagen of tijden niet?" link to web
- Always visible:
  - "Welk afval hoor waar?" link to web
  - "Is het afval niet opgehaald" link to web

### Containers in de buurt

- Is link to map on web

### Afvalpunten in de buurt

- Is link to map on web

### Waar kan grof afval naar toe?

- Is link to screen with info

---

## Module: GFT-container openen

- TODO

---

## Module: Werkzaamheden

Refer to https://www.amsterdam.nl/projecten/ to check the content of projects

### Search

- Search term that matches a project title
- Search term that matches a project description
- Search term that matches nothing
- Clear search field (cross) works
- Number of results is correct

### Address

- Address is already filled out if defined in User Profile
- Add/change address

### Projects overview

- If address is set:
  - Distance and steps for project
  - Projects are sorted by distance asc
- If address is not set:
  - Only image, title and description
  - Projects are sorted by title asc

### Project

- Has correct title, description and image
- Project title set in nav header

#### Follow

- Button has following and follow state
- Tap button to follow
  - First time will show push notifications permission dialog (iOS)
  - Number of followers should update
- Followed project should get a checkmark and follow label in the overview

#### Info links

- Any combination of "Over dit project", "Planning", "Contact"
  - "Over dit project" to screen with description
  - "Planning" to screen with description
  - "Contact" to screen with one or more contacts: OM name, with optional phone number and email address

#### Timeline

- Items are ordered by date desc
- Subheading for every past year
- Items have date, title and image
- New items have yellow "new" indicator (i.e. were added since the last time you visited the project and no older than 3 days)
  - Will be removed after reading the article
  - Will be removed after leaving the project screen
- Tap leads to article screen

### Article

- Has correct content: image, date, title, text
- Contact email address "link" - if any - is a mailto
- Web "link" - if any - opens a browser (not a webview)

---

## Module: Melding doen

- TODO

---

## Module: Contact

- TODO
