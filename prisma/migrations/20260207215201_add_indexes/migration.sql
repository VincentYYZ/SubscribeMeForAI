-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_createdAt_idx" ON "User"("createdAt");

-- CreateIndex
CREATE INDEX "Resource_category_idx" ON "Resource"("category");

-- CreateIndex
CREATE INDEX "Resource_published_idx" ON "Resource"("published");

-- CreateIndex
CREATE INDEX "Resource_createdAt_idx" ON "Resource"("createdAt");

-- CreateIndex
CREATE INDEX "Resource_category_published_idx" ON "Resource"("category", "published");

-- CreateIndex
CREATE INDEX "Course_published_idx" ON "Course"("published");

-- CreateIndex
CREATE INDEX "Course_createdAt_idx" ON "Course"("createdAt");

-- CreateIndex
CREATE INDEX "FAQ_order_idx" ON "FAQ"("order");
