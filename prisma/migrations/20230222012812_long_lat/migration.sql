-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Posts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "photoUrl" TEXT,
    "category" TEXT NOT NULL DEFAULT 'People',
    "longitude" REAL NOT NULL DEFAULT 0.0,
    "latitude" REAL NOT NULL DEFAULT 0.0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Posts_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Posts" ("category", "createdAt", "creatorId", "description", "id", "photoUrl", "type", "updatedAt") SELECT "category", "createdAt", "creatorId", "description", "id", "photoUrl", "type", "updatedAt" FROM "Posts";
DROP TABLE "Posts";
ALTER TABLE "new_Posts" RENAME TO "Posts";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
