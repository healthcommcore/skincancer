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
	 skin_self_check: 'Thoroughly checking all of your skin to prevent untreated skin cancer',
	 spf: 'Sun Protection Factor, the relative amount of sunburn protection that a sunscreen can provide an average user when used correctly',
	 uv_rays: 'Ultraviolet rays that you get from the sun and tanning beds'
  }

 $(document).ready(function() {
	 var container = $('#def-container');
	 var terms = $('.def');
	 container.hide();
	 terms.on('mouseover', function (e) {
		 e.preventDefault();
		 var id = e.target.id;
		 id = id.split('-').join('_');
		 var match = findMatch(Object.keys(defs), id);
		 $(container).append(match);
		 position(container, e.target);
		 $(container).show();
		 //console.log(match);

	 })
	 .on('mouseout', function (e) {
		 $(container).children().remove();
		 $(container).hide();
	 });

	 // findMatch()
	 var findMatch = function(keys, id) {
	   var match = '<p>';
		 keys.forEach( function(term) {
			 if(term == id) {
			   //console.log(defs[term]);
			   match += defs[term];
				 match += '</p>';
			 }
		 });
		 return match;
	 }
	 
	 var setContainerTop = function(container, term) {
		 var cTop, padding = '20';
		 var termTop = $(term).position().top - window.scrollY;
		 console.log(termTop);
		 if (termTop <= (window.innderHeight / 2) ) {
			 cTop = termTop + $(term).height() + padding;
		 }
		 else {
			 cTop = termTop - $(container).height() - padding;
		 }
		 return cTop;
	 }


	 var position = function(container, term) {
		 var termTop = $(term).position().top;
		 var termLeft = $(term).position().left;
		 var termCenter = termLeft + ($(term).width() / 2);
		 var containerCenter = $(container).outerWidth() / 2;
		 var containerTop = setContainerTop(container, term);
		 //console.log(termCenter - containerCenter);
		 $(container).css({
       left: (termCenter - containerCenter) + 'px',
       top: containerTop + 'px',
		 });

		 //console.log(termCenter);
	 }

 });
})(jQuery);
