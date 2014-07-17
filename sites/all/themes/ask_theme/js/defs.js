(function($) {
  var defs = {
   bcc: 'Basal cell carcinoma (non-melanoma skin cancer), the most common form of skin cancer, not usually life-threatening.',
	 carcinoma: 'A type of cancer that starts in cells that make up the skin or the tissue-lining organs',
	 chemotherapy: 'The use of medication (chemicals) to treat disease',
	 immunotherapy: 'Treating a disease by inducing, enhancing, or suppressing an immune response',
	 sun-exposure: 'Sun exposure you get in small ways every day without realizing it that adds up to more UV exposure',
	 tanning: 'Using a tanning bed, booth, or sunlamp to get tan (does not include spray tanning)',
	 melanoma: 'A serious form of skin cancer, treatable in early stages, can be fatal when advanced',
	 moles: 'A common brown spot or growth on the skin that can be either flat or raised, and is generally round and regularly shaped',
	 non-melanoma: 'Skin cancer that forms in the lower part of the epidermis (the outer layer of the skin) or in squamous cells, but not in melanocytes (skin cells that make pigment).',
	 scc: 'Squamous cell carcinoma (non-melanoma skin cancer), another common form of skin cancer, not usually life-threatening.',
	 skincancer: 'The uncontrolled growth of abnormal skin cells.',
	 skin-self-check: 'Thoroughly checking all of your skin to prevent untreated skin cancer',
	 spf: 'Sun Protection Factor, the relative amount of sunburn protection that a sunscreen can provide an average user when used correctly',
	 uv: 'Ultraviolet rays that you get from the sun and tanning beds'
  }

 $(document).ready(function() {
	 var terms = $('.def');
	 terms.on('click', function (e) {
		 e.preventDefault();
	 });
 });
})(jQuery);
