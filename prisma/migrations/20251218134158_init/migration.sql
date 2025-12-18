-- CreateTable
CREATE TABLE "Url" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "original" TEXT NOT NULL,
    "short" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ttl" BIGINT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Url_short_key" ON "Url"("short");
