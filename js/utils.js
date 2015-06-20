function headingAnchors(self_link_text) {
	self_link_text = self_link_text || '#';
	var headings = document.querySelectorAll('h1');

	for (var i = 0; i < headings.length; i++) {
		var e = headings[i];
		if (!e.id) {
			var tc = e.textContent;
			tc = tc.replace(/[^a-z0-9-]/gi, '-')
				.replace(/-{2,}/gi, '-')
				.replace(/-+$/gi, '')
				.toLowerCase();

			e.id = tc;
		}

		var a = document.createElement('a');
		a.href = '#' + e.id;
		a.target = "_self";
		a.textContent = self_link_text;

		e.appendChild(a);
	}

	// Scroll to the given hash
	var h = location.hash;
	location.hash = '';
	location.hash = h;


	// Youtube click-show iframes
	var v = document.getElementsByClassName("youtube-player");
	for (var n = 0; n < v.length; n++) {
		var p = document.createElement("div");
		p.innerHTML = labnolThumb(v[n].dataset.id);
		p.onclick = labnolIframe;
		v[n].appendChild(p);
	}

	function labnolThumb(id) {
		return '<img class="youtube-thumb" src="https://i.ytimg.com/vi/' + id + '/hqdefault.jpg"><div class="play-button"></div>';
	}

	function labnolIframe() {
		var iframe = document.createElement("iframe");
		iframe.setAttribute("src", "https://www.youtube.com/embed/" + this.parentNode.dataset.id + "?autoplay=1&autohide=2&border=0&wmode=opaque&enablejsapi=1");
		iframe.setAttribute("frameborder", "0");
		this.parentNode.replaceChild(iframe, this);
	}
}
