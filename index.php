<?php session_start() ?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset='utf-8'/>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="format-detection" content="telephone=no">
	<meta name="viewport" content="width=device-width, user-scalable=no, maximum-scale=1.0">
	<meta name="author" content="gugo">

	<meta name="description" content="Gugo homepage!!x">
	<meta name="keywords" content="website, gugo, webgl, chrome, shaders, creative, css, html, javascript, front-end">

	<title>GUGO</title>

	<!-- <link rel="shortcut icon" href="assets/img/ico/favicon4.ico" /> -->

	<link type="text/css" rel="stylesheet" href="css/style.css"/>
	<link type="text/css" rel="stylesheet" href="css/contact.css"/>

	<link rel="shortcut icon" type="image/png" href="img/favicon.png">
	
    <script type="text/javascript" src="js/libs.js"></script>
    <script type="text/javascript" src="js/script.js"></script>
    <script src="js/jquery.min.js"></script>
    <script src="js/app.js"></script>

  </head>
  <body style='margin:0px' onload='webGLStart(0)'>
  	<div class="container">
	    <canvas id='canvas'
	            style='position: absolute; background-color: black;'>
	    </canvas>
	    <div id="overlay" class="main-nav">
		    <div class="header">
		    	<div class="nav-title-container">
		    		<div class="nav-title">
		    			<a href="#" onclick="checkButton(0)">gugo<br>  ____</a>
		    			<p class="nav-subtitle">interaction designer<br>visual artist</p>
		    		</div>
		    	</div>
		   		<ul class="nav-main-list">
			   		<div class="li-container">
			   			<li>
			   				<a href="#" id="about" onclick="checkButton(1)">about</a>
			   			</li>
			   		</div>
			   			<div class="li-container">
			   				<li>
			   					<a href="#" id="projects" onclick="checkButton(2)">projects</a>
			   					<ul class="nav-secondary-list">
			   						<div class="li-container">
			   							<li><a href="#">Mirrored Babel</a></li>
			   						</div>
			   						<div class="li-container">
			   							<li><a href="#">NapNap</a></li>
			   						</div>
			   						<div class="li-container">
			   							<li><a href="#">Digital Embroidery</a></li>
			   						</div>
			   						<div class="li-container">
			   							<li><a href="#">SMF Logo</a></li>
			   						</div>
			   						<div class="li-container">
			   							<li><a href="#">Gugo Logo</a></li>
			   						</div>
			   						<div class="li-container">
			   							<li><a href="#"></a>Psy-Tro-Flo</li>
			   						</div>
			   						<div class="li-container">
			   							<li><a href="#"></a>Baloops</li>
			   						</div>
			   					</ul>
			   				</li>
			   			</div>
			   		<div class="li-container">
			   			<li>
			   				<a href="#" id="contact" onclick="checkButton(3)">contact</a>
			   			</li>
			   		</div>
		   		</ul>
		    </div>
		</div>
		<div id="overlay" class="page-nav">
		    <div class="page">
		    	<div class="about">
		    		<div id="data">
		    			<p>Guglielmo Torelli<br>Based in Airports</p>
		    		</div>
		    		<div id="intro">
		    			<p>Visual artist and Interaction designer, loves to design everything that is open, experimental and interactive.<br>Addicted to web technologies, physical computing and poetic computation.<br>Works as a freelance designer since 2012.</p>
		    		</div>
		    		<div id="education">
		    			<h3 id="education-title">education</h3>
			    		<p>SFPC, School For Poetic Computation, New York, Fall 2014<br>Post Graduate Course / Artist Residency</p>
			    		<p>ISIA Firenze / 2011 —— 2014<br>MA - Communication Design</p>
			    		<p>ISIA Firenze / 2008 —— 2012<br>BA - Product and Communication Design</p>
		    		</div>
		    		<!-- <h2 id="works-title">works</h2>
		    		<p id="works"></p> -->
		    	</div>
		    	<div class="project"></div>
		    	<div class="contact">
		    	<div id="contact-form" class="clearfix">
				    <h1>Get In Touch!</h1>
				    <h2>Fill out our super swanky HTML5 contact form below to get in touch with us! Please provide as much information as possible for us to help you with your enquiry :)</h2>
				    <ul id="errors" class="">
				        <li id="info">There were some problems with your form submission:</li>
				    </ul>
				    <p id="success">Thanks for your message! We will get back to you ASAP!</p>
				    <form method="post" action="process.php">
				        <label for="name">Name: <span class="required">*</span></label>
				        <input type="text" id="name" name="name" value="" placeholder="John Doe" required="required" autofocus="autofocus" />
				         
				        <label for="email">Email Address: <span class="required">*</span></label>
				        <input type="email" id="email" name="email" value="" placeholder="johndoe@example.com" required="required" />

				        <label for="subject">Subject: <span class="required">*</span></label>
				        <input type="text" id="subject" name="subject" value="" placeholder="Subject" required="required" autofocus="autofocus" />
				         
				        <label for="message">Message: <span class="required">*</span></label>
				        <textarea id="message" name="message" placeholder="Your message must be greater than 20 charcters" required="required" data-minlength="20"></textarea>
				         
				        <span id="loading"></span>
				        <input type="submit" value="Holla!" id="submit-button" />
				        <p id="req-field-desc"><span class="required">*</span> indicates a required field</p>
				    </form>
				</div>
					<div id="contact-form" class="clearfix">
					    <h1>Get In Touch!</h1>
					    <h2>Fill out our super swanky HTML5 contact form below to get in touch with us! Please provide as much information as possible for us to help you with your enquiry :)</h2>
					    <?php
					    //init variables
					    $cf = array();
					    $sr = false;
					     
					    if(isset($_SESSION['cf_returndata'])){
					        $cf = $_SESSION['cf_returndata'];
					        $sr = true;
					    }
					    ?>
					    <ul id="errors" class="<?php echo ($sr && !$cf['form_ok']) ? 'visible' : ''; ?>">
					        <li id="info">There were some problems with your form submission:</li>
					        <?php 
					        if(isset($cf['errors']) && count($cf['errors']) > 0) :
					            foreach($cf['errors'] as $error) :
					        ?>
					        <li><?php echo $error ?></li>
					        <?php
					            endforeach;
					        endif;
					        ?>
					    </ul>
					    <form method="post" action="process.php">
					        <label for="name">Name: <span class="required">*</span></label>
					        <input type="text" id="name" name="name" value="<?php echo ($sr && !$cf['form_ok']) ? $cf['posted_form_data']['name'] : '' ?>" placeholder="John Doe" required autofocus />
					         
					        <label for="email">Email Address: <span class="required">*</span></label>
					        <input type="email" id="email" name="email" value="<?php echo ($sr && !$cf['form_ok']) ? $cf['posted_form_data']['email'] : '' ?>" placeholder="johndoe@example.com" required />

					        <label for="subject">Subject: <span class="required">*</span></label>
				        	<input type="text" id="subject" name="subject" value="<?php echo ($sr && !$cf['form_ok']) ? $cf['posted_form_data']['subject'] : '' ?>" placeholder="Subject" required="required" autofocus="autofocus" />
					         
					        <label for="message">Message: <span class="required">*</span></label>
					        <textarea id="message" name="message" placeholder="Your message must be greater than 20 charcters" required data-minlength="20"><?php echo ($sr && !$cf['form_ok']) ? $cf['posted_form_data']['message'] : '' ?></textarea>
					         
					        <span id="loading"></span>
					        <input type="submit" value="Holla!" id="submit-button" />
					        <p id="req-field-desc"><span class="required">*</span> indicates a required field</p>
					    </form>
					    <?php unset($_SESSION['cf_returndata']); ?>
					</div>		
		    	</div>
		    </div>
	    </div>
	</div>

  </body>
</html>