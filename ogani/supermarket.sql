-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2021-09-05 15:25:08
-- 伺服器版本： 8.0.26
-- PHP 版本： 7.4.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫: `supermarket`
--

-- --------------------------------------------------------

--
-- 資料表結構 `admin`
--

CREATE TABLE `admin` (
  `sid` int NOT NULL,
  `account` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `favorites`
--

CREATE TABLE `favorites` (
  `favorites_user_id` int NOT NULL,
  `favorites_product_id` int NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- 資料表結構 `product1`
--

CREATE TABLE `product1` (
  `品名` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `種類` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `售價` int NOT NULL,
  `數量` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;

--
-- 傾印資料表的資料 `product1`
--

INSERT INTO `product1` (`品名`, `種類`, `售價`, `數量`) VALUES
('蘋果', '水果', 99, 15000),
('肋眼牛小排', '肉類', 900, 300),
('松阪豬', '肉類', 200, 800),
('安格斯牛小排', '肉類', 1000, 300),
('梅花豬', '肉類', 150, 799),
('日本和牛', '肉類', 3000, 300),
('加州葡萄', '水果', 220, 460),
('芭樂', '水果', 80, 300),
('芒果', '水果', 350, 300),
('柳橙', '水果', 30, 300),
('芒果汁', '飲品', 150, 300),
('柳橙汁', '飲品', 150, 300),
('西瓜汁', '飲品', 150, 300),
('葡萄汁', '飲品', 150, 300),
('芭樂汁', '飲品', 150, 300),
('萵苣', '蔬菜', 150, 300),
('生菜', '蔬菜', 150, 300),
('地瓜葉', '蔬菜', 150, 300),
('番茄', '蔬菜', 150, 300),
('青椒', '蔬菜', 150, 300),
('蔓越莓乾', '零食', 150, 300),
('堅果', '零食', 150, 300),
('核桃', '零食', 150, 300),
('辣橄欖', '零食', 150, 300),
('葡萄乾', '零食', 150, 300);

-- --------------------------------------------------------

--
-- 資料表結構 `productss`
--

CREATE TABLE `productss` (
  `sid` int NOT NULL,
  `category` varchar(50) NOT NULL,
  `category_id` varchar(80) NOT NULL,
  `product_name` varchar(80) NOT NULL,
  `product_id` varchar(80) NOT NULL,
  `price` int NOT NULL,
  `quantity` int NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

--
-- 傾印資料表的資料 `productss`
--

INSERT INTO `productss` (`sid`, `category`, `category_id`, `product_name`, `product_id`, `price`, `quantity`) VALUES
(1, 'fruit', '1', '蘋果', 'rose001', 200, 1200),
(2, 'fruit', '1', '葡萄', 'rose002', 200, 1300),
(3, 'fruit', '1', '梨子', 'rose003', 99, 2000),
(4, 'fruit', '1', '草莓', 'rose004', 100, 1200),
(5, 'fruit', '1', '櫻桃', 'rose005', 200, 1400),
(6, 'juice', '2', '芒果汁', 'rose006', 40, 1000),
(7, 'juice', '2', '芭樂汁', 'rose007', 35, 1000),
(8, 'juice', '2', '番茄汁', 'rose008', 33, 2000),
(9, 'juice', '2', '葡萄汁', 'rose009', 32, 1300),
(10, 'juice', '2', '蘋果汁', 'rose010', 45, 1400),
(11, 'meat', '3', '肋眼牛小排', 'rose011', 1500, 200),
(12, 'meat', '3', '安格斯牛小排', 'rose012', 1400, 390),
(13, 'meat', '3', '梅花豬', 'rose013', 1200, 290),
(14, 'meat', '3', '日本和牛', 'rose014', 2000, 280),
(15, 'meat', '3', '松阪豬', 'rose015', 1100, 390),
(16, 'vegetable', '4', '生菜', 'rose016', 30, 450),
(17, 'vegetable', '4', '萵苣', 'rose017', 30, 500),
(18, 'vegetable', '4', '青豆', 'rose018', 20, 560),
(19, 'vegetable', '4', '青椒', 'rose019', 20, 650),
(20, 'vegetable', '4', '番茄', 'rose020', 10, 660),
(21, 'snack', '5', '杏桃乾', 'rose021', 200, 3000),
(22, 'snack', '5', '杏仁果', 'rose022', 230, 3900),
(23, 'snack', '5', '辣橄欖', 'rose023', 220, 3040),
(24, 'snack', '5', '堅果', 'rose024', 250, 3500),
(25, 'snack', '5', '蔓越莓乾', 'rose025', 240, 3200);

-- --------------------------------------------------------

--
-- 資料表結構 `users`
--

CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `user_name` varchar(30) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_password` varchar(30) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- 傾印資料表的資料 `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `user_email`, `user_password`, `create_date`) VALUES
(1, 'Amanda', 'Amanda.gmail.com', ' 1234', '2021-09-03 11:42:15');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `productss`
--
ALTER TABLE `productss`
  ADD PRIMARY KEY (`sid`);

--
-- 資料表索引 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `productss`
--
ALTER TABLE `productss`
  MODIFY `sid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
