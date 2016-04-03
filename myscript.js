use nodeauth;

db.dropDatabase();

use nodeauth;

db.createCollections('posts');
db.createCollections('categories');

db.categories.insert({"categoryTitle":"Issue fixes"});
db.categories.insert({"categoryTitle":"Update on npm"});
db.categories.insert({"categoryTitle":"Release of new tool"});
