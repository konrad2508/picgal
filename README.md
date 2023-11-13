# Picgal
A small picture gallery application. It's purpose is to allow the user to view their local picture collection in a gallery-like interface, with the ability to tag the pictures and query them based on assigned tags.

## How to use
1. Properly format your gallery. The format should be as follows: ```<ROOT>/<HIGH>/<LOW>/<image>```. ```<ROOT>``` means the root of the gallery, ```<HIGH>``` and ```<LOW>``` should represent high-level and low-level tag names, and ```<image>``` is the actual image. Both ```<HIGH>``` and ```<LOW>``` will be treated as tags. If you don't want to include one of those tags, name that folder as ```none``` (case insensitive), however, you cannot name both folders in such way.
2. Move the app where you want to put it. The location of the app is later referred to as ```<APP_DIR>```.
3. Run the application by executing ```<BUILT_APP_DIR>/Picgal``` executable.
4. Configure the app. By using Settings tool, you can modify the application, most notably you can point to your gallery's location on the disk, specify names for ```<HIGH>``` and ```<LOW>``` tags, or choose locations for images' samples and previews. There are some settings that can only be changed by modifying the ```<BUILT_APP_DIR>/resources/app/config.json```, such as choosing directory separators.
5. Create the database. Use Sync Database tool to create one in the location specified in the config file. Whenever your gallery changes (or you accidentaly deleted previews or samples), make sure to run that tool again.
6. You can use Batch Tag Editor tool to add tags to your images in batches.
7. To query your images, use the searchbar in the navigation menu. In addition to tags generated from the image's location and added by the user, application provides virtual tags. Virtual tags may have several subtags related to them; to use them, type ```<virtual_tag>:<subtag>``` (or use the suggestions menu). Refer to the section dedicated to this type of tags for more information.
8. If you want to encrypt your images, add the path to GnuPG binary and the recipient for assymetric encryption in Settings. Do remember that if you forget your passphrase, you won't be able to decrypt your images.

## Virtual tag list
- ```orientation``` - query the orientation of the image, possible values are ```portrait``` and ```landscape```.
- ```favourite``` - query images favourited by the user, possible values are ```yes``` and ```no```.
- ```encrypted``` - query encrypted images, possible values are ```yes``` and ```no```.
