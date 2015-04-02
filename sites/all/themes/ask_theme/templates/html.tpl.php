<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php print $language->language; ?>" version="XHTML+RDFa 1.0" dir="<?php print $language->dir; ?>"<?php print $rdf_namespaces; ?>>

<head profile="<?php print $grddl_profile; ?>">
  <?php print $head; ?>
  <title><?php print $head_title; ?></title>
  <?php print $styles; ?>
  <?php print $scripts; ?>
	<script>
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
				m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

		<?php
			if(user_is_logged_in()) {
				$gacode = "ga('create', 'UA-60978411-1', {'userid' : '%s'});";
				echo sprintf($gacode, $user->uid);
			}
			else {
				echo "ga('create', 'UA-60978411-1', 'auto');";
			}
		?>
		ga('require', 'displayfeatures');
		ga('require', 'linkid', 'linkid.js');
		ga('send', 'pageview');
	</script>
</head>
<body class="<?php print $classes; ?>" <?php print $attributes;?>>
  <div id="skip-link">
    <a href="#main-content" class="element-invisible element-focusable"><?php print t('Skip to main content'); ?></a>
  </div>
  <?php print $page_top; ?>
  <?php print $page; ?>
  <?php print $page_bottom; ?>

<!-- CLICKY CUSTOM-->
<?php
	global $user;
	function filterRoles($roles) {
		$arm = 'site user';
		foreach($roles as $role) {
			if( preg_match('/arm/', $role) === 1 ) {
				$arm = $role;
				return $arm;
			}
		}
		return $arm;
	}
?>
<script type="text/javascript">
	var clicky_custom = clicky_custom || {};
	clicky_custom = {
		visitor: {
			username: '<?php if(!empty($user->name)){echo $user->name;} ?>',
			role: '<?php if(!empty($user->roles)){echo filterRoles($user->roles);} ?>'
		}
	};
</script>

<!-- CLICKY -->
<script type="text/javascript">
var clicky_site_ids = clicky_site_ids || [];
clicky_site_ids.push(100774893);
(function() {
  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.async = true;
  s.src = '//static.getclicky.com/js';
  ( document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0] ).appendChild( s );
})();
</script>

<!-- Popup window for external links -->
<script type="text/javascript">
(function($){
	var extLinks = $('.popup');
	var width = $(window).width() / 1.5;
	var height = $(window).height();
	var xPos = window.screenX + (window.outerWidth - width) / 2;
	var yPos = window.screenY + (window.outerHeight - height) / 2;;
	var options = "scrollbars=yes|no|1|0,resizable=yes,menubar=yes,toolbar=yes,status=yes,location=yes," + 
		"height=" + height + ",width=" + width + 
		",top=" + yPos + ",left=" + xPos;
	for(var i = 0; i < extLinks.length; i++){
		extLinks[i].onclick = function(){
			window.open(this.href, this.value, options);
			return false;
		}
	}
})(jQuery);
</script>
</body>
</html>
