-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('MALE', 'FEMALE', 'PREFER_NOT_SAY');

-- CreateEnum
CREATE TYPE "public"."ConsultationPreference" AS ENUM ('ONLINE', 'IN_PERSON', 'NO_PREFERENCE');

-- CreateEnum
CREATE TYPE "public"."UrgencyLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "public"."MemberProfile" (
    "id" TEXT NOT NULL,
    "photoProfile" TEXT,
    "phoneNumber" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "gender" "public"."Gender",
    "consultationPreference" "public"."ConsultationPreference",
    "consultationPurpose" TEXT,
    "mentalHealthHistory" TEXT,
    "relatedMedicalConditions" TEXT,
    "urgencyLevel" "public"."UrgencyLevel",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "MemberProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MemberProfile_phoneNumber_key" ON "public"."MemberProfile"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "MemberProfile_userId_key" ON "public"."MemberProfile"("userId");

-- AddForeignKey
ALTER TABLE "public"."MemberProfile" ADD CONSTRAINT "MemberProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
