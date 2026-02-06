-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bull" (
    "id" SERIAL NOT NULL,
    "caravana" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "uso" TEXT NOT NULL,
    "origen" TEXT NOT NULL,
    "pelaje" TEXT NOT NULL,
    "raza" TEXT NOT NULL,
    "edad_meses" INTEGER NOT NULL,
    "caracteristica_destacada" TEXT,
    "crecimiento" INTEGER NOT NULL,
    "facilidad_parto" INTEGER NOT NULL,
    "reproduccion" INTEGER NOT NULL,
    "moderacion" INTEGER NOT NULL,
    "carcasa" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bull_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorite" (
    "userId" INTEGER NOT NULL,
    "bullId" INTEGER NOT NULL,
    "bull_score" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("userId","bullId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Bull_caravana_key" ON "Bull"("caravana");

-- CreateIndex
CREATE INDEX "Bull_uso_idx" ON "Bull"("uso");

-- CreateIndex
CREATE INDEX "Bull_origen_idx" ON "Bull"("origen");

-- CreateIndex
CREATE INDEX "Bull_pelaje_idx" ON "Bull"("pelaje");

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_bullId_fkey" FOREIGN KEY ("bullId") REFERENCES "Bull"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
