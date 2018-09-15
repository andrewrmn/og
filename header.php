<!DOCTYPE html>
<html class="no-js" lang="en">
<head>
    <!-- META DATA -->
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1">

    <link rel="manifest" href="site.webmanifest">
    <meta name="theme-color" content= "#000000">
    <!--[if IE]><meta http-equiv="cleartype" content="on" /><![endif]-->

    <title>Ocotcat Generator</title>

    <!-- CSS -->
    <link rel="stylesheet" media="screen" href="build/css/main.css" />

    <!-- ICONS -->
    <link rel="shortcut icon" type="image/ico" href="/build/images/favicons/favicon.png" />
    <!-- <link rel="apple-touch-icon" href="/build/images/favicons/apple-touch-icon.png" />
    <link rel="icon" href="/build/images/favicons/android-favicon.png"> -->
</head>

<body id="top">

<?php
    // Detect Homepage
    $exactUrl = $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'];
    $domain = $_SERVER['SERVER_NAME'] . '/';
    $homepage = "/index.php";
    $currentpage = $_SERVER['REQUEST_URI'];
?>

<header id="site-header">
    <div class="wrapper-wide">
        <h1 class="logo" itemscope itemtype="http://schema.org/Organization">
            <a href="/" itemprop="url">
                <span itemprop="name">Octocat Generator</span>
            </a>
        </h1>
    </div>
</header>

<main id="content" class="main">
