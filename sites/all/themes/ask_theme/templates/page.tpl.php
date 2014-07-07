<?php
?>
<header class="header">
	<div class="navbar-fixed-top">
		<div id="top-area" class="top-area">
			<div class="container">
				<div class="row">
					<div class="col-md-offset-2 col-md-10">
						<!-- Tagline to go here -->	
						<div id="top-header" class="top-header">
							<div id="tagline" class="tagline"></div>
							<?php print render($page['top_header']); ?>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="main-header" class="main-header">
			<div class="container">
				<div class="row">
					<nav id="main-menu" class="col-md-offset-2 col-md-10 main-menu">
						<?php print render($page['main_menu']); ?>
					</nav>
				</div>
			</div>
		</div>
			<div class="container">
				<div class="row">
					<div id="logo" class="logo">
						<a href="<?php print $front_page; ?>"><img alt="ask study logo" src="<?php print $logo; ?>" /></a>	
					</div>
				</div>
			</div>
	</div>
</header>
<!-- MAIN CONTENT AREA -->
<?php if( render($page['rotator']) ) : ?>
	<section>
		<div id="rotator" class="rotator">
			<?php print render($page['rotator']); ?>
		</div>	
	</section>
<?php endif; ?>

<div id="page" class="page">
	<div id="main">
		<?php if($title) : ?>
			<div id="title" class="title">
				<div class="container">
					<div class="row">
						<div class="col-md-offset-2 col-md-10">
							<h1><?php print $title; ?></h1>
						</div>
					</div>
				</div>
			</div><!-- title -->
		<?php endif; ?>	
			<section class="container">
				<div class="row">
					<?php if( render($page['subnav']) ) : ?>
						<div id="subnav" class="subnav">
							<?php print render($page['subnav']); ?>
						</div>
					<?php endif; ?>
					<div class="content-padding">
						<?php print render($page['content']); ?>
					</div>
				</div>
			</section>
		</div>
	</div><!-- main -->
</div><!-- page -->

<!-- FOOTER  -->
<div id="footer-topbar" class="footer-topbar"></div>
<footer>
	<div class="container">
		<div class="row">
			<?php if( render($page['footer_logos']) ) :?>
				<div id="footer-logos" class="footer-logos col-md-7">
					<?php print render($page['footer_logos']); ?>
				</div>
			<?php endif; ?>
			<?php if( render($page['footer_menu_copyright']) ) :?>
				<div id="footer-menu-copyright" class="footer-menu-copyright col-md-5">
					<?php print render($page['footer_menu_copyright']); ?>
				</div>
			<?php endif; ?>
		</div>
	</div>
</footer>
