<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,300italic,800italic,800,700italic,700,600italic,600,400italic,300%7CRoboto+Condensed:400,400i,700,700i%7CGreat+Vibes" rel="stylesheet" />
    <link rel="icon" href="/images/favicon.png" type="image/x-icon" />

    <!-- Bootstrap Stylesheet -->
    <link rel="stylesheet" href="/css/bootstrap.min.css" />

    <!-- Font Awesome Stylesheet -->
    <link rel="stylesheet" href="/css/fontawesome-all.min.css" />
    <link rel="stylesheet" href="https://rawgit.com/lykmapipo/themify-icons/master/css/themify-icons.css" />

    <!-- Custom Stylesheets -->
    <link rel="stylesheet" href="/css/theme.css" />
    <link rel="stylesheet" href="/css/base.css" />

    <!-- Scripts -->
    @routes
    @vite(['resources/js/app.js', "resources/js/Pages/{$page['component']}.vue"])
    @inertiaHead
</head>

<body class="font-sans antialiased page-body">
    @inertia
    <script src="/js/jquery.min.js"></script>
    <script src="/js/popper.min.js"></script>
    <script src="/js/bootstrap.min.js"></script>
    <script src="/js/lightslider.js"></script>
</body>

</html>
