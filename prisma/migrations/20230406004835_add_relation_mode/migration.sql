-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT
);
INSERT INTO "new_Order" ("createdAt", "id", "updatedAt", "userId") SELECT "createdAt", "id", "updatedAt", "userId" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE TABLE "new__OrderToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);
INSERT INTO "new__OrderToProduct" ("A", "B") SELECT "A", "B" FROM "_OrderToProduct";
DROP TABLE "_OrderToProduct";
ALTER TABLE "new__OrderToProduct" RENAME TO "_OrderToProduct";
CREATE UNIQUE INDEX "_OrderToProduct_AB_unique" ON "_OrderToProduct"("A", "B");
CREATE INDEX "_OrderToProduct_B_index" ON "_OrderToProduct"("B");
CREATE TABLE "new_CategoriesOnProducts" (
    "productId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "assignedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("productId", "categoryId")
);
INSERT INTO "new_CategoriesOnProducts" ("assignedAt", "categoryId", "productId") SELECT "assignedAt", "categoryId", "productId" FROM "CategoriesOnProducts";
DROP TABLE "CategoriesOnProducts";
ALTER TABLE "new_CategoriesOnProducts" RENAME TO "CategoriesOnProducts";
CREATE TABLE "new__CategoryToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);
INSERT INTO "new__CategoryToProduct" ("A", "B") SELECT "A", "B" FROM "_CategoryToProduct";
DROP TABLE "_CategoryToProduct";
ALTER TABLE "new__CategoryToProduct" RENAME TO "_CategoryToProduct";
CREATE UNIQUE INDEX "_CategoryToProduct_AB_unique" ON "_CategoryToProduct"("A", "B");
CREATE INDEX "_CategoryToProduct_B_index" ON "_CategoryToProduct"("B");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
