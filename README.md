WSU-spine
================================

As a graphic element, the WSU Spine binds together the many stories of wsu.edu. With both a consistent and global spine and a blank, unwritten page, the Spine balances the unity and diversity of our university. As a Web framework, the WSU Spine is minimal template that serves the front-facing ground level of every WSU website...

	1) Consistently brands the university across websites and platforms
	2) Provides a usable and consistent navigation solution
	3) Provides a responsive solution for devices

	
Table of Contents
================================
1. Implementing the Spine on a university website
...
10. Usage of the packaged spine for development and review purposes


Implementation
================================
A typical implementation of the WSU Spine would start with spine.html.

	1) Customize core.html by replacing default data with the appropriate university contact details.
	2) Customize core.html by adding any out-of-the-box modifications, such as changing the color of the spine. Customization options can be found in the comments of core.html and, for some lesser used options, at identity.wsu.edu.
	3) Rebuilding the markup in your CMS of choice while taking care to preserve its elements and structure.
	
Connecting to various Spine packages.

The Spine requires several calls in your HEAD
 
Styles
--------------------------------
 
 	<link href="http://*.wsu.edu/spine/1/spine.css" />
 
 Scripts
--------------------------------
 
	 <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	 <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
	 	<!--Optional--> <script src="http://code.jquery.com/jquery-migrate-1.2.1.js"></script>
	 	<!--Optional--> <script src="http://nbj.me/spine/1/1.0/scripts/modernizr/modernizr.custom.95689.js"></script>
	 <script src="http://*.wsu.edu/spine/1/spine.js"></script>
	 

Markup
--------------------------------
In addition to these assets, the Spine requires some minimal markup.

	<html>
		<body>
			<div id="jacket"></div>
			<div id="binder">
				<main>
					Content
				</main>
				<div id="spine">
					<div id="glue">
					*
					</div>
				</div>
			</div>
		</body>
	</html>