-- MySQL dump 10.13  Distrib 5.7.44, for Linux (x86_64)
--
-- Host: mysql    Database: monsters_db
-- ------------------------------------------------------
-- Server version	5.7.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Monster`
--

DROP TABLE IF EXISTS `Monster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Monster` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `level` int(11) NOT NULL,
  `species` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subSpecies` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageUrl` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Monster`
--

LOCK TABLES `Monster` WRITE;
/*!40000 ALTER TABLE `Monster` DISABLE KEYS */;
INSERT INTO `Monster` VALUES ('00db9759-8908-4181-b053-c2e691d13a5e','Initial Lime',36,'Beast','Mountain','https://robohash.org/a2883cf2-c5b5-4035-8a89-2904f287df61?200x200'),('1f412b60-58f5-4d0a-b208-23a680cf6db0','Energetic Bronze',70,'Beast','Forest','https://robohash.org/4f63db78-e92e-4fe4-b1bb-17d03e04be71?200x200'),('29a7b53f-3505-4c41-9b7e-35b4aa9358ef','Formal Emerald',15,'Humanoid','Fire','https://robohash.org/cbd5ef72-5e08-4ae6-9143-e2ee4f85f0dd?200x200'),('29dfe62c-ca13-46ee-abdc-35173a43bb9d','Combined Azure',43,'Beast','Mountain','https://robohash.org/e5ecc7ec-fc7c-4861-a1ec-863fc9d9c4ff?200x200'),('3571c93c-c1fc-490e-9a06-a72bc2c8b96b','Essential Harlequin',52,'Reptile','Fire','https://robohash.org/53292e25-f9c5-4d2d-89e1-b59a98b06a4f?200x200'),('35d15e4e-43a3-41bf-9ee5-132a62fb9316','Ambitious Red',67,'Reptile','Fire','https://robohash.org/30328b04-9012-4919-9cc9-eb80e23c6df8?200x200'),('43153c2e-8f59-43e5-824d-3f414e979fec','Satisfactory Cyan',60,'Beast','Mountain','https://robohash.org/f62c85c5-4ebe-45ba-b5f3-1bb66d99b35e?200x200'),('44f81028-90f5-4a97-9a64-e488d8058dfb','Fantastic Cyan',64,'Humanoid','Forest','https://robohash.org/637fb921-16a8-496d-be87-f9da2f381e37?200x200'),('45e1be0f-a154-4486-a5de-0afc7d81be0b','Royal Beige',4,'Beast','Forest','https://robohash.org/f14c8119-a00e-4594-8086-f46cc0c802d4?200x200'),('66bd1711-5d1e-4fef-9fdc-a392c3b3a54e','Automatic Blue',28,'Humanoid','Fire','https://robohash.org/409ea23a-be04-4393-bb18-5a2663ad843f?200x200'),('6bc42edd-2b4c-4a44-b5f8-4f76b5ef7564','Inherent Yellow',29,'Beast','Forest','https://robohash.org/433a10c6-2bd5-4970-8113-4d4b45dbb129?200x200'),('6f7e3988-0db5-4cb5-8408-c2af769dd4c5','Lazy Emerald',69,'Reptile','Mountain','https://robohash.org/62caf65a-6be4-4fc9-b718-9623679347d0?200x200'),('73403f83-085b-4766-9ccb-f86d80d4584c','Intelligent Salmon',59,'Beast','Mountain','https://robohash.org/cce276bf-ffa9-4a57-bb29-7f1a8f79ab51?200x200'),('79956e9a-7f1c-42e2-8c8a-92160235f8a5','Magic Coffee',97,'Beast','Fire','https://robohash.org/29a12172-aa30-4920-b1b9-4e0efd16817c?200x200'),('7b088e95-6bda-4b84-b918-43ea9ea206e8','Okay Red',2,'Humanoid','Forest','https://robohash.org/ebe53c74-0378-4862-963a-f128d096cac8?200x200'),('86c79444-1828-4eef-a2e6-3f9093072ea8','Excellent Brown',77,'Humanoid','Fire','https://robohash.org/2c63f519-e9a4-469e-99cc-5dcef10ab643?200x200'),('8e0e9571-e8d2-4e9f-8bf9-0dacde92c4bb','Radical Maroon',32,'Humanoid','Fire','https://robohash.org/4cca3685-896e-496a-97e9-1f78e6f79953?200x200'),('942caf40-f116-43ea-a238-b09bd539fa67','Superior Cyan',59,'Beast','Forest','https://robohash.org/f0449e32-cce3-4522-9823-24035532e147?200x200'),('9a90c93d-b997-4c04-9784-7f3daacb09c2','National Scarlet',62,'Reptile','Mountain','https://robohash.org/443d3538-9de9-42aa-8de2-bb16bb200f4a?200x200'),('afc1a38e-a9a8-4735-b7a4-03ff86f87b88','Voluntary Ivory',61,'Reptile','Mountain','https://robohash.org/aa8f5209-9668-4231-b2b9-b4b29c193819?200x200'),('b5323d54-ef5a-42e4-9ffe-036bb3b86d4d','Minimum Jade',32,'Reptile','Mountain','https://robohash.org/b9cb35a5-703e-4094-b4c7-b24a8227126d?200x200'),('bec21454-92b5-499c-b407-caab42edc5a8','Vivid Lavender',73,'Humanoid','Forest','https://robohash.org/417263de-b51e-4566-bea8-88181046e406?200x200'),('c83f987e-852b-4e77-ad24-48ca8833c693','Xeric Copper',99,'Humanoid','Mountain','https://robohash.org/2959f765-515f-42d8-bcc4-c50049ff7f16?200x200'),('cdac12fd-a8dc-4580-9f3c-3bfefa335e44','Digital Aqua',64,'Humanoid','Fire','https://robohash.org/35821fa0-770b-4bf1-9783-f66911dbe61f?200x200'),('de0518a6-a9ba-480b-87de-25a061c01101','Potential Ivory',87,'Humanoid','Mountain','https://robohash.org/d93b14da-9d96-4fd7-8e35-f1106865e88b?200x200'),('df3b6684-f13f-4388-b352-33944aa6330c','Renewed Amethyst',41,'Humanoid','Fire','https://robohash.org/2bbdf187-2cba-4fac-a1b8-20d370ba41fd?200x200'),('f378b8c0-e32d-4842-b5df-2a2bddb03f44','Net Salmon',38,'Humanoid','Mountain','https://robohash.org/e212729b-100d-40d7-b396-979a66e20880?200x200'),('f3c26505-05cb-4a77-a847-6da9dfb56c4d','Leading Copper',26,'Humanoid','Mountain','https://robohash.org/18dd41ce-036b-4ef4-916c-ed828b44dae3?200x200'),('f5253fe8-58fb-467f-9d1f-c5bfa55b1ca0','Repulsive Fuchsia',43,'Humanoid','Mountain','https://robohash.org/b0fdc360-2975-4838-bb93-3943710f1e23?200x200'),('f96d5397-ebdb-47b7-b9d0-a0bbeafac475','Rolling Magenta',20,'Humanoid','Forest','https://robohash.org/fa90148a-1e59-4186-8bbd-a162859c31f3?200x200');
/*!40000 ALTER TABLE `Monster` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('2dc25688-fd1e-4f85-84e7-9745558b6aa3','0291afabbc166df81ef53a41b753be614f43b25472863a5e867a17c4ee1b8f83','2024-06-01 18:45:11.408','20240601172156_init',NULL,NULL,'2024-06-01 18:45:11.388',1),('59a0aa77-a0d5-496e-95a9-73d351a55f51','f56b6af6ed5e25a76901a12107f7e81e1e3d6488d83d0103ecdde4aeb1d7c296','2024-06-01 19:16:10.706','20240601191610_update_monster_schema',NULL,NULL,'2024-06-01 19:16:10.674',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-02 11:40:53
