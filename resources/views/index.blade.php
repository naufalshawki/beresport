<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <base href="/">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <!-- Mobile Metas -->
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Site Metas -->
    <title>Beresport: Portal E-Sports Terbesar dan Pertama Indonesia</title>
    <meta name="keywords" content="">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Site Icons -->
    <link rel="shortcut icon" href="images/esport/favicon.ico" type="image/x-icon">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <!-- Site CSS -->
    <link rel="stylesheet" href="css/style.css">
    <!-- Responsive CSS -->
    <link rel="stylesheet" href="css/responsive.css">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="css/custom.css">
    <link rel="stylesheet" href="css/owl.carousel.min.css">
    <link rel="stylesheet" href="css/superslides.css">
    <link rel="stylesheet" href="css/carousel-ticker.css">
    <link rel="stylesheet" href="css/all.css">
    <link rel="stylesheet" href="css/bootstrap-select.css">
    <link rel="stylesheet" href="css/code_animate.css">
    <link rel="stylesheet" href="css/baguetteBox.min.css">
    <link rel="stylesheet" href="css/bootsnav.css">
    <link href="{{asset('css/tokofon.css')}}" rel="stylesheet" type="text/css">
     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      <link href="https://fonts.googleapis.com/css?family=EB+Garamond|Play&display=swap" rel="stylesheet">
      <link rel="stylesheet" type="text/css" href="vendor/animate/animate.css">
    	<link rel="stylesheet" type="text/css" href="vendor/css-hamburgers/hamburgers.min.css">
    	<link rel="stylesheet" type="text/css" href="vendor/select2/select2.min.css">

      <style>
      .alert {
        padding: 20px;
        background-color: #f44336;
        color: white;
      }

      .closebtn {
        margin-left: 15px;
        color: white;
        font-weight: bold;
        float: right;
        font-size: 22px;
        line-height: 20px;
        cursor: pointer;
        transition: 0.3s;
      }

      .closebtn:hover {
        color: black;
      }
      </style>
</head>
    <body>

        <div id="app">    @if(session()->has('message'))
      <div class="alert">
        <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
        <strong>Info:</strong> {{session()->get('message')}}
      </div>
      @endif</div>
        <script src="{{asset('js/app.js')}}"></script>
  </body>

      <!-- ALL JS FILES -->
     <script src="js/jquery-3.2.1.min.js"></script>
      <script src="js/popper.min.js"></script>
      <script src="js/bootstrap.min.js"></script>
      <!-- ALL PLUGINS -->
      <script src="js/jquery.superslides.min.js"></script>
      <script src="js/bootstrap-select.js"></script>
      <script src="js/inewsticker.js"></script>
      <script src="js/bootsnav.js"></script>
      <script src="js/images-loded.min.js"></script>
      <script src="js/isotope.min.js"></script>
      <script src="js/owl.carousel.min.js"></script>
      <script src="js/baguetteBox.min.js"></script>
      <script src="js/form-validator.min.js"></script>
      <script src="js/contact-form-script.js"></script>
      <script src="js/custom.js"></script>
      <script src="vendor/jquery/jquery-3.2.1.min.js"></script>
      <!--===============================================================================================-->
      	<script src="vendor/bootstrap/js/popper.js"></script>
      	<script src="vendor/bootstrap/js/bootstrap.min.js"></script>
      <!--===============================================================================================-->
      	<script src="vendor/select2/select2.min.js"></script>
      <!--===============================================================================================-->
      	<script src="vendor/tilt/tilt.jquery.min.js"></script>

</html>
