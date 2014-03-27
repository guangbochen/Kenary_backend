<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>UTS Raspbery Pi</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="/app/css/main.css" rel="stylesheet">
</head>
<body>
<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">UTS Raspberry Pi Admin</a>
    </div>
    <div class="navbar-collapse collapse">
      <ul class="nav navbar-nav navbar-right">
        <!-- <li><a><i class="fa fa-power-off"></i> Logout </a> -->
        <!-- </li> -->
      </ul>
    </div>
  </div>
</div>
<!-- end of header -->

<div class="container-fluid" data-role="main">
  <div class="row">
    <div class="col-sm-3 col-md-2 sidebar">
      <ul class="nav nav-sidebar">
        <li class="active" id="view-index">
        <a href="#">Overview</a>
        </li>
        <li id="view-temperatures">
        <a href="#/temperatures">Temperatures</a>
        </li>
        <!-- <li id="view-deals"> -->
        <!--   <a href="#/deals">Delas</a> -->
        <!-- </li> -->
        <li id="view-noises">
        <a href="#/noises">Noises</a>
        </li>

        <li id="view-airs">
        <a href="#/airs">Airs</a>
        </li>
      </ul>
    </div>
    <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
      <!-- page contents in the right side -->
      <div id="page-content"> 
        <i class="fa fa-spinner fa-spin fa-2x"></i> Loading...
      </div>
    </div>
  </div>
</div>

<!-- Placed at the end of the document so the pages load faster -->
<!-- Load the script "js/main.js" as our entry point -->
<script data-main="/app/js/main" src="/app/js/vendor/requirejs/require.js"></script>
</body>
</html>
