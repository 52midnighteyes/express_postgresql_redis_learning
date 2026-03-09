-- CreateIndex
CREATE INDEX "Blog_id_slug_idx" ON "Blog"("id", "slug");

-- CreateIndex
CREATE INDEX "User_id_email_idx" ON "User"("id", "email");
