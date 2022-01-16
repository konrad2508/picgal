# Picgal
A small picture gallery application. It's purpose is to allow the user to view their local picture collection in a gallery-like interface, with the ability to tag the pictures and query them based on assigned tags.

## Requirements
1. Node with npm
2. Python with pip

## How to use
1. Make sure to properly format your gallery. The format should be as follows: ```<ROOT>/<SOURCE>/<CHARACTER>/<image>```. ```<ROOT>``` means the root of the gallery, ```<SOURCE>``` should mean the original source of the image, ```<CHARACTER>``` is the name of the character on the picture, and ```<image>``` is the actual image. Both ```<SOURCE>``` and ```<CHARACTER>``` will be treated as tags.
2. Build the app. Run the build script in the root of the repository that describes your OS (the OS on which you are building the application MUST be the same as the one you plan to be using the application on). The built app will be put in ```out``` folder.
3. Move the built app where you want to put it. The location of the app is later referred to as ```<BUILT_APP_DIR>```.
4. Configure the app. Go to ```<BUILT_APP_DIR>/resources/app/config.json``` and change the defaults to correct values on your system. Most importantly, make sure values ```sep``` and ```picturesRoot``` are correctly set - ```sep``` should be ```\\``` on Windows and ```/``` on Linux, and ```picturesRoot``` should point to your gallery. Remember to escape backslashes on Windows. If you want, change ```databasePath``` and ```previewsDir``` to point to some other directory than the built app. Fields ```highres``` and ```absurdres``` say how many pixels an image has to have to receive respective tags.
5. Create the database. Run ```<BUILT_APP_DIR>/resources/app/server/dist/picgal-sync-database```. If your gallery changes (image added or deleted), run it again to synchronize the database.
6. Run the application by executing ```<BUILT_APP_DIR>/Picgal``` executable.

If you want to move the previews directory, edit ```config.json``` and then run ```<BUILT_APP_DIR>/resources/app/server/dist/picgal-rebuild-previews```.
