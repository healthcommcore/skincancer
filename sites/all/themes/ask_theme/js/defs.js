(function($) {

  var defs = {
   bcc: 'Basal cell carcinoma (non-melanoma skin cancer), the most common form of skin cancer, not usually life-threatening.',
	 carcinoma: 'A type of cancer that starts in cells that make up the skin or the tissue-lining organs',
	 chemotherapy: 'The use of medication (chemicals) to treat disease',
	 immunotherapy: 'Treating a disease by inducing, enhancing, or suppressing an immune response',
	 sun_exposure: 'Sun exposure you get in small ways every day without realizing it that adds up to more UV exposure',
	 tanning: 'Using a tanning bed, booth, or sunlamp to get tan (does not include spray tanning)',
	 melanoma: 'A serious form of skin cancer, treatable in early stages, can be fatal when advanced',
	 moles: 'A common brown spot or growth on the skin that can be either flat or raised, and is generally round and regularly shaped',
	 non_melanoma: 'Skin cancer that forms in the lower part of the epidermis (the outer layer of the skin) or in squamous cells, but not in melanocytes (skin cells that make pigment).',
	 scc: 'Squamous cell carcinoma (non-melanoma skin cancer), another common form of skin cancer, not usually life-threatening.',
	 skincancer: 'The uncontrolled growth of abnormal skin cells.',
	 skin_self_check: 'Checking your own skin regularly and completely for any warning signs of skin cancer.',
	 spf: 'Sun Protection Factor, the relative amount of sunburn protection that a sunscreen can provide an average user when used correctly',
	 microscopy: 'No definition yet',
	 uv_rays: 'Ultraviolet rays that you get from the sun and tanning beds'
  }

 $(document).ready(function() {

	 var MOBILE_SIZE = 768;
	 var container = $('#def-container');
	 var terms = $('.def');
	 container.hide();
	 terms
	 .on('click', function (e) {
		 e.preventDefault();
	 })
	 .on('mouseover', function (e) {
		 var id = e.target.id;
		 id = id.split('-').join('_');
		 var match = findMatch(Object.keys(defs), id);
		 $(container).append(match);
		 $(container).show();
		 position(container, e.target);
	 })
	 .on('mouseout', removeContainer);

	 container.on('click', removeContainer);

	 function removeContainer() {
		 $(container).hide();
		 $(container).children().remove();
	 }

	 // findMatch()
	 function findMatch(keys, id) {
	   var match = '<p>';
		 keys.forEach( function(term) {
			 if(term == id) {
			   match += defs[term];
				 match += '</p>';
			 }
		 });
		 return match;
	 }
	 
	 // setContainerTop
	 function setContainerTop(container, term) {
		 var cTop, padding = 12;
		 var termTop = $(term).offset().top;
		 if (termTop - window.scrollY <= (window.innerHeight / 2) ) {
			 cTop = termTop + $(term).height();
		 }
		 else {
			 cTop = termTop - $(container).height() - padding;
		 }
		 return cTop;
	 }

	 // position()
	 function position(container, term) {
		 var termTop = $(term).position().top;
		 var termLeft = $(term).position().left;
		 var termCenter = termLeft + ($(term).width() / 2);
		 var containerCenter = $(container).outerWidth() / 2;
		 var containerTop = setContainerTop(container, term);
		 if(window.innerWidth < MOBILE_SIZE) {
			 $(container).css({
				 left: (window.innerWidth / 2 - containerCenter) + 'px',
				 top: containerTop + 'px',
			 });
		 }
		 else {
			 $(container).css({
				 left: (termCenter - containerCenter) + 'px',
				 top: containerTop + 'px',
			 });
		 }
	 }

 });// document
})(jQuery);
