// Words that trigger deletion of a section.
var prohibited = ['Kellerman', 'Stephen A', 'LaVar', 'LaMelo', 'Lonzo'];
// Sections to be cleared.
var toBeRemoved = [];

var body = document.getElementsByTagName("body")[0];
flagNodes(body);
removeFlagged();

function flagNodes(node) {
	var children = node.childNodes;
	for (var i=0; i < children.length; i++) {
		var child = children[i];
		if (shouldBeRemoved(child)) {
			var article = findParent(child, "article");
			// If it's not in an <article>, ignore it.
			if (!article) {
				continue;
			}
			if (!toBeRemoved.includes(article)) {
				toBeRemoved.push(article);
			}
		} else {
			flagNodes(child);
		}
	}
}

function findParent(node, tagName) {
	if (!node) {
		return null;
	}
	if (node.tagName && node.tagName.toLowerCase() == tagName) {
		return node;
	}
	return findParent(node.parentNode, tagName);
}

function shouldBeRemoved(node) {
	var nodeValue = node.nodeValue;
	if (nodeValue) {
		for (var i = 0; i < prohibited.length; i++) {
			if (nodeValue.includes(prohibited[i])) {
				return true;
			}
		}
	}
	return false;
}

function removeFlagged() {
	for (var i = 0; i < toBeRemoved.length; i++) {
		var article = toBeRemoved[i];
		while (article.childNodes.length > 0) {
			article.removeChild(article.childNodes[0]);
		}
		var span = document.createElement("span");
		var text = document.createTextNode("Make ESPN reasonable again!");
		span.appendChild(text);
		article.appendChild(span);
	}
}
