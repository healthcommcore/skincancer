<?php
$mobile_class = "";
?>
<header class="header">
	<div class="navbar-fixed-top">
		<div id="top-area" class="top-area">
			<div class="container">
				<div class="row">
					<div class="col-md-offset-2 col-md-10">
						<!-- Tagline to go here -->	
						<div id="top-header" class="top-header">
							<div class="tagline-wrap">
								<div class="tagline">
									<img class="img-responsive" src="/sites/default/files/images/ask_tagline.gif" />
								</div>
							</div>
							<?php print render($page['top_header']); ?>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="main-header" class="main-header">
			<div class="container">
				<div class="row">
					<nav id="main-menu" class="col-md-offset-2 col-md-10 main-menu navbar navbar-default">
						<div class="navbar-header">
							<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#main-menu-collapse">
								<span class="icon-bar"></span>
								<span class="icon-bar"></span>
								<span class="icon-bar"></span>
							</button>
						</div>
						<div id="main-menu-collapse" class="collapse navbar-collapse">
							<?php print render($page['main_menu']); ?>
						</div>
					</nav>
				</div>
			</div>
		</div>
			<div class="container">
				<div class="row">
					<div id="logo" class="logo left-col-width">
						<a href="<?php print $front_page; ?>"><img alt="ask study logo" class="img-responsive" src="<?php print $logo; ?>" /></a>	
					</div>
				</div>
			</div>
	</div>
</header>
<!--<div class="test-bar">This is a test</div>-->
<!-- MAIN CONTENT AREA -->
<?php if( render($page['rotator']) ) : ?>
	<section class="hidden-xs">
		<div id="rotator" class="rotator">
			<?php print render($page['rotator']); ?>
		</div>	
	</section>
<?php endif; ?>

<?php if( render($page['mobile_home']) ) {
	if(drupal_is_front_page()) {
		$mobile_class="hidden-xs";
	}
?>
	<section class="visible-xs">
		<div id="mobile-home" class="mobile-home">
			<?php print render($page['mobile_home']); ?>
		</div>	
	</section>
<?php } ?>


<div id="page" class="page <?php echo $mobile_class; ?>">
	<div id="main">
	<div id="def-container" class="def-container"></div>
		<?php if($title && !drupal_is_front_page()) : ?>
			<div id="title" class="title">
				<div class="container">
						<div class="title-graphic left-col-width hidden-xs"></div>
							<h1><?php print $title; ?></h1>
				</div>
			</div><!-- title -->
		<?php endif; ?>	
			<section class="container">
				<div class="row">
					<?php if( render($page['subnav']) ) : ?>
						<div id="subnav" class="subnav left-col-width hidden-xs hidden-sm">
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
				<div id="footer-menu-copyright" class="footer-menu-copyright col-md-5 col-xs-12">
					<?php print render($page['footer_menu_copyright']); ?>
				</div>
			<?php endif; ?>
		</div>
	</div>
</footer>
