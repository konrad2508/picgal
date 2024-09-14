# Picgal
A small picture gallery application. It's purpose is to allow the user to view their local picture collection in a gallery-like interface, with the ability to tag the pictures and query them based on assigned tags.

## How to use
1. Properly format your gallery. The complete relative gallery structure is as follows: ```/<HIGH>/<LOW>/<GENERAL>/.../<image>```. Folder names are used to set initial tags. Every folder after ```<LOW>``` is treated as a general tag. If you want to skip a certain tag in the tree, name it a no-tag directory (name configurable in ```config.json``` or in Settings tool). Directories missing from the complete structure will result in those tags being omitted while adding an image to the gallery, e.g. an image at ```/<image>``` will have no initial tags.
2. Configure the app by modifying ```config.json``` or by using Settings tool. Most importantly be sure to direct the application to the root directory of your gallery and to the place where you want to store the database file; if you want to use the Encryption tool, point to the GnuPG binary on your system and set the correct recipient.
3. Create the database using the Sync Database tool.
4. Start using the gallery.

## Encryption
You can encrypt the images in your gallery by using GnuPG on your system. <b>Note that if you forget the password you used to encrypt the messages, there is no way to recover them.</b>

## Virtual tag list
Virtual tags are tags that are present by default and are usually related to image's metadata. The list of currently available virtual tags:
- ```orientation```,
- ```favourite```,
- ```encrypted```,
- ```file```,
- ```added```.
