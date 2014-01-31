WSU-spine
================================

As a visual element, the WSU Spine is a 198px wide column that binds together the many websites of wsu.edu. As a framework, the WSU Spine is a minimal template that provides global tools and a responsive and flexible grid for every WSU website. With a uniform and global spine on the left and a blank, unwritten page to the right, the Spine balances the unity and diversity of our university.

1. Consistently brands the university across websites and platforms
2. Provides a usable and consistent navigation solution
3. Provides a responsive solution for devices

	
Table of Contents
================================
1. Implementing the Spine on a university website
...
10. Usage of the packaged spine for development and review purposes


Implementation
================================
A typical implementation of the WSU Spine would start with spine.html.

1. Customize #spine by replacing default data with the appropriate contact details.
2. Customize spine.html by adding any out-of-the-box modifications, such as changing the color of the spine. Customization options can be found in the comments of spine.html and, for some lesser used options, at identity.wsu.edu.
3. Rebuilding the markup in your CMS of choice while taking care to preserve its elements and structure.
	
Connecting to various Spine packages.

Essential Parts
--------------------------------

The spine is a "skeleton" framework in order to keep global requirement to a minimum and to avoid code conflicts. The Spine has just a few dependencies.
 
### Styles
 
 	<link href="http://repo.wsu.edu/spine/1/spine.css" />
 	
This single CSS file includes a CSS reset, default styles, responsive styles, and finally the styling for the spinal column itself.
 
### Scripts

First, the Spine relies on jQuery and jQuery UI. For the time being, we're sticking with jQuery 1.10.2 to preserve support for IE7 and IE8. Additional scripts needed for a specific site can be added, including libraries like Modernizr.

	 <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	 <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>

Secondly, we need the Spine-specific javascript.

	 <script src="http://repo.wsu.edu/spine/1/spine.js"></script>

Finally, additional site-specific scripts can be added.

### Markup

In addition to these assets, the Spine requires some minimal markup.

	<html>
		<body>
			<div id="jacket">
			<div id="binder">
				<main>
					Content
				</main>
				<div id="spine">
					<div id="glue">
						University Signature
						Tools
						Nav (Unordered List)
						Social Channels
						Global Footer
					</div>
				</div>
			</div>
			</div>
		</body>
	</html>
	
The "#jacket" is the outermost wrapper and fills the window width. The "#binder" is a container that serves to constrain the maximum width of content. Both are necessary for Spine positioning and responsive behavior.
