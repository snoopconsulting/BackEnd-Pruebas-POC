-- phpMyAdmin SQL Dump
-- version 4.4.12
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-11-2017 a las 15:51:02
-- Versión del servidor: 5.6.25
-- Versión de PHP: 5.6.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `zanella`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `moto_usuario`
--

CREATE TABLE IF NOT EXISTS `moto_usuario` (
  `id_moto` int(10) NOT NULL,
  `n_motor` varchar(60) NOT NULL,
  `n_chasis` varchar(60) NOT NULL,
  `titular` varchar(40) NOT NULL,
  `patente` varchar(20) NOT NULL,
  `dni` int(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `modelo_moto` varchar(30) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `moto_usuario`
--

INSERT INTO `moto_usuario` (`id_moto`, `n_motor`, `n_chasis`, `titular`, `patente`, `dni`, `email`, `modelo_moto`) VALUES
(1, 'prueba7456878', 'prueba1575733', 'Roberto Perez', 'abc 331', 28345121, 'robertoprueba@gmail.com', 'sol 125');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `moto_usuario`
--
ALTER TABLE `moto_usuario`
  ADD PRIMARY KEY (`id_moto`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `moto_usuario`
--
ALTER TABLE `moto_usuario`
  MODIFY `id_moto` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
