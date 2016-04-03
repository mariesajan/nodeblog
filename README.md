## NodeBlog

An example project done as part of learning **node.js, monk** and **jade**

User can find and share blog with each other.

### Installation

1. Install node.js

2. Install [MongoDB](https://www.mongodb.org/downloads#production)

3. Save in MongoDB/bin/`mongobatch.bat`.

    ````
    // Replace mongoDBPath with your local MongoDB path
    mongod --directoryperdb --dbpath mongoDBPath\data\db --logpath mongoDBPath\log\mongodb.log --logappend --rest –install
    ````
4.  Run `mongobatch` and mongoDB client

    ````
    $ mongobatch
    $ mongod
    ````
5.  Run mongodb shell script to create database and records.

    ```
    // Setup db and collections in mongodb
    $ mongo < localPath/myscripts.js
    ```
6. Copy the repository files to local folder.
7. Install dependencies in ``package.json``
    ```
    $ npm install
    ```

8. Start the server.
    ```
    npm start
    ```

9. If you get the following error, find the solution [here](https://github.com/kissjs/node-mongoskin/issues/153)
    ```
    var skinClassName = 'Skin' + NativeClass.name;
                                        ^
    TypeError: Cannot read property 'name' of undefined
    ```
10. Open [localhost:3000](localhost:3000).
