-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Url" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "original" TEXT NOT NULL,
    "short" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ttl" BIGINT
);
INSERT INTO "new_Url" ("createdAt", "id", "original", "short", "ttl") SELECT "createdAt", "id", "original", "short", "ttl" FROM "Url";
DROP TABLE "Url";
ALTER TABLE "new_Url" RENAME TO "Url";
CREATE UNIQUE INDEX "Url_short_key" ON "Url"("short");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
