<!DOCTYPE html>
<html lang="en" class="has-navbar-fixed-top">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
	<meta name="csrf-token" content="{{ csrf_token() }}">
	<title>LinEase</title>
	@include('_styles')
	@yield('styles')
</head>
<body ondragstart="return false;" ondrop="return false;">
	@yield('body')

	@include('_scripts')
	@yield('scripts')
</body>
</html>